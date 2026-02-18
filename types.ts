export enum RoleId {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: { roleName: RoleId };
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  id: string;
  imageName: string;
  url: string;
}

export interface Product {
  id: string; // SP001
  title: string;
  originPrice: number;
  salePrice: number;
  discount: number;
  description: string;
  quantity: number;
  category: Category;
  images: ProductImage[]; // Mapped from backend relations
  thumbnail: string; // Helper for frontend
}

export interface CartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
  classify?: string;
}

export interface PaginationDTO<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    lastPage: number;
    total: number;
  };
}

export interface AuthResponse {
  token: string;
  id: string;
  fullName: string;
  role: string; // Usually decoded from token or sent by backend
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}
