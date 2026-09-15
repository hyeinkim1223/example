import styles from './HistoryList.module.css';
import Button from '../Form/Button';
import HistoryItem from './HistoryItem';

export default function historyList({ accounts, selectedAccountNo }) {
  // accounts 전체 계좌 배열에서 선택한 계좌번호와 일치한 계좌 정보 조회
  const selectedAccount = accounts.find(
    (account) => account.accountNo === selectedAccountNo,
  );
  // selectedAccount 에 type이 deposit일 때, amount 집계
  // reduce() 함수 사용 -> 변수 처리 -> 사용

  // selectedAccount 에 type이 withdraw일 때, amount 집계
  // reduce() 함수 사용
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.titleBox}>
            <div className={styles.title}>거래내역</div>
            <span>
              {selectedAccount ? selectedAccount.owner : '이름'} ·{' '}
              {selectedAccount ? selectedAccount.accountNo : '계좌번호'}
            </span>
          </div>
          <div className={styles.filterTab}>
            <button type="button" className={styles.active}>
              전체
            </button>
            <button type="button">입금</button>
            <button type="button">출금</button>
          </div>
        </div>
        <div className={styles.items}>
          {selectedAccount?.history?.map((historyItem, index) => {
            console.log(historyItem);
            return (
              <HistoryItem key={index} history={historyItem} index={index} />
            );
          })}
        </div>
        <div className={styles.summary}>
          <div>총 입금 40,000원</div>
          <div>총 출금 40,000원</div>
          <div>최근 2건 보기</div>
        </div>
      </div>
    </>
  );
}
