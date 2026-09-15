import styles from './AccountTable.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Toast';
import AccountRow from './AccountRow';

export default function AccountTable({
  accounts,
  setAccounts,
  accountNo,
  owner,
}) {
  const isAllVaild =
    accounts.length > 0 && // 배열에 길이가 0보다 크고
    // every() : 배열 내 하나라도 만족하지 않으면 false
    accounts.every((account) => {
      // 계좌번호가 빈칸이 아니면 true, 예금주도 빈칸이 아니면 true
      return accountNo !== '' && owner !== '';
    });
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
            총 {accounts.length}개 계좌 · 모두 유효(every): {String(isAllVaild)}
          </div>
          <div className={styles.vipName}>VIP(100만↑): 최지우, 이영희</div>
        </div>
      </div>
    </>
  );
}
