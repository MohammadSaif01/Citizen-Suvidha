import React, { useState, useEffect } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [route, setRoute] = useState('');
  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Delhi

  // Handle the sequence: Jump -> Expand -> Show Map
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 400); // Wait for jump animation
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tracking: ${route}`);
  };

  return (
    <>
      {/* Dark Blur Background when Open */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* The Magic Animating Box */}
      <div 
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden shadow-2xl flex items-center justify-center
          ${isOpen 
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[700px] h-[550px] bg-white rounded-3xl' 
            : 'top-[80%] right-6 md:right-10 w-16 h-16 bg-[#000080] text-white rounded-full hover:scale-110 cursor-pointer'
          }`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        
        {/* State 1: Search Icon (Visible only when closed) */}
        {!isOpen && (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}

        {/* State 2: Expanded Content (Search Bar & Map) */}
        {isOpen && (
          <div className={`w-full h-full p-6 flex flex-col transition-opacity duration-500 delay-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Live Track & Map</h2>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3 mb-4">
              <input 
                type="text" 
                placeholder="Enter Bus No. or Metro Line" 
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] text-gray-700"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
              <button type="submit" className="bg-[#138808] hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition">
                Search
              </button>
            </form>

            {/* Render Map only when content is ready so it sizes correctly */}
            {showContent && (
              <div className="relative w-full flex-1 rounded-xl overflow-hidden border border-gray-200 z-0">
                <MapContainer center={defaultPosition} zoom={13} className="w-full h-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={defaultPosition} icon={customIcon}>
                    <Popup className="font-semibold">Bus 402 - <span className="text-red-600">Packed</span></Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RouteSearch;