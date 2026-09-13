import styles from './Input.module.css';

export default function Input({ label, value, onChange }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <input
          type="text"
          className={styles.value}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
