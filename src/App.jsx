import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import AccountForm from './components/AccountForm';
import AccountTable from './components/AccountTable';
import TransferForm from './components/TransferForm';
import HistoryList from './components/HistoryList';
import NotifyLog from './components/NotifyLog';

// const [accounts, setAccounts] = useState([]);
// const [selectedAccountNo, setSelectedAccountNo] = useState('');
// const [amountInput, setAmountInput] = useState('');

function App() {
  return (
    <div className="app">
      <Header />
      <section className="container">
        <StatsGrid />
        <main className="layout">
          <AccountForm />
          <TransferForm />
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
