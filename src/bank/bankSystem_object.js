import promptSync from 'prompt-sync';
const prompt = promptSync();
const accounts = [];

// 1. 계좌 개설
function createAccount() {
  // 예금주, 계좌번호, 입금액을 받는 변수
  const name = prompt('예금주 이름?');
  const phone = prompt('전화번호는?');
  const owner = { name, phone };
  const accountNo = prompt('계좌번호?');
  let balance = Number(prompt('초기 입금액?'));

  if (balance < 0 || isNaN(balance)) {
    console.log('숫자를 입력 또는 0이상 입력하세요');
    balance = 0;
  }
  // 1개의 계좌 정보를 담는 객체
  return { owner, accountNo, balance, history: [] };
}

// 2. 입금
function deposit(
  accountNo,
  depositAmount,
  onSuccess,
  onFail = (message) => {
    console.log(`[X] ${message}`);
  },
) {
  if (depositAmount <= 0 || isNaN(depositAmount)) {
    return onFail('0원 이상 입력 또는 문자열은 입력하실 수 없습니다.');
  }
  // 찾은 계좌 객체
  const findByAccountNo = findAccount(accounts, accountNo);
  if (findByAccountNo === undefined) {
    onFail('존재하지 않는 계좌번호 입니다.');
    return;
  }
  findByAccountNo.balance += depositAmount;

  // 찾은 계좌 객체의 history 배열에 입금정보 객체 추가
  findByAccountNo.history.push({
    type: 'deposit',
    amount: depositAmount, // 입금액
    balanceAfter: findByAccountNo.balance, // 입금후 금액
    date: new Date().toISOString().slice(0, 10),
  });

  onSuccess(findByAccountNo);
}

// 3. 출금
function withdraw(
  accountNo,
  withdrawAmount,
  onSuccess,
  onFail = (message) => {
    console.log(`[X] ${message}`);
  },
) {
  // 찾은 계좌 객체
  const findByAccountNo = findAccount(accounts, accountNo);

  if (findByAccountNo === undefined) {
    onFail('존재하지 않는 계좌번호 입니다.');
    return;
  }
  if (withdrawAmount > findByAccountNo.balance) {
    return onFail(
      `출금 실패: 잔액 부족 (현재 ${findByAccountNo.balance.toLocaleString()}원)`,
    );
  }

  findByAccountNo.balance -= withdrawAmount;

  // 찾은 계좌 객체의 history 배열에 출금정보 객체 추가
  findByAccountNo.history.push({
    type: 'withdraw',
    amount: withdrawAmount, // 출금액
    balanceAfter: findByAccountNo.balance, // 출금후 잔액
    date: new Date().toISOString().slice(0, 10),
  });

  onSuccess(findByAccountNo);
}

// 4. 계좌 조회
const findAccount = (accounts, accountNo) => {
  return accounts.find((account) => account.accountNo === accountNo);
};

// 5. 전체 계좌
const printAccount = ({
  owner: { name, phone },
  accountNo: no,
  balance,
  type = '입출금',
}) => {
  console.log(`[계좌 정보]
예금주 : ${name} (${phone})
계좌번호 : ${no}
종류 : ${type}
잔액 : ${balance.toLocaleString()}원
==============================================`);
};

// 6. 잔액순 정렬
const sortByBalance = (accounts, desc = true) => {
  const newAccounts = [...accounts];
  return newAccounts.sort((a, b) => {
    return b.balance - a.balance;
  });
};

// 7. 거래 내역 조회 (히스토리)
function printHistory(account) {
  console.log(`[${account.owner.name}] 거래내역`);

  // account 객체에서 history 객체를 forEach로 반복 시킴
  account.history.forEach((record, index) => {
    // 하나의 이용자 객체를 가져와
    const sign = record.type === 'deposit' ? '+' : '-'; // 객체의 type이 deposit이면 + 아니면 -
    const typeKor = record.type === 'deposit' ? '입금' : '출금'; // type이 deposit이면 입금 아니면 출금
    const amountStr = `${sign}${record.amount.toLocaleString()}원`; // type으로 결정된 등호와 히스토리에 있는 금액을 출력
    const balanceStr = `${record.balanceAfter.toLocaleString()}원`; // 히스토리에 있는 입출금후 금액 출력

    console.log(
      `${index + 1}. ${record.date} ${typeKor} ${amountStr} → 잔액 ${balanceStr}`,
    );
  });

  const totalDeposit = getTotalByType(account, 'deposit'); // 총 입금액을 출력하는 함수 호출
  const totalWithdraw = getTotalByType(account, 'withdraw'); // 총 출금액을 출력하는 함수 호출
  const recentTwo = getLastN(account, 2); // 최근 2개의 입출금 내역 함수 호출

  console.log(
    `총 입금: ${totalDeposit.toLocaleString()}원 / 총 출금: ${totalWithdraw.toLocaleString()}원`,
  );
  console.log(`최근 2건: ${recentTwo}`);
}

// 0. 종료
const getTotalBalance = (accounts) => {
  // accounts.reduce((누적값, 현재요소) => { ... }, 초기값)
  return accounts.reduce((sum, acc) => {
    // console.log(`누적값 ${sum} / 현재값 ${acc.balance}`);
    return sum + acc.balance;
  }, 0);
};

// getHistoryByType(account, type) : 입금 또는 출금 내역만 반환 (filter)
function getHistoryByType(account, type) {
  // 계좌 객체 안의 history 배열에서, 입력한 type과 일치하는 내역 객체들만 모아 새 배열로 반환
  return account.history.filter((record) => record.type === type);
}

// getTotalByType(account, type) : 타입별 총액 반환 (filter + reduce, 또는 reduce 한 번으로)
function getTotalByType(account, type) {
  // getHistoryByType으로 걸러낸 특정 타입 내역 배열을 targetHistory에 담음
  const targetHistory = getHistoryByType(account, type);
  return targetHistory.reduce((total, record) => {
    // 각 내역의 amount(금액)를 누적 합산
    return total + record.amount;
  }, 0); // 초기값 0원부터 시작 (내역이 없으면 0원 안전하게 반환)
}

// getLastN(account, n) : 최근 n건 반환 (slice, 원본 유지)
// 최근 2건: 출금 5,000원, 입금 10,000원
function getLastN(account, n) {
  return account.history
    .slice(-2)
    .map((record) => {
      const typeText = record.type === 'deposit' ? '입금' : '출금';
      return `${typeText} ${record.amount.toLocaleString()}원`;
    })
    .join(', ');
}

// createSecureAccount(owner, initial) : 내부에 let balance를 두고, { owner, deposit, withdraw, getBalance } 객체를 반환
function createSecureAccount(owner, initial) {
  let balance = initial; // 외부에서 직접 접근할 수 없음, 은닉화

  return {
    owner,
    deposit: (amount) => (balance += amount),
    withdraw: (amount) => {
      if (amount >= balance) {
        return false; // 잔액 부족
      }
      balance -= amount; // 돈 깎기
      return true; // 성공 시
    },
    getBalance: () => balance,
  };
}

// const acc = createSecureAccount('김철수', 50000);
// acc.deposit(10000);
// console.log(acc.getBalance()); // 60000
// console.log(acc.balance); // undefined (직접 접근 불가!)
// console.log(acc.withdraw(100000)); // false (잔액 부족)
// console.log(acc.withdraw(20000)); // true (출금 성공)
// console.log(acc.getBalance()); // 40000

// ========================================= Handler =========================================

function createHandler() {
  console.log('1. 계좌개설');
  const account = createAccount();
  accounts.push(account);
  while (true) {
    const q = prompt('계속 개설하시겠습니까?');
    if (q === 'y') {
      const newAccount = createAccount();

      if (
        accounts.some((account) => account.accountNo === newAccount.accountNo)
      ) {
        console.log('이미 존재하는 계좌번호입니다.');
        continue;
      }
      accounts.push(newAccount);
    }
    if (q === 'n') {
      break;
    }
  }

  console.log(`총 ${accounts.length}의 계좌`);
  accounts.forEach(({ owner: { name, phone }, accountNo, balance }, index) =>
    console.log(
      `${index + 1}. ${name} / ${accountNo} / ${balance.toLocaleString()}원`,
    ),
  );
}

function depositHandler() {
  console.log('2. 입금');
  let accountNo = prompt('계좌번호?');
  const depositAmount = Number(prompt('입금액?'));
  deposit(accountNo, depositAmount, ({ owner: { name }, balance }) => {
    console.log(
      `[OK] 입금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`,
    );
  });
}

