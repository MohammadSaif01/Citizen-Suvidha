import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: () => void;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose, onAdminLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'citizen' | 'admin'>('citizen');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin && role === 'admin') {
      onAdminLogin();
      navigate('/admin');
    } else if (isLogin && role === 'citizen') {
      navigate('/citizen-panel');
    } else {
      console.log(`Register submitted as ${role}`);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        
        <div className="bg-gradient-to-r from-[#FF9933] to-[#e68a2e] p-6 text-center relative">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h2>
          <p className="text-orange-50 text-sm mt-1 font-medium">
            {isLogin ? 'Sign in to access real-time transit insights' : 'Join the Citizen Suvidha network today'}
          </p>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-100 bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          {isLogin && (
            <div className="flex bg-orange-50 p-1 rounded-xl mb-6 border border-orange-100">
              <button 
                type="button"
                onClick={() => setRole('citizen')} 
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${role === 'citizen' ? 'bg-white text-[#FF9933] shadow-sm border border-orange-100' : 'text-gray-500 hover:text-[#FF9933]'}`}
              >
                Citizen Login
              </button>
              <button 
                type="button"
                onClick={() => setRole('admin')} 
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${role === 'admin' ? 'bg-white text-[#FF9933] shadow-sm border border-orange-100' : 'text-gray-500 hover:text-[#FF9933]'}`}
              >
                Admin Login
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-bold mb-1.5 text-sm">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all" required />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-bold mb-1.5 text-sm">
                {role === 'admin' && isLogin ? 'Admin ID / Email' : 'Email or Phone Number'}
              </label>
              <input type="text" placeholder={role === 'admin' && isLogin ? 'admin@suvidha.in' : 'Enter email or phone'} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all" required />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1.5 text-sm">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all" required />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm font-bold text-[#FF9933] hover:underline">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 mt-4">
              {isLogin ? (role === 'admin' ? 'Secure Admin Login' : 'Citizen Login') : 'Register Now'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-medium text-gray-600 border-t border-gray-100 pt-6">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsLogin(false)} className="text-[#FF9933] font-bold hover:underline">Register</button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => setIsLogin(true)} className="text-[#FF9933] font-bold hover:underline">Login</button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;