import styles from './AccountTable.module.css';
import Input from './Form/Input';
import Button from './Form/Button';
import Toast from './Toast';

export default function AccountTable() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.titleBox}>
            <div className={styles.title}>전체 계좌</div>
            <span>문제 5 — sortByBalance(), getVipNames()</span>
          </div>
          <div>잔액순 정렬</div>
        </div>
        <div className={styles.sortTable}>
          <table>
            <tr>
              <th>#</th>
              <th>예금주</th>
              <th>계좌번호</th>
              <th>잔액</th>
              <th>등급</th>
              <th></th>
            </tr>
            <tr>
              <td>1</td>
              <td>김철수</td>
              <td>110-1</td>
              <td>50,000원</td>
              <td>일반</td>
              <td>조회중</td>
            </tr>
          </table>
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
