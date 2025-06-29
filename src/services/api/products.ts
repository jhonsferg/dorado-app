import api from './index';

export const productService = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getById: async (id: any) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    create: async (product: any) => {
        const response = await api.post('/products', product);
        return response.data;
    },

    update: async (id: any, product: any) => {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },

    delete: async (id: any) => {
        await api.delete(`/products/${id}`);
    },

    getByCategory: async (category: any) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    getLowStock: async () => {
        const response = await api.get('/products/low-stock');
        return response.data;
    },
};
