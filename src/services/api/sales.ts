export const saleService = {
  getAll(): Promise<any[]> {
    return Promise.resolve([]);
  },
  getById(productId: number): Promise<any> {
    return Promise.resolve(productId);
  },
  create(product: any): Promise<any> {
    return Promise.resolve(product);
  }
}
