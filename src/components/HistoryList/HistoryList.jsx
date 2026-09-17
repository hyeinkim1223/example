import styles from './HistoryList.module.css';
import Button from '../Form/Button';
import HistoryItem from './HistoryItem';
import { useState } from 'react';

export default function HistoryList({ accounts, selectedAccountNo }) {
  // accounts 전체 계좌 배열에서 선택한 계좌번호와 일치한 계좌 정보 조회
  // 방금 바뀐 setSelectedAccountNo 을 가지고 일치하는 계좌 1개를 꺼내옴!!
  const selectedAccount = accounts.find(
    (account) => account.accountNo === selectedAccountNo,
  );

  // 최근 2건 보기 상태 변수
  const [isRecentTwoOnly, setIsRecentTwoOnly] = useState(false);

  // 탭메뉴 상태 변수
  let [selectedTab, setSelectedTab] = useState('all');

  // 탭메뉴, 최근 2건 보기 통합 필터 기능
  const filteredHistory = () => {
    // 선택된 계좌의 거래내역(history)의 배열 또는 빈 배열을 filterList에 할당
    /* history 배열, 없을 시 [] 빈 배열로 처리
    [{ type: 'deposit', amount: 30000, balance: 30000 },
      { type: 'withdraw', amount: 10000, balance: 20000 }]
     */
    let filteredList = selectedAccount?.history || [];

    // 만약 선택한 탭이 all이 아니라면
    if (selectedTab !== 'all') {
      // filteredList 배열 안에 있는 type과 선택한 selectedTab 과 값이 일치하면 다시 filteredList에 덮어쓰기
      filteredList = filteredList.filter(
        (record) => record.type === selectedTab,
      );
    }

    // isRecentTwoOnly가 true인 경우 배열 뒤에서 2개만 배열에 담기
    // 그러나, 초기값이 false 니까 최근 2건 보기 처리가 되지않음.
    if (isRecentTwoOnly) {
      filteredList = filteredList.slice(-2);
    }

    // 원본 불변성 유지를 위해 복사본을 역순 정렬하여 최신순이 위로 올라오게
    filteredList = [...filteredList].reverse();

    return filteredList;
  };

  // 입출금 타입별 총액 반환
  const getTotalAmountByType = (filteredList, type) => {
    return (
      filteredList
        // 필터링된 배열 중 인자로 받은 타입과 일치하는지 확인
        .filter((record) => record.type === type)
        // 필터링된 금액을 합산
        .reduce((total, record) => {
          // 각 내역의 amount(금액)를 누적 합산
          return total + record.amount;
        }, 0)
    ); // 초기값 0원부터 시작 (내역이 없으면 0원 안전하게 반환)
  };

  // 필터링된 배열과 type을 인자값으로 전달해서 입출금 총액 계산
  const totalDeposit = getTotalAmountByType(filteredHistory(), 'deposit');
  const totalWithdraw = getTotalAmountByType(filteredHistory(), 'withdraw');

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
          <div onClick={() => setIsRecentTwoOnly((prev) => !prev)}>
            {isRecentTwoOnly ? '전체보기' : '최근 2건 보기'}
          </div>
        </div>
      </div>
    </>
  );
}
