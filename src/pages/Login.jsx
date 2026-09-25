import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeField, setActiveField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { login } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTyping) return undefined;
    const timeout = window.setTimeout(() => setIsTyping(false), 900);
    return () => window.clearTimeout(timeout);
  }, [mobile, password, isTyping]);

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value);
    setIsTyping(true);
  };

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
    <div className="auth-screen auth-screen--login">
      <div className="auth-screen__side login-scene">
        <div className="login-scene__glow login-scene__glow--one" />
        <div className="login-scene__glow login-scene__glow--two" />
        <div className="login-scene__content">
          <div className="auth-screen__mark">L</div>
          <span className="login-scene__eyebrow">Ledger / secure access</span>
          <h1>Everything in motion.</h1>
          <p>One calm workspace for your teams, collections, and customer activity.</p>
          <div className="login-scene__status">
            <span className="login-scene__status-dot" />
            <span>{isTyping ? 'Updating secure session' : loading ? 'Verifying credentials' : 'Systems operational'}</span>
            <span className="login-scene__status-time">LIVE</span>
          </div>
        </div>
        <div className={`login-illustration ${isTyping || loading ? 'is-active' : ''}`} aria-hidden="true">
          <span className="login-illustration__spark login-illustration__spark--one" />
          <span className="login-illustration__spark login-illustration__spark--two" />
          <svg viewBox="0 0 420 300" role="presentation">
            <path className="login-illustration__orbit" d="M68 180C76 75 184 24 295 59c70 22 87 93 34 150-57 62-174 72-242 15-18-15-25-28-19-44Z" />
            <g className="login-illustration__friend login-illustration__friend--left">
              <path className="login-illustration__body login-illustration__body--gold" d="M71 205c-5-42 15-66 45-66 29 0 45 24 39 66-3 20-17 29-42 29-25 0-39-9-42-29Z" />
              <path className="login-illustration__arm" d="M78 178 53 159m95 19 21-25" />
              <circle className="login-illustration__eye" cx="101" cy="163" r="4" />
              <circle className="login-illustration__eye" cx="122" cy="163" r="4" />
              <path className="login-illustration__smile" d="M99 178c6 9 14 9 21 0" />
            </g>
            <g className="login-illustration__mascot">
              <path className="login-illustration__body login-illustration__body--coral" d="M133 207c-8-67 17-105 76-105 58 0 82 38 74 105-4 33-28 47-75 47-47 0-71-14-75-47Z" />
              <path className="login-illustration__wing" d="M143 172c-17 7-28 17-35 31m174-31c18 6 29 16 36 29" />
              <path className="login-illustration__beak" d="m199 151 13-12 13 12-13 12-13-12Z" />
              <circle className="login-illustration__eye" cx="190" cy="141" r="8" />
              <circle className="login-illustration__eye" cx="235" cy="141" r="8" />
              <circle className="login-illustration__pupil" cx="192" cy="143" r="3" />
              <circle className="login-illustration__pupil" cx="233" cy="143" r="3" />
              <path className="login-illustration__laugh" d="M193 170c10 19 29 19 39 0" />
              <path className="login-illustration__foot" d="M188 249v14m40-14v14" />
            </g>
            <g className="login-illustration__friend login-illustration__friend--right">
              <path className="login-illustration__body login-illustration__body--mint" d="M274 211c-4-47 16-74 47-74 31 0 48 27 43 74-3 22-18 32-45 32-27 0-42-10-45-32Z" />
              <path className="login-illustration__arm" d="M283 181 261 160m91 22 23-22" />
              <circle className="login-illustration__eye" cx="301" cy="167" r="4" />
              <circle className="login-illustration__eye" cx="323" cy="167" r="4" />
              <path className="login-illustration__smile" d="M299 182c7 10 15 10 22 0" />
            </g>
          </svg>
          <span className="login-illustration__caption">good energy, live</span>
        </div>
      </div>

      <div className="auth-screen__form">
        <form onSubmit={handleSubmit} className="auth-card">
          <div className="login-card__heading">
            <span className="login-card__kicker">Welcome back</span>
            <h2>Sign in</h2>
            <p className="auth-card__subtitle">Enter your details to continue.</p>
          </div>
          {error && <div className="auth-error" role="alert">{error}</div>}

          <label className={`field login-field ${activeField === 'mobile' ? 'is-active' : ''}`}>
            <span>Mobile number</span>
            <span className="login-field__input">
              <span className="login-field__icon">+</span>
              <input value={mobile} onFocus={() => setActiveField('mobile')} onBlur={() => setActiveField('')} onChange={handleFieldChange(setMobile)} required placeholder="1211111111" />
            </span>
          </label>

          <label className={`field login-field ${activeField === 'password' ? 'is-active' : ''}`}>
            <span>Password</span>
            <span className="login-field__input">
              <span className="login-field__icon">*</span>
              <input type="password" value={password} onFocus={() => setActiveField('password')} onBlur={() => setActiveField('')} onChange={handleFieldChange(setPassword)} required placeholder="Your password" />
            </span>
          </label>

          <button type="submit" className="btn btn--primary btn--block login-submit" disabled={loading}>
            <span>{loading ? 'Checking access' : 'Continue to Ledger'}</span>
            {!loading && <span className="login-submit__arrow">↗</span>}
          </button>

          <p className="auth-card__footer">
            New to Ledger? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
