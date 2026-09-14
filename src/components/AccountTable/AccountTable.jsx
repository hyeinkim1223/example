import styles from './AccountTable.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Toast';
import AccountRow from './AccountRow';

export default function AccountTable({ accounts, setAccounts, accountNo }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.titleBox}>
            <div className={styles.title}>전체 계좌</div>
            <span>문제 5 — sortByBalance(), getVipNames()</span>
          </div>
          <Button children={'↓ 잔액순 정렬'} variant="secondary" />
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
            />
          ))}
        </div>
        <div className={styles.tableFooter}>
          <div className={styles.totalAccount}>
            총 5개 계좌 · 모두 유효(every): true
          </div>
          <div className={styles.vipName}>VIP(100만↑): 최지우, 이영희</div>
        </div>
      </div>
    </>
  );
}
