import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    }
  };

  const navLinkClass = (path: string) => 
    `font-medium transition hover:text-cyan-100 ${location.pathname === path ? 'text-white underline underline-offset-4 decoration-2 decoration-cyan-300' : 'text-blue-50'}`;

  return (
    // Updated with gradient background
    <header className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-white text-blue-600 px-2 py-1 rounded-md text-xl">S</span>
          SpringShop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/products" className={navLinkClass('/products')}>Shop</Link>
          <Link to="/promotions" className={navLinkClass('/promotions')}>Promotions</Link>
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search tech..."
              className="w-full py-2 px-4 rounded-full text-gray-800 bg-blue-50/10 border border-white/30 placeholder-blue-100 text-white focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-cyan-300 transition-all"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2.5 text-blue-100 hover:text-white">
              <FiSearch size={20} />
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart" className="relative hover:text-cyan-100 transition group">
            <FiShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-blue-600">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-cyan-100 focus:outline-none transition">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/50 backdrop-blur-md">
                  <FiUser />
                </div>
                <span className="text-sm font-medium hidden lg:block">{user?.fullName || 'User'}</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
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
              <Link to="/login" className="hover:text-cyan-100 font-medium transition">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 px-5 py-2 rounded-full font-bold hover:bg-cyan-50 transition shadow-lg hover:shadow-cyan-500/30">
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
        <div className="md:hidden bg-blue-800 px-4 py-4 space-y-4 shadow-inner absolute w-full left-0 border-t border-blue-600">
          <form onSubmit={handleSearch} className="relative">
             <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-md text-gray-800"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <Link to="/" className="block text-white py-2 border-b border-blue-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block text-white py-2 border-b border-blue-700" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/promotions" className="block text-white py-2 border-b border-blue-700" onClick={() => setIsMobileMenuOpen(false)}>Promotions</Link>
          
          <Link to="/cart" className="flex items-center text-white py-2 border-b border-blue-700" onClick={() => setIsMobileMenuOpen(false)}>
             Cart <span className="ml-2 bg-pink-500 rounded-full px-2 text-xs">{totalItems}</span>
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