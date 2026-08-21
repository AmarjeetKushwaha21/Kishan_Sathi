import { BrowserRouter, useLocation } from 'react-router-dom';

import ErrorBoundary from '@/components/error/ErrorBoundary';
import SkipLink from '@/components/ui/SkipLink';
import { AuthProvider } from '@/context/AuthContext';
import AppRoutes from '@/routes/AppRoutes';

function RouteAwareErrorBoundary({ children }) {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>
      {children}
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteAwareErrorBoundary>
        <SkipLink />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </RouteAwareErrorBoundary>
    </BrowserRouter>
  );
}