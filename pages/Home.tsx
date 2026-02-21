import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getBestSellers, getSaleProducts } from '../services/productService';
import { Product } from '../types';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiSmartphone, FiMonitor, FiCpu } from 'react-icons/fi';

// Realistic Tech Data
const MOCK_BEST_SELLERS: Product[] = [
  {
    id: 'L001',
    title: 'MacBook Pro 16" M3 Max',
    originPrice: 3499,
    salePrice: 3299,
    discount: 5,
    description: 'Chip M3 Max (16-core CPU, 40-core GPU), RAM 48GB, SSD 1TB. Space Black.',
    quantity: 15,
    category: { id: '1', name: 'Laptops' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1517336975676-a8fa30807779?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'P001',
    title: 'iPhone 15 Pro Max Titanium',
    originPrice: 1199,
    salePrice: 1099,
    discount: 8,
    description: 'Titanium design, A17 Pro chip, 5x Telephoto camera.',
    quantity: 45,
    category: { id: '2', name: 'Phones' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'A001',
    title: 'Sony WH-1000XM5 ANC',
    originPrice: 349,
    salePrice: 299,
    discount: 14,
    description: 'Industry-leading noise canceling headphones.',
    quantity: 100,
    category: { id: '3', name: 'Audio' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'G001',
    title: 'Keychron Q1 Pro Wireless',
    originPrice: 199,
    salePrice: 179,
    discount: 10,
    description: 'QMK/VIA Wireless Custom Mechanical Keyboard.',
    quantity: 30,
    category: { id: '5', name: 'Gear' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=800&q=80'
  }
];

const MOCK_SALE_PRODUCTS: Product[] = [
  {
    id: 'A002',
    title: 'Marshall Stanmore III',
    originPrice: 379,
    salePrice: 300,
    discount: 20,
    description: 'Legendary sound, wireless bluetooth speaker.',
    quantity: 25,
    category: { id: '3', name: 'Audio' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'G002',
    title: 'Logitech MX Master 3S',
    originPrice: 99,
    salePrice: 89,
    discount: 10,
    description: 'Performance wireless mouse, 8K DPI.',
    quantity: 150,
    category: { id: '5', name: 'Gear' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'P002',
    title: 'Samsung Galaxy S24 Ultra',
    originPrice: 1299,
    salePrice: 1150,
    discount: 11,
    description: 'Galaxy AI, 200MP Camera, S-Pen included.',
    quantity: 40,
    category: { id: '2', name: 'Phones' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'L002',
    title: 'ASUS ROG Strix SCAR 18',
    originPrice: 2899,
    salePrice: 2699,
    discount: 7,
    description: 'Intel Core i9-14900HX, RTX 4090, 18" Nebula HDR.',
    quantity: 10,
    category: { id: '1', name: 'Laptops' },
    images: [],
    thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
  }
];

const Home = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching real data
        const best = await getBestSellers();
        setBestSellers(best.length ? best : MOCK_BEST_SELLERS);
        
        const sales = await getSaleProducts();
        setSaleProducts(sales.length ? sales : MOCK_SALE_PRODUCTS);
      } catch (error) {
        // Gracefully handle network errors by falling back to mocks
        console.warn("Backend unavailable (Network Error), switching to mock data for Home page.");
        setBestSellers(MOCK_BEST_SELLERS);
        setSaleProducts(MOCK_SALE_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  return (
    <div className="space-y-12 pb-12 bg-gray-50">
      {/* Tech Banner */}
      <div className="relative bg-gray-900 text-white h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80" 
            alt="Tech Banner" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-block px-3 py-1 mb-4 border border-cyan-500 rounded-full text-cyan-400 text-sm font-mono tracking-wider bg-cyan-900/20 backdrop-blur-sm">
              NEW ARRIVALS 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Future Tech <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                In Your Hands
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-light max-w-lg">
              Experience the next generation of electronics. High performance, sleek design, and cutting-edge innovation.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/products"
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-cyan-50 transition shadow-lg inline-flex items-center gap-2 transform hover:-translate-y-1"
              >
                Shop Now <FiArrowRight />
              </Link>
              <Link 
                to="/promotions"
                className="border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm"
              >
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: FiTruck, title: "Fast Delivery", text: "Global shipping" },
            { icon: FiShield, title: "Warranty", text: "2 years guarantee" },
            { icon: FiRefreshCw, title: "Easy Returns", text: "30 days policy" },
            { icon: FiHeadphones, title: "Expert Support", text: "Tech specialists" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 flex items-start gap-4 hover:transform hover:-translate-y-1 transition duration-300">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl text-white shrink-0 shadow-md">
                <feature.icon className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Laptops", icon: FiMonitor, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80" },
            { name: "Phones", icon: FiSmartphone, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
            { name: "Audio", icon: FiHeadphones, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80" },
            { name: "Accessories", icon: FiCpu, img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80" }
          ].map((cat, idx) => (
            <Link to={`/products?category=${cat.name}`} key={idx} className="group relative h-48 rounded-2xl overflow-hidden shadow-sm">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                <div className="text-white font-bold text-xl flex items-center gap-2">
                   <cat.icon /> {cat.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 rounded"></div>
          </div>
          <Link to="/products" className="text-cyan-600 font-semibold hover:text-cyan-800 transition flex items-center gap-1 group">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
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
            <h2 className="text-3xl font-bold text-gray-800">Tech Deals</h2>
             <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-orange-500 mt-2 rounded"></div>
          </div>
          <Link to="/products" className="text-cyan-600 font-semibold hover:text-cyan-800 transition flex items-center gap-1 group">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-[#0f172a] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Ahead of the Curve</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Subscribe to get the latest tech news, early access to sales, and exclusive coupons.
            </p>
            <div className="flex justify-center max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:from-cyan-400 hover:to-blue-500 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;