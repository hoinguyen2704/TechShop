import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    }
  };

  return (
    <header className="bg-[#1976D2] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          SpringShop
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-[#1976D2]">
              <FiSearch size={20} />
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="hover:text-blue-100 font-medium">Shop</Link>
          
          <Link to="/cart" className="relative hover:text-blue-100">
            <FiShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-blue-100 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                  <FiUser />
                </div>
                <span className="text-sm font-medium">{user?.fullName || 'User'}</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {isAdmin && (
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                )}
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/order-history" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-blue-100 font-medium">Login</Link>
              <Link to="/register" className="bg-white text-[#1976D2] px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1565C0] px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="relative">
             <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-md text-gray-800"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <Link to="/products" className="block text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/cart" className="flex items-center text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
             Cart <span className="ml-2 bg-red-500 rounded-full px-2 text-xs">{totalItems}</span>
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin && <Link to="/admin/dashboard" className="block text-white py-2">Dashboard</Link>}
              <Link to="/profile" className="block text-white py-2">Profile</Link>
              <button onClick={logout} className="block w-full text-left text-white py-2 flex items-center gap-2">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
             <div className="flex gap-4 pt-2">
                <Link to="/login" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
             </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;