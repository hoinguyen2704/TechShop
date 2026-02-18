import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { FiMinus, FiPlus, FiShoppingCart, FiStar } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!id) return;
    getProductById(id)
      .then(data => setProduct(data))
      .catch(() => {
        console.warn("Backend unavailable (Network Error), using mock data for Product Detail.");
        // Fallback
        setProduct({
          id: id, title: 'Mock Product Detail', originPrice: 200, salePrice: 150, discount: 25,
          description: 'This is a detailed description of the product. It is very high quality.', quantity: 50,
          category: {id: '1', name: 'Tech'}, images: [], thumbnail: ''
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-12 text-center">Loading...</div>;
  if (!product) return <div className="p-12 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
               <img 
                 src={product.thumbnail || `https://picsum.photos/seed/${product.id}/600/600`} 
                 alt={product.title} 
                 className="w-full h-full object-cover"
               />
            </div>
            {/* Thumbnails list would go here */}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar className="text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">(12 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-[#1976D2]">${product.salePrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originPrice}</span>
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
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-semibold transition">
                ❤️
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Tab Section could go here */}
    </div>
  );
};

export default ProductDetail;