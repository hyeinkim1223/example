import styles from './AccountTable.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Form/Toast';
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
  // 유효성 검사 : 왜 필요하지..?
  const isAllVaild =
    accounts.length > 0 && // 배열에 길이가 0보다 크고
    // every() : 배열 내 하나라도 만족하지 않으면 false
    accounts.every((account) => {
      // 계좌번호가 빈칸이 아니면 true, 예금주도 빈칸이 아니면 true
      return accountNo !== '' && owner !== '';
    });

  // VIP 대상자 걸러내기
  const vipNames = accounts
    // 첫 단계가 filter 이기 때문에 원본이 유지
    .filter((account) => Number(account.balance) >= 1000000)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 5)
    .map((account) => account.owner)
    .join(', ');

  // 잔액순 정렬하기 (계좌생성순 → 잔액높은순 → 잔액낮은순)
  const [isSorted, setIsSorted] = useState('default'); // 기본 정렬값 default
  // 복사가 아님, 참조값 동일 → 사용하는 이유? 의미를 담은 변수명을 하나 더 만들기 위해서
  let displayAccounts = accounts;

  if (isSorted === 'desc') {
    // 잔액 높은순 (desc)
    displayAccounts = [...displayAccounts].sort(
      (a, b) => b.balance - a.balance,
    );
  } else if (isSorted === 'asc') {
    // 잔액 낮은순 (asc)
    displayAccounts = [...displayAccounts].sort(
      (a, b) => a.balance - b.balance,
    );
  }

  const sortByBalanceHandler = () => {
    if (isSorted === 'default') {
      setIsSorted('desc');
    } else if (isSorted === 'desc') {
      setIsSorted('asc');
    } else if (isSorted === 'asc') {
      setIsSorted('default');
    }
  };

  const sortLabels = {
    default: '↕ 계좌 개설순',
    desc: '↑ 잔액 높은순',
    asc: '↓ 잔액 높은순',
  };

  return (
    <section className={styles.accountTableSection}>
      <div className={styles.headerSection}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>전체 계좌</h2>
          <label className={styles.description}>
            문제 5 — sortByBalance(), getVipNames()
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <Button
            // 화살표 처리 조건부로 렌더링 처리하기..
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
          총 {accounts.length}개 계좌 · 모두 유효(every): {String(isAllVaild)}
        </span>
        <span className={styles.vipNames}>VIP(100만↑): {vipNames}</span>
      </footer>
    </section>
  );
}
