import { useAuth } from './AuthContext';

export function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (userRole < requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}