import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import AccountForm from './components/AccountForm/AccountForm';
import AccountTable from './components/AccountTable/AccountTable';
import TransferForm from './components/TransferForm/TransferForm';
import HistoryList from './components/HistoryList/HistoryList';
import NotifyLog from './components/NotifyLog/NotifyLog';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountNo, setSelectedAccountNo] = useState('');

  useEffect(() => {
    console.log(accounts);
    accounts.map((item) => console.log(typeof item.balance));
  }, [accounts]);

  return (
    <div className="app">
      <Header />
      <section className="container">
        <StatsGrid accounts={accounts} />
        <main className="layout">
          <div className="leftCol">
            <AccountForm accounts={accounts} setAccounts={setAccounts} />
            <TransferForm
              accounts={accounts}
              setAccounts={setAccounts}
              selectedAccountNo={selectedAccountNo}
            />
          </div>
          <div className="rightCol">
            {' '}
            <AccountTable
              accounts={accounts}
              setAccounts={setAccounts}
              selectedAccountNo={selectedAccountNo}
              setSelectedAccountNo={setSelectedAccountNo}
            />
            <div className="bottomRow">
              <HistoryList
                accounts={accounts}
                selectedAccountNo={selectedAccountNo}
              />
              <NotifyLog />
            </div>
          </div>
        </main>
      </section>

      {/*<BottomNav /> <FAB /> <BottomSheet />*/}
    </div>
  );
}

export default App;
