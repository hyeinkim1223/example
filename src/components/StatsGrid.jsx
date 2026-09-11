import styles from './StatsGrid.module.css';
import StatCard from './Card/StatCard';

export default function StatsGrid() {
  return (
    <>
      <div className={styles.titleArea}>
        <div className={styles.title}>대시보드</div>
        <span>계좌를 개설하고 입금·출금·거래내역을 관리합니다.</span>
      </div>
      <div className={styles.statsGrid}>
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </div>
    </>
  );
}
