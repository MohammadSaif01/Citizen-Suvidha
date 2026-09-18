import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const trainIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png', // Train Icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

const RouteSearch = () => {
  const [phase, setPhase] = useState(0);
  const [route, setRoute] = useState('');
  
  const [currentPos, setCurrentPos] = useState<[number, number]>([26.8467, 80.9462]); 
  const [activeRouteCoords, setActiveRouteCoords] = useState<[number, number][] | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleOpen = () => {
    if (phase === 0) {
      setPhase(1);
      setTimeout(() => setPhase(2), 300);
      setTimeout(() => setPhase(3), 600);
    }
  };

  const handleClose = () => {
    setPhase(0); 
    setTimeout(() => {
      setRoute('');
      setActiveRouteCoords(null);
    }, 500); 
  };

  const locateUser = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPos([position.coords.latitude, position.coords.longitude]);
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route.trim()) return;
    
    const mockRoute: [number, number][] = [
      currentPos,
      [currentPos[0] + 0.015, currentPos[1] + 0.02],
      [currentPos[0] + 0.03, currentPos[1] + 0.035],
    ];
    setActiveRouteCoords(mockRoute);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ease-out ${phase > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      ></div>

      <div 
        onClick={() => phase === 0 && handleOpen()}
        className={`fixed z-50 overflow-hidden shadow-2xl transition-all duration-400 ease-out flex items-center justify-center
          ${phase === 0 ? 'top-[45%] right-4 md:right-6 translate-x-0 w-14 h-14 rounded-full bg-[#000080] text-white cursor-pointer hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,128,0.4)]' : ''}
          ${phase === 1 ? 'top-[45%] right-1/2 translate-x-1/2 w-14 h-14 rounded-full bg-[#000080] text-white' : ''}
          ${phase === 2 ? 'top-[45%] -translate-y-1/2 right-1/2 translate-x-1/2 w-[95vw] md:w-[650px] h-20 rounded-2xl bg-white' : ''}
          ${phase === 3 ? 'top-[45%] -translate-y-1/2 right-1/2 translate-x-1/2 w-[95vw] md:w-[650px] h-[550px] rounded-2xl bg-white' : ''}
        `}
      >
        <div className={`absolute transition-opacity duration-200 ${phase < 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className={`absolute top-0 w-[95vw] md:w-[650px] h-[550px] flex flex-col transition-opacity duration-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
          <div className="h-20 w-full p-4 flex items-center">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2 h-full items-center">
              <input 
                type="text" 
                placeholder="Enter Train No., Metro or Bus..." 
                className="flex-1 h-full px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] text-gray-700 font-medium"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                autoFocus={phase === 2}
              />
              <button type="submit" className="h-full bg-[#138808] hover:bg-green-700 text-white font-bold px-4 md:px-6 rounded-xl shadow-sm whitespace-nowrap">
                Track
              </button>
              <button 
                type="button"
                onClick={locateUser}
                className="h-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-4 rounded-xl flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {isLocating ? '⏳' : '📍 Find Me'}
              </button>
            </form>
            <button 
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              className="ml-2 h-full aspect-square flex items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-xl text-gray-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="w-full flex-1 px-4 pb-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-inner">
              {phase >= 2 && (
                <MapContainer center={currentPos} zoom={13} className="w-full h-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapUpdater center={currentPos} />
                  
                  <Marker position={currentPos}>
                    <Popup className="font-bold text-blue-600">Your Current Location</Popup>
                  </Marker>

                  {activeRouteCoords && (
                    <>
                      <Polyline positions={activeRouteCoords} color="#000080" weight={5} opacity={0.8} />
                      <Marker position={activeRouteCoords[activeRouteCoords.length - 1]} icon={trainIcon}>
                        <Popup className="font-semibold text-center">
                          <span className="text-[#FF9933]">Citizen Suvidha</span><br />
                          <span className="text-blue-900">{route ? route.toUpperCase() : 'Train / Route'}</span><br />
                          Status: <span className="text-red-600">High Platform Crowding</span>
                        </Popup>
                      </Marker>
                    </>
                  )}
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