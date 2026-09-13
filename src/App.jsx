import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import AccountForm from './components/AccountForm/AccountForm';
import AccountTable from './components/AccountTable';
import TransferForm from './components/TransferForm/TransferForm';
import HistoryList from './components/HistoryList';
import NotifyLog from './components/NotifyLog';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountNo, setSelectedAccountNo] = useState([]);
  const [amountInput, setAmountInput] = useState([]);

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  return (
    <div className="app">
      <Header />
      <section className="container">
        <StatsGrid />
        <main className="layout">
          <AccountForm accounts={accounts} setAccounts={setAccounts} />
          <TransferForm accounts={accounts} setAccounts={setAccounts} />
          <AccountTable />
          <HistoryList />
          <NotifyLog />
        </main>
      </section>

      {/*<BottomNav /> <FAB /> <BottomSheet />*/}
    </div>
  );
}

export default App;
