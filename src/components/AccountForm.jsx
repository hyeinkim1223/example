import styles from './AccountForm.module.css';
import Input from './Input.jsx';
import Button from './Button';
export default function AccountForm() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>계좌 개설</div>
          <span>문제 1·2 — createAccount()</span>
        </div>
        <div className={styles.inputBox}>
          <Input />
          <Input />
          <Input />
        </div>
        <span>ⓘ 숫자가 아니거나 0 미만이면 잔액은 0원으로 개설됩니다.</span>
        <Button />
      </div>
    </>
  );
}
