export const employeeService = {
  getAll(): Promise<any[]> {
    return Promise.resolve([]);
  },
  getById(id: number): Promise<any> {
    return Promise.resolve(id as any);
  },
  create(data: any): Promise<any> {
    return Promise.resolve(data);
  },
  update(id: number, data: any): Promise<any> {
    return Promise.resolve({id, data});
  },
  delete(id: number): Promise<any> {
    return Promise.resolve(id as any);
  }
};
