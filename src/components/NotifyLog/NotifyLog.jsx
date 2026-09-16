import styles from '../NotifyLog/NotifyLog.module.css';
import Chip from '../Form/Chip';

export default function NotifyLog() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>알림 로그</div>
          <span>문제 10 — on(event, callback) 구독</span>
        </div>
        <div className={styles.subscriptions}>{/*<Chip />*/}</div>
        <div className={styles.consolePanel}>
          <div>[SMS] 김철수 입금 5,000원 (잔액 25,000원)</div>
          <div>[PUSH] 김철수 출금 20,000원 (잔액 5,000원)</div>
          <div>[!] 김철수님 잔액이 5,000원 입니다.</div>
          <div>[SMS] 구독 해제됨 — off() 호출</div>
        </div>
      </div>
    </>
  );
}
