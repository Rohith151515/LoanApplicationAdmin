import { useState } from 'react';
import CashierSidebar from '../components/CashierSidebar';
import CustomerFormPanel from '../components/CustomerFormPanel';
import { createCustomer } from '../api/customerApi';
import { useToast } from '../context/ToastContext';

export default function CashierCollections() {
  const [customerOpen, setCustomerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useToast();

  const handleCreateCustomer = async (payload) => {
    setSubmitting(true);
    try {
      await createCustomer(payload);
      notify('Customer created', 'success');
      setCustomerOpen(false);
    } catch (err) {
      notify(err.message || 'Could not create customer', 'error');
    } finally {
      setSubmitting(false);
    }
  };

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
          <button className="btn btn--primary" type="button" onClick={() => setCustomerOpen(true)}>
            + New customer
          </button>
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
      <CustomerFormPanel
        open={customerOpen}
        onClose={() => setCustomerOpen(false)}
        onSubmit={handleCreateCustomer}
        submitting={submitting}
      />
    </div>
  );
}