import { useNavigate, useLocation } from 'react-router';
import { ROUTES } from '../utils/constants/routes';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProducts = () => navigate(ROUTES.PRODUCTS);
  const goToProductCreate = () => navigate(ROUTES.PRODUCT_CREATE);
  const goToProductEdit = (id: string) => navigate(ROUTES.PRODUCT_EDIT.replace(':id', id));
  const goToProductDetail = (id: string) => navigate(ROUTES.PRODUCT_DETAIL.replace(':id', id));

  const goToSales = () => navigate(ROUTES.SALES);
  const goToNewSale = () => navigate(ROUTES.SALE_NEW);
  const goToSaleDetail = (id: string) => navigate(ROUTES.SALE_DETAIL.replace(':id', id));

  const goToEmployees = () => navigate(ROUTES.EMPLOYEES);
  const goToEmployeeCreate = () => navigate(ROUTES.EMPLOYEE_CREATE);
  const goToEmployeeEdit = (id: string) => navigate(ROUTES.EMPLOYEE_EDIT.replace(':id', id));

  const goToReports = () => navigate(ROUTES.REPORTS);
  const goToSettings = () => navigate(ROUTES.SETTINGS);
  const goToDashboard = () => navigate(ROUTES.DASHBOARD);

  const goBack = () => navigate(-1);

  return {
    goToProducts,
    goToProductCreate,
    goToProductEdit,
    goToProductDetail,
    goToSales,
    goToNewSale,
    goToSaleDetail,
    goToEmployees,
    goToEmployeeCreate,
    goToEmployeeEdit,
    goToReports,
    goToSettings,
    goToDashboard,
    goBack,
    currentPath: location.pathname,
    navigate,
    location,
  };
};
