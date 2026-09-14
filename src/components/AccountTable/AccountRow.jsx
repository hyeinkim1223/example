import styles from './AccountRow.module.css';
import './../Form/Badge.jsx';
import Badge from '../Form/Badge';

export default function AccountRow({ no, account, grade }) {
  const { owner, accountNo, balance } = account;

  return (
    <>
      <div className={styles.tableRowContent}>
        <div>{no}</div>
        <div>{owner}</div>
        <div>{accountNo}</div>
        <div>{balance.toLocaleString()}원</div>
        <Badge label={'잔액없음'} grade={'default'} />
        <div>조회 중</div>
      </div>
    </>
  );
}
