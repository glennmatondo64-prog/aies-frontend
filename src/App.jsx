import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Internships from './pages/Internships.jsx';
import PostInternship from './pages/PostInternship.jsx';
import MyApplications from './pages/MyApplications.jsx';
import Applicants from './pages/Applicants.jsx';

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="center-screen"><div className="spinner" /></div>;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/post-internship" element={<PostInternship />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/applicants" element={<Applicants />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
