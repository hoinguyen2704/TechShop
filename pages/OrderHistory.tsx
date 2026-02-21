import React from 'react';
import { FiPackage, FiClock, FiCheckCircle, FiXCircle, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Realistic mock orders simulating fetching from backend
const MOCK_ORDERS = [
  {
    id: 'ORD-2026-8821',
    date: 'Oct 24, 2026',
    status: 'Delivered',
    total: 3598,
    items: [
      { name: 'MacBook Pro 16" M3 Max', price: 3299, qty: 1, image: 'https://images.unsplash.com/photo-1517336975676-a8fa30807779?auto=format&fit=crop&w=100&q=80' },
      { name: 'Sony WH-1000XM5', price: 299, qty: 1, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=100&q=80' }
    ]
  },
  {
    id: 'ORD-2026-9902',
    date: 'Nov 02, 2026',
    status: 'Processing',
    total: 1099,
    items: [
      { name: 'iPhone 15 Pro Max Titanium', price: 1099, qty: 1, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80' }
    ]
  },
  {
    id: 'ORD-2025-0891',
    date: 'Dec 15, 2025',
    status: 'Cancelled',
    total: 179,
    items: [
      { name: 'Keychron Q1 Pro', price: 179, qty: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=100&q=80' }
    ]
  }
];

const OrderHistory = () => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered': return <FiCheckCircle />;
      case 'Processing': return <FiClock />;
      case 'Cancelled': return <FiXCircle />;
      default: return <FiPackage />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
           <FiShoppingBag size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <p className="text-gray-500">Track and manage your recent purchases.</p>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
             {/* Header */}
             <div className="bg-gray-50/50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100">
               <div className="grid grid-cols-2 md:flex md:flex-row gap-6 md:gap-10 w-full md:w-auto">
                 <div className="flex flex-col gap-1">
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order ID</span>
                   <span className="font-mono font-bold text-gray-800">{order.id}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date Placed</span>
                   <span className="font-medium text-gray-800">{order.date}</span>
                 </div>
                 <div className="flex flex-col gap-1">
                   <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</span>
                   <span className="font-bold text-blue-600 text-lg">${order.total.toLocaleString()}</span>
                 </div>
               </div>
               
               <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
               </div>
             </div>

             {/* Items */}
             <div className="p-6">
               <div className="flex flex-col gap-6">
                 {order.items.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4 group">
                     <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-200 shadow-sm group-hover:border-cyan-200 transition">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <h4 className="font-semibold text-gray-800 truncate group-hover:text-cyan-600 transition">{item.name}</h4>
                       <p className="text-sm text-gray-500">Qty: {item.qty} &times; ${item.price.toLocaleString()}</p>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-sm text-gray-500">
                   <span className="font-medium text-gray-700">{order.items.length}</span> items
                 </p>
                 <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                       Support
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 shadow-sm">
                       View Invoice <FiArrowRight />
                    </button>
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/products" className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 hover:border-gray-400 hover:text-black transition transform hover:-translate-y-1 shadow-sm">
          Continue Shopping <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OrderHistory;