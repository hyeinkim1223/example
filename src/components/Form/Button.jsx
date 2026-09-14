import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary', // primary, success, danger, secondary
  disabled = false,
  clickEvent,
  type = 'button',
}) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={clickEvent}
    >
      {children}
    </button>
  );
}
