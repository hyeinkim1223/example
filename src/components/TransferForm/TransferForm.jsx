import styles from './TransferForm.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Toast from '../Form/Toast';
import { useEffect, useState } from 'react';

// ({ accounts, setAccounts })는 구조분해 할당으로 가져온 값
export default function TransferForm({ accounts, setAccounts }) {
  // accounts 배열 계좌번호와 입력한 계좌번호의 일치 여부 함수
  const findAccount = (accounts, accountNo) =>
    accounts.find((account) => account.accountNo === accountNo);

  const [accountNo, setAccountNo] = useState(); // 계좌번호 상태 변수
  const [amount, setAmount] = useState(); // 금액 상태 변수
  const [toast, setToast] = useState({
    // 토스트 상태 변수, 초기값 객체형
    isVisible: false,
    type: 'success',
    message: '',
  });
  const { type, message } = toast;

  // Toast 를 닫는 핸들러 함수
  const closeToastHandler = () => {
    // 이전값을 스프레드 연산자로 뿌려주고, 그중 isVisible 값만 false로 변경
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

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
      setToast({
        isVisible: true,
        type: 'fail',
        message: '존재하지 않는 계좌번호 입니다.',
      });
      return;
    }
    // 유효성 검사 2. 문자열 및 0 이하의 값
    if (transactionAmount <= 0 || isNaN(transactionAmount)) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: '0원 이상 입력, 문자열은 입력할 수 없습니다',
      });
      return;
    }
    // 유효성 검사 3. type 이 withdraw(출금) 이면서, 입력값이 더 큰 경우
    if (type === 'withdraw' && transactionAmount > findByAccountNo.balance) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: `출금 실패! 잔액 부족 (현재 ${findByAccountNo.balance.toLocaleString()}원)`,
      });
      return;
    }

    // 유효성 검사 4. 100억 초과 입력시 입력 제한 및 alert 실행
    if (amount > MAX_INIT_BALANCE) {
      setToast({
        isVisible: true,
        type: 'fail',
        message: `금액은 최대 100억 원까지만 가능합니다.`,
      });
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
    setToast({
      isVisible: true,
      type: 'success',
      message: `${typeKor} 성공! 현재 잔액이 반영되었습니다.`,
    });
    setAccountNo('');
    setAmount('');
  };

  // 토스트 노출 시 3초 후 자동 소멸 처리
  useEffect(() => {
    // isVisible 이 false 타이머 작동을 할 필요가 없음
    if (!toast.isVisible) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);

    // 컴포넌트 언마운트 또는 토스트 상태 변경 시 타이머 해제 (클린업 함수를 통한 메모리 누수 방지)
    return () => clearTimeout(timer);
  }, [toast.isVisible]); // [] 의존성 배열 안에 토스트가 보이는 유무에 따라 재실행

  return (
    <section className={styles.transferFormSection}>
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
        <Toast
          isVisible={toast.isVisible}
          message={message}
          type={type}
          onClose={closeToastHandler}
        />
      </div>
    </section>
  );
}
