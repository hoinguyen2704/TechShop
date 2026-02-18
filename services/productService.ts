import api from './api';
import { Product, PaginationDTO, Category } from '../types';

export const getProducts = async (page = 0, perPage = 10): Promise<PaginationDTO<Product>> => {
  // In a real app, this hits /products. 
  // For demo if backend isn't running, we might need error handling, 
  // but we assume backend contract.
  const response = await api.get(`/products?page=${page}&perPage=${perPage}`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getBestSellers = async (): Promise<Product[]> => {
  const response = await api.get('/products/best-seller');
  return response.data;
};

export const getSaleProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/sale');
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

export const searchProducts = async (keyword: string): Promise<PaginationDTO<Product>> => {
  const response = await api.get(`/products/search?keyword=${keyword}`);
  return response.data;
};
