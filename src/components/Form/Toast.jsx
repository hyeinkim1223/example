import styles from './Toast.module.css';
import { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  // 기본값으로 success 처리
  const isSuccess = type === 'success';

  // 토스트 노출 시 3초 후 자동 소멸 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // 컴포넌트 언마운트 또는 토스트 상태 변경 시 타이머 해제 (클린업 함수를 통한 메모리 누수 방지)
    return () => clearTimeout(timer);
  }, [onClose]); // [] 의존성 배열 안에 토스트가 보이는 유무에 따라 재실행

  return (
    <>
      <div className={styles.status}>
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
