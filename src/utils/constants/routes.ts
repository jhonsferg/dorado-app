export const ROUTES = {
    // Rutas públicas
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',

    // Rutas protegidas
    DASHBOARD: '/dashboard',
    PRODUCTS: '/productos',
    PRODUCT_CREATE: '/productos/nuevo',
    PRODUCT_EDIT: '/productos/editar/:id',
    PRODUCT_DETAIL: '/productos/:id',

    SALES: '/ventas',
    SALE_NEW: '/ventas/nueva',
    SALE_DETAIL: '/ventas/:id',

    EMPLOYEES: '/empleados',
    EMPLOYEE_CREATE: '/empleados/nuevo',
    EMPLOYEE_EDIT: '/empleados/editar/:id',
    EMPLOYEE_DETAIL: '/empleados/:id',

    REPORTS: '/reportes',
    REPORTS_SALES: '/reportes/ventas',
    REPORTS_INVENTORY: '/reportes/inventario',
    REPORTS_FINANCIAL: '/reportes/financiero',

    SETTINGS: '/configuracion',
    SETTINGS_PROFILE: '/configuracion/perfil',
    SETTINGS_SYSTEM: '/configuracion/sistema',
    SETTINGS_BRANCHES: '/configuracion/sucursales',

    // Rutas de error
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/unauthorized',
};
