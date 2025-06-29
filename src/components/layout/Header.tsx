// src/components/layout/Header/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Search,
  ShoppingCart,
  Sun,
  Moon
} from 'lucide-react';
import { useUI } from "@/hooks/useUI";
import { useAuth } from '@/hooks/useAuth';
import { useSales } from "@/hooks/useSales";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/utils/constants/routes.ts";

const Header = ({ onToggleSidebar }: any) => {
  const { user, logout } = useAuth();
  const {
    theme,
    setTheme,
    notifications,
    removeNotification,
    showSuccess
  } = useUI();
  const { cartItemCount } = useSales();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userMenuRef = useRef<any>(null);
  const notificationsRef = useRef<any>(null);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    showSuccess('Sesión cerrada correctamente');
    logout();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar lógica de búsqueda global
      console.log('Buscando:', searchQuery);
      // Navegar a página de resultados o filtrar contenido actual
    }
  };

  const unreadNotifications = notifications.filter((n: any) => !n.read);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Lado izquierdo */}
        <div className="flex items-center space-x-4">
          {/* Botón de menú móvil */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Logo y título */}
          <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2">
            <div className="text-2xl">🍗</div>
            <div>
              <h1 className="text-xl font-bold text-red-600 dark:text-red-400">
                Pollería El Dorado
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Sistema de Gestión
              </p>
            </div>
          </Link>
        </div>

        {/* Barra de búsqueda central */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, ventas, empleados..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center space-x-3">
          {/* Contador del carrito */}
          {cartItemCount > 0 && (
            <Link to={ROUTES.SALE_NEW} className="relative">
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4" />
                <Badge
                  variant="danger"
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </Badge>
              </Button>
            </Link>
          )}

          {/* Botón de tema */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Notificaciones */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
              aria-label="Ver notificaciones"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications.length > 0 && (
                <Badge
                  variant="danger"
                  className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center"
                >
                  {unreadNotifications.length}
                </Badge>
              )}
            </Button>

            {/* Dropdown de notificaciones */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notificaciones
                  </h3>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification: any) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 ${
                          notification.type === 'success' ? 'border-green-500' :
                            notification.type === 'error' ? 'border-red-500' :
                              notification.type === 'warning' ? 'border-yellow-500' :
                                'border-blue-500'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(notification.timestamp || Date.now()).toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No hay notificaciones
                      </p>
                    </div>
                  )}
                </div>

                {notifications.length > 5 && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      Ver todas las notificaciones
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                {/* Avatar o icono de usuario */}
                <div className="h-6 w-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>

                {/* Nombre de usuario (oculto en móvil) */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.fullName || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.roles?.[0] || 'Sin rol'}
                  </p>
                </div>

                <ChevronDown className="h-3 w-3 text-gray-500" />
              </div>
            </Button>

            {/* Dropdown de usuario */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                {/* Información del usuario */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user?.roles?.map((role: any) => (
                      <Badge key={role} variant="info" size="sm">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Opciones del menú */}
                <div className="py-1">
                  <Link
                    to={ROUTES.SETTINGS_PROFILE}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Mi Perfil
                  </Link>

                  <Link
                    to={ROUTES.SETTINGS}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Configuración
                  </Link>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Cerrar sesión */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra de búsqueda móvil */}
      <div className="md:hidden mt-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
