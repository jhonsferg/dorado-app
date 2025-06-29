import { Navigate } from "react-router";

import { useAuth } from "@/hooks/useAuth.ts";
import { ROUTES } from "@/utils/constants/routes.ts";
import LoadingSpinner from "@/components/ui/LoadingSpinner.tsx";

const PublicRoute = ({ children, redirectIfAuthenticated = true }: any) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && redirectIfAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
