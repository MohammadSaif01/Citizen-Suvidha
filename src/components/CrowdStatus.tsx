import React, { useState } from 'react';

interface StationInfo {
  id: string;
  name: string;
  line: string;
  type: 'Metro' | 'Railway' | 'Bus Terminal';
  crowd: number;
  temp: number;
  seasonNotice: string;
  activeIssue: string | null;
  lat: number;
  lng: number;
  hospital: {
    name: string;
    distance: string;
    emergencyContact: string;
    corridorStatus: 'Clear' | 'Congested Traffic';
  };
}

export default function CrowdStatus() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'railway' | 'metro'>('all');
  
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [exactAddress, setExactAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [closestStation, setClosestStation] = useState<{ name: string; dist: number } | null>(null);

  // Expanded with Railway Stations and Trains
  const [stations] = useState<StationInfo[]>([
    {
      id: '1',
      name: 'Main Railway Station (Platform 1-3)',
      line: 'Express & Superfast Corridor',
      type: 'Railway',
      crowd: 89,
      temp: 33,
      seasonNotice: 'Heavy Festival & Train Arrival Rush',
      activeIssue: 'Train 12429 ( राजधानी Express) delayed by 25 mins; platform crowding high.',
      lat: 26.8500,
      lng: 80.9499,
      hospital: {
        name: 'Railway Divisional Hospital & Trauma Care',
        distance: '1.2 km',
        emergencyContact: '138 (Railway Helpline)',
        corridorStatus: 'Clear',
      },
    },
    {
      id: '2',
      name: 'Rajiv Chowk Metro Hub',
      line: 'Blue & Yellow Line Interconnect',
      type: 'Metro',
      crowd: 94,
      temp: 34,
      seasonNotice: 'Peak Office Hours Rush',
      activeIssue: 'Platform 2 par heavy crowd; escalator under repair.',
      lat: 28.6328,
      lng: 77.2197,
      hospital: {
        name: 'Dr. RML Hospital (Emergency Wing)',
        distance: '1.4 km',
        emergencyContact: '102',
        corridorStatus: 'Clear',
      },
    },
    {
      id: '3',
      name: 'Central Junction Railway Terminal',
      line: 'Vande Bharat & Intercity Hub',
      type: 'Railway',
      crowd: 78,
      temp: 30,
      seasonNotice: 'General Reservation Queue Surge',
      activeIssue: 'Booking counter line extended outside gate 4.',
      lat: 26.4499,
      lng: 80.3319,
      hospital: {
        name: 'Hallet Emergency Trauma Centre',
        distance: '2.1 km',
        emergencyContact: '108',
        corridorStatus: 'Congested Traffic',
      },
    },
    {
      id: '4',
      name: 'ISBT Bus & Intercity Terminal',
      line: 'State Transit Fleet',
      type: 'Bus Terminal',
      crowd: 65,
      temp: 32,
      seasonNotice: 'Normal Commute Flow',
      activeIssue: null,
      lat: 28.6469,
      lng: 77.3164,
      hospital: {
        name: 'Dr. Hedgewar Arogya Sansthan',
        distance: '1.1 km',
        emergencyContact: '108',
        corridorStatus: 'Clear',
      },
    },
  ]);

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2));
  };

  const handleGetExactLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    setGpsError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setCoords({ lat: uLat, lng: uLng });

        let minDistance = Infinity;
        let nearest = stations[0].name;
        stations.forEach((st) => {
          const d = getDistanceFromLatLonInKm(uLat, uLng, st.lat, st.lng);
          if (d < minDistance) {
            minDistance = d;
            nearest = st.name;
          }
        });
        setClosestStation({ name: nearest, dist: minDistance });

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${uLat}&lon=${uLng}&zoom=18&addressdetails=1`);
          const data = await res.json();
          if (data && data.display_name) {
            setExactAddress(data.display_name);
          } else {
            setExactAddress(`Lat: ${uLat.toFixed(5)}, Lng: ${uLng.toFixed(5)}`);
          }
        } catch {
          setExactAddress(`Lat: ${uLat.toFixed(5)}, Lng: ${uLng.toFixed(5)} (Location Locked)`);
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
        setGpsError('Please enable GPS/location permissions.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const filteredStations = stations.filter((st) => {
    if (filter === 'critical') return st.crowd >= 75;
    if (filter === 'railway') return st.type === 'Railway';
    if (filter === 'metro') return st.type === 'Metro';
    return true;
  });

  return (
    <div className="w-full space-y-8 text-left font-sans">
      
      {/* Live GPS & Location Board */}
      <div className="bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-800 space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933] opacity-5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF9933]">
                Live Multi-Modal Geo-Tracker (Metro, Trains & Buses)
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black">Your Real-Time Location & Nearest Transit Hub</h3>
            <p className="text-sm text-gray-400 mt-1">
              Lock hardware GPS to calculate distance to railway stations, metro lines, and terminals.
            </p>
          </div>
          
          <button
            onClick={handleGetExactLocation}
            disabled={loading}
            className="bg-gradient-to-r from-[#FF9933] to-[#e68a2e] hover:from-[#e68a2e] hover:to-[#cc7a29] active:scale-95 text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 shadow-lg shadow-orange-500/20 whitespace-nowrap"
          >
            <span>📍</span> {loading ? 'Locking GPS...' : 'Show My Exact Location'}
          </button>
        </div>

        {coords && (
          <div className="pt-5 border-t border-gray-700/50 space-y-5 animate-[fadeIn_0.5s_ease-out] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="md:col-span-2 bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 space-y-1.5">
                <span className="text-[#138808] font-bold text-xs uppercase tracking-widest">
                  Verified Street Address
                </span>
                <p className="text-base font-semibold text-gray-100 leading-snug">
                  {exactAddress || 'Fetching street details...'}
                </p>
                <span className="text-xs text-gray-400 font-mono block pt-1">
                  GPS: {coords.lat.toFixed(5)}° N, {coords.lng.toFixed(5)}° E
                </span>
              </div>
              
              <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 flex flex-col justify-between">
                <div>
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
                    Closest Hub (Railway / Metro)
                  </span>
                  <p className="text-lg font-black text-emerald-300 mt-1 leading-tight">
                    {closestStation?.name}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    <span className="font-bold text-white">{closestStation?.dist} km</span> away
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${closestStation?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#FF9933] hover:text-white font-bold underline mt-3 block transition-colors"
                >
                  Navigate on Maps →
                </a>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-gray-700 h-64 w-full bg-gray-950 shadow-inner">
              <iframe
                title="Exact GPS Pin"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.008}%2C${coords.lat - 0.005}%2C${coords.lng + 0.008}%2C${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
              />
            </div>
          </div>
        )}

        {gpsError && (
          <div className="p-4 bg-red-900/30 border border-red-800/50 text-red-300 text-sm rounded-xl font-medium flex items-center gap-2">
            <span>⚠️</span> {gpsError}
          </div>
        )}
      </div>

      {/* Filters including Railways */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900">Railway Stations, Metro & Emergency Corridors</h3>
          <p className="text-sm text-gray-500 mt-1">Real-time crowd scores for trains, platforms, and transit terminals</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold bg-gray-100 p-1.5 rounded-xl border border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-white text-[#000080] shadow-sm' : 'text-gray-500'}`}
          >
            All Hubs ({stations.length})
          </button>
          <button
            onClick={() => setFilter('railway')}
            className={`px-3 py-2 rounded-lg transition-all ${filter === 'railway' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500'}`}
          >
            🚂 Railways & Trains
          </button>
          <button
            onClick={() => setFilter('metro')}
            className={`px-3 py-2 rounded-lg transition-all ${filter === 'metro' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-gray-500'}`}
          >
            🚇 Metro Lines
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-2 rounded-lg transition-all ${filter === 'critical' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-gray-500'}`}
          >
            ⚠️ High Rush Only
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredStations.map((st) => {
          const distance = coords ? getDistanceFromLatLonInKm(coords.lat, coords.lng, st.lat, st.lng) : null;
          return (
            <div key={st.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5 hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      st.type === 'Railway' ? 'bg-blue-100 text-blue-800' : st.type === 'Metro' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {st.type === 'Railway' ? '🚂 Indian Railways' : st.type === 'Metro' ? '🚇 Metro Transit' : '🚌 Bus Terminal'}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg text-gray-900">{st.name}</h4>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">{st.line}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    st.crowd >= 80 ? 'bg-red-100 text-red-700' : st.crowd >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {st.crowd >= 80 ? 'Heavy Rush' : st.crowd >= 60 ? 'Moderate' : 'Smooth'} ({st.crowd}%)
                  </span>
                  {distance !== null && (
                    <span className="block text-xs font-bold text-[#138808] mt-2">
                      {distance} km away
                    </span>
                  )}
                </div>
              </div>

              {/* Crowd density bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      st.crowd >= 80 ? 'bg-red-500' : st.crowd >= 60 ? 'bg-orange-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${st.crowd}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>🌡️ {st.temp}°C Ambient</span>
                  <span>{st.seasonNotice}</span>
                </div>
              </div>

              {/* Active reported problem */}
              {st.activeIssue && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm flex items-start gap-2.5">
                  <span className="text-orange-500 font-bold">⚠️</span>
                  <p className="text-orange-800 font-medium leading-snug">{st.activeIssue}</p>
                </div>
              )}

              {/* Emergency Hospital & Green Corridor Box */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-800 flex items-center gap-2">
                    <span className="text-base">🚑</span> Emergency Trauma Corridor
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    st.hospital.corridorStatus === 'Clear' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Route: {st.hospital.corridorStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-700 bg-white/50 p-2 rounded-lg border border-red-50">
                  <span className="font-bold text-sm truncate max-w-[200px]">
                    {st.hospital.name}
                  </span>
                  <span className="text-gray-500 text-xs font-bold whitespace-nowrap">
                    ~{st.hospital.distance}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 text-xs">
                  <span className="text-red-600 font-bold bg-red-100/50 px-2.5 py-1 rounded-lg">
                    Helpline: {st.hospital.emergencyContact}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.hospital.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                  >
                    Hospital Map ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}