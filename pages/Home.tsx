import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getBestSellers, getSaleProducts } from '../services/productService';
import { Product } from '../types';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

// Mock Data for fallback if backend isn't ready
const MOCK_PRODUCTS: Product[] = Array.from({ length: 4 }).map((_, i) => ({
  id: `SP00${i}`,
  title: `Premium Item ${i+1}`,
  originPrice: 100 * (i+1),
  salePrice: 80 * (i+1),
  discount: 20,
  description: 'Great product',
  quantity: 10,
  category: { id: '1', name: 'Electronics' },
  images: [],
  thumbnail: ''
}));

const Home = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching real data
        const best = await getBestSellers();
        setBestSellers(best.length ? best : MOCK_PRODUCTS);
        
        const sales = await getSaleProducts();
        setSaleProducts(sales.length ? sales : MOCK_PRODUCTS);
      } catch (error) {
        // Gracefully handle network errors by falling back to mocks
        console.warn("Backend unavailable (Network Error), switching to mock data for Home page.");
        setBestSellers(MOCK_PRODUCTS);
        setSaleProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="space-y-12 pb-12">
      {/* Banner */}
      <div className="relative bg-gray-900 text-white h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/600?grayscale" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Upgrade Your Life With <br/>
              <span className="text-[#64B5F6]">Premium Tech</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover the latest gadgets and accessories with unbeatable prices and warranty.
            </p>
            <Link 
              to="/products"
              className="bg-[#1976D2] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition inline-flex items-center gap-2"
            >
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: FiTruck, title: "Free Shipping", text: "On all orders over $200" },
            { icon: FiShield, title: "Secure Payment", text: "100% secure payment" },
            { icon: FiRefreshCw, title: "30 Days Return", text: "If goods have problems" },
            { icon: FiHeadphones, title: "24/7 Support", text: "Dedicated support" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
              <feature.icon className="text-[#1976D2] text-3xl shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Best Sellers</h2>
            <p className="text-gray-500 mt-2">Top products loved by our customers</p>
          </div>
          <Link to="/products" className="text-[#1976D2] font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sale Products */}
      <section className="container mx-auto px-4">
         <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Flash Sale</h2>
            <p className="text-gray-500 mt-2">Grab them before they're gone</p>
          </div>
          <Link to="/products" className="text-[#1976D2] font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1976D2] mb-4">Subscribe & Get 10% Off</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Join our newsletter to receive the latest updates and exclusive coupons directly in your inbox.
          </p>
          <div className="flex justify-center max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-[#1976D2]"
            />
            <button className="bg-[#1976D2] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;