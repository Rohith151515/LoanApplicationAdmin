import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ROLES = ['COLLECTOR', 'MANAGER', 'ADMIN'];

export default function Register() {
  const [form, setForm] = useState({ role: 'COLLECTOR', name: '', mobile: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      notify('Account created — sign in to continue', 'success');
      navigate('/login');
    } catch (err) {
      const message = err.message || 'Registration failed. Please review your details and try again.';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-screen__side">
        <div className="auth-screen__mark">L</div>
        <h1>Join the console</h1>
        <p>Register an account to start managing users against your live API.</p>
      </div>

      <div className="auth-screen__form">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2>Create account</h2>
          <p className="auth-card__subtitle">This calls your /auth/register endpoint.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className="field">
            <span>Full name</span>
            <input value={form.name} onChange={handleChange('name')} required placeholder="Admin User" />
          </label>

          <label className="field">
            <span>Mobile number</span>
            <input value={form.mobile} onChange={handleChange('mobile')} required placeholder="1211111111" />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
              placeholder="admin@example.com"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              required
              placeholder="••••••••"
            />
          </label>

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

          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>

          <p className="auth-card__footer">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
