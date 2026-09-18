import React from 'react';

interface NavbarProps {
  onOpenReport: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenReport }) => {
  return (
    <nav className="bg-[#FF9933] shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          {/* Logo Ab White + Navy Blue combo me hoga */}
          <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
            Citizen <span className="text-blue-900">Swidha</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-white hover:text-blue-900 font-bold transition-colors">
            Live Routes
          </button>
          <button 
            onClick={onOpenReport} 
            className="bg-white text-[#FF9933] px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-gray-100 transition-colors"
          >
            Report Crowd
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;