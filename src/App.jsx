import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import AccountForm from './components/AccountForm/AccountForm';
import AccountTable from './components/AccountTable/AccountTable';
import TransferForm from './components/TransferForm/TransferForm';
import HistoryList from './components/HistoryList/HistoryList';
import NotifyLog from './components/NotifyLog/NotifyLog';
import styles from './components/Header.module.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountNo, setSelectedAccountNo] = useState('');

  useEffect(() => {
    console.log(accounts);
    accounts.map((item) => console.log(typeof item.balance));
  }, [accounts]);

  return (
    <div className="app">
      {/* 상단 헤더 */}
      <header className={styles.headerSection}>
        <Header />
      </header>

      {/* 전체를 감싸는 컨테이너 */}
      <div className="container">
        {/* 1. 요약 통계 섹션 */}
        <section className="statsSection">
          <StatsGrid accounts={accounts} />
        </section>

        {/* 본문 컨텐츠 */}
        <main className="layout">
          {/* 2. 계좌 개설 섹션 */}
          <section className="accountFormSection">
            <AccountForm accounts={accounts} setAccounts={setAccounts} />
          </section>
          {/* 3. 입출금 섹션 */}
          <section className="transferFormSection">
            <TransferForm
              accounts={accounts}
              setAccounts={setAccounts}
              selectedAccountNo={selectedAccountNo}
            />
          </section>
          {/* 4. 생성된 전체 계좌 섹션 */}
          <section className="accountTableSection">
            <AccountTable
              accounts={accounts}
              setAccounts={setAccounts}
              selectedAccountNo={selectedAccountNo}
              setSelectedAccountNo={setSelectedAccountNo}
            />
          </section>

          {/* 5. 히스토리 영역 */}
          <section className="historySection">
            <HistoryList
              accounts={accounts}
              selectedAccountNo={selectedAccountNo}
            />
          </section>
          {/* 6. 알림 로그 영역 */}
          <section className="notifyLogSection">
            <NotifyLog />
          </section>
        </main>
      </div>
      {/* 모바일 전용 자리 */}
      {/*<BottomNav /> <FAB /> <BottomSheet />*/}
    </div>
  );
}

export default App;
