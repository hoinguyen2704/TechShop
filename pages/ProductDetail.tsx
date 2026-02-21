import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { FiMinus, FiPlus, FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if(!id) return;
    getProductById(id)
      .then(data => setProduct(data))
      .catch(() => {
        console.warn("Backend unavailable (Network Error), using mock data for Product Detail.");
        // Fallback Detailed Product
        setProduct({
          id: id, 
          title: 'MacBook Pro 16" M3 Max', 
          originPrice: 3499, 
          salePrice: 3299, 
          discount: 5,
          description: 'The most powerful MacBook Pro ever is here. Blazing-fast M3 Max chip. Massive battery life. Stunning Liquid Retina XDR display. It’s a pro laptop without equal. Features a 16-core CPU, 40-core GPU, 48GB Unified Memory, and 1TB SSD storage. The Space Black finish is designed to reduce fingerprints.', 
          quantity: 15,
          category: {id: '1', name: 'Laptops'}, 
          images: [], 
          thumbnail: 'https://images.unsplash.com/photo-1517336975676-a8fa30807779?auto=format&fit=crop&w=1200&q=80'
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      if (confirm('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Đăng nhập ngay?')) {
        navigate('/login');
      }
      return;
    }
    if (product) {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!product) return <div className="p-12 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shadow-inner">
               <img 
                 src={product.thumbnail || `https://picsum.photos/seed/${product.id}/600/600`} 
                 alt={product.title} 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-sm text-cyan-600 font-semibold mb-2 uppercase tracking-wide">{product.category.name}</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar className="text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">(42 verified reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">${product.salePrice.toLocaleString()}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originPrice.toLocaleString()}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">-{product.discount}%</span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-100 py-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q-1))}
                    className="p-2 hover:bg-gray-100 text-gray-600"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q+1)}
                    className="p-2 hover:bg-gray-100 text-gray-600"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{product.quantity} pieces available</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isAdded 
                  ? 'bg-green-500 shadow-green-200' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-blue-500/30'
                }`}
              >
                {isAdded ? (
                  <><FiCheck /> Đã thêm vào giỏ</>
                ) : (
                  <><FiShoppingCart /> Add to Cart</>
                )}
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-semibold transition">
                ❤️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;