import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

// Blocks pages for anyone who isn't logged in.
export default function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
