import React from 'react';

const LiveAlerts = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-6 z-10 relative">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="mt-0.5 text-blue-600">
            {/* Info Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h3 className="text-blue-900 font-bold text-sm">Smart Reroute Suggestion 🧠</h3>
            <p className="text-blue-700 text-sm mt-1">
              Yellow Line Metro is currently experiencing heavy rush. <strong>Bus 402</strong> is arriving at City Center in 4 mins with 🟢 seats available.
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          Switch Route
        </button>
      </div>
    </div>
  );
};

export default LiveAlerts;