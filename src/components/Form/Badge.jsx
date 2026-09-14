import styles from './Badge.module.css';

export default function Badge({ label, grade }) {
  return <span className={`${styles.badge} ${styles[grade]}`}>{label}</span>;
}
