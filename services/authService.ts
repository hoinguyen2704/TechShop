import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User, RoleId } from '../types';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  // MOCK: Handle demo accounts without backend
  const userName = data.userName?.trim();
  const password = data.password?.trim();

  if ((userName === 'demouser' || userName === 'customer@springshop.demo') && (password === 'demo123' || password === 'demouser')) {
    return Promise.resolve({
      id: 'mock-user-id',
      token: 'mock-jwt-token-user',
      fullName: 'Demo Customer',
      role: RoleId.USER
    });
  }
  if ((userName === 'demoadmin' || userName === 'admin@springshop.demo') && (password === 'admin123' || password === 'demoadmin')) {
    return Promise.resolve({
      id: 'mock-admin-id',
      token: 'mock-jwt-token-admin',
      fullName: 'System Administrator',
      role: RoleId.ADMIN
    });
  }

  const response = await api.post('/users/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const getProfile = async (id: string): Promise<User> => {
  // MOCK: Handle demo accounts without backend
  if (id === 'mock-user-id') {
    return Promise.resolve({
      id: 'mock-user-id',
      userName: 'demouser',
      fullName: 'Demo Customer',
      email: 'customer@springshop.demo',
      phoneNumber: '0909123456',
      address: '456 Tech Street, Digital City',
      role: { roleName: RoleId.USER },
      avatar: 'https://i.pravatar.cc/150?img=11'
    });
  }
  if (id === 'mock-admin-id') {
     return Promise.resolve({
      id: 'mock-admin-id',
      userName: 'demoadmin',
      fullName: 'System Administrator',
      email: 'admin@springshop.demo',
      phoneNumber: '0909999999',
      address: 'HQ SpringShop, Silicon Valley',
      role: { roleName: RoleId.ADMIN },
      avatar: 'https://i.pravatar.cc/150?img=3'
    });
  }

  const response = await api.get(`/users/${id}`);
  return response.data;
};