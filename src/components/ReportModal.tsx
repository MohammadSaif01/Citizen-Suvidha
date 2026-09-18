import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedCrowd, setSelectedCrowd] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reporting! +10 Karma points added.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Report Live Crowd</h2>
        <p className="text-gray-500 text-sm mb-6">Help fellow commuters by updating the current status.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transport Details</label>
            <input 
              type="text" 
              placeholder="e.g., Bus 402 or Yellow Line" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How crowded is it right now?</label>
            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => setSelectedCrowd('Low')}
                className={`py-3 rounded-xl border font-semibold text-sm transition-all ${selectedCrowd === 'Low' ? 'bg-green-100 border-green-500 text-green-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                🟢 Low
              </button>
              <button 
                type="button"
                onClick={() => setSelectedCrowd('Moderate')}
                className={`py-3 rounded-xl border font-semibold text-sm transition-all ${selectedCrowd === 'Moderate' ? 'bg-yellow-100 border-yellow-500 text-yellow-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                🟡 Moderate
              </button>
              <button 
                type="button"
                onClick={() => setSelectedCrowd('Packed')}
                className={`py-3 rounded-xl border font-semibold text-sm transition-all ${selectedCrowd === 'Packed' ? 'bg-red-100 border-red-500 text-red-700 shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                🔴 Packed
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;