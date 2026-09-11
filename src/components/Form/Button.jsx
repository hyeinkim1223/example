import styles from './Button.module.css';

export default function Button({ label, variant = 'button', clickEvent }) {
  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${styles[variant]}`}
        onClick={clickEvent}
      >
        {label}
      </button>
    </>
  );
}
