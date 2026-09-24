import CashierSidebar from '../components/CashierSidebar';

export default function CashierTransactions() {
  return (
    <div className="app-shell">
      <CashierSidebar />
      <main className="main">
        <header className="main__header">
          <div>
            <p className="eyebrow">Cashier desk</p>
            <h1>Transactions</h1>
            <p className="main__subtitle">Review and process today&apos;s counter transactions.</p>
          </div>
          <span className="cashier-page-icon">↗</span>
        </header>

        <section className="panel-card cashier-empty-state">
          <div className="cashier-empty-state__icon">₹</div>
          <h2>No transactions yet</h2>
          <p className="muted">Transaction records will appear here when the cashier transaction API is connected.</p>
          <button className="btn btn--primary" type="button" disabled>New transaction</button>
        </section>
      </main>
    </div>
  );
}