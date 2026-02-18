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
        console.warn("Backend unavailable (Network Error), using mock data for Product List.");
        
        // Fallback for demo products
        setProducts(Array.from({length:8}).map((_,i) => ({
            id: `P${i}`, title: `Product ${i}`, originPrice: 100, salePrice: 90, discount: 10, 
            description: '', quantity: 10, category: {id:'1', name:'Test'}, images: [], thumbnail: ''
        })));
        
        // Fallback for demo categories
        setCategories([
          { id: '1', name: 'Electronics' },
          { id: '2', name: 'Fashion' },
          { id: '3', name: 'Home & Living' },
          { id: '4', name: 'Accessories' }
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
              <li className="cursor-pointer hover:text-[#1976D2] font-medium text-[#1976D2]">All Categories</li>
              {categories.map(cat => (
                <li key={cat.id} className="cursor-pointer hover:text-[#1976D2]">
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b">Price Range</h3>
             <div className="space-y-2">
               <label className="flex items-center space-x-2">
                 <input type="checkbox" className="rounded text-[#1976D2]" />
                 <span className="text-sm text-gray-600">Under $50</span>
               </label>
               <label className="flex items-center space-x-2">
                 <input type="checkbox" className="rounded text-[#1976D2]" />
                 <span className="text-sm text-gray-600">$50 - $100</span>
               </label>
               <label className="flex items-center space-x-2">
                 <input type="checkbox" className="rounded text-[#1976D2]" />
                 <span className="text-sm text-gray-600">Above $100</span>
               </label>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              
              {/* Pagination UI */}
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page===1}>Prev</button>
                <button className="px-3 py-1 border rounded bg-[#1976D2] text-white">1</button>
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