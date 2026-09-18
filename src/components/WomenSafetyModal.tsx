import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WomenSafetyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    setIsFetching(true);
    // Real-world simulation for fetching GPS coordinates
    setTimeout(() => {
      setLocation("Lat: 26.8467° N, Long: 80.9462° E (Hazratganj, Lucknow)");
      setIsFetching(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        
        {/* Saffron Theme Header */}
        <div className="bg-gradient-to-r from-[#FF9933] to-[#e68a2e] p-5 text-center relative">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
            Women Safety Assist
          </h2>
          <p className="text-orange-50 text-sm mt-1 font-medium">Your report is confidential and high-priority.</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-100 bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Help is on the way!</h3>
              <p className="text-gray-600 font-medium">Authorities and your emergency contacts have been alerted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name and Number Field in a Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1.5">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1.5">Mobile Number</label>
                  <input type="tel" placeholder="10-digit number" pattern="[0-9]{10}" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5">Live Location</label>
                <div className="flex gap-2">
                  <input type="text" value={location} placeholder="Fetching coordinates..." readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium text-sm text-gray-700" required />
                  <button type="button" onClick={handleGetLocation} disabled={isFetching} className="bg-orange-100 hover:bg-orange-200 text-[#FF9933] px-4 rounded-xl font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
                    {isFetching ? <span className="animate-pulse">⏳</span> : <span>📍 Detect</span>}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1.5">Reason (Why are you feeling unsafe?)</label>
                <textarea rows={3} placeholder="Please describe the situation briefly so authorities know how to help..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all resize-none" required></textarea>
              </div>

              <button type="submit" className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex justify-center items-center gap-2 mt-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Send SOS Alert
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WomenSafetyModal;