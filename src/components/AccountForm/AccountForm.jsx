import styles from './AccountForm.module.css';
import Input from '../Form/Input.jsx';
import Button from '../Form/Button';
import { useCallback, useEffect, useState } from 'react';
export default function AccountForm({ accounts, setAccounts }) {
  const [owner, setOwner] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [balance, setBalance] = useState('');

  // 예금주 이름의 상태 확인 함수
  // useEffect(() => {
  //   console.log(owner);
  // }, [owner]);

  const ownerChangeHandler = useCallback(({ target }) => {
    setOwner(target.value);
  }, []);

  const accountNoChangeHandler = useCallback(({ target }) => {
    setAccountNo(target.value);
  }, []);

  const balanceChangeHandler = useCallback(({ target }) => {
    setBalance(target.value);
  }, []);

  const accountSubmitHandler = useCallback(() => {
    let validBalance = Number(balance);

    if (validBalance < 0 || isNaN(validBalance)) {
      validBalance = 0;
    }

    if (!owner || !accountNo || !balance) {
      alert('값을 모두 입력해주세요');
      return;
    }

    // owner, accountNo, balance 로 객체 만들기
    const newAccount = { owner, accountNo, balance: validBalance };

    if (
      accounts.some((account) => account.accountNo === newAccount.accountNo)
    ) {
      alert('이미 존재하는 계좌번호입니다.');
      return;
    }

    // setAccounts 함수를 사용해 생성된 객체를 ... 스프레드 문법으로 이전 배열에 추가하여 새배열 반환
    setAccounts((prev) => [...prev, newAccount]);
    setOwner('');
    setAccountNo('');
    setBalance('');
  }, [accounts, owner, accountNo, balance, setAccounts]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>계좌 개설</div>
          <span>문제 1·2 — createAccount()</span>
        </div>
        <div className={styles.inputBox}>
          <Input
            label={'예금주 이름'}
            value={owner}
            onChange={ownerChangeHandler}
          />
          <Input
            label={'계좌번호'}
            value={accountNo}
            onChange={accountNoChangeHandler}
          />
          <Input
            label={'초기 입금액'}
            value={balance}
            onChange={balanceChangeHandler}
          />
        </div>
        <span>ⓘ 숫자가 아니거나 0 미만이면 잔액은 0원으로 개설됩니다.</span>
        <Button
          label={'계좌 개설'}
          variant="primary"
          clickEvent={accountSubmitHandler}
        />
        {/* const props = {variant : "", clickEvent : ()=>{};}  */}
      </div>
    </>
  );
}
