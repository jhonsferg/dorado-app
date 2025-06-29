import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import { ROLES } from "@/utils/constants/roles";
import { ROUTES } from '@/utils/constants/routes';
import { PERMISSIONS } from '@/utils/constants/permissions';

// Layouts
import AppLayout from '../components/layout/AppLayout';

// Componentes de routing
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Páginas
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';

import ProductList from '../pages/Products/ProductList';
import ProductCreate from '../pages/Products/ProductCreate';
import ProductEdit from '../pages/Products/ProductEdit';
import ProductDetail from '../pages/Products/ProductDetail';

import SalesList from '../pages/Sales/SalesList';
import NewSale from '../pages/Sales/NewSale';
import SaleDetail from '../pages/Sales/SaleDetail';

import EmployeeList from '../pages/Employees/EmployeeList';
import EmployeeCreate from '../pages/Employees/EmployeeCreate';
import EmployeeEdit from '../pages/Employees/EmployeeEdit';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path={ROUTES.LOGIN} element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Rutas protegidas con layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          {/* Dashboard - accesible para todos los usuarios autenticados */}
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

          {/* Productos - requiere permiso de ver productos */}
          <Route path={ROUTES.PRODUCTS} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCTS_VIEW}>
              <ProductList />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PRODUCT_CREATE} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCTS_CREATE}>
              <ProductCreate />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PRODUCT_EDIT} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCTS_EDIT}>
              <ProductEdit />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.PRODUCT_DETAIL} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.PRODUCTS_VIEW}>
              <ProductDetail />
            </ProtectedRoute>
          } />

          {/* Ventas - requiere permiso de ver ventas */}
          <Route path={ROUTES.SALES} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SALES_VIEW}>
              <SalesList />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.SALE_NEW} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SALES_CREATE}>
              <NewSale />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.SALE_DETAIL} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SALES_VIEW}>
              <SaleDetail />
            </ProtectedRoute>
          } />

          {/* Empleados - solo para ADMIN y MANAGER */}
          <Route path={ROUTES.EMPLOYEES} element={
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <EmployeeList />
            </RoleBasedRoute>
          } />
          <Route path={ROUTES.EMPLOYEE_CREATE} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES_CREATE}>
              <EmployeeCreate />
            </ProtectedRoute>
          } />
          <Route path={ROUTES.EMPLOYEE_EDIT} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.EMPLOYEES_EDIT}>
              <EmployeeEdit />
            </ProtectedRoute>
          } />

          {/* Reportes - solo para ADMIN y MANAGER */}
          <Route path={ROUTES.REPORTS} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.REPORTS_VIEW}>
              <Reports />
            </ProtectedRoute>
          } />

          {/* Configuración - requiere permisos específicos */}
          <Route path={ROUTES.SETTINGS} element={
            <ProtectedRoute requiredPermission={PERMISSIONS.SETTINGS_VIEW}>
              <Settings />
            </ProtectedRoute>
          } />
        </Route>

        {/* Rutas de error */}
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
