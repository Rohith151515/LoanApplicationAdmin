import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ mobile, password });
      notify('Signed in successfully', 'success');
      navigate('/');
    } catch (err) {
      const message = err.message || 'Login failed. Please check your details and try again.';
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
        <h1>Ledger console</h1>
        <p>Live visibility into collectors, managers, and admins — wired directly to your API.</p>
        <ul className="auth-screen__points">
          <li>Real-time user roster with auto-refresh</li>
          <li>Role-aware access for COLLECTOR, MANAGER, ADMIN</li>
          <li>One console for auth and user management</li>
        </ul>
      </div>

      <div className="auth-screen__form">
        <form onSubmit={handleSubmit} className="auth-card">
          <h2>Sign in</h2>
          <p className="auth-card__subtitle">Enter your mobile number and password.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className="field">
            <span>Mobile number</span>
            <input value={mobile} onChange={(e) => setMobile(e.target.value)} required placeholder="1211111111" />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="auth-card__footer">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
