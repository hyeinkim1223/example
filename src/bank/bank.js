// 공통 규칙
// • 변수는 const를 기본으로, 재할당이 필요할 때만 let을 사용합니다. var는 쓰지 않습니다.
// • 금액은 항상 숫자로 변환한 뒤 Number.isNaN()이나 <= 0 검사를 합니다.
// • for문으로 풀 수 있어도 문제에서 지정한 고차함수(map / filter / reduce / find / some / every / sort)를 사용해 보세요.
// • 출력 문자열은 템플릿 리터럴(백틱)을 사용하고, 금액은 toLocaleString()으로 천 단위 콤마를 붙입니다

const prompt = require('prompt-sync')();

// before
// 계좌번호로 계좌 객체를 찾아 반환하고, 없으면 undefined를 반환합니다. (반드시 find 사용)
// function findAccount(accounts, accountNo) {
//   return accounts.find((account) => account.accountNo === accountNo);
// }

// after
const findAccount = (accounts, accountNo) => accounts.find((account) => account.accountNo === accountNo);

function createAccount() {
  const name = prompt('예금주 이름?');
  const phone = prompt('전화번호?');
  const owner = { name, phone };
  const accountNo = prompt('계좌번호?');
  const balance = Number(prompt('초기 입금액?'));
  const createdAt = new Date().toISOString().slice(0, 10);

  // 초기 입금액이 숫자인지 확인
  if (isNaN(balance)) {
    console.log('숫자가 아닙니다.');
  }
  return { owner, accountNo, balance, createdAt };
}

const printAccount = ({ owner: { name, phone }, accountNo: no, balance, type = '입출금' }) => {
  accounts.forEach((account, index) => {
    console.log(`
        [계좌 정보]
        예금주 : ${name} (${phone})
        계좌번호 : ${no}
        종류 : ${type}
        잔액 : ${account.balance.toLocaleString()}원
        `);
  });
};
// 예금주, 계좌번호, 초기입금액 입력 받음
// 각각의 변수에 createAccount 함수를 통해 객체로 리턴함
// createAccount();

// 입력 값으로 객체 생성
const account = createAccount();

const accounts = [account];
// [] 배열에 account 를 그냥 넣어도 됨
// accounts.push(account);

while (true) {
  const q = prompt('계속 개설 하시겠습니까?');
  if (q === 'y') {
    const newAccount = createAccount();
    // 계좌를 추가하기 전에 같은 계좌번호가 이미 있으면 거부합니다. (반드시 some 사용)
    if (accounts.some((account) => account.accountNo === newAccount.accountNo)) {
      console.log('이미 존재하는 계좌번호입니다.');
      continue;
    }
    accounts.push(newAccount);
  }
  if (q === 'n') {
    break;
  }
}

// before
// console.log("[계좌 개설 완료]")
// console.log("예금주 : " + account.owner)
// console.log("계좌번호 : " + account.accountNo)
// console.log("잔액 : " + account.balance.toLocaleString() + "원")
// console.log("개설일 : "+ account.createdAt)

// after
// 계좌 개설 완료시 출력
// accounts 배열을 foreach 함수를 사용해서 배열안에 모든 객체를 출력하는 코드를 작성하세요
// 실행예시
// [0번쨰 계좌 개설 완료]
// 예금주 : ㅁㄴㅇ
// 계좌번호 : 156-5555-6565-1
// 잔액 : 11,111원
// 개설일 : 2026-09-11
// ...... 배열 순회
// accounts.forEach((account, index) => {
//   console.log(`
// [${index + 1}번째 계좌 개설 완료]
// 예금주 : ${account.owner}
// 계좌번호 : ${account.accountNo}
// 잔액 : ${account.balance.toLocaleString()}원
// 개설일 : ${account.createdAt}
// `);
// });

console.log(`총 ${accounts.length}개 계좌`);
accounts.forEach(({ owner: { name, phone }, accountNo, balance }, index) => {
  console.log(`${index + 1}. ${name} (${phone}) / ${accountNo} / ${balance.toLocaleString()}원`);
});

console.log('------------------------------------------------');
printAccount(accounts[0]);
