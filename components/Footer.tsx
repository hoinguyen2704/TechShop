import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SpringShop</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for premium products. Quality guaranteed, fast shipping, and excellent customer service.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#1976D2] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#1976D2] transition">Products</a></li>
              <li><a href="#" className="hover:text-[#1976D2] transition">About Us</a></li>
              <li><a href="#" className="hover:text-[#1976D2] transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-[#1976D2]" />
                123 E-commerce St, Tech City
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-[#1976D2]" />
                +84 987 654 321
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-[#1976D2]" />
                support@springshop.com
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#1976D2] transition"><FiFacebook size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#1976D2] transition"><FiInstagram size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#1976D2] transition"><FiTwitter size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SpringShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;