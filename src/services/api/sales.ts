import api from './index';

export const saleService = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/sales');
    return response.data;
  },
  getById: async (saleId: number): Promise<any> => {
    const response = await api.get(`/sales/${saleId}`);
    return response.data;
  },
  create: async (sale: any): Promise<any> => {
    const response = await api.post(`/sales`, sale);
    return response.data;
  },
  update: async (id: number, sale: any): Promise<any> => {
    const response = await api.put(`/sales/${id}`, sale);
    return response.data;
  },
  delete: async (id: number): Promise<any> => {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  },
};
