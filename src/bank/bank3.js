const prompt = require('prompt-sync')();

// 목업 데이터
const accounts = [
  { owner: '김철수', accountNo: '110-1', balance: 50000 },
  { owner: '이영희', accountNo: '110-2', balance: 1500000 },
  { owner: '박민수', accountNo: '110-3', balance: 320000 },
  { owner: '최지우', accountNo: '110-4', balance: 2400000 },
  { owner: '정다은', accountNo: '110-5', balance: 0 },
];

// 1. 예금주 이름만 담긴 새배열 반환하는 함수
// before
// function getOwnerNames(accounts) {
//   return accounts.map(({ owner }) => {
//     return owner;
//   });
// }

// after : 축약형
const getOwnerNames = (accounts) => accounts.map(({ owner }) => owner);
console.log(getOwnerNames(accounts).toLocaleString()); // 배열에도 toLocaleString 사용하면 대괄호 빠짐

// 2. 잔액이 min 이상인 계좌만 반환
const min = Number(prompt('최소잔액?'));
const getRichAccounts = (accounts, min) => {
  return accounts
    .filter(({ balance }) => balance >= min) // filter 는 배열을 필터링 한거기 때문에 객체라서 [Object ..] 라고 나옴.
    .map(({ owner }) => owner);
};
console.log(`${min}원 이상 : ${getRichAccounts(accounts, min)}`);

// map으로도 할 수 있다.
// const getRichAccounts = (accounts, min) =>
//   accounts.map(({ balance, owner }) => {
//     if (balance >= min) {
//       return owner;
//     }
//   });
// console.log(getRichAccounts(accounts, min));

// 3. 배열에 총 누적값을 반환하는 함수
// reduce 함수 사용법
// 배열.reduce((누적값, 현재요소, 인덱스, 원본배열) => {
//   return 다음_누적값;
// }, 초기값);
const getTotalBalance = (accounts) => {
  // accounts.reduce((누적값, 현재요소) => { ... }, 초기값)
  return accounts.reduce((sum, acc) => {
    // console.log(`누적값 ${sum} / 현재값 ${acc.balance}`);
    return sum + acc.balance;
  }, 0);
};
console.log(`전체 잔액 : ${getTotalBalance(accounts).toLocaleString()}`);

// 4. 평균 금액을 반환하는 함수
const getAverageBalance = (accounts) => {
  return getTotalBalance(accounts) / accounts.length;
};

console.log(`평균 잔액 : ${getAverageBalance(accounts).toLocaleString()}`);

// 5. 잔액 100만 원 이상 계좌의 예금주 이름을 잔액 높은 순으로 반환 (filter -> sort -> map 체이닝)
