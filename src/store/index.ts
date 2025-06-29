import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createProductSlice } from './slices/productSlice';
import { createSaleSlice } from './slices/saleSlice';
import { createEmployeeSlice } from './slices/employeeSlice';
import { createUiSlice } from './slices/uiSlice';

export const useStore: any = create()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createProductSlice(...a),
        ...createSaleSlice(...a),
        ...createEmployeeSlice(...a),
        ...createUiSlice(...a),
      }),
      {
        name: 'dorado-store',
        partialize: (state: any) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    { name: 'dorado-store' }
  )
);
