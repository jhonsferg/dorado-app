import { useStore } from '@/store';

export const useUI = () => {
  const sidebarOpen = useStore((state: any) => state.sidebarOpen);
  const theme = useStore((state: any) => state.theme);
  const notifications = useStore((state: any) => state.notifications);
  const modals = useStore((state: any) => state.modals);
  const globalLoading = useStore((state: any) => state.globalLoading);

  const toggleSidebar = useStore((state: any) => state.toggleSidebar);
  const closeSidebar = useStore((state: any) => state.closeSidebar);
  const openSidebar = useStore((state: any) => state.openSidebar);
  const setTheme = useStore((state: any) => state.setTheme);
  const addNotification = useStore((state: any) => state.addNotification);
  const removeNotification = useStore((state: any) => state.removeNotification);
  const clearNotifications = useStore((state: any) => state.clearNotifications);
  const showSuccess = useStore((state: any) => state.showSuccess);
  const showError = useStore((state: any) => state.showError);
  const showWarning = useStore((state: any) => state.showWarning);
  const showInfo = useStore((state: any) => state.showInfo);
  const openConfirmDialog = useStore((state: any) => state.openConfirmDialog);
  const closeConfirmDialog = useStore((state: any) => state.closeConfirmDialog);
  const setGlobalLoading = useStore((state: any) => state.setGlobalLoading);

  return {
    // Estado
    sidebarOpen,
    theme,
    notifications,
    modals,
    globalLoading,

    // Acciones
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setTheme,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    openConfirmDialog,
    closeConfirmDialog,
    setGlobalLoading,
  };
};
