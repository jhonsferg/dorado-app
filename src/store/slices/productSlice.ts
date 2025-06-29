import { productService } from '@/services/api/products.ts';

export const createProductSlice = (set: any, get: any, _: any) => ({
  // Estado de productos
  products: [],
  selectedProduct: null,
  categories: ['POLLO', 'BEBIDA', 'COMPLEMENTO'],
  sizes: ['CUARTO', 'MEDIO', 'ENTERO', 'REGULAR', 'GRANDE'],

  // Estados de carga
  isLoadingProducts: false,
  isLoadingProduct: false,
  isSavingProduct: false,
  isDeletingProduct: false,

  // Filtros y búsqueda
  productFilters: {
    category: 'ALL',
    searchTerm: '',
    sortBy: 'name',
    sortOrder: 'asc',
    showLowStock: false,
  },

  // Error handling
  productError: null,

  // ACCIONES PARA PRODUCTOS
  fetchProducts: async () => {
    set({ isLoadingProducts: true, productError: null });
    try {
      const products = await productService.getAll();
      set({
        products,
        isLoadingProducts: false
      });
      return products;
    } catch (error: any) {
      set({
        productError: error.message,
        isLoadingProducts: false
      });
      throw error;
    }
  },

  fetchProductById: async (id: any) => {
    set({ isLoadingProduct: true, productError: null });
    try {
      const product = await productService.getById(id);
      set({
        selectedProduct: product,
        isLoadingProduct: false
      });
      return product;
    } catch (error: any) {
      set({
        productError: error.message,
        isLoadingProduct: false
      });
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    set({ isSavingProduct: true, productError: null });
    try {
      const newProduct = await productService.create(productData);
      const { products } = get();
      set({
        products: [...products, newProduct],
        isSavingProduct: false
      });
      return newProduct;
    } catch (error: any) {
      set({
        productError: error.message,
        isSavingProduct: false
      });
      throw error;
    }
  },

  updateProduct: async (id: any, productData: any) => {
    set({ isSavingProduct: true, productError: null });
    try {
      const updatedProduct = await productService.update(id, productData);
      const { products } = get();
      set({
        products: products.map((p: any) => p.id === id ? updatedProduct : p),
        selectedProduct: updatedProduct,
        isSavingProduct: false
      });
      return updatedProduct;
    } catch (error: any) {
      set({
        productError: error.message,
        isSavingProduct: false
      });
      throw error;
    }
  },

  deleteProduct: async (id: any) => {
    set({ isDeletingProduct: true, productError: null });
    try {
      await productService.delete(id);
      const { products } = get();
      set({
        products: products.filter((p: any) => p.id !== id),
        selectedProduct: null,
        isDeletingProduct: false
      });
    } catch (error: any) {
      set({
        productError: error.message,
        isDeletingProduct: false
      });
      throw error;
    }
  },

  fetchProductsByCategory: async (category: any) => {
    set({ isLoadingProducts: true, productError: null });
    try {
      const products = category === 'ALL'
        ? await productService.getAll()
        : await productService.getByCategory(category);
      set({
        products,
        isLoadingProducts: false
      });
      return products;
    } catch (error: any) {
      set({
        productError: error.message,
        isLoadingProducts: false
      });
      throw error;
    }
  },

  fetchLowStockProducts: async () => {
    set({ isLoadingProducts: true, productError: null });
    try {
      const products = await productService.getLowStock();
      set({
        products,
        isLoadingProducts: false
      });
      return products;
    } catch (error: any) {
      set({
        productError: error.message,
        isLoadingProducts: false
      });
      throw error;
    }
  },

  // FILTROS Y BÚSQUEDA
  setProductFilters: (filters: any) => {
    set({
      productFilters: {
        ...get().productFilters,
        ...filters
      }
    });
  },

  getFilteredProducts: () => {
    const { products, productFilters } = get();
    let filteredProducts = [...products];

    // Filtro por categoría
    if (productFilters.category !== 'ALL') {
      filteredProducts = filteredProducts.filter(
        product => product.category === productFilters.category
      );
    }

    // Filtro por término de búsqueda
    if (productFilters.searchTerm) {
      const searchTerm = productFilters.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por stock bajo
    if (productFilters.showLowStock) {
      filteredProducts = filteredProducts.filter(
        product => product.stock <= 10
      );
    }

    // Ordenamiento
    filteredProducts.sort((a, b) => {
      const { sortBy, sortOrder } = productFilters;
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredProducts;
  },

  // UTILIDADES
  clearSelectedProduct: () => set({ selectedProduct: null }),
  clearProductError: () => set({ productError: null }),
  resetProductFilters: () => set({
    productFilters: {
      category: 'ALL',
      searchTerm: '',
      sortBy: 'name',
      sortOrder: 'asc',
      showLowStock: false,
    }
  }),
});
