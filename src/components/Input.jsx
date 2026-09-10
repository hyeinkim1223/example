import styles from './Input.module.css';

export default function Input() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>라벨</div>
        <input type="text" className={styles.value} />
      </div>
    </>
  );
}
