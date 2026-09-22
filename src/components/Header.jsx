import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.section}>
          <p className={styles.logo}>₩</p>
          <h1 className={styles.brandTitle}>JS Bank</h1>
          <h1 className={styles.subTitle}>은행 계좌 관리 시스템</h1>
        </div>
        <div className={styles.section}>
          <time className={styles.today}>
            {new Date().toISOString().slice(0, 10)}
          </time>
          <span className={styles.modeChip}>관리자 모드</span>
        </div>
      </div>
    </div>
  );
}
