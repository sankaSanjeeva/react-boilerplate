import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts';

export default function ProtectedRoutes() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
