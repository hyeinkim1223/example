import styles from './AccountTable.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Toast';
import AccountRow from './AccountRow';
import { useState } from 'react';

export default function AccountTable({
  accounts,
  setAccounts,
  accountNo,
  owner,
  selectedAccountNo,
  setSelectedAccountNo,
}) {
  // 유효성 검사
  const isAllVaild =
    accounts.length > 0 && // 배열에 길이가 0보다 크고
    // every() : 배열 내 하나라도 만족하지 않으면 false
    accounts.every((account) => {
      // 계좌번호가 빈칸이 아니면 true, 예금주도 빈칸이 아니면 true
      return accountNo !== '' && owner !== '';
    });

  // VIP 대상자 걸러내기
  const vipNames = accounts
    .filter((account) => Number(account.balance) >= 1000000)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5)
    .map((account) => account.owner)
    .join(', ');

  // 잔액순 정렬하기
  const [isSorted, setIsSorted] = useState(false);

  const sortByBalanceHandler = () => {
    if (!isSorted) {
      const sorted = [...accounts].sort((a, b) => b.balance - a.balance);
      setAccounts(sorted);
      setIsSorted(true);
    } else {
      const sorted = [...accounts].sort((a, b) => a.balance - b.balance);
      setAccounts(sorted);
      setIsSorted(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.titleBox}>
            <div className={styles.title}>전체 계좌</div>
            <span>문제 5 — sortByBalance(), getVipNames()</span>
          </div>
          <Button
            children={'↓ 잔액순 정렬'}
            variant="secondary"
            clickEvent={sortByBalanceHandler}
          />
        </div>
        <div className={styles.tableRowHeader}>
          <div>#</div>
          <div>예금주</div>
          <div>계좌번호</div>
          <div>잔액</div>
          <div>등급</div>
          <div></div>
        </div>
        <div className={styles.tableBody}>
          {accounts.map((account, index) => (
            <AccountRow
              key={account.accountNo}
              no={index + 1}
              account={account}
              selectedAccountNo={selectedAccountNo}
              setSelectedAccountNo={setSelectedAccountNo}
            />
          ))}
        </div>
        <div className={styles.tableFooter}>
          <div className={styles.totalAccount}>
            총 {accounts.length}개 계좌 · 모두 유효(every): {String(isAllVaild)}
          </div>
          <div className={styles.vipName}>VIP(100만↑): {vipNames}</div>
        </div>
      </div>
    </>
  );
}
