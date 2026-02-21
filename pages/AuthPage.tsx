import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService, register as registerService } from '../services/authService';
import { FiFacebook, FiLinkedin, FiChrome } from 'react-icons/fi';
import '../components/Auth/Auth.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState(''); // Treating username as email for demo or just generic 'username'
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const [error, setError] = useState('');

  // Determine initial mode based on URL
  useEffect(() => {
    if (location.pathname === '/register') {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [location.pathname]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // In a real app, you might check if input is email or username
      const data = await loginService({ userName: loginEmail, password: loginPassword });
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerService({
        userName: regEmail.split('@')[0], // Simple username generation
        password: regPassword,
        fullName: regName,
        email: regEmail,
        phoneNumber: regPhone || '0000000000'
      });
      alert('Registration successful! Please sign in.');
      setIsSignUp(false);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#f3f4f6] py-10">
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        
        {/* Sign Up Form */}
        <div className="form-container sign-up-container bg-white">
          <form onSubmit={handleRegister} className="flex flex-col items-center justify-center h-full px-12 text-center">
            <h1 className="font-bold text-3xl mb-4">Create Account</h1>
            <div className="social-container mb-4">
              <a href="#" className="social"><FiFacebook /></a>
              <a href="#" className="social"><FiChrome /></a>
              <a href="#" className="social"><FiLinkedin /></a>
            </div>
            <span className="text-xs text-gray-500 mb-4">or use your email for registration</span>
            {error && isSignUp && <div className="text-red-500 text-xs mb-2">{error}</div>}
            
            <input type="text" placeholder="Full Name" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
              value={regName} onChange={e => setRegName(e.target.value)} required />
            <input type="email" placeholder="Email" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
              value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
             <input type="text" placeholder="Phone (Optional)" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
              value={regPhone} onChange={e => setRegPhone(e.target.value)} />
            <input type="password" placeholder="Password" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
              value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
            
            <button className="mt-4 rounded-full border border-transparent bg-[#1976D2] text-white text-xs font-bold py-3 px-10 uppercase tracking-wider transition-transform hover:scale-105 focus:outline-none">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container bg-white">
          <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-full px-12 text-center">
            <h1 className="font-bold text-3xl mb-4">Sign in</h1>
            <div className="social-container mb-4">
              <a href="#" className="social"><FiFacebook /></a>
              <a href="#" className="social"><FiChrome /></a>
              <a href="#" className="social"><FiLinkedin /></a>
            </div>
            <span className="text-xs text-gray-500 mb-4">or use your account</span>
            {error && !isSignUp && <div className="text-red-500 text-xs mb-2">{error}</div>}
            
            <input type="text" placeholder="Username or Email" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
               value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="bg-gray-100 border-none px-4 py-3 my-2 w-full rounded outline-none" 
               value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            
            <a href="#" className="text-gray-800 text-sm my-4 border-b border-gray-400 pb-0.5 hover:text-[#1976D2]">Forgot your password?</a>
            <button className="mt-2 rounded-full border border-transparent bg-[#1976D2] text-white text-xs font-bold py-3 px-10 uppercase tracking-wider transition-transform hover:scale-105 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold text-3xl mb-4">Welcome Back!</h1>
              <p className="text-sm leading-relaxed mb-8 font-light">
                To keep connected with us please login with your personal info
              </p>
              <button 
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-10 uppercase tracking-wider hover:bg-white/20 transition"
                onClick={() => {
                  setIsSignUp(false);
                  navigate('/login');
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold text-3xl mb-4">Hello, Friend!</h1>
              <p className="text-sm leading-relaxed mb-8 font-light">
                Enter your personal details and start journey with us
              </p>
              <button 
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-10 uppercase tracking-wider hover:bg-white/20 transition"
                onClick={() => {
                  setIsSignUp(true);
                  navigate('/register');
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;