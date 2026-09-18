import React from 'react';
import logo from '../assets/logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#138808] text-white pt-10 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            {/* White version of Dada-Dadi Logo using filter */}
            <img 
              src={logo} 
              alt="Dada Dadi Logo" 
              className="w-10 h-10 object-contain brightness-0 invert opacity-90" 
            />
            <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-sm">
              Citizen <span className="text-[#FF9933]">Swidha</span>
            </h2>
          </div>
          <p className="text-sm text-green-100 font-medium max-w-xs text-center md:text-left">
            Empowering every citizen with smart, safe, and real-time transit updates.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-green-50 mt-2 md:mt-4">
          <a href="#" className="hover:text-[#FF9933] hover:underline transition-colors">How it Works</a>
          <a href="#" className="hover:text-[#FF9933] hover:underline transition-colors">Emergency Contacts</a>
          <a href="#" className="hover:text-[#FF9933] hover:underline transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FF9933] hover:underline transition-colors">Contact Team</a>
        </div>
      </div>
      
      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-white/20 text-center text-xs text-green-200 font-medium tracking-wide">
        © {new Date().getFullYear()} Citizen Swidha. Built with ❤️ for India.
      </div>
    </footer>
  );
};

export default Footer;