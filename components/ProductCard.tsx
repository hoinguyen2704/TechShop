import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { FiShoppingCart, FiEye, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  // Helper to handle image fallback or parsing
  const getImageUrl = (product: Product) => {
    // If backend returns a full URL in thumbnail
    if (product.thumbnail && product.thumbnail.startsWith('http')) return product.thumbnail;
    
    // Tech-themed fallback based on ID to maintain consistency
    // Simple hash to pick an image from a list
    const techImages = [
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1588872657578-838832534675?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80'
    ];
    
    // Very simple hash to pick random image consistently for same ID
    const index = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % techImages.length;
    
    return techImages[index];
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigation to detail page when clicking button
    e.preventDefault(); 
    e.stopPropagation();

    if (!isAuthenticated) {
      if (confirm('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Đăng nhập ngay?')) {
        navigate('/login');
      }
      return;
    }
    
    addToCart(product, 1);
    
    // Visual Feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const hasDiscount = product.discount > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={getImageUrl(product)} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            -{Math.round(product.discount)}%
          </div>
        )}
        
        {/* Overlay Actions (Desktop hover) */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3 backdrop-blur-[2px]">
          <Link 
            to={`/products/${product.id}`}
            className="p-3 bg-white text-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition shadow-lg transform hover:scale-110"
            title="View Details"
          >
            <FiEye size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category?.name || 'Tech'}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-gray-800 font-semibold mb-2 truncate hover:text-cyan-600 transition">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-end gap-2 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-lg">
            ${(hasDiscount ? product.salePrice : product.originPrice).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 text-sm line-through">
              ${product.originPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Visible Add to Cart Button with Feedback */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`mt-auto w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md ${
            isAdded 
              ? 'bg-green-500 text-white shadow-green-200 scale-95' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 active:scale-95 hover:shadow-lg'
          }`}
        >
          {isAdded ? (
            <><FiCheck size={16} /> Đã thêm</>
          ) : (
            <><FiShoppingCart size={16} /> Thêm vào giỏ</>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;