import promptSync from 'prompt-sync';
import { logDOM } from '@testing-library/dom';
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
  return { owner, accountNo, balance };
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

// 0. 종료
const getTotalBalance = (accounts) => {
  // accounts.reduce((누적값, 현재요소) => { ... }, 초기값)
  return accounts.reduce((sum, acc) => {
    // console.log(`누적값 ${sum} / 현재값 ${acc.balance}`);
    return sum + acc.balance;
  }, 0);
};
console.log(`전체 잔액 : ${getTotalBalance(accounts).toLocaleString()}`);

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

function exitHandler() {
  console.log('프로그램을 종료합니다.');
  // console.log('계좌 : ', accounts.length,'개' ,'총 잔액 : ', getTotalBalance(accounts), '원');
  console.log(`계좌 : ${accounts.length} 개, 총 잔액 : ${getTotalBalance(accounts)}원`);
  process.exit(); //Node.js에서 현재 실행 중인 프로세스를 즉시 종료하는 함수
}

while (true) {
  const num = prompt(
    '숫자만 입력하세요. (1 계좌개설 / 2 입금 / 3 출금 / 4 계좌조회 / 5 전체계좌 / 6 잔액순 정렬 / 0 종료)',
  );

  const menu = {
    1: createHandler,
    2: depositHandler,
    3: withdrawHandler,
    4: findAccountHandler,
    5: printAccountHandler,
    6: sortByBalanceHandler,
    0: exitHandler,
  };

  // 객체로 리팩토링
  // ?. 를 쓰는 이유는 undefined 일 수도 있다 라는 뜻 / 안쓰면 에러
  // 자바스크립트 문법상 ?. 자체가 한 세트인 기호
  // (); ()는 우리가 늘 쓰는 "함수 호출(실행)"
  if(!menu[num]?.()) {
    console.log('없는 메뉴 번호입니다. 확인 후 다시 입력하세요.');
  }
}
