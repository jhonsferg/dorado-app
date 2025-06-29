import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { PERMISSIONS } from "@/utils/constants/permissions.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import PermissionGuard from "@/components/common/PermissionGuard.tsx";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Productos',
      value: '45',
      icon: Package,
      permission: PERMISSIONS.PRODUCTS_VIEW,
    },
    {
      name: 'Ventas Hoy',
      value: '23',
      icon: ShoppingCart,
      permission: PERMISSIONS.SALES_VIEW,
    },
    {
      name: 'Empleados',
      value: '8',
      icon: Users,
      permission: PERMISSIONS.EMPLOYEES_VIEW,
    },
    {
      name: 'Ingresos',
      value: 'S/ 1,250',
      icon: TrendingUp,
      permission: PERMISSIONS.REPORTS_VIEW,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          ¡Bienvenido, {user?.fullName}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Aquí tienes un resumen de tu pollería
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <PermissionGuard
            key={stat.name}
            permission={stat.permission}
            fallback={null}
          >
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </PermissionGuard>
        ))}
      </div>

      {/* Sección de acciones rápidas */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PermissionGuard permission={PERMISSIONS.SALES_CREATE}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Nueva Venta</h3>
              <p className="text-sm text-gray-600 mt-1">
                Registrar una nueva venta
              </p>
            </div>
          </PermissionGuard>

          <PermissionGuard permission={PERMISSIONS.PRODUCTS_CREATE}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Nuevo Producto</h3>
              <p className="text-sm text-gray-600 mt-1">
                Agregar producto al inventario
              </p>
            </div>
          </PermissionGuard>

          <PermissionGuard permission={PERMISSIONS.REPORTS_VIEW}>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-medium text-gray-900">Ver Reportes</h3>
              <p className="text-sm text-gray-600 mt-1">
                Análisis y estadísticas
              </p>
            </div>
          </PermissionGuard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
