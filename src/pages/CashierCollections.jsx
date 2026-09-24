import CashierSidebar from '../components/CashierSidebar';

export default function CashierCollections() {
  return (
    <div className="app-shell">
      <CashierSidebar />
      <main className="main">
        <header className="main__header">
          <div>
            <p className="eyebrow">Cashier desk</p>
            <h1>Collections</h1>
            <p className="main__subtitle">Track money collected during your shift.</p>
          </div>
          <span className="cashier-page-icon">◷</span>
        </header>

        <section className="stat-grid cashier-stat-grid">
          <div className="stat-card">
            <span className="stat-card__label">Today&apos;s collection</span>
            <span className="stat-card__value">₹0</span>
            <span className="muted">No collection records</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Completed</span>
            <span className="stat-card__value">0</span>
            <span className="muted">Successful collections</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Pending</span>
            <span className="stat-card__value">0</span>
            <span className="muted">Awaiting settlement</span>
          </div>
        </section>

        <section className="panel-card cashier-empty-state cashier-empty-state--short">
          <h2>Collection history</h2>
          <p className="muted">Your collection history will appear here after the collection endpoint is available.</p>
        </section>
      </main>
    </div>
  );
}