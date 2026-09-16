import styles from './HistoryList.module.css';
import Button from '../Form/Button';
import HistoryItem from './HistoryItem';
import { useState } from 'react';

export default function HistoryList({ accounts, selectedAccountNo }) {
  // accounts 전체 계좌 배열에서 선택한 계좌번호와 일치한 계좌 정보 조회
  const selectedAccount = accounts.find(
    (account) => account.accountNo === selectedAccountNo,
  );

  // 최근 2건 보기 상태 변수
  const [isRecentTwoOnly, setIsRecentTwoOnly] = useState(false);

  // 탭메뉴 상태 변수
  let [selectedTab, setSelectedTab] = useState('all');

  function filteredHistory() {
    // 찾은 계좌 정보의 history 또는 빈배열을 filteredList 에 변수로 담기
    let filteredList = selectedAccount?.history || [];

    // 만약 선택한 탭이 all이 아니라면
    if (selectedTab !== 'all') {
      // filteredList 배열 안에 있는 type과 선택한 selectedTab 과 값이 일치하면 다시 filteredList에 덮어쓰기
      filteredList = filteredList.filter(
        (record) => record.type === selectedTab,
      );
    }

    // isRecentTwoOnly가 true인 경우 배열 뒤에서 2개만 배열에 담기
    if (isRecentTwoOnly) {
      filteredList = filteredList.slice(-2);
    }

    // 원본 불변성 유지를 위해 복사본을 역순 정렬하여 최신순이 위로 올라오게
    filteredList = [...filteredList].reverse();

    return filteredList;
  }

  // getHistoryByType(account, type) : 입금 또는 출금 내역만 반환 (filter)
  function getHistoryByType(account, type) {
    // account가 없거나 history가 없으면 빈 배열 반환
    if (!account || !account.history) return [];
    // 계좌 객체 안의 history 배열에서, 입력한 type과 일치하는 내역 객체들만 모아 새 배열로 반환

    // 2. 2건 검사해서 result 갱신
    if (isRecentTwoOnly) {
      return account.history.slice(-2).filter((record) => record.type === type);
    }
    return account.history.filter((record) => record.type === type);
  }

  // getTotalByType(account, type) : 타입별 총액 반환
  function getTotalByType(historyList, type) {
    // getHistoryByType으로 걸러낸 특정 타입 내역 배열을 targetHistory에 담음
    let targetHistory = getHistoryByType(historyList, type);

    return targetHistory.reduce((total, record) => {
      // 각 내역의 amount(금액)를 누적 합산
      return total + record.amount;
    }, 0); // 초기값 0원부터 시작 (내역이 없으면 0원 안전하게 반환)
  }

  const totalDeposit = getTotalByType(selectedAccount, 'deposit'); // 총 입금액을 출력하는 함수 호출
  const totalWithdraw = getTotalByType(selectedAccount, 'withdraw'); // 총 출금액을 출력하는 함수 호출

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.titleBox}>
            <div className={styles.title}>거래내역</div>
            <span>
              {selectedAccount ? selectedAccount.owner : '이름'} ·{' '}
              {selectedAccount ? selectedAccount.accountNo : '계좌번호'}
            </span>
          </div>
          <div className={styles.filterTab}>
            <button
              type="button"
              className={selectedTab === 'all' ? styles.active : ''}
              onClick={() => setSelectedTab('all')}
            >
              전체
            </button>
            <button
              type="button"
              className={selectedTab === 'deposit' ? styles.active : ''}
              onClick={() => setSelectedTab('deposit')}
            >
              입금
            </button>
            <button
              type="button"
              className={selectedTab === 'withdraw' ? styles.active : ''}
              onClick={() => setSelectedTab('withdraw')}
            >
              출금
            </button>
          </div>
        </div>
        <div className={styles.items}>
          {/* isRecentTwoOnly : true 면 slice(-2) 해주기 */}
          {filteredHistory().map((historyItem, index) => {
            return (
              <HistoryItem key={index} history={historyItem} index={index} />
            );
          })}
        </div>
        <div className={styles.summary}>
          <div>총 입금 {totalDeposit.toLocaleString()}원</div>
          <p>/</p>
          <div>총 출금 {totalWithdraw.toLocaleString()}원</div>
          {/* isRecentTwoOnly : true 면 최근2건보기 active 처리하기 */}
          <div onClick={() => setIsRecentTwoOnly((prev) => !prev)}>
            {isRecentTwoOnly ? '전체 거래내역 보기' : '최근 2건 보기'}
          </div>
        </div>
      </div>
    </>
  );
}
