import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Helper to handle image fallback or parsing
  const getImageUrl = (product: Product) => {
    // If backend returns a full URL in thumbnail
    if (product.thumbnail && product.thumbnail.startsWith('http')) return product.thumbnail;
    // Mock image for demo
    return `https://picsum.photos/seed/${product.id}/300/300`;
  };

  const hasDiscount = product.discount > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={getImageUrl(product)} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round(product.discount)}%
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3">
          <Link 
            to={`/products/${product.id}`}
            className="p-3 bg-white text-gray-800 rounded-full hover:bg-[#1976D2] hover:text-white transition"
            title="View Details"
          >
            <FiEye size={18} />
          </Link>
          <button 
            onClick={() => addToCart(product, 1)}
            className="p-3 bg-white text-gray-800 rounded-full hover:bg-[#1976D2] hover:text-white transition"
            title="Add to Cart"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category?.name || 'Category'}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-gray-800 font-semibold mb-2 truncate hover:text-[#1976D2] transition">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-end gap-2">
          <span className="text-[#1976D2] font-bold text-lg">
            ${(hasDiscount ? product.salePrice : product.originPrice).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 text-sm line-through">
              ${product.originPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;