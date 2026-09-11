import styles from './Input.module.css';

export default function Input({
  label,
  value,
  onChange,
  isError,
  onBlur,
  errorMessage,
  placeholder,
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <input
          type="text"
          className={`${styles.value} ${isError ? styles.danger : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={isError ? errorMessage : placeholder}
        />
      </div>
    </>
  );
}
