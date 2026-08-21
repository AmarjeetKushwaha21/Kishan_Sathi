import { Navigate, Outlet, useLocation } from 'react-router-dom';

import PageLoader from '@/components/ui/PageLoader';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <PageLoader label="Preparing your farm…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}