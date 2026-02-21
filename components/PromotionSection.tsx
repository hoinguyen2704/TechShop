import React, { useState } from 'react';
import { FiCopy, FiPercent, FiGift, FiTruck, FiUsers, FiTag, FiCheck } from 'react-icons/fi';

const COUPONS = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Giảm 20% cho bộ sưu tập thời trang hè mới nhất.',
    code: 'SUMMER2026',
    icon: FiTag,
    gradient: 'from-orange-400 to-pink-500',
    lightColor: 'bg-orange-50 text-orange-700'
  },
  {
    id: 2,
    title: 'Tech Lover',
    description: 'Giảm 10% tối đa $50 cho các sản phẩm công nghệ.',
    code: 'TECHLOVER',
    icon: FiGift,
    gradient: 'from-blue-400 to-cyan-500',
    lightColor: 'bg-blue-50 text-blue-700'
  },
  {
    id: 3,
    title: 'Free Shipping',
    description: 'Miễn phí vận chuyển cho đơn hàng từ $50.',
    code: 'FREESHIP',
    icon: FiTruck,
    gradient: 'from-green-400 to-emerald-600',
    lightColor: 'bg-green-50 text-green-700'
  },
  {
    id: 4,
    title: 'New Member',
    description: 'Giảm $10 cho đơn hàng đầu tiên của bạn.',
    code: 'WELCOME10',
    icon: FiUsers,
    gradient: 'from-purple-500 to-indigo-600',
    lightColor: 'bg-purple-50 text-purple-700'
  },
  {
    id: 5,
    title: 'Accessory Bundle',
    description: 'Mua 2 phụ kiện giảm ngay 30% tổng hóa đơn.',
    code: 'ACCESSORY30',
    icon: FiPercent,
    gradient: 'from-red-400 to-rose-600',
    lightColor: 'bg-red-50 text-red-700'
  },
  {
    id: 6,
    title: 'Flash Sale Boost',
    description: 'Giảm thêm 5% cho các sản phẩm đang Flash Sale.',
    code: 'FLASHSALE',
    icon: FiGift,
    gradient: 'from-yellow-400 to-orange-500',
    lightColor: 'bg-yellow-50 text-yellow-800'
  }
];

const PromotionSection = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    // Reset copy status after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FiPercent className="text-pink-500 text-3xl" />
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
            Exclusive Offers
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COUPONS.map((coupon) => (
          <div key={coupon.id} className="bg-white rounded-xl shadow-md border-0 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6 flex-1 flex gap-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${coupon.gradient} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                <coupon.icon size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{coupon.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {coupon.description}
                </p>
              </div>
            </div>
            
            {/* Coupon Code Footer */}
            <div className={`px-6 py-4 ${coupon.lightColor} border-t border-dashed border-gray-200 flex items-center justify-between transition-colors duration-300 ${copiedId === coupon.id ? 'bg-green-100' : ''}`}>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide opacity-75">
                  {copiedId === coupon.id ? 'Copied to clipboard!' : 'Coupon Code'}
                </span>
                <span className="font-mono font-bold tracking-wider text-lg">{coupon.code}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(coupon.code, coupon.id)}
                className={`p-2 rounded-full transition-all active:scale-95 ${
                  copiedId === coupon.id 
                    ? 'bg-green-500 text-white' 
                    : 'hover:bg-white/50 text-gray-700'
                }`}
                title="Copy Code"
              >
                {copiedId === coupon.id ? <FiCheck size={20} /> : <FiCopy size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionSection;