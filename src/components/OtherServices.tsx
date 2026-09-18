import React, { useState, useRef, useEffect } from 'react';

const OtherServices: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Bahar click karne par dropdown close karne ke liye
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const services = [
    { icon: '🏥', name: 'Nearby Hospitals' },
    { icon: '🚓', name: 'Police Stations' },
    { icon: '🚒', name: 'Fire Emergency' },
    { icon: '💊', name: '24x7 Pharmacies' },
    { icon: '🚻', name: 'Public Washrooms' }
  ];

  return (
    <div className="relative z-30" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 text-[#000080] px-5 py-2.5 rounded-xl font-extrabold shadow-sm hover:bg-white transition-all active:scale-95"
      >
        <svg className="w-5 h-5 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" /></svg>
        Other Services
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-3 animate-[fadeIn_0.2s_ease-out] overflow-hidden">
          <div className="px-4 pb-2 mb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Citizen Utilities</span>
          </div>
          {services.map((service, idx) => (
            <button key={idx} className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-blue-50 text-left transition-colors group">
              <span className="text-lg group-hover:scale-110 transition-transform">{service.icon}</span>
              <span className="text-sm font-bold text-gray-700 group-hover:text-[#000080]">{service.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherServices;