import { useStore } from '@/store';

export const useProducts = () => {
  const products = useStore((state: any) => state.products);
  const selectedProduct = useStore((state: any) => state.selectedProduct);
  const isLoadingProducts = useStore((state: any) => state.isLoadingProducts);
  const isLoadingProduct = useStore((state: any) => state.isLoadingProduct);
  const isSavingProduct = useStore((state: any) => state.isSavingProduct);
  const isDeletingProduct = useStore((state: any) => state.isDeletingProduct);
  const productError = useStore((state: any) => state.productError);
  const productFilters = useStore((state: any) => state.productFilters);

  const fetchProducts = useStore((state: any) => state.fetchProducts);
  const fetchProductById = useStore((state: any) => state.fetchProductById);
  const createProduct = useStore((state: any) => state.createProduct);
  const updateProduct = useStore((state: any) => state.updateProduct);
  const deleteProduct = useStore((state: any) => state.deleteProduct);
  const fetchProductsByCategory = useStore((state: any) => state.fetchProductsByCategory);
  const fetchLowStockProducts = useStore((state: any) => state.fetchLowStockProducts);
  const setProductFilters = useStore((state: any) => state.setProductFilters);
  const getFilteredProducts = useStore((state: any) => state.getFilteredProducts);
  const clearSelectedProduct = useStore((state: any) => state.clearSelectedProduct);
  const clearProductError = useStore((state: any) => state.clearProductError);

  return {
    // Estado
    products,
    selectedProduct,
    isLoadingProducts,
    isLoadingProduct,
    isSavingProduct,
    isDeletingProduct,
    productError,
    productFilters,

    // Acciones
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProductsByCategory,
    fetchLowStockProducts,
    setProductFilters,
    getFilteredProducts,
    clearSelectedProduct,
    clearProductError,

    // Computed
    filteredProducts: getFilteredProducts(),
  };
};
