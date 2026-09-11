import styles from './StatCard.module.css';

export default function StatCard() {
  return (
    <>
      <div className={styles.statCard}>
        <div className={styles.statCardTitle}>총 계좌 수</div>
        <div className={styles.statCardValue}>5개</div>
        <div className={styles.statCardSub}>오늘 +1 개설</div>
      </div>
    </>
  );
}
