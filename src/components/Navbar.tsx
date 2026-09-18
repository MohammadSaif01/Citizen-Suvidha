import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg'; // Tumhara logo yahan import kiya hai

interface NavbarProps {
  onOpenReport: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenReport }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
  
      {/* Standard Image Tag */}
      <img src={logo} alt="Dada Dadi Logo" className="w-10 h-10 object-contain drop-shadow-md" />

    <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
        Citizen <span className="text-blue-900">Swidha</span>
      </span>
  </div>

        {/* Buttons & Actions Section */}
        <div className="flex items-center gap-3 md:gap-4">
          
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs text-white/90 font-medium tracking-wide mb-1">
              {timeStr} • {dateStr} 
            </span>
            <button className="text-white hover:text-blue-900 font-bold transition-colors text-sm">
              Live Routes
            </button>
          </div>
          
          <button 
            onClick={onOpenReport} 
            className="bg-white text-[#FF9933] px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-gray-100 transition-colors"
          >
            Report Crowd
          </button>

          <button className="text-white font-bold border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#FF9933] transition-all shadow-sm">
            Login/Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;