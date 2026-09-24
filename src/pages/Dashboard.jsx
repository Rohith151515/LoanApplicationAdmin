import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Loader, LiveIndicator } from '../components/Loader';
import { RoleBadge } from '../components/StatusBadge';
import usePolling from '../hooks/usePolling';
import { getAllUsers } from '../api/userApi';

export default function Dashboard() {
  const fetcher = useCallback(() => getAllUsers(), []);
  const { data, loading, error, isLive, lastUpdated, toggleLive } = usePolling(fetcher);

  const users = useMemo(() => (Array.isArray(data) ? data : data?.data || []), [data]);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => (u.status || '').toUpperCase() === 'ACTIVE').length;
    const byRole = users.reduce((acc, u) => {
      const role = (u.role || 'UNKNOWN').toUpperCase();
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
    return { total, active, byRole };
  }, [users]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <header className="main__header">
          <div>
            <h1>Overview</h1>
            <p className="main__subtitle">A live read on everyone provisioned through the User API.</p>
          </div>
          <LiveIndicator isLive={isLive} lastUpdated={lastUpdated} />
        </header>

        {loading && !data ? (
          <Loader label="Pulling live data…" />
        ) : error ? (
          <div className="alert alert--error">{error}</div>
        ) : (
          <>
            <section className="stat-grid">
              <div className="stat-card">
                <span className="stat-card__label">Total users</span>
                <span className="stat-card__value">{stats.total}</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Active</span>
                <span className="stat-card__value">{stats.active}</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Inactive</span>
                <span className="stat-card__value">{stats.total - stats.active}</span>
              </div>
              <div className="stat-card">
                <span className="stat-card__label">Refresh</span>
                <button className="btn btn--ghost btn--small" onClick={toggleLive} type="button">
                  {isLive ? 'Pause live feed' : 'Resume live feed'}
                </button>
              </div>
            </section>

            <section className="panel-card">
              <div className="panel-card__header">
                <h2>Roles at a glance</h2>
                <Link to="/users" className="link">
                  Manage users →
                </Link>
              </div>
              <div className="role-breakdown">
                {Object.entries(stats.byRole).length === 0 && <p className="muted">No users yet.</p>}
                {Object.entries(stats.byRole).map(([role, count]) => (
                  <div key={role} className="role-breakdown__row">
                    <RoleBadge role={role} />
                    <span className="role-breakdown__count">{count}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
