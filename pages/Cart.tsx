import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-[#1976D2] hover:underline flex items-center justify-center gap-2">
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <table className="w-full">
            <thead className="border-b text-left text-sm text-gray-500">
              <tr>
                <th className="pb-4 font-medium">Product</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium">Quantity</th>
                <th className="pb-4 font-medium">Subtotal</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.productId}>
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <img src={item.productImage} alt={item.productTitle} className="w-16 h-16 object-cover rounded bg-gray-100" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.productTitle}</h3>
                        <p className="text-xs text-gray-500">{item.classify}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 text-gray-600">${item.price.toLocaleString()}</td>
                  <td className="py-6">
                    <div className="flex items-center border border-gray-300 rounded w-max">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="py-6 font-semibold text-gray-800">${(item.price * item.quantity).toLocaleString()}</td>
                  <td className="py-6 text-right">
                    <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="border-t pt-4 flex justify-between mb-6">
              <span className="font-bold text-gray-800 text-lg">Total</span>
              <span className="font-bold text-[#1976D2] text-lg">${totalPrice.toLocaleString()}</span>
            </div>

            <div className="mb-6">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="w-full p-2 border rounded mb-2 text-sm"
              />
              <button className="w-full bg-gray-100 text-gray-600 py-2 rounded text-sm hover:bg-gray-200">Apply Coupon</button>
            </div>

            <Link to="/checkout" className="block w-full bg-[#1976D2] hover:bg-blue-700 text-white text-center py-3 rounded-lg font-bold transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;