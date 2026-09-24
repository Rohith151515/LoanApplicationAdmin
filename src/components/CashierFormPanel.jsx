import { useEffect, useState } from 'react';

const emptyForm = {
  user_id: '',
  address: '',
  aadhaar_number: '',
  aadhaar_photo: '',
  guarantor_name: '',
  guarantor_mobile: '',
  guarantor_address: '',
  guarantor_aadhaar_number: '',
  guarantor_aadhaar_photo: '',
};

export default function CashierFormPanel({ open, users, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) setForm({ ...emptyForm, user_id: users[0]?.id || users[0]?._id || '' });
  }, [open, users]);

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="panel-overlay" onClick={onClose}>
      <form className="panel" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <div className="panel__header">
          <div>
            <h2>Create cashier</h2>
            <p className="panel__subtitle">Store cashier KYC and guarantor details.</p>
          </div>
          <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel__body">
          <label className="field">
            <span>User</span>
            <select value={form.user_id} onChange={handleChange('user_id')} required>
              <option value="" disabled>Select a user</option>
              {users.map((user) => {
                const id = user.id || user._id;
                return (
                  <option key={id} value={id}>
                    {user.name || user.mobile || id} ({id})
                  </option>
                );
              })}
            </select>
          </label>

          <label className="field">
            <span>Address</span>
            <textarea value={form.address} onChange={handleChange('address')} required placeholder="123 Main Street, Chennai" />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Aadhaar number</span>
              <input value={form.aadhaar_number} onChange={handleChange('aadhaar_number')} required inputMode="numeric" maxLength={12} />
            </label>
            <label className="field">
              <span>Aadhaar photo</span>
              <input value={form.aadhaar_photo} onChange={handleChange('aadhaar_photo')} required placeholder="aadhaar-photo.jpg" />
            </label>
          </div>

          <h3 className="panel__section-title">Guarantor details</h3>
          <label className="field">
            <span>Name</span>
            <input value={form.guarantor_name} onChange={handleChange('guarantor_name')} required />
          </label>
          <label className="field">
            <span>Mobile number</span>
            <input value={form.guarantor_mobile} onChange={handleChange('guarantor_mobile')} required inputMode="tel" />
          </label>
          <label className="field">
            <span>Address</span>
            <textarea value={form.guarantor_address} onChange={handleChange('guarantor_address')} required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Aadhaar number</span>
              <input value={form.guarantor_aadhaar_number} onChange={handleChange('guarantor_aadhaar_number')} required inputMode="numeric" maxLength={12} />
            </label>
            <label className="field">
              <span>Aadhaar photo</span>
              <input value={form.guarantor_aadhaar_photo} onChange={handleChange('guarantor_aadhaar_photo')} required placeholder="guarantor-aadhaar-photo.jpg" />
            </label>
          </div>
        </div>

        <div className="panel__footer">
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary" disabled={submitting || users.length === 0}>
            {submitting ? 'Saving…' : 'Create cashier'}
          </button>
        </div>
      </form>
    </div>
  );
}