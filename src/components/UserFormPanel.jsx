import { useEffect, useState } from 'react';

const ROLES = ['COLLECTOR', 'MANAGER', 'ADMIN'];
const STATUSES = ['ACTIVE', 'INACTIVE'];

const emptyForm = {
  role: 'COLLECTOR',
  name: '',
  mobile: '',
  email: '',
  password: '',
  status: 'ACTIVE',
};

export default function UserFormPanel({ open, mode, initialData, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        role: initialData.role || 'COLLECTOR',
        name: initialData.name || '',
        mobile: initialData.mobile || '',
        email: initialData.email || '',
        password: '',
        status: initialData.status || 'ACTIVE',
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData, open]);

  if (!open) return null;

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="panel-overlay" onClick={onClose}>
      <form className="panel" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="panel__header">
          <h2>{mode === 'edit' ? 'Update user' : 'Create user'}</h2>
          <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel__body">
          <label className="field">
            <span>Full name</span>
            <input value={form.name} onChange={handleChange('name')} required placeholder="Jane Cooper" />
          </label>

          <label className="field">
            <span>Mobile number</span>
            <input value={form.mobile} onChange={handleChange('mobile')} required placeholder="9876543210" />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
              placeholder="jane@example.com"
            />
          </label>

          <label className="field">
            <span>{mode === 'edit' ? 'New password (optional)' : 'Password'}</span>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              required={mode !== 'edit'}
              placeholder="••••••••"
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Role</span>
              <select value={form.role} onChange={handleChange('role')}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Status</span>
              <select value={form.status} onChange={handleChange('status')}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="panel__footer">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Create user'}
          </button>
        </div>
      </form>
    </div>
  );
}
