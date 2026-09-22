import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.headerSection}>
      <div className={styles.section}>
        <div className={styles.logo}>₩</div>
        <div className={styles.brandTitle}>JS Bank</div>
        <h1 className={styles.subTitle}>은행 계좌 관리 시스템</h1>
      </div>
      <div className={styles.section}>
        <time className={styles.today}>
          {new Date().toISOString().slice(0, 10)}
        </time>
        <span className={styles.modeChip}>관리자 모드</span>
      </div>
    </header>
  );
}
