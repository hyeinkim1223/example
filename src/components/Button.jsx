import styles from './Button.module.css';

export default function Button() {
  return (
    <>
      <button type="button" className={styles.button}>
        버튼
      </button>
    </>
  );
}
