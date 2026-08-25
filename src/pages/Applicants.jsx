import { useEffect, useState } from 'react';
import { api } from '../api.js';

const STATUS_CLASS = {
  PENDING: 'status-pending',
  ACCEPTED: 'status-accepted',
  REJECTED: 'status-rejected',
  COMPLETED: 'status-completed',
};

export default function Applicants() {
  const [internships, setInternships] = useState([]);
  const [selected, setSelected] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load this company's own internships. The public list includes company name;
  // we fetch all then let the company pick one to review.
  useEffect(() => {
    api.get('/internships')
      .then((res) => {
        setInternships(res.internships);
        if (res.internships.length) setSelected(res.internships[0].id);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) return;
    api.get(`/applications/internship/${selected}`)
      .then((res) => setApps(res.applications))
      .catch((err) => { setApps([]); setError(err.message); });
  }, [selected]);

  async function review(id, status) {
    try {
      await api.patch(`/applications/${id}/status`, { status });
      setApps((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="eyebrow">Company</p>
          <h1>Applicants</h1>
          <p className="muted">Review students who applied to your internships.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="spinner" />
      ) : internships.length === 0 ? (
        <p className="muted empty">Post an internship first to receive applicants.</p>
      ) : (
        <>
          <label className="field select-field">
            <span>Choose an internship</span>
            <select value={selected || ''} onChange={(e) => setSelected(Number(e.target.value))}>
              {internships.map((it) => <option key={it.id} value={it.id}>{it.title}</option>)}
            </select>
          </label>

          {apps.length === 0 ? (
            <p className="muted empty">No applicants for this internship yet.</p>
          ) : (
            <div className="list">
              {apps.map((a) => (
                <div key={a.id} className="card row-card">
                  <div>
                    <h3>{a.student?.user?.name || 'Student'}</h3>
                    <p className="company-name">{a.student?.user?.email}</p>
                  </div>
                  <div className="applicant-actions">
                    <span className={`status-pill ${STATUS_CLASS[a.status] || ''}`}>{a.status}</span>
                    {a.status === 'PENDING' && (
                      <>
                        <button className="btn btn-success" onClick={() => review(a.id, 'ACCEPTED')}>Accept</button>
                        <button className="btn btn-danger" onClick={() => review(a.id, 'REJECTED')}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
