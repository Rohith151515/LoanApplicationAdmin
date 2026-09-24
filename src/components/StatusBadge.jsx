export default function StatusBadge({ status }) {
  const normalized = (status || '').toUpperCase();
  return <span className={`badge badge--${normalized === 'ACTIVE' ? 'active' : 'inactive'}`}>{status}</span>;
}

export function RoleBadge({ role }) {
  const normalized = (role || '').toUpperCase();
  const tone = normalized === 'ADMIN' ? 'admin' : normalized === 'MANAGER' ? 'manager' : 'collector';
  return <span className={`role role--${tone}`}>{role}</span>;
}
