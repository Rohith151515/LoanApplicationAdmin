import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/cashier', label: 'Dashboard', end: true },
  { to: '/cashier/transactions', label: 'Transactions' },
  { to: '/cashier/collections', label: 'Collections' },
];

export default function CashierSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar cashier-sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark cashier-sidebar__mark">₹</span>
        <div>
          <span className="sidebar__name">Ledger</span>
          <span className="cashier-sidebar__label">Cashier desk</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Cashier navigation">
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
            <div className="sidebar__user-name">{user?.name || user?.mobile || 'Cashier'}</div>
            <div className="sidebar__user-role">{user?.role || 'cashier'}</div>
          </div>
        </div>
        <button className="btn btn--ghost btn--small" onClick={logout} type="button">
          Sign out
        </button>
      </div>
    </aside>
  );
}