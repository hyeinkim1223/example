import styles from './Input.module.css';

export default function Input({ label, onChange }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <input type="text" className={styles.value} onChange={onChange} />
      </div>
    </>
  );
}
