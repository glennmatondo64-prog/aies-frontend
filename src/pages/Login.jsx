import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

const DEMO = [
  ['Student', 'student@aies.dev'],
  ['Company', 'company@aies.dev'],
  ['Admin', 'admin@aies.dev'],
  ['Academic Sup.', 'academic@aies.dev'],
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function fillDemo(demoEmail) {
    setEmail(demoEmail);
    setPassword('password123');
  }

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Log in to the Academic Internship Evaluation System.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required />
          </label>
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-alt">No account? <Link to="/register">Create one</Link></p>

        <div className="demo-box">
          <p className="demo-label">Demo accounts — password <code>password123</code></p>
          <div className="demo-chips">
            {DEMO.map(([label, mail]) => (
              <button key={mail} type="button" className="demo-chip" onClick={() => fillDemo(mail)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
