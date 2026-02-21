import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiPhone, FiMapPin, FiShield, FiEdit2 } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();

  // Fallback data if context user is partial (e.g. from backend without all fields)
  const displayUser = {
    avatar: user?.avatar || 'https://i.pravatar.cc/150?img=11',
    fullName: user?.fullName || 'User Name',
    email: user?.email || 'user@example.com',
    phoneNumber: user?.phoneNumber || 'Not provided',
    address: user?.address || 'Not provided',
    role: user?.role?.roleName || 'USER',
    username: user?.userName || 'username'
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account information and preferences.</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
        
        <div className="px-8 pb-8">
          {/* Header Section */}
          <div className="relative flex flex-col md:flex-row justify-between items-end md:items-end -mt-12 mb-8 gap-4">
            <div className="relative">
               <img 
                src={displayUser.avatar} 
                alt="Profile" 
                className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-white object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1 md:ml-4 mb-1">
               <h2 className="text-2xl font-bold text-gray-900">{displayUser.fullName}</h2>
               <p className="text-gray-500 font-medium">@{displayUser.username}</p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition text-sm flex items-center gap-2">
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="mb-8">
             <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                <FiShield className="mr-1.5" /> {displayUser.role} Account
             </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Contact Information</h3>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition duration-300 group">
                <div className="w-10 h-10 bg-white rounded-lg text-blue-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <FiMail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-0.5">Email Address</p>
                  <p className="text-gray-800 font-medium truncate">{displayUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition duration-300 group">
                <div className="w-10 h-10 bg-white rounded-lg text-blue-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-0.5">Phone Number</p>
                  <p className="text-gray-800 font-medium">{displayUser.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Shipping Details</h3>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition duration-300 group h-full">
                <div className="w-10 h-10 bg-white rounded-lg text-blue-600 shadow-sm flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition">
                    <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-0.5">Default Address</p>
                  <p className="text-gray-800 font-medium leading-relaxed">{displayUser.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;