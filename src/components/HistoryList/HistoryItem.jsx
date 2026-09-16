import styles from './HistoryItem.module.css';

export default function HistoryItem({ history, index }) {
  const { type, amount, balance } = history;

  // 하나의 이용자 객체를 가져와
  const sign = type === 'deposit' ? '+' : '-'; // 객체의 type이 deposit이면 + 아니면 -
  const typeKor = type === 'deposit' ? '입금' : '출금'; // type이 deposit이면 입금 아니면 출금
  const amountStr = `${sign}${amount.toLocaleString()}원`; // type으로 결정된 등호와 히스토리에 있는 금액을 출력
  const balanceStr = `${balance.toLocaleString()}원`; // 히스토리에 있는 입출금후 금액 출력
  const amountColor =
    type === 'deposit' ? `${styles.deposit}` : `${styles.withdraw}`;
  const arrowStr = type === 'deposit' ? '↓' : '↑';
  const arrowColor =
    type === 'deposit' ? `${styles.depositBg}` : `${styles.withdrawBg}`;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flexArea}>
          <div className={`${styles.icon} ${arrowColor}`}>{arrowStr}</div>
          <div className={styles.infoArea}>
            <div className={styles.title}>{typeKor}</div>
            <div className={styles.date}>
              {new Date().toISOString().slice(0, 10)}
            </div>
          </div>
          <div className={styles.amountArea}>
            <div className={`${styles.amount} ${amountColor}`}>{amountStr}</div>
            <div className={styles.after}>잔액 {balanceStr}</div>
          </div>
        </div>
      </div>
    </>
  );
}
