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

  // 예금주
  const ownerChangeHandler = ({ target }) => {
    setOwner(target.value);
  };

  // 계좌번호
  const accountNoChangeHandler = ({ target }) => {
    setAccountNo(target.value);
  };

  // 초기 입금액
  const balanceChangeHandler = ({ target }) => {
    // 정규표현식을 사용하여 문자를 숫자로 변경
    // 숫자가 아닌 모든 숫자를 전체 대상으로 빈문자열로 바꾸라는 의미
    setBalance(target.value.replace(/[^0-9]/g, ''));
  };

  // 계좌 개설 핸들러
  const accountSubmitHandler = () => {
    let validBalance = Number(balance);

    // owner, accountNo, balance, history(초기 빈배열) 로 객체 생성
    const newAccount = { owner, accountNo, balance: validBalance, history: [] };

    // 유효성 검사 1. input에 값이 하나라도 없을 경우 alert 실행
    if (!owner || !accountNo || !balance) {
      alert('값을 모두 입력해주세요');
      return;
    }

    // 유효성 검사 2. 초기입금액이 문자열 또는 0원 미만일 때 0원으로 처리
    // * 문제점 : 초기 입금액 input에 애초에 숫자외에 입력이 안되게 처리함 (balanceChangeHandler 함수)

    // 문자열이거나, 0원 미만이면 0원으로 입력
    if (validBalance < 0 || isNaN(validBalance)) {
      validBalance = 0;
    }

    // 유효성 검사 3. 이미 있는 계좌번호 유무 검증
    if (
      accounts.some((account) => account.accountNo === newAccount.accountNo)
    ) {
      alert('이미 존재하는 계좌번호입니다.');
      return;
    }

    // 유효성 검사 4. 100억 이상 입력시 입력 제한 및 alert 실행
    if (balance > 10_000_000_000) {
      return alert('초기 입금액은 최대 100억 원까지만 가능합니다.');
    }

    // setAccounts 함수를 사용해 생성된 객체를 ... 스프레드 문법으로 이전 배열에 추가하여 새배열 반환
    setAccounts((prev) => [...prev, newAccount]);
    setOwner('');
    setAccountNo('');
    setBalance('');
  };

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
