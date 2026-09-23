import styles from './TransferForm.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Form/Toast';
import { useEffect, useState } from 'react';

export default function TransferForm({ accounts, setAccounts }) {
  const [accountNo, setAccountNo] = useState(''); // 계좌번호 상태 변수
  const [amount, setAmount] = useState(''); // 금액 상태 변수
  const [toasts, setToasts] = useState([]); // 토스트 상태 변수, 빈 배열 초기값

  const TOAST_MESSAGES = {
    INVALID_AMOUNT: {
      type: 'error',
      message: '0원 초과 입력, 문자는 입력할 수 없습니다.',
    },
    ACCOUNT_NOT_FOUND: {
      type: 'error',
      message: '존재하지 않는 계좌번호입니다.',
    },
    EXCEED_MAX: {
      type: 'error',
      message: '금액은 최대 100억 원까지만 가능합니다.',
    },
    INSUFFICIENT_BALANCE: {
      type: 'error',
      message: '출금 실패! 잔액 부족',
    },
  };

  // 토스트 추가 함수
  // addToast(TOAST_MESSAGES.ACCOUNT_NOT_FOUND) 를 실행하면, id 를 추가하여 객체 생성 후
  // 상태 변수에 배열에 추가
  const addToast = (toastData) => {
    const newToast = {
      // 이 단계에서
      // { id: , type: , message: } 값이 됨.
      id: Date.now(),
      ...toastData, // type과 message를 그대로 펼쳐서 복사
    };

    // 그 값을 배열에 추가
    setToasts((prev) => [...prev, newToast]);
  };

  // 토스트 닫기 함수
  // 지우고 싶은 고우 번호표(id)
  const removeToast = (id) => {
    // 현재 화면에 떠 있는 토스트 목록(prev 배열)을 꺼냄
    // 배열 안에 있는 id 랑 입력한 id 가 다른 것들만 새배열로 만들어라.
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // accounts 배열 계좌번호와 입력한 계좌번호의 일치 여부 함수
  const findAccount = (accounts, accountNo) =>
    accounts.find((account) => account.accountNo === accountNo);

  // 계좌번호 입력값 변경 핸들러
  const accountNoChangeHandler =
    // 입력값이 바뀌면 input 값이 accountNo 상태변수에 담김
    ({ target }) => {
      setAccountNo(target.value);
    };

  // 금액 입력값 변경 핸들러
  const amountChangeHandler = ({ target }) => {
    // 정규표현식을 사용하여 문자를 숫자로 변경
    // 숫자가 아닌 모든 숫자를 전체 대상으로 빈문자열로 바꾸라는 의미
    setAmount(target.value.replace(/[^0-9]/g, ''));
  };

  // 입출금 기능 통합 핸들러
  const transactionHandler = (type) => {
    const transactionAmount = Number(amount); //
    const findByAccountNo = findAccount(accounts, accountNo); // 일치한 계좌번호 변수에 담기
    const typeKor = type === 'deposit' ? '입금' : '출금';
    const MAX_INIT_BALANCE = 10_000_000_000; // 최대 입/출금액 한도(100억) 상수 정의

    // 유효성 검사 1. 계좌번호 존재 여부
    if (findByAccountNo === undefined) {
      addToast(TOAST_MESSAGES.ACCOUNT_NOT_FOUND);
      return;
    }
    // 유효성 검사 2. 문자열 및 0 이하의 값
    if (transactionAmount <= 0 || isNaN(transactionAmount)) {
      addToast(TOAST_MESSAGES.INVALID_AMOUNT);
      return;
    }
    // 유효성 검사 3. type 이 withdraw(출금) 이면서, 입력값이 더 큰 경우
    if (type === 'withdraw' && transactionAmount > findByAccountNo.balance) {
      addToast({
        type: 'error',
        message: `출금 실패! 잔액 부족 (현재 ${findByAccountNo.balance.toLocaleString()}원)`,
      });
      return;
    }
    // 유효성 검사 4. 100억 초과 입력시 입력 제한 및 alert 실행
    if (amount > MAX_INIT_BALANCE) {
      addToast(TOAST_MESSAGES.EXCEED_MAX);
      return;
    }

    // 유효성 검사가 마치게 되면 accounts 변수의 상태값을 변경
    setAccounts((prev) => {
      // 현재 accounts 값을 prev로 전달해줌 (accounts 배열 전체)
      return prev.map((account) => {
        // type 값으로 계산로직 변경
        const newBalance =
          type === 'deposit'
            ? account.balance + transactionAmount
            : account.balance - transactionAmount;

        // prev 배열 안의 계좌 객체를 하나씩 순서대로 꺼내옴
        if (account === findByAccountNo) {
          // account 배열 안 요소 중, 아까 find로 찾아둔 그 계좌 객체와 동일한 참조인지 확인
          return {
            // 해당 객체를 반환
            ...account, // 이전 값
            balance: newBalance,
            history: [
              ...account.history,
              {
                type: type,
                amount: transactionAmount,
                balance: newBalance,
              },
            ],
          };
        }
        return account; // 입금 대상 계좌가 아니면(=원본과 다른 참조면) 변경 없이 그대로 리턴
      });
    });
    addToast({
      type: 'success',
      message: `${typeKor} 성공! 현재 잔액이 반영되었습니다.`,
    });
    setAccountNo('');
    setAmount('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.title}>입금 · 출금</div>
        <label className={styles.description}>
          문제 4 — deposit() / withdraw() 콜백
        </label>
      </div>
      <div className={styles.inputGroup}>
        <Input
          label={'계좌번호'}
          value={accountNo}
          onChange={accountNoChangeHandler}
        />
        <Input label={'금액'} value={amount} onChange={amountChangeHandler} />
      </div>
      <div className={styles.buttonGroup}>
        <Button
          label={'입금'}
          variant="success"
          clickEvent={() => transactionHandler('deposit')}
        />
        <Button
          label={'출금'}
          variant="danger"
          clickEvent={() => transactionHandler('withdraw')}
        />
      </div>
      <div className={styles.toastArea}>
        {toasts.map((item) => (
          <Toast
            key={item.id}
            message={item.message}
            type={item.type}
            onClose={() => removeToast(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
