import { useStore } from '@/store';
import { hasPermission } from '@/utils/helpers/permissions';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    initializeAuth,
  } = useStore();

  const checkPermission = (permission: any) => {
    return hasPermission(user?.roles, permission);
  };

  const isAdmin = () => {
    return user?.roles?.includes('ADMIN');
  };

  const isManager = () => {
    return user?.roles?.includes('MANAGER');
  };

  const isCashier = () => {
    return user?.roles?.includes('CASHIER');
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    initializeAuth,
    hasPermission: checkPermission,
    isAdmin,
    isManager,
    isCashier,
  };
};
