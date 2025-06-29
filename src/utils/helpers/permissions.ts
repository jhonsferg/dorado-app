import { PERMISSIONS } from '@/utils/constants/permissions';
import { ROLE_PERMISSIONS } from "@/utils/constants/roles.ts";

export const hasPermission = (userRoles: any, requiredPermission: any) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;

  return userRoles.some(role => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];

    // Si tiene permiso de admin, puede todo
    if (rolePermissions.includes(PERMISSIONS.ADMIN_ALL)) return true;

    // Verificar permiso específico
    return rolePermissions.includes(requiredPermission);
  });
};

export const hasAnyPermission = (userRoles: any, requiredPermissions: any) => {
  return requiredPermissions.some((permission: any) =>
    hasPermission(userRoles, permission)
  );
};

export const hasAllPermissions = (userRoles: any, requiredPermissions: any) => {
  return requiredPermissions.every((permission: any) =>
    hasPermission(userRoles, permission)
  );
};

export const getUserPermissions = (userRoles: any) => {
  if (!userRoles || !Array.isArray(userRoles)) return [];

  const permissions = new Set();

  userRoles.forEach(role => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    rolePermissions.forEach(permission => permissions.add(permission));
  });

  return Array.from(permissions);
};
