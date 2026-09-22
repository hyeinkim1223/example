import styles from './AccountTable.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Form/Toast';
import AccountRow from './AccountRow';
import { useState } from 'react';

export default function AccountTable({
  accounts,
  accountNo,
  owner,
  selectedAccountNo,
  setSelectedAccountNo,
}) {
  // 잔액순 정렬하기 (계좌생성순 → 잔액높은순 → 잔액낮은순)
  const [isSorted, setIsSorted] = useState('default'); // 기본 정렬값 default

  // 기본 정렬이면 원본 유지, 정렬이 필요할 때만 얕은 복사([...]) 진행
  let displayAccounts = accounts;

  // 정렬 버튼 라벨명
  const sortLabels = {
    default: '↕ 계좌 개설순',
    desc: '↑ 잔액 높은순',
    asc: '↓ 잔액 낮은순',
  };

  // 정렬 상태명
  const NEXT_SORT_STATE = {
    default: 'desc',
    desc: 'asc',
    asc: 'default',
  };

  if (isSorted !== 'default') {
    // 정렬 값이 desc 또는 asc 라면
    displayAccounts = [...accounts].sort((a, b) =>
      // 원본 보호를 위해 얕은 복사한 배열을 정렬: desc면 내림차순, 아니면 오름차순
      isSorted === 'desc' ? b.balance - a.balance : a.balance - b.balance,
    );
  }

  // 유효성 검사 1. 값을 null 로 둘 수 없음
  const isAllValid =
    accounts.length > 0 && // 배열에 길이가 0보다 크고
    // every() : 배열 내 하나라도 만족하지 않으면 false
    accounts.every((account) => {
      // 계좌번호가 빈칸이 아니면 true, 예금주도 빈칸이 아니면 true
      return account.accountNo !== '' && account.owner !== '';
    });

  // VIP 대상자 걸러내기
  const vipNames = accounts
    // 첫 단계가 filter 이기 때문에 원본이 유지
    .filter((account) => Number(account.balance) >= 1000000)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5)
    .map((account) => account.owner)
    .join(', ');

  // 정렬 버튼 핸들러
  const sortByBalanceHandler = () => setIsSorted(NEXT_SORT_STATE[isSorted]);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>전체 계좌</h2>
          <label className={styles.description}>
            문제 5 — sortByBalance(), getVipNames()
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            label={sortLabels[isSorted]}
            variant="secondary"
            clickEvent={sortByBalanceHandler}
          />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRowHeader}>
            <th>#</th>
            <th>예금주</th>
            <th>계좌번호</th>
            <th>잔액</th>
            <th>등급</th>
            <th></th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {displayAccounts.map((account, index) => (
            <AccountRow
              key={account.accountNo}
              no={index + 1}
              account={account}
              selectedAccountNo={selectedAccountNo}
              setSelectedAccountNo={setSelectedAccountNo}
            />
          ))}
        </tbody>
      </table>

      <footer className={styles.tableFooter}>
        <span className={styles.totalAccount}>
          총 {accounts.length}개 계좌 · 모두 유효(every): {String(isAllValid)}
        </span>
        <span className={styles.vipNames}>VIP(100만↑): {vipNames}</span>
      </footer>
    </div>
  );
}
