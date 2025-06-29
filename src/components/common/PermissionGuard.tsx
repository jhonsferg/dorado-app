import { useAuth } from '@/hooks/useAuth';

type PermissionGuarParams = {
  key?: string;
  permission?: any;
  role?: any;
  children?: any;
  fallback?: any;
  requireAll?: boolean;
};

const PermissionGuard = ({
                           permission,
                           role,
                           children,
                           fallback = null,
                           requireAll = false
                         }: PermissionGuarParams) => {
  const { user, hasPermission } = useAuth();

  // Verificar rol específico
  if (role && !user?.roles?.includes(role)) {
    return fallback;
  }

  // Verificar permiso específico
  if (permission && !hasPermission(permission)) {
    return fallback;
  }

  // Verificar múltiples permisos
  if (Array.isArray(permission)) {
    const hasAccess = requireAll
      ? permission.every(p => hasPermission(p))
      : permission.some(p => hasPermission(p));

    if (!hasAccess) {
      return fallback;
    }
  }

  return children;
};

export default PermissionGuard;
