import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [route, setRoute] = useState('');
  const [status, setStatus] = useState<'Low' | 'Moderate' | 'Packed' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route || !status) return; // Silent return if empty
    
    // Show success animation state
    setIsSubmitted(true);
    
    // Auto close and reset after 2.5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRoute('');
      setStatus(null);
      onClose();
    }, 2500);
  };

  const closeModal = () => {
    setIsSubmitted(false);
    setRoute('');
    setStatus(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        
        {/* Saffron Header */}
        <div className="bg-[#FF9933] p-5 text-center relative">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
            Report <span className="text-blue-900">Live Crowd</span>
          </h2>
          <p className="text-white/90 text-sm mt-1">Help fellow citizens commute better</p>
          <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-red-500 bg-white/20 hover:bg-white p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Dynamic Body: Form OR Success State */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#138808]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h3>
              <p className="text-gray-600 text-center font-medium">Thank you for making transit safer.</p>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-2 rounded-full font-bold shadow-sm">
                ⭐ +50 Citizen Points Earned
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Bus No. or Metro Line</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bus 402 or Yellow Line" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] font-medium transition-all"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-3">Current Crowd Status</label>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => setStatus('Low')} className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Low' ? 'border-[#138808] bg-green-50 text-[#138808] shadow-md scale-105' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>🟢 Low</button>
                  <button type="button" onClick={() => setStatus('Moderate')} className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Moderate' ? 'border-yellow-500 bg-yellow-50 text-yellow-600 shadow-md scale-105' : 'border-gray-200 text-gray-500 hover:border-yellow-300'}`}>🟡 Mid</button>
                  <button type="button" onClick={() => setStatus('Packed')} className={`py-3 rounded-xl border-2 font-bold transition-all ${status === 'Packed' ? 'border-red-500 bg-red-50 text-red-600 shadow-md scale-105' : 'border-gray-200 text-gray-500 hover:border-red-300'}`}>🔴 Full</button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!route || !status}
                className="w-full bg-[#138808] disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;