import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const isCashier = (user?.role || '').toUpperCase() === 'CASHIER';
  const links = isCashier
    ? [{ to: '/cashier', label: 'Cashier home', end: true }]
    : [
        { to: '/', label: 'Overview', end: true },
        { to: '/users', label: 'Users' },
      ];

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">L</span>
        <span className="sidebar__name">ROHITH</span>
      </div>

      <nav className="sidebar__nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="sidebar__user-dot" />
          <div>
            <div className="sidebar__user-name">{user?.name || user?.mobile || 'Signed in'}</div>
            <div className="sidebar__user-role">{user?.role || 'session active'}</div>
          </div>
        </div>
        <button className="btn btn--ghost btn--small" onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
