import styles from './Toast.module.css';

export default function Toast() {
  return (
    <>
      <div className={styles.status}>
        <div className={styles.statusIcon}>✔</div>
        <div className={styles.StatusMessage}>
          거래 결과 메시지가 표시됩니다.
        </div>
        <div className={styles.closeIcon}>✕</div>
      </div>
    </>
  );
}
