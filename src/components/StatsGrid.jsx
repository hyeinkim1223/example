import styles from './StatsGrid.module.css';
import StatCard from './Card/StatCard';

export default function StatsGrid({ accounts }) {
  // 총 합계
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0,
  );
  // 평균 (만약 배열에 값이 없으면 NaN이 나오기 때문에, 기본값 1로 처리)
  const averageBalance = totalBalance / (accounts.length || 1);

  return (
    <>
      <div className={styles.titleArea}>
        <div className={styles.title}>대시보드</div>
        <span>계좌를 개설하고 입금·출금·거래내역을 관리합니다.</span>
      </div>
      <div className={styles.statsGrid}>
        <StatCard
          label={'총 계좌 수'}
          value={`${accounts.length}개`}
          sub={`오늘 +${accounts.length} 개설`}
          color={'blue'}
        />
        <StatCard
          label={'전체 잔액'}
          value={`${totalBalance.toLocaleString()}원`}
          sub={'reduce 합계'}
        />
        <StatCard
          label={'평균 잔액'}
          value={`${averageBalance.toLocaleString()}원`}
          sub={'전체 잔액 ÷ 계좌 수'}
        />
        <StatCard
          label={'VIP 계좌'}
          value={`${accounts.filter((account) => account.balance >= 1000000).length}개`}
          sub={'잔액 100만 원 이상'}
          color={'gold'}
        />
      </div>
    </>
  );
}
