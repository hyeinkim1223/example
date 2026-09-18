import styles from './Toast.module.css';

export default function Toast({ message, type, onClose, isVisible }) {
  // 기본값으로 success 처리
  const isSuccess = type === 'success';

  return (
    <>
      <div className={`${styles.status} ${isVisible ? styles.visible : ''}`}>
        <div
          className={`${styles.statusIcon} ${isSuccess ? styles.success : styles.fail}`}
        >
          {isSuccess ? '✔' : '!'}
        </div>
        <div className={styles.statusMessage}>{message}</div>
        <div className={styles.closeIcon} onClick={onClose}>
          ✕
        </div>
      </div>
    </>
  );
}
