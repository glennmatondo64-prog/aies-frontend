import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { api } from '../api.js';

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let endpoint = null;
    if (user.role === 'ADMIN') endpoint = '/dashboard/admin';
    if (user.role === 'STUDENT') endpoint = '/dashboard/student';
    if (!endpoint) return;

    api.get(endpoint)
      .then((res) => setStats(res.stats))
      .catch((err) => setError(err.message));
  }, [user.role]);

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Welcome, {user.name.split(' ')[0]} 👋</h1>
          <p className="muted">You're signed in as {user.role.replace(/_/g, ' ').toLowerCase()}.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {user.role === 'ADMIN' && stats && (
        <div className="stat-grid">
          <StatCard label="Total users" value={stats.totalUsers} />
          <StatCard label="Companies" value={stats.companies} />
          <StatCard label="Universities" value={stats.universities} />
          <StatCard label="Internships" value={stats.internships} />
          <StatCard label="Applications" value={stats.applications} />
        </div>
      )}

      {user.role === 'STUDENT' && stats && (
        <div className="stat-grid">
          <StatCard label="My applications" value={stats.applications} />
          <StatCard label="Weekly reports" value={stats.reports} />
          <StatCard label="Evaluations" value={stats.evaluations} />
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick actions</h2>
        <div className="action-row">
          <Link to="/internships" className="action-card">
            <strong>Browse internships</strong>
            <span>See all open opportunities</span>
          </Link>
          {user.role === 'STUDENT' && (
            <Link to="/my-applications" className="action-card">
              <strong>My applications</strong>
              <span>Track your application status</span>
            </Link>
          )}
          {user.role === 'COMPANY' && (
            <>
              <Link to="/post-internship" className="action-card">
                <strong>Post an internship</strong>
                <span>Create a new opportunity</span>
              </Link>
              <Link to="/applicants" className="action-card">
                <strong>Review applicants</strong>
                <span>Accept or reject students</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
