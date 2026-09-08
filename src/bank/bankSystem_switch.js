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

// 3. 출금
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
export const sortByBalance = (accounts, desc = true) => {
  const newAccounts = [...accounts];
  return newAccounts.sort((a, b) => {
    return b.balance - a.balance;
  });
};

// while 문으로 감싸기..

// 1. switch 문으로 구현합니다.
while (true) {
  const num = Number(
    prompt(
      '숫자만 입력하세요. (1 계좌개설 / 2 입금 / 3 출금 / 4 계좌조회 / 5 전체계좌 / 6 잔액순 정렬 / 0 종료)',
    ),
  );
  switch (num) {
    case 1:
      console.log('1. 계좌개설');
      const account = createAccount();
      accounts.push(account);
      while (true) {
        const q = prompt('계속 개설하시겠습니까?');
        if (q === 'y') {
          const newAccount = createAccount();

          if (
            accounts.some(
              (account) => account.accountNo === newAccount.accountNo,
            )
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
      accounts.forEach(
        ({ owner: { name, phone }, accountNo, balance }, index) =>
          console.log(
            `${index + 1}. ${name} / ${accountNo} / ${balance.toLocaleString()}원`,
          ),
      );

      break;
    case 2: {
      console.log('2. 입금');
      let accountNo = prompt('계좌번호?');
      const depositAmount = Number(prompt('입금액?'));
      deposit(accountNo, depositAmount, ({ owner: { name }, balance }) => {
        console.log(
          `[OK] 입금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`,
        );
      });
      break;
    }
    case 3: {
      console.log('3. 출금');
      const accountNo = prompt('계좌번호?');
      const withdrawAmount = Number(prompt('출금액?'));
      withdraw(accountNo, withdrawAmount, ({ owner: { name }, balance }) => {
        console.log(
          `[OK] 출금 완료! ${name}님 잔액: ${balance.toLocaleString()}원`,
        );
      });
      break;
    }
    case 4: {
      const accountNo = prompt('계좌번호?');
      console.log('4. 계좌조회');
      // 계좌가 있는지 확인하는 함수를 변수에 담기
      const account = findAccount(accounts, accountNo);
      // 입력한 계좌가 true 면 printAccount 함수 실행
      // if (account) {
      //   printAccount(account);
      // } else {
      //   console.log('없는 계좌 번호입니다.');
      // }  ==> 삼항연산자로 변경
      account ? printAccount(account) : console.log('없는 계좌 번호입니다.');
      break;
    }
    case 5:
      console.log('5. 전체계좌');
      accounts.forEach((account) => {
        printAccount(account);
      });
      break;
    case 6:
      console.log('6. 잔액순 정렬');
      console.log('금액 정렬 :', sortByBalance(accounts, true));
      break;
    case 0:
      console.log('0. 종료');
      process.exit(); //Node.js에서 현재 실행 중인 프로세스를 즉시 종료하는 함수
      break;
    default:
      console.log('없는 메뉴 번호 입니다. 확인 후 다시 입력하세요.7');
      break;
  }
}
