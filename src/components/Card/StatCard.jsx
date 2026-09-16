import styles from './StatCard.module.css';

export default function StatCard({ label, value, sub, color }) {
  return (
    <>
      <div className={styles.statCard}>
        <div className={styles.statCardTitle}>{label}</div>
        <div className={`${styles.statCardValue} ${styles[color]}`}>
          {value}
        </div>
        <div className={styles.statCardSub}>{sub}</div>
      </div>
    </>
  );
}
