import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-gray-300 relative">
      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 w-full absolute top-0"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div>
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 block tracking-tight">
              SpringShop
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              SpringShop is your premier destination for high-quality electronics, fashion, and lifestyle products. We are dedicated to providing the best shopping experience with 24/7 support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 text-white transition duration-300"><FiFacebook size={18} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 text-white transition duration-300"><FiInstagram size={18} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-cyan-500 text-white transition duration-300"><FiTwitter size={18} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 text-white transition duration-300"><FiYoutube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Shop Products</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">My Cart</Link></li>
              <li><Link to="/checkout" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Checkout</Link></li>
              <li><Link to="/order-history" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Order History</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
           <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Customer Care
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition duration-200">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-cyan-400 mt-1 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">123 Tech Avenue, Silicon Valley, CA 94000, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-cyan-400 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">+84 987 654 321</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-cyan-400 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">support@springshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SpringShop. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;