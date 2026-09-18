import React, { useState, useEffect } from 'react';

const EmergencySOS: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  // Auto-hide the confirmation popup if user doesn't confirm within 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirm && !alertSent) {
      timer = setTimeout(() => setShowConfirm(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [showConfirm, alertSent]);

  const handleTrigger = () => {
    if (!showConfirm) {
      setShowConfirm(true);
    } else {
      setAlertSent(true);
      // Backend integration will go here (e.g., fetch('/api/sos'))
      setTimeout(() => {
        setAlertSent(false);
        setShowConfirm(false);
      }, 4000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-[fadeIn_1s_ease-in-out]">
      
      {/* Confirmation & Status Toast */}
      {showConfirm && (
        <div className={`px-5 py-3 rounded-xl shadow-2xl font-bold text-sm transition-all duration-300 ${alertSent ? 'bg-green-500 text-white' : 'bg-gray-900 text-white animate-bounce'}`}>
          {alertSent ? (
            <span className="flex items-center gap-2">✅ Alert dispatched to authorities!</span>
          ) : (
            <span className="flex items-center gap-2">⚠️ Tap again to confirm SOS</span>
          )}
        </div>
      )}

      {/* Main SOS Button */}
      <button 
        onClick={handleTrigger}
        className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${alertSent ? 'bg-green-500 scale-95' : 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105'}`}
      >
        {!alertSent && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40 group-hover:animate-ping"></span>
        )}
        <svg 
          className="w-8 h-8 text-white relative z-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {alertSent ? (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          ) : (
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          )}
        </svg>
      </button>
    </div>
  );
};

export default EmergencySOS;