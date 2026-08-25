import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

const ROLE_LABELS = {
  STUDENT: 'Student',
  COMPANY: 'Company',
  UNIVERSITY: 'University',
  ACADEMIC_SUPERVISOR: 'Academic Supervisor',
  COMPANY_SUPERVISOR: 'Company Supervisor',
  ADMIN: 'Administrator',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand">
          <span className="brand-dot" />
          AIES
        </Link>

        {user && (
          <nav className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/internships">Internships</Link>
            {user.role === 'STUDENT' && <Link to="/my-applications">My Applications</Link>}
            {user.role === 'COMPANY' && <Link to="/post-internship">Post Internship</Link>}
            {user.role === 'COMPANY' && <Link to="/applicants">Applicants</Link>}
          </nav>
        )}

        {user ? (
          <div className="nav-user">
            <span className="nav-name">{user.name}</span>
            <span className="role-pill">{ROLE_LABELS[user.role] || user.role}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div className="nav-user">
            <Link to="/login" className="btn btn-ghost">Log in</Link>
          </div>
        )}
      </div>
    </header>
  );
}
