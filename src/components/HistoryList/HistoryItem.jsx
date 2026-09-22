import styles from './HistoryItem.module.css';

export default function HistoryItem({ history, index }) {
  const { type, amount, balance } = history;

  const sign = type === 'deposit' ? '+' : '-'; // 객체의 type이 deposit이면 + 아니면 -
  const typeKor = type === 'deposit' ? '입금' : '출금'; // type이 deposit이면 입금 아니면 출금
  const amountStr = `${sign}${amount.toLocaleString()}원`; // type으로 결정된 등호와 히스토리에 있는 금액을 출력
  const balanceStr = `${balance.toLocaleString()}원`; // 히스토리에 있는 입출금후 금액 출력
  const amountColor =
    type === 'deposit' ? `${styles.deposit}` : `${styles.withdraw}`; // 입출금액에 따라 색상변경
  const arrowStr = type === 'deposit' ? '↓' : '↑'; // 입출금액에 따라 화살표 텍스트 변경
  const arrowColor =
    type === 'deposit' ? `${styles.depositBg}` : `${styles.withdrawBg}`; //입출금액에 따라 아이콘 배경색 변경

  return (
    <li className={styles.HistoryItem}>
      <div className={styles.content}>
        <div className={`${styles.icon} ${arrowColor}`}>{arrowStr}</div>
        <div className={styles.infoGroup}>
          <span className={styles.title}>{typeKor}</span>
          <time className={styles.date}>
            {new Date().toISOString().slice(0, 10)}
          </time>
        </div>
        <div className={styles.amountGroup}>
          <span className={`${styles.amount} ${amountColor}`}>{amountStr}</span>
          <span className={styles.after}>잔액 {balanceStr}</span>
        </div>
      </div>
    </li>
  );
}
