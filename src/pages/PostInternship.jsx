import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function PostInternship() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', requiredSkills: '', duration: '', location: '', positions: 1,
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.post('/internships', { ...form, positions: Number(form.positions) });
      navigate('/internships');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="narrow">
      <div className="page-head">
        <div>
          <p className="eyebrow">Company</p>
          <h1>Post an internship</h1>
          <p className="muted">Create a new opportunity for students to apply to.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="form card">
        <label className="field">
          <span>Title</span>
          <input value={form.title} onChange={(e) => update('title', e.target.value)}
            placeholder="e.g. Backend Developer Intern" required />
        </label>
        <label className="field">
          <span>Description</span>
          <textarea value={form.description} onChange={(e) => update('description', e.target.value)}
            rows={4} placeholder="What will the intern do?" required />
        </label>
        <label className="field">
          <span>Required skills</span>
          <input value={form.requiredSkills} onChange={(e) => update('requiredSkills', e.target.value)}
            placeholder="Comma-separated, e.g. Node.js, SQL" />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Duration</span>
            <input value={form.duration} onChange={(e) => update('duration', e.target.value)}
              placeholder="e.g. 3 months" />
          </label>
          <label className="field">
            <span>Location</span>
            <input value={form.location} onChange={(e) => update('location', e.target.value)}
              placeholder="e.g. Remote" />
          </label>
          <label className="field">
            <span>Positions</span>
            <input type="number" min={1} value={form.positions}
              onChange={(e) => update('positions', e.target.value)} />
          </label>
        </div>
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? 'Posting…' : 'Post internship'}
        </button>
      </form>
    </div>
  );
}
