import { useEffect, useState } from 'react';
import { useAuth } from '../auth.jsx';
import { api } from '../api.js';

export default function Internships() {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applied, setApplied] = useState({});   // internshipId -> 'ok' | 'error message'

  function load(q = '') {
    setLoading(true);
    api.get(`/internships${q ? `?search=${encodeURIComponent(q)}` : ''}`)
      .then((res) => setInternships(res.internships))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function handleSearch(e) {
    e.preventDefault();
    load(search);
  }

  async function apply(id) {
    try {
      await api.post('/applications', { internshipId: id });
      setApplied((a) => ({ ...a, [id]: 'ok' }));
    } catch (err) {
      setApplied((a) => ({ ...a, [id]: err.message }));
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <p className="eyebrow">Opportunities</p>
          <h1>Internships</h1>
          <p className="muted">Browse and apply to open internship positions.</p>
        </div>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or keyword…" />
        <button className="btn btn-primary">Search</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="spinner" />
      ) : internships.length === 0 ? (
        <p className="muted empty">No internships found.</p>
      ) : (
        <div className="list">
          {internships.map((it) => (
            <div key={it.id} className="card internship-card">
              <div className="internship-main">
                <h3>{it.title}</h3>
                <p className="company-name">{it.company?.name || 'Company'}{it.location ? ` · ${it.location}` : ''}</p>
                <p className="internship-desc">{it.description}</p>
                {it.requiredSkills && (
                  <div className="skills">
                    {it.requiredSkills.split(',').map((s) => (
                      <span key={s} className="skill-tag">{s.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="internship-side">
                {it.duration && <span className="meta">⏱ {it.duration}</span>}
                {it.positions != null && <span className="meta">👤 {it.positions} position(s)</span>}
                {user.role === 'STUDENT' && (
                  applied[it.id] === 'ok' ? (
                    <span className="applied-ok">✓ Applied</span>
                  ) : (
                    <button className="btn btn-primary" onClick={() => apply(it.id)}>Apply</button>
                  )
                )}
                {applied[it.id] && applied[it.id] !== 'ok' && (
                  <span className="applied-err">{applied[it.id]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
