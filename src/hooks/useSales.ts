import { useStore } from '@/store';

export const useSales = () => {
  const sales = useStore((state: any) => state.sales);
  const selectedSale = useStore((state: any) => state.selectedSale);
  const currentSale = useStore((state: any) => state.currentSale);
  const isLoadingSales = useStore((state: any) => state.isLoadingSales);
  const isLoadingSale = useStore((state: any) => state.isLoadingSale);
  const isSavingSale = useStore((state: any) => state.isSavingSale);
  const saleError = useStore((state: any) => state.saleError);

  const fetchSales = useStore((state: any) => state.fetchSales);
  const fetchSaleById = useStore((state: any) => state.fetchSaleById);
  const createSale = useStore((state: any) => state.createSale);
  const addItemToCart = useStore((state: any) => state.addItemToCart);
  const removeItemFromCart = useStore((state: any) => state.removeItemFromCart);
  const updateItemQuantity = useStore((state: any) => state.updateItemQuantity);
  const setCustomerInfo = useStore((state: any) => state.setCustomerInfo);
  const setPaymentMethod = useStore((state: any) => state.setPaymentMethod);
  const setDiscount = useStore((state: any) => state.setDiscount);
  const clearCurrentSale = useStore((state: any) => state.clearCurrentSale);
  const clearSelectedSale = useStore((state: any) => state.clearSelectedSale);
  const clearSaleError = useStore((state: any) => state.clearSaleError);

  return {
    // Estado
    sales,
    selectedSale,
    currentSale,
    isLoadingSales,
    isLoadingSale,
    isSavingSale,
    saleError,

    // Acciones
    fetchSales,
    fetchSaleById,
    createSale,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    setCustomerInfo,
    setPaymentMethod,
    setDiscount,
    clearCurrentSale,
    clearSelectedSale,
    clearSaleError,

    // Computed
    cartItemCount: currentSale.items.reduce((sum: any, item: any) => sum + item.quantity, 0),
    cartTotal: currentSale.total,
  };
};
