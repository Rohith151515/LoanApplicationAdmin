import { useState } from 'react';

const emptyForm = { name: '', phone: '', email: '' };

export default function CustomerFormPanel({ open, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(emptyForm);

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="panel-overlay" onClick={handleClose}>
      <form className="panel" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <div className="panel__header">
          <div>
            <h2>New customer</h2>
            <p className="panel__subtitle">Add a customer to the collection desk.</p>
          </div>
          <button type="button" className="panel__close" onClick={handleClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel__body">
          <label className="field">
            <span>Full name</span>
            <input value={form.name} onChange={handleChange('name')} required placeholder="John Doe" autoFocus />
          </label>
          <label className="field">
            <span>Phone number</span>
            <input value={form.phone} onChange={handleChange('phone')} required inputMode="tel" placeholder="9876543210" />
          </label>
          <label className="field">
            <span>Email address</span>
            <input type="email" value={form.email} onChange={handleChange('email')} required placeholder="john@example.com" />
          </label>
        </div>

        <div className="panel__footer">
          <button type="button" className="btn btn--ghost" onClick={handleClose}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create customer'}
          </button>
        </div>
      </form>
    </div>
  );
}
