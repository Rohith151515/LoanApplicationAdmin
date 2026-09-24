import { Link } from 'react-router-dom';
import CashierSidebar from '../components/CashierSidebar';
import { useAuth } from '../context/AuthContext';

export default function CashierDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || user?.mobile || 'Cashier';

  return (
    <div className="app-shell">
      <CashierSidebar />
      <main className="main">
        <header className="main__header">
          <div>
            <p className="eyebrow">Cashier workspace</p>
            <h1>Welcome, {displayName}</h1>
            <p className="main__subtitle">Your daily counter workspace is ready.</p>
          </div>
          <span className="role role--collector">CASHIER</span>
        </header>

        <section className="cashier-welcome">
          <div>
            <span className="cashier-welcome__label">Today</span>
            <h2>Ready for your first transaction</h2>
            <p>Use this workspace for cashier operations. Transaction and collection tools will appear here when their API endpoints are connected.</p>
          </div>
          <div className="cashier-welcome__mark">₹</div>
        </section>

        <section className="stat-grid cashier-stat-grid">
          <div className="stat-card">
            <span className="stat-card__label">Account status</span>
            <span className="stat-card__value">Active</span>
            <span className="muted">You are signed in</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Role</span>
            <span className="stat-card__value">Cashier</span>
            <span className="muted">Counter access</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Mobile</span>
            <span className="stat-card__value stat-card__value--compact">{user?.mobile || 'Not available'}</span>
            <span className="muted">Registered contact</span>
          </div>
        </section>

        <section className="panel-card cashier-next-step">
          <div>
            <h2>Next step</h2>
            <p className="muted">Cashier transactions are not included in the current API collection yet.</p>
          </div>
          <Link to="/" className="btn btn--ghost">Back to home</Link>
        </section>
      </main>
    </div>
  );
}