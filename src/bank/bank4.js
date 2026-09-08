// 1. depositPure(account, amount) : 원본을 바꾸지 않고 잔액이 늘어난 새 객체를 반환합니다.
//    실행 후 원본의 balance가 그대로인지 console.log로 증명하세요.
const account = { owner: '김철수', accountNo: '110-1', balance: 50000 };
const b = depositPure(account, 10000);

function depositPure(account, amount) {
  // ...스프레드연산자, balance에 입력된 매개변수(amount)값을 더해 반환
  return { ...account, balance: account.balance + amount };
}

console.log('원본 금액 : ', account.balance);
console.log('복사된 후 금액 : ', b.balance);

// 2. updateAccounts(accounts, accountNo, updater) : 해당 계좌만 updater 콜백으로 바꾼 새 배열을 반환합니다. (map + 스프레드)
// 목업 데이터
const accounts = [
  { owner: '김철수', accountNo: '110-1', balance: 50000 },
  { owner: '이영희', accountNo: '110-2', balance: 1500000 },
  { owner: '박민수', accountNo: '110-3', balance: 320000 },
  { owner: '최지우', accountNo: '110-4', balance: 2400000 },
  { owner: '정다은', accountNo: '110-5', balance: 0 },
];

function updateAccounts(accounts, accountNo, updater) {
  return accounts.map((account) =>
    account.accountNo === accountNo ? updater({ ...account }) : account,
  );
}
const updated = updateAccounts(accounts, '110-1', (account) => {
  return { ...account, balance: account.balance * 2 };
});

console.log('변경된 값  :', updated);

// 3. const copy = accounts; 와 const copy = [...accounts];의 차이를 코드로 실험하고, 주석으로 결과를 설명하세요.
const copy = accounts; // 새로운 변수에 account 배열을 넣음
const copy2 = [...accounts]; // 새로운 변수에 accounts 배열을 복사
// 그리고 accounts 배열에 하나의 객체를 추가하게 되면
accounts.push({ owner: '김혜인', accountNo: '110-6', balance: 250000 });
console.log('원본 배열', accounts); // 원본 또한 같이 추가가 됨
console.log('copy', copy); // copy === accounts
console.log('copy2 복사', copy2); // 얕은 복사 처리 되어 독립되어 운영됨

// 4. {balance, ...info} = account 처럼 나머지 속성 문법으로 잔액을 제외한 정보만 담은 객체를 만드세요.
// 스프레드 연산자와 레스트 연산자는 = 으로 달라짐.
// 등호 왼쪽 : Rest 상자를 열어서 남은 것들 챙기기
// 등호 오른쪽 : Spread 펼쳐서 새 상자에 담기
// 필요 없는 것만 쏙 빼고, 나머지 알맹이들만 골라 담은 새로운 상자 (info)를 하나 복사해서 만드는 것
const { balance, ...info } = account;
console.log('balance가 빠지고 복사된 값 : ', info);

// 5. Object.freeze(account) 후 account.balance = 0을 시도하면 어떻게 되는지 확인합니다. (strict mode 여부에 따른 차이도 조사)
// Object.freeze() 메서드는 객체를 동결하여 더 이상 변경할 수 없게함.
Object.freeze(account);
account.balance = 0; // 값을 0으로 변경해도 값이 변하지 않음.
console.log(account); // balance = 50000 으로 나옴
