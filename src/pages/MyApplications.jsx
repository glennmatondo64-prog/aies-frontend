import { useEffect, useState } from 'react';
import { api } from '../api.js';

const STATUS_CLASS = {
  PENDING: 'status-pending',
  ACCEPTED: 'status-accepted',
  REJECTED: 'status-rejected',
  COMPLETED: 'status-completed',
};

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/applications/mine')
      .then((res) => setApps(res.applications))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="eyebrow">Student</p>
          <h1>My applications</h1>
          <p className="muted">Track the status of every internship you've applied to.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="spinner" />
      ) : apps.length === 0 ? (
        <p className="muted empty">You haven't applied to any internships yet.</p>
      ) : (
        <div className="list">
          {apps.map((a) => (
            <div key={a.id} className="card row-card">
              <div>
                <h3>{a.internship?.title}</h3>
                <p className="company-name">{a.internship?.company?.name}</p>
              </div>
              <span className={`status-pill ${STATUS_CLASS[a.status] || ''}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
