import styles from './Header.module.css';
export default function Header() {
  return (
    <>
      <header>
        <div className={styles.section}>
          <div className={styles.logo}>₩</div>
          <div className={styles.title}>JS Bank</div>
          <span>은행 계좌 관리 시스템</span>
        </div>
        <div className={styles.section}>
          <div className={styles.today}>2026-09-10</div>
          <div className={styles.modeChip}>관리자 모드</div>
        </div>
      </header>
    </>
  );
}
