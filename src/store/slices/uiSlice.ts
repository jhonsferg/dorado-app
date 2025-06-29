import type { DialogConfig } from "@/types/dialog.ts";

export const createUiSlice = (set: any, get: any, _: any) => ({
  // Estado de UI
  sidebarOpen: false,
  theme: 'light',

  // Notificaciones
  notifications: [],

  // Modales
  modals: {
    confirmDialog: {
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null,
    },
  },

  // Loading states globales
  globalLoading: false,

  // ACCIONES DE UI
  toggleSidebar: () => {
    set({ sidebarOpen: !get().sidebarOpen });
  },

  closeSidebar: () => set({ sidebarOpen: false }),
  openSidebar: () => set({ sidebarOpen: true }),

  setTheme: (theme: any) => {
    set({ theme });
    localStorage.setItem('theme', theme);
  },

  // NOTIFICACIONES
  addNotification: (notification: any) => {
    const { notifications } = get();
    const newNotification = {
      id: Date.now(),
      type: 'info',
      autoClose: true,
      duration: 5000,
      ...notification,
    };

    set({
      notifications: [...notifications, newNotification]
    });

    // Auto-close si está habilitado
    if (newNotification.autoClose) {
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, newNotification.duration);
    }

    return newNotification.id;
  },

  removeNotification: (id: any) => {
    const { notifications } = get();
    set({
      notifications: notifications.filter((n: any) => n.id !== id)
    });
  },

  clearNotifications: () => set({ notifications: [] }),

  // SHORTCUTS PARA NOTIFICACIONES
  showSuccess: (message: any, options = {}) => {
    return get().addNotification({
      type: 'success',
      message,
      ...options,
    });
  },

  showError: (message: any, options = {}) => {
    return get().addNotification({
      type: 'error',
      message,
      autoClose: false, // Errores no se cierran automáticamente
      ...options,
    });
  },

  showWarning: (message: any, options = {}) => {
    return get().addNotification({
      type: 'warning',
      message,
      ...options,
    });
  },

  showInfo: (message: any, options = {}) => {
    return get().addNotification({
      type: 'info',
      message,
      ...options,
    });
  },

  // MODALES
  openConfirmDialog: ({ title, message, onConfirm, onCancel }: DialogConfig) => {
    set({
      modals: {
        ...get().modals,
        confirmDialog: {
          isOpen: true,
          title,
          message,
          onConfirm,
          onCancel,
        },
      },
    });
  },

  closeConfirmDialog: () => {
    set({
      modals: {
        ...get().modals,
        confirmDialog: {
          isOpen: false,
          title: '',
          message: '',
          onConfirm: null,
          onCancel: null,
        },
      },
    });
  },

  setGlobalLoading: (loading: any) => set({ globalLoading: loading }),
});
