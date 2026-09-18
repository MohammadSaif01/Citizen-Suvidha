import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const RouteSearch = () => {
  const [phase, setPhase] = useState(0);
  const [route, setRoute] = useState('');
  const defaultPosition: [number, number] = [28.6139, 77.2090]; 

  const handleOpen = () => {
    if (phase === 0) {
      setPhase(1); // Step 1: Slide smoothly to exact center
      setTimeout(() => setPhase(2), 300); // Step 2: Expand width (Search Bar)
      setTimeout(() => setPhase(3), 600); // Step 3: Expand height (Reveal Map)
    }
  };

  const handleClose = () => {
    setPhase(0); 
    setTimeout(() => setRoute(''), 500); // Clear text after closing animation
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tracking: ${route}`);
  };

  return (
    <>
      {/* Background Blur Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ease-out ${phase > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      ></div>

      {/* The Master Animating Container */}
      <div 
        onClick={() => phase === 0 && handleOpen()}
        className={`fixed top-24 z-50 overflow-hidden shadow-2xl transition-all duration-400 ease-out flex items-center justify-center
          ${phase === 0 ? 'right-6 translate-x-0 w-14 h-14 rounded-full bg-[#000080] text-white cursor-pointer hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,128,0.4)]' : ''}
          ${phase === 1 ? 'right-1/2 translate-x-1/2 w-14 h-14 rounded-full bg-[#000080] text-white' : ''}
          ${phase === 2 ? 'right-1/2 translate-x-1/2 w-[95vw] md:w-[650px] h-20 rounded-2xl bg-white' : ''}
          ${phase === 3 ? 'right-1/2 translate-x-1/2 w-[95vw] md:w-[650px] h-[550px] rounded-2xl bg-white' : ''}
        `}
      >
        
        {/* Phase 0 & 1: Search Icon (Centered perfectly) */}
        <div className={`absolute transition-opacity duration-200 ${phase < 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Phase 2 & 3: Content Mask (Fixed inner dimensions prevent layout thrashing) */}
        <div className={`absolute top-0 w-[95vw] md:w-[650px] h-[550px] flex flex-col transition-opacity duration-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
          {/* Top Section: Search Bar (Takes exactly 80px / h-20) */}
          <div className="h-20 w-full p-4 flex items-center">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 h-full">
              <input 
                type="text" 
                placeholder="Enter Bus No. or Metro Line" 
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] text-gray-700 font-medium transition-shadow"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                autoFocus={phase === 2}
              />
              <button type="submit" className="bg-[#138808] hover:bg-green-700 text-white font-bold px-6 py-2 rounded-xl shadow-sm transition-colors">
                Search
              </button>
            </form>
            <button 
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="ml-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 p-3 rounded-xl text-gray-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Bottom Section: Map Container */}
          <div className="w-full flex-1 px-4 pb-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-inner">
              {/* Only mount Leaflet when phase >= 2 to avoid resize glitch */}
              {phase >= 2 && (
                <MapContainer center={defaultPosition} zoom={13} className="w-full h-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={defaultPosition} icon={customIcon}>
                    <Popup className="font-semibold text-center">
                      <span className="text-[#FF9933]">Citizen Swidha</span><br />
                      <span className="text-blue-900">Bus 402</span><br />
                      Status: <span className="text-red-600">Packed</span>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default RouteSearch;