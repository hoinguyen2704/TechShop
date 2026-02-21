import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/productService';
import { Product, Category } from '../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  
  // Fake pagination state for UI
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInit = async () => {
      setLoading(true);
      try {
        const [prodData, catData] = await Promise.all([
          getProducts(0, 12),
          getCategories()
        ]);
        setProducts(prodData.data || []);
        setCategories(catData || []);
      } catch (e) {
        console.warn("Backend unavailable (Network Error), using realistic mock data for Product List.");
        
        // Detailed Real Mock Data
        const realMockProducts: Product[] = [
          {
            id: 'L003',
            title: 'Dell XPS 13 Plus',
            originPrice: 1399,
            salePrice: 1299,
            discount: 7,
            description: 'OLED 3.5K Touch, 12th Gen Intel Core i7, 16GB RAM, 512GB SSD.',
            quantity: 20,
            category: { id: '1', name: 'Laptops' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f78536709c1?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'L004',
            title: 'LG Gram Style 16',
            originPrice: 1499,
            salePrice: 1399,
            discount: 6,
            description: 'Ultra-lightweight, 16" OLED 120Hz, Iridescent Finish.',
            quantity: 12,
            category: { id: '1', name: 'Laptops' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1531297461136-82lw9f2010?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'P003',
            title: 'Google Pixel 8 Pro',
            originPrice: 999,
            salePrice: 899,
            discount: 10,
            description: 'Google AI, Best Take camera features, 7 years of updates.',
            quantity: 35,
            category: { id: '2', name: 'Phones' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'P004',
            title: 'Xiaomi 14 Ultra',
            originPrice: 1099,
            salePrice: 1099,
            discount: 0,
            description: 'Leica Summilux Lens, 1-inch sensor, Snapdragon 8 Gen 3.',
            quantity: 10,
            category: { id: '2', name: 'Phones' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'A003',
            title: 'AirPods Pro 2 (USB-C)',
            originPrice: 249,
            salePrice: 229,
            discount: 8,
            description: 'Active Noise Cancellation, Adaptive Audio, USB-C MagSafe Case.',
            quantity: 80,
            category: { id: '3', name: 'Audio' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1588156979435-379b9d802b0a?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'A004',
            title: 'JBL PartyBox 310',
            originPrice: 549,
            salePrice: 499,
            discount: 9,
            description: '240W Pro Sound, Dynamic Light Show, 18-hour Battery.',
            quantity: 8,
            category: { id: '3', name: 'Audio' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1519506455365-5c1a1795b682?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'G003',
            title: 'Logitech G Pro X Superlight 2',
            originPrice: 159,
            salePrice: 149,
            discount: 6,
            description: 'Ultra-lightweight 60g, HERO 2 Sensor, 2000Hz Polling.',
            quantity: 60,
            category: { id: '5', name: 'Gear' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'G004',
            title: 'Anker Prime 20000mAh',
            originPrice: 129,
            salePrice: 110,
            discount: 15,
            description: '200W Output, Smart Digital Display, 100W Input.',
            quantity: 100,
            category: { id: '6', name: 'Accessories' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1609592425026-6136d246604d?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'L001',
            title: 'MacBook Pro 16" M3 Max',
            originPrice: 3499,
            salePrice: 3299,
            discount: 5,
            description: 'Chip M3 Max (16-core CPU, 40-core GPU), RAM 48GB, SSD 1TB.',
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
            id: 'G001',
            title: 'Keychron Q1 Pro',
            originPrice: 199,
            salePrice: 179,
            discount: 10,
            description: 'Wireless Mechanical Keyboard, Aluminum Body.',
            quantity: 30,
            category: { id: '5', name: 'Gear' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'A001',
            title: 'Sony WH-1000XM5',
            originPrice: 349,
            salePrice: 299,
            discount: 14,
            description: 'Industry-leading noise canceling headphones.',
            quantity: 100,
            category: { id: '3', name: 'Audio' },
            images: [],
            thumbnail: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
          }
        ];

        setProducts(realMockProducts);
        
        // Realistic Categories
        setCategories([
          { id: '1', name: 'Laptops' },
          { id: '2', name: 'Phones' },
          { id: '3', name: 'Audio' },
          { id: '4', name: 'Cameras' },
          { id: '5', name: 'Gear' },
          { id: '6', name: 'Accessories' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchInit();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer hover:text-cyan-600 font-medium text-cyan-600">All Categories</li>
              {categories.map(cat => (
                <li key={cat.id} className="cursor-pointer hover:text-cyan-600">
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Price Range</h3>
             <div className="space-y-2">
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" />
                 <span className="text-sm text-gray-600">Under $50</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" />
                 <span className="text-sm text-gray-600">$50 - $100</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-cyan-600 focus:ring-cyan-500" />
                 <span className="text-sm text-gray-600">Above $100</span>
               </label>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-cyan-500">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading products...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              
              {/* Pagination UI */}
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50" disabled={page===1}>Prev</button>
                <button className="px-3 py-1 border rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none shadow-md">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;