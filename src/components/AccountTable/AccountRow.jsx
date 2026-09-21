import styles from './AccountRow.module.css';
import './../Form/Badge.jsx';
import Badge from '../Form/Badge';

export default function AccountRow({
  no,
  account,
  selectedAccountNo,
  setSelectedAccountNo,
}) {
  const { owner, accountNo, balance } = account;
  let label = '';
  let grade = '';

  // 금액별 등급 조건부 렌더링
  if (balance <= 0) {
    label = '잔액없음';
    grade = 'empty';
  } else if (balance >= 1000000) {
    label = 'VIP';
    grade = 'vip';
  } else {
    label = '일반';
    grade = 'default';
  }

  // 계좌번호 일치 여부 확인
  const isSelected = accountNo === selectedAccountNo;

  // 선택된 계좌
  const selectedHandler = () => {
    setSelectedAccountNo(accountNo);
  };

  return (
    <>
      <div className={styles.tableRowContent} onClick={selectedHandler}>
        <div>{no}</div>
        <div>{owner}</div>
        <div>{accountNo}</div>
        <div>{balance.toLocaleString()}원</div>
        <Badge label={label} grade={grade} />
        <div className={isSelected ? styles.selected : styles.noSelected}>
          {isSelected ? '조회중' : '조회'}
        </div>
      </div>
    </>
  );
}
