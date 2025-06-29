import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { ROUTES } from '../utils/constants/routes';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { login: loginStore, logout: logoutStore } = useAuth();

  const handleLogin = async (credentials: any) => {
    try {
      await loginStore(credentials);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  };

  const handleLogout = () => {
    logoutStore();
    navigate(ROUTES.LOGIN);
  };

  return {
    login: handleLogin,
    logout: handleLogout,
  };
};
