import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

const ROLES = [
  ['STUDENT', 'Student'],
  ['COMPANY', 'Company / Organization'],
  ['UNIVERSITY', 'University'],
  ['ACADEMIC_SUPERVISOR', 'Academic Supervisor'],
  ['COMPANY_SUPERVISOR', 'Company Supervisor'],
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join the platform as one of the roles below.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span>Full name</span>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={form.password} minLength={6}
              onChange={(e) => update('password', e.target.value)} required />
          </label>
          <label className="field">
            <span>I am a…</span>
            <select value={form.role} onChange={(e) => update('role', e.target.value)}>
              {ROLES.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          </label>
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="auth-alt">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
