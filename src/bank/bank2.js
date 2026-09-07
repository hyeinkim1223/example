const prompt = require('prompt-sync')();

// 예금주, 계좌번호, 입금액을 받아 유효성 검사후 객체를 생성하는 함수
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

const findAccount = (accounts, accountNo) => {
  return accounts.find((account) => account.accountNo === accountNo);
};

const PrintAccount = ({
  owner: { name, phone },
  accountNo: no,
  balance,
  type = '입출금',
}) => {
  console.log(`==============================================
[계좌 정보]
예금주 : ${name} (${phone})
계좌번호 : ${no}
종류 : ${type}
잔액 : ${balance.toLocaleString()}원
==============================================`);
};

//11111111111111111111111111
const account = createAccount();

const accounts = [account];

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

accounts.forEach((account) => {
  PrintAccount(account);
});

// 개설일 : ${new Date().toISOString().slice(0, 10)}

//222222222222222222222222222
// • deposit(account, amount, onSuccess, onFail) : 금액이 0 이하 또는 숫자가 아니면 onFail('사유')를,
//     아니면 잔액을 늘리고 onSuccess(account)를 호출합니다.
// • withdraw(account, amount, onSuccess, onFail) : 잔액 부족이면 onFail('잔액 부족'), 아니면 잔액을
// 줄이고 onSuccess(account)를 호출합니다.
// • onFail을 넘기지 않아도 오류가 나지 않도록 기본 매개변수로 처리합니다.
// • 사용자에게 계좌번호와 금액을 입력받아 입금·출금을 각각 한 번씩 실행하고, 성공/실패 콜백에서 서로 다른
// 메시지를 출력합니다.
// • 같은 withdraw 함수를 두 번 호출하되, 다른 콜백을 넘겨 다른 결과가 출력되는지 확인합니다.

const accountNo = prompt('계좌번호?');
const depositAmount = Number(prompt('입금액?'));

deposit(accountNo, depositAmount, ({ owner: { name }, balance }) => {
  console.log(`[OK] 입금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`);
});

// 입금
function deposit(
  accountNo,
  depositAmount,
  onSuccess,
  onFail = () => {
    return `[X] 입금 실패`;
  },
) {
  if (depositAmount <= 0 || isNaN(depositAmount)) {
    return onFail();
  }
  // 찾은 계좌 객체
  const findByAccountNo = findAccount(accounts, accountNo);
  findByAccountNo.balance += depositAmount;

  onSuccess(findByAccountNo);
}

const withdrawAmount = Number(prompt('출금액?'));
withdraw(accountNo, withdrawAmount, ({ owner: { name }, balance }) => {
  console.log(`[OK] 출금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`);
});

// 출금
function withdraw(
  accountNo,
  withdrawAmount,
  onSuccess,
  onFail = ({ balance }) => {
    return `[X] 출금 실패: 잔액 부족 (현재 ${balance.toLocaleString()}원)`;
  },
) {
  // 찾은 계좌 객체
  const findByAccountNo = findAccount(accounts, accountNo);

  if (withdrawAmount > findByAccountNo.balance) {
    return onFail(findByAccountNo);
  }

  findByAccountNo.balance -= withdrawAmount;

  onSuccess(findByAccountNo);
}

// 출금
function withdrawv2(
  accountNo,
  withdrawAmount,
  onSuccess,
  onFail = (balance) => {
    return `[X] 출금 실패: 잔액 부족 (현재 ${balance.toLocaleString()}원)`;
  },
) {
  // 찾은 계좌 객체
  const findByAccountNo = findAccount(accounts, accountNo);

  if (withdrawAmount > findByAccountNo.balance) {
    return onFail(findByAccountNo.balance);
  }

  findByAccountNo.balance -= withdrawAmount;

  onSuccess(findByAccountNo);
}
