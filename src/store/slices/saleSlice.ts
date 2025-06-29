import { saleService } from "@/services/api/sales.ts";

export const createSaleSlice = (set: any, get: any, _: any) => ({
  // Estado de ventas
  sales: [],
  selectedSale: null,

  // Carrito de venta actual
  currentSale: {
    items: [],
    customer: null,
    paymentMethod: 'EFECTIVO',
    subtotal: 0,
    igv: 0,
    total: 0,
    discount: 0,
  },

  // Estados de carga
  isLoadingSales: false,
  isLoadingSale: false,
  isSavingSale: false,

  // Error handling
  saleError: null,

  // ACCIONES PARA VENTAS
  fetchSales: async () => {
    set({ isLoadingSales: true, saleError: null });
    try {
      const sales = await saleService.getAll();
      set({
        sales,
        isLoadingSales: false
      });
      return sales;
    } catch (error: any) {
      set({
        saleError: error.message,
        isLoadingSales: false
      });
      throw error;
    }
  },

  fetchSaleById: async (id: any) => {
    set({ isLoadingSale: true, saleError: null });
    try {
      const sale = await saleService.getById(id);
      set({
        selectedSale: sale,
        isLoadingSale: false
      });
      return sale;
    } catch (error: any) {
      set({
        saleError: error.message,
        isLoadingSale: false
      });
      throw error;
    }
  },

  createSale: async (saleData: any) => {
    set({ isSavingSale: true, saleError: null });
    try {
      const newSale = await saleService.create(saleData);
      const { sales } = get();
      set({
        sales: [newSale, ...sales],
        isSavingSale: false
      });
      // Limpiar carrito después de la venta
      get().clearCurrentSale();
      return newSale;
    } catch (error: any) {
      set({
        saleError: error.message,
        isSavingSale: false
      });
      throw error;
    }
  },

  // MANEJO DEL CARRITO
  addItemToCart: (product: any, quantity = 1) => {
    const { currentSale } = get();
    const existingItemIndex = currentSale.items.findIndex(
      (item: any) => item.productId === product.id
    );

    let newItems;
    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      newItems = currentSale.items.map((item: any, index: any) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Agregar nuevo item
      newItems = [...currentSale.items, {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity,
        subtotal: product.price * quantity,
      }];
    }

    const updatedSale = { ...currentSale, items: newItems };
    const totals = get().calculateSaleTotals(updatedSale);

    set({
      currentSale: { ...updatedSale, ...totals }
    });
  },

  removeItemFromCart: (productId: any) => {
    const { currentSale } = get();
    const newItems = currentSale.items.filter(
      (item: any) => item.productId !== productId
    );

    const updatedSale = { ...currentSale, items: newItems };
    const totals = get().calculateSaleTotals(updatedSale);

    set({
      currentSale: { ...updatedSale, ...totals }
    });
  },

  updateItemQuantity: (productId: any, quantity: any) => {
    if (quantity <= 0) {
      get().removeItemFromCart(productId);
      return;
    }

    const { currentSale } = get();
    const newItems = currentSale.items.map((item: any) =>
      item.productId === productId
        ? {
          ...item,
          quantity,
          subtotal: item.unitPrice * quantity
        }
        : item
    );

    const updatedSale = { ...currentSale, items: newItems };
    const totals = get().calculateSaleTotals(updatedSale);

    set({
      currentSale: { ...updatedSale, ...totals }
    });
  },

  setCustomerInfo: (customer: any) => {
    const { currentSale } = get();
    set({
      currentSale: { ...currentSale, customer }
    });
  },

  setPaymentMethod: (paymentMethod: any) => {
    const { currentSale } = get();
    set({
      currentSale: { ...currentSale, paymentMethod }
    });
  },

  setDiscount: (discount: any) => {
    const { currentSale } = get();
    const updatedSale = { ...currentSale, discount };
    const totals = get().calculateSaleTotals(updatedSale);

    set({
      currentSale: { ...updatedSale, ...totals }
    });
  },

  // CÁLCULOS
  calculateSaleTotals: (sale: any) => {
    const subtotal = sale.items.reduce((sum: any, item: any) => sum + item.subtotal, 0);
    const discountAmount = (subtotal * sale.discount) / 100;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const igv = subtotalAfterDiscount * 0.18; // 18% IGV en Perú
    const total = subtotalAfterDiscount + igv;

    return {
      subtotal: subtotalAfterDiscount,
      igv,
      total,
    };
  },

  // UTILIDADES
  clearCurrentSale: () => set({
    currentSale: {
      items: [],
      customer: null,
      paymentMethod: 'EFECTIVO',
      subtotal: 0,
      igv: 0,
      total: 0,
      discount: 0,
    }
  }),

  clearSelectedSale: () => set({ selectedSale: null }),
  clearSaleError: () => set({ saleError: null }),
});