function withdrawHandler() {
  console.log('3. 출금');
  const accountNo = prompt('계좌번호?');
  const withdrawAmount = Number(prompt('출금액?'));
  withdraw(accountNo, withdrawAmount, ({ owner: { name }, balance }) => {
    console.log(
      `[OK] 출금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`,
    );
  });
}

function findAccountHandler() {
  const accountNo = prompt('계좌번호?');
  console.log('4. 계좌조회');
  // 계좌가 있는지 확인하는 함수를 변수에 담기
  const account = findAccount(accounts, accountNo);
  // 입력한 계좌가 true 면 printAccount 함수 실행
  if (account) {
    printAccount(account);
  } else {
    console.log('없는 계좌 번호입니다.');
  }
  return;
  // account ? printAccount(account) : console.log('없는 계좌 번호입니다.');
}

function printAccountHandler() {
  console.log('5. 전체계좌');
  // 이 함수가 호출이 되면
  // accounts 배열이 forEach 함수에 콜백함수 안에 있는 인자 값인 account를 printAccount 함수의 인자값으로 넘겨줘서
  // printAccount 함수가 실행됨.
  accounts.forEach((account) => printAccount(account));
}

function sortByBalanceHandler() {
  console.log('6. 잔액순 정렬');
  console.log('금액 정렬 :');
  sortByBalance(accounts, true).forEach((account) => printAccount(account));

  // 체이닝
  // console.log(
  //   [1, 2, 3, 4, 5]
  //     .map((n) => n * 2) // 2,4,6,8,10
  //     .map((n) => n * 2) // 4,8,12,16,20
  //     .map((n) => n * 2) // 8,16,24,32,40
  //     .map((n) => n * 2) // 16,32,48,64,80
  //     .map((n) => n * 2), // 32,64,96,128,160
  // );
}
function historyHandler() {
  console.log('7. 거래내역 조회');
  const accountNo = prompt('조회할 계좌번호? ');
  const targetAccount = findAccount(accounts, accountNo);

  // 입력한 계좌번호가 accouts에 없으면 안내하고 종료
  if (!targetAccount) {
    console.log('없는 계좌 번호입니다.');
    return;
  }

  printHistory(targetAccount);
}

function exitHandler() {
  console.log('프로그램을 종료합니다.');
  console.log(
    `계좌 : ${accounts.length} 개, 총 잔액 : ${getTotalBalance(accounts).toLocaleString()}원`,
  );
  process.exit(); //Node.js에서 현재 실행 중인 프로세스를 즉시 종료하는 함수
}

while (true) {
  const num = prompt(
    '숫자만 입력하세요. (1 계좌개설 / 2 입금 / 3 출금 / 4 계좌조회 / 5 전체계좌 / 6 잔액순 정렬 / 7 거래내역조회 / 0 종료)',
  );

  // ?? : 널 병합 연산자
  // 왼쪽 값이 없으면, 오른쪽 기본값을 써라.
  const menu = {
    // 사용자가 1번을 입력하면 함수가 실행되는데 return 값이 없어서 undefined가 나옴, 함수는 실행됨
    // 그러면 아래의 menu[num]?.() ?? 가 그걸 보고 값이 없는 메뉴라고 판단하고 console.log를 찍을 수 있음
    // 따라서 undefined 대신 정상 실행 완료를 뜻하는 true를 반환하도록 기본값을 준 것
    1: () => createHandler() ?? true,
    2: () => depositHandler() ?? true,
    3: () => withdrawHandler() ?? true,
    4: () => findAccountHandler() ?? true,
    5: () => printAccountHandler() ?? true,
    6: () => sortByBalanceHandler() ?? true,
    7: () => historyHandler() ?? true,
    0: () => exitHandler() ?? true,
  };

  // 객체로 리팩토링
  // ?. 를 쓰는 이유는 undefined 일 수도 있다 라는 뜻 / 안쓰면 에러
  // 자바스크립트 문법상 ?. 자체가 한 세트인 기호
  // (); ()는 우리가 늘 쓰는 "함수 호출(실행)"
  menu[num]?.() ??
    console.log('없는 메뉴 번호입니다. 확인 후 다시 입력하세요.');
}
