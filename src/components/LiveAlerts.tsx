import React, { useState, useEffect } from 'react';

const LiveAlerts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Simulate AI fetching live traffic data, then show popup after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300); // Wait for fade-out animation
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-24 right-4 md:right-8 z-50 w-[90%] max-w-md transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
      } animate-[fadeIn_0.5s_ease-out]`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-blue-100 rounded-2xl p-5 shadow-[0_20px_50px_rgba(37,99,235,0.15)] relative overflow-hidden group">
        
        {/* Blue Accent Line */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-2xl"></div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-1 rounded-full transition-colors"
          title="Dismiss Alert"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex gap-4 items-start pl-2">
          <div className="bg-blue-50 p-2.5 rounded-full text-blue-600 shrink-0 relative mt-1">
            {/* Live Pulsing Dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white"></span>
            </span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <div className="pr-4">
            <h3 className="text-gray-900 font-extrabold text-base flex items-center gap-2">
              Smart Reroute Suggestion 🧠
            </h3>
            <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
              Yellow Line Metro is currently experiencing heavy rush. <strong className="text-gray-900">Bus 402</strong> is arriving at City Center in 4 mins with <span className="text-[#138808] font-bold bg-green-50 px-1.5 py-0.5 rounded inline-flex items-center gap-1">🟢 Seats available</span>.
            </p>
            
            <div className="mt-4 flex gap-3">
              <button className="bg-[#000080] hover:bg-blue-900 text-white px-5 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 shadow-md flex-1">
                Switch Route
              </button>
              <button onClick={handleClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold text-sm transition-colors flex-1">
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAlerts;