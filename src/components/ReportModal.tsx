import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [route, setRoute] = useState('');
  const [status, setStatus] = useState<'Low' | 'Moderate' | 'Packed' | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route || !status) return alert('Please select route and status!');
    alert(`Thank you! Successfully reported ${status} crowd for ${route}.`);
    setRoute('');
    setStatus(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Blur Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        
        {/* Header (Saffron) */}
        <div className="bg-[#FF9933] p-5 text-center relative">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
            Report <span className="text-blue-900">Live Crowd</span>
          </h2>
          <p className="text-white/90 text-sm mt-1">Help fellow citizens commute better</p>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-500 bg-white/20 hover:bg-white p-1.5 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Route Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Bus No. or Metro Line</label>
            <input 
              type="text" 
              placeholder="e.g. Bus 402 or Yellow Line" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>

          {/* Crowd Status Selector */}
          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-3">Current Crowd Status</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setStatus('Low')}
                className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Low' ? 'border-[#138808] bg-green-50 text-[#138808] shadow-md' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}
              >
                🟢 Low
              </button>
              <button
                type="button"
                onClick={() => setStatus('Moderate')}
                className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Moderate' ? 'border-yellow-500 bg-yellow-50 text-yellow-600 shadow-md' : 'border-gray-200 text-gray-500 hover:border-yellow-300'}`}
              >
                🟡 Mid
              </button>
              <button
                type="button"
                onClick={() => setStatus('Packed')}
                className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Packed' ? 'border-red-500 bg-red-50 text-red-600 shadow-md' : 'border-gray-200 text-gray-500 hover:border-red-300'}`}
              >
                🔴 Full
              </button>
            </div>
          </div>

          {/* Submit Button (Footer Green) */}
          <button 
            type="submit" 
            className="w-full bg-[#138808] hover:bg-green-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;