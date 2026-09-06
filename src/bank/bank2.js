const prompt = require('prompt-sync')();

// 예금주, 계좌번호, 입금액을 받아 유효성 검사후 객체를 생성하는 함수
function createAccount() {
  // 예금주, 계좌번호, 입금액을 받는 변수
  const name = prompt('예금주 이름?');
  const phone = prompt('전화번호는?');
  const owner = { name, phone };
  const accountNo = prompt('계좌번호?');
  const balance = Number(prompt('초기 입금액?'));

  if (balance < 0 || isNaN(balance)) {
    console.log('숫자를 입력 또는 0이상 입력하세요');
    balance = 0;
  }
  // 1개의 계좌 정보를 담는 객체
  return { owner, accountNo, balance };
}

const findAccount = (accounts, accountNo) => {
  accounts.find((account) => account.accountNo === accountNo);
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
