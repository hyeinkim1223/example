import styles from './TransferForm.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Toast';
import { useCallback, useState } from 'react';

// accounts 배열 계좌번호와 입력한 계좌번호의 일치 여부 함수
const findAccount = (accounts, accountNo) => {
  return accounts.find((account) => account.accountNo === accountNo);
};

// ({ accounts, setAccounts })는 구조분해 할당으로 가져온 값
export default function TransferForm({ accounts, setAccounts }) {
  const [accountNo, setAccountNo] = useState();
  const [amount, setAmount] = useState();
  const [toast, setToast] = useState({
    isVisible: false,
    type: 'success',
    message: '',
  });
  const { isVisible, type, message } = toast;

  const closeToastHandler = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const accountNoChangeHandler = useCallback(({ target }) => {
    setAccountNo(target.value);
  }, []);

  const amountChangeHandler = useCallback(({ target }) => {
    setAmount(target.value);
  }, []);

  const depositHandler = useCallback(() => {
    // target.value 로 받아온 값은 항상 문자열이기 때문에 Number() 로 변환
    const depositAmount = Number(amount);
    const findByAccountNo = findAccount(accounts, accountNo);

    // 유효성 검사 - 문자열 및 0 이상의 값
    if (depositAmount <= 0 || isNaN(depositAmount)) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: '0원 이상 입력, 문자열은 입력할 수 없습니다',
      });
      return;
    }
    // 유효성 검사 - 계좌번호 존재 여부
    if (findByAccountNo === undefined) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: '존재하지 않는 계좌번호 입니다.',
      });
      return;
    }

    // props 구조분해할당으로 accounts의 상태 변수
    setAccounts((prev) => {
      // 현재 accounts 값을 prev로 전달해줌 (accounts 배열 전체)
      return prev.map((account) => {
        // prev 배열 안의 계좌 객체를 하나씩 순서대로 꺼내옴
        if (account === findByAccountNo) {
          // account 배열 안 요소 중, 아까 find로 찾아둔 그 계좌 객체와 동일한 참조인지 확인
          return {
            // 해당 객체를 반환
            ...account, // 이전 값
            balance: Number(account.balance) + depositAmount, // 그중 balance의 값만 depositAmount 를 더해 반환
          };
        }
        return account; // 입금 대상 계좌가 아니면(=원본과 다른 참조면) 변경 없이 그대로 리턴
      });
    });
    setToast({
      isVisible: true,
      type: 'success',
      message: `입금 성공! 현재 잔액이 반영되었습니다.`,
    });
    setAccountNo('');
    setAmount('');
  }, [accounts, accountNo, amount, setAccounts]); // 의존성 배열: 이 배열 안의 값 중 하나라도 바뀌면, depositHandler 함수를 새로 만든다(재생성한다)

  const withdrawHandler = useCallback(() => {
    const withdrawAmount = Number(amount);
    const findByAccountNo = findAccount(accounts, accountNo);

    // 유효성 검사 - 계좌번호 존재 여부
    if (findByAccountNo === undefined) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: '존재하지 않는 계좌번호 입니다.',
      });
      return;
    }
    // 유효성 검사 - 입력값이 더 큰 경우
    if (withdrawAmount > findByAccountNo.balance) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: `출금 실패! 잔액 부족 (현재 ${findByAccountNo.balance.toLocaleString()}원)`,
      });
      return;
    }

    // props 구조분해할당으로 accounts의 상태 변수
    setAccounts((prev) => {
      // 현재 accounts 값을 prev로 전달해줌 (accounts 배열 전체)
      return prev.map((account) => {
        // prev 배열 안의 계좌 객체를 하나씩 순서대로 꺼내옴
        if (account === findByAccountNo) {
          // account 배열 안 요소 중, 아까 find로 찾아둔 그 계좌 객체와 동일한 참조인지 확인
          return {
            // 해당 객체를 반환
            ...account, // 이전 값
            balance: Number(account.balance) - withdrawAmount, // 그중 balance의 값만 withdrawAmount를 빼서 반환
          };
        }
        return account; // 입금 대상 계좌가 아니면(=원본과 다른 참조면) 변경 없이 그대로 리턴
      });
    });

    setToast({
      isVisible: true,
      type: 'success',
      message: `출금 성공! 현재 잔액이 반영되었습니다.`,
    });
    setAccountNo('');
    setAmount('');
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>입금 · 출금</div>
          <span>문제 4 — deposit() / withdraw() 콜백</span>
        </div>
        <div className={styles.inputBox}>
          <Input
            label={'계좌번호'}
            value={accountNo}
            onChange={accountNoChangeHandler}
          />
          <Input label={'금액'} value={amount} onChange={amountChangeHandler} />
        </div>
        <div className={styles.buttonBox}>
          <Button
            children={'입금'}
            variant="success"
            clickEvent={depositHandler}
          />
          <Button
            children={'출금'}
            variant="danger"
            clickEvent={withdrawHandler}
          />
        </div>
        {isVisible && (
          <Toast message={message} type={type} onClose={closeToastHandler} />
        )}
      </div>
    </>
  );
}
