import styles from './TransferForm.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Toast';
import { useCallback, useState } from 'react';

const findAccount = (accounts, accountNo) => {
  return accounts.find((account) => account.accountNo === accountNo);
};

export default function TransferForm({ accounts, setAccounts }) {
  const [accountNo, setAccountNo] = useState();
  const [amount, setAmount] = useState();

  const accountNoChangeHandler = useCallback(({ target }) => {
    setAccountNo(target.value);
  }, []);

  const amountChangeHandler = useCallback(({ target }) => {
    setAmount(target.value);
  }, []);

  const depositHandler = useCallback(() => {
    const depositAmount = Number(amount);

    if (depositAmount <= 0 || isNaN(depositAmount)) {
      alert('0원 이상 입력 또는 문자열은 입력하실 수 없습니다.');
      return;
    }

    const findByAccountNo = findAccount(accounts, accountNo);

    if (findByAccountNo === undefined) {
      alert('존재하지 않는 계좌번호 입니다.');
      return;
    }

    setAccounts((prev) => {
      return prev.map((account) => {
        if (account === findByAccountNo) {
          return {
            ...account,
            balance: Number(account.balance) + depositAmount,
          };
        }
        return account;
      });
    });
    alert(`입금 성공! 현재 잔액이 반영되었습니다.`);
  }, [accounts, accountNo, amount, setAccounts]);

  const withdrawHandler = useCallback(() => {});

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>입금 · 출금</div>
          <span>문제 4 — deposit() / withdraw() 콜백</span>
        </div>
        <div className={styles.inputBox}>
          <Input label={'계좌번호'} onChange={accountNoChangeHandler} />
          <Input label={'금액'} onChange={amountChangeHandler} />
        </div>
        <div className={styles.buttonBox}>
          <Button
            label={'입금'}
            variant="success"
            clickEvent={depositHandler}
          />
          <Button
            label={'출금'}
            variant="danger"
            clickEvent={withdrawHandler}
          />
        </div>
        <Toast />
      </div>
    </>
  );
}
