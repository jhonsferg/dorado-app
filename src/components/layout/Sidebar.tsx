import { NavLink } from 'react-router';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  X
} from 'lucide-react';
import { ROUTES } from '@/utils/constants/routes.ts';
import { PERMISSIONS } from '@/utils/constants/permissions.ts';
import { hasPermission } from '@/utils/helpers/permissions.ts';
import { clsx } from 'clsx';

const Sidebar = ({ isOpen, onClose, userRoles }: any) => {
  const navigationItems = [
    {
      name: 'Dashboard',
      href: ROUTES.DASHBOARD,
      icon: Home,
      permission: null, // Todos pueden ver el dashboard
    },
    {
      name: 'Productos',
      href: ROUTES.PRODUCTS,
      icon: Package,
      permission: PERMISSIONS.PRODUCTS_VIEW,
    },
    {
      name: 'Ventas',
      href: ROUTES.SALES,
      icon: ShoppingCart,
      permission: PERMISSIONS.SALES_VIEW,
    },
    {
      name: 'Empleados',
      href: ROUTES.EMPLOYEES,
      icon: Users,
      permission: PERMISSIONS.EMPLOYEES_VIEW,
    },
    {
      name: 'Reportes',
      href: ROUTES.REPORTS,
      icon: BarChart3,
      permission: PERMISSIONS.REPORTS_VIEW,
    },
    {
      name: 'Configuración',
      href: ROUTES.SETTINGS,
      icon: Settings,
      permission: PERMISSIONS.SETTINGS_VIEW,
    },
  ];

  const filteredNavigation = navigationItems.filter(item =>
    !item.permission || hasPermission(userRoles, item.permission)
  );

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
        {
          'translate-x-0': isOpen,
          '-translate-x-full md:translate-x-0': !isOpen,
        }
      )}>
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <span className="text-lg font-semibold">Menú</span>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {filteredNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) => clsx(
                    'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    {
                      'bg-red-100 text-red-700': isActive,
                      'text-gray-600 hover:bg-gray-100 hover:text-gray-900': !isActive,
                    }
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
