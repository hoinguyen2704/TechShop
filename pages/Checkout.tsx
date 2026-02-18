import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { totalPrice } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    note: '',
    paymentMethod: 'COD'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order created successfully! (Mock)');
    // Implementation: POST /api/v1/orders
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Shipping Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea 
                  required
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea 
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={2}
                  value={formData.note}
                  onChange={e => setFormData({...formData, note: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Review */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                  className="text-blue-600"
                />
                <span className="ml-3 font-medium">Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  value="VNPAY"
                  checked={formData.paymentMethod === 'VNPAY'}
                  onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                  className="text-blue-600"
                />
                <span className="ml-3 font-medium">Pay via VNPay</span>
                <img src="https://vnpay.vn/assets/img/logo-primary.svg" className="h-6 ml-auto" alt="VNPay" />
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
             <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total Amount</span>
                <span className="text-[#1976D2]">${totalPrice.toLocaleString()}</span>
             </div>
             <button type="submit" className="w-full bg-[#1976D2] hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition">
               Place Order
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;