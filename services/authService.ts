import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/users/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const getProfile = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
