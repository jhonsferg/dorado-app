import api from '@/services/api/index.ts';

export const employeeService = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/employees');
    return response.data;
  },
  getById: async (employeeId: number): Promise<any> => {
    const response = await api.get(`/employees/${employeeId}`);
    return response.data;
  },
  create: async (employee: any): Promise<any> => {
    const response = await api.post(`/employees`, employee);
    return response.data;
  },
  update: async (id: number, employee: any): Promise<any> => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
  },
  delete: async (id: number): Promise<any> => {
    const response = await api.delete(`/employee/${id}`);
    return response.data;
  },
};
