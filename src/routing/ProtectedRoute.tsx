import { Navigate, useLocation } from 'react-router';

import { useAuth } from "@/hooks/useAuth.ts";
import { ROUTES } from "@/utils/constants/routes.ts";
import { hasPermission } from "@/utils/helpers/permissions.ts";
import LoadingSpinner from '@/components/ui/LoadingSpinner.tsx';

const ProtectedRoute = ({
                          children,
                          requiredPermission = null,
                          requiredRole = null,
                          fallbackPath = ROUTES.UNAUTHORIZED
                        }: any) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico
  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Si se requiere un permiso específico
  if (requiredPermission && !hasPermission(user?.roles, requiredPermission)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
