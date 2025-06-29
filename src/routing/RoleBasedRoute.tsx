import { Navigate } from "react-router";

import { ROUTES } from "@/utils/constants/routes.ts";
import { useAuth } from "@/hooks/useAuth.ts";

const RoleBasedRoute = ({ children, allowedRoles, fallbackPath = ROUTES.UNAUTHORIZED }: any) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const hasAllowedRole = user?.roles?.some((role: any) => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default RoleBasedRoute;
