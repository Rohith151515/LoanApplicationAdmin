import { useCallback, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Loader, LiveIndicator } from '../components/Loader';
import StatusBadge, { RoleBadge } from '../components/StatusBadge';
import UserFormPanel from '../components/UserFormPanel';
import CashierFormPanel from '../components/CashierFormPanel';
import usePolling from '../hooks/usePolling';
import { createUser, getAllUsers, updateUser } from '../api/userApi';
import { createCashier } from '../api/cashierApi';
import { useToast } from '../context/ToastContext';

export default function Users() {
  const fetcher = useCallback(() => getAllUsers(), []);
  const { data, loading, error, isLive, lastUpdated, toggleLive, refreshNow } = usePolling(fetcher);
  const { notify } = useToast();

  const [query, setQuery] = useState('');
  const [panel, setPanel] = useState({ open: false, mode: 'create', user: null });
  const [cashierOpen, setCashierOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const users = useMemo(() => (Array.isArray(data) ? data : data?.data || []), [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.name, u.email, u.mobile, u.role].filter(Boolean).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [users, query]);

  const openCreate = () => setPanel({ open: true, mode: 'create', user: null });
  const openEdit = (user) => setPanel({ open: true, mode: 'edit', user });
  const closePanel = () => setPanel((prev) => ({ ...prev, open: false }));

  const handleCreateCashier = async (payload) => {
    setSubmitting(true);
    try {
      await createCashier(payload);
      notify('Cashier created', 'success');
      setCashierOpen(false);
    } catch (err) {
      notify(err.message || 'Could not create cashier', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      if (panel.mode === 'edit') {
        const id = panel.user.id || panel.user._id;
        await updateUser(id, form);
        notify('User updated', 'success');
      } else {
        await createUser(form);
        notify('User created', 'success');
      }
      closePanel();
      refreshNow();
    } catch (err) {
      notify(err.message || 'Could not save user', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <header className="main__header">
          <div>
            <h1>Users</h1>
            <p className="main__subtitle">Create, review, and update accounts across every role.</p>
          </div>
          <LiveIndicator isLive={isLive} lastUpdated={lastUpdated} />
        </header>

        <section className="toolbar">
          <input
            className="search-input"
            placeholder="Search by name, email, mobile, or role"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="toolbar__actions">
            <button className="btn btn--ghost btn--small" onClick={toggleLive} type="button">
              {isLive ? 'Pause' : 'Resume'}
            </button>
            <button className="btn btn--ghost btn--small" onClick={refreshNow} type="button">
              Refresh now
            </button>
            <button className="btn btn--primary" onClick={openCreate} type="button">
              + New user
            </button>
            <button className="btn btn--primary" onClick={() => setCashierOpen(true)} type="button">
              + New cashier
            </button>
          </div>
        </section>

        {loading && !data ? (
          <Loader label="Fetching users…" />
        ) : error ? (
          <div className="alert alert--error">{error}</div>
        ) : (
          <section className="panel-card panel-card--table">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="muted table__empty">
                      No users match yet. Try a different search, or create one.
                    </td>
                  </tr>
                )}
                {filtered.map((u) => (
                  <tr key={u.id || u._id || u.email}>
                    <td>
                      <div className="table__primary">{u.name}</div>
                      <div className="table__secondary">{u.id || u._id}</div>
                    </td>
                    <td>
                      <div>{u.email}</div>
                      <div className="table__secondary">{u.mobile}</div>
                    </td>
                    <td>
                      <RoleBadge role={u.role} />
                    </td>
                    <td>
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="table__actions">
                      <button className="btn btn--ghost btn--small" onClick={() => openEdit(u)} type="button">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>

      <UserFormPanel
        open={panel.open}
        mode={panel.mode}
        initialData={panel.user}
        onClose={closePanel}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
      <CashierFormPanel
        open={cashierOpen}
        users={users}
        onClose={() => setCashierOpen(false)}
        onSubmit={handleCreateCashier}
        submitting={submitting}
      />
    </div>
  );
}
