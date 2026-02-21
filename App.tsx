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
import AuthPage from './pages/AuthPage';
import Checkout from './pages/Checkout';
import Promotions from './pages/Promotions';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/Layout/AdminLayout';
import ChatBot from './components/ChatBot';

// Layout wrapper for Public/User pages with ChatBot included
const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gray-50 relative">
      <Outlet />
      <ChatBot />
    </main>
    <Footer />
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ role }: { role?: string }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
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
            <Route path="/login" element={<React.Fragment><Header /><AuthPage /><Footer /></React.Fragment>} />
            <Route path="/register" element={<React.Fragment><Header /><AuthPage /><Footer /></React.Fragment>} />
            
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              
              {/* User Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-history" element={<OrderHistory />} />
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