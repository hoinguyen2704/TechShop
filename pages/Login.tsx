import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginService({ userName, password });
      login(data);
      if (data.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleDemoLogin = (role: 'USER' | 'ADMIN') => {
    // Simulate a login response
    const mockId = role === 'ADMIN' ? 'mock-admin-id' : 'mock-user-id';
    const mockResponse = {
      token: 'mock-jwt-token-' + role,
      id: mockId,
      fullName: role === 'ADMIN' ? 'System Admin' : 'Demo Customer',
      role: role
    };
    
    login(mockResponse);
    if (role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#1976D2] mb-6">Welcome Back</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1976D2] focus:outline-none"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1976D2] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1976D2] hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Login
          </button>
        </form>
        
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">Or try demo account</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleDemoLogin('USER')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition text-sm"
          >
            Demo User
          </button>
          <button 
            onClick={() => handleDemoLogin('ADMIN')}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded transition text-sm"
          >
            Demo Admin
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-[#1976D2] font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;