import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/Layout/AdminLayout';

// Layout wrapper for Public/User pages
const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gray-50">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ role }: { role?: string }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role === 'ADMIN' && !isAdmin) return <Navigate to="/" />;

  return <Outlet />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<div className="p-8 text-center">Register Page Placeholder</div>} />
              
              {/* User Protected */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<div className="p-8 text-center">Profile Page Placeholder</div>} />
                <Route path="/order-history" element={<div className="p-8 text-center">Order History Placeholder</div>} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute role="ADMIN" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<div className="p-8">Product Management Placeholder</div>} />
                <Route path="orders" element={<div className="p-8">Order Management Placeholder</div>} />
                <Route path="users" element={<div className="p-8">User Management Placeholder</div>} />
              </Route>
            </Route>
            
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;