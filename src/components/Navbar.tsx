import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';

interface NavbarProps {
  onOpenReport: () => void;
  onOpenLogin: () => void; // <-- NAYA PROP ADD KIYA
}

const Navbar: React.FC<NavbarProps> = ({ onOpenReport, onOpenLogin }) => { // <-- YAHAN ADD KIYA
  const [currentTime, setCurrentTime] = useState(new Date());
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = currentTime.toLocaleDateString('en-IN', { 
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
  });
  const timeStr = currentTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });

  return (
    <nav className="bg-[#FF9933] shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Dada Dadi Logo" className="w-10 h-10 object-contain drop-shadow-md brightness-0 invert" />
          <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md hidden sm:block">
            Citizen <span className="text-blue-900">Suvidha</span>
          </span>
        </div>

        {/* Actions & Profile Section */}
        <div className="flex items-center gap-3 md:gap-5">
          
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-xs text-white/90 font-medium tracking-wide mb-1">
              {dateStr} • {timeStr}
            </span>
            <span className="text-white font-bold text-sm flex items-center gap-1">
              🟢 Live Tracking
            </span>
          </div>
          
          {/* Primary Action Button */}
          <button 
            onClick={onOpenReport} 
            className="bg-white text-[#FF9933] px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline">Report Crowd</span>
            <span className="sm:hidden">Report</span>
            <svg className="w-5 h-5 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
          </button>

          {/* Conditional Rendering: Logged In vs Logged Out */}
          {isLoggedIn ? (
            <div 
              onClick={() => setIsLoggedIn(false)}
              title="Click to Logout"
              className="flex items-center gap-2 bg-white/20 pl-3 pr-1 py-1 rounded-full border border-white/30 backdrop-blur-sm shadow-inner cursor-pointer hover:bg-white/30 transition-all animate-[fadeIn_0.4s_ease-out]"
            >
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-xs font-bold text-white leading-tight">Level 2</span>
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">🌟 150 Pts</span>
              </div>
              <div className="w-9 h-9 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
                MS
              </div>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin} // <-- YAHAN ONCLICK CHANGE KIYA
              className="text-white font-bold border-2 border-white/80 px-4 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-all shadow-sm animate-[fadeIn_0.4s_ease-out]"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;