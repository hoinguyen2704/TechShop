import React from 'react';
import PromotionSection from '../components/PromotionSection';
import { FiTag } from 'react-icons/fi';

const Promotions = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 rounded-full bg-white/10 mb-4 backdrop-blur-sm">
            <FiTag className="text-4xl text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Current Offers</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
            Grab the best deals on premium electronics and accessories. 
            Coupons update weekly!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <PromotionSection />
          
          <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Terms & Conditions</h3>
            <p className="text-blue-700/80 text-sm max-w-3xl mx-auto">
              All coupons are valid for a limited time only. One coupon per transaction. 
              Coupons cannot be combined with other offers unless stated otherwise. 
              Minimum purchase requirements apply for shipping discounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;