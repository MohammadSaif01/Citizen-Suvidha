import React from 'react';

const LiveAlerts: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
      <div className="flex gap-3 items-start">
        <div className="text-blue-600 mt-1 md:mt-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <h3 className="text-blue-900 font-bold flex items-center gap-2">
            Smart Reroute Suggestion 🧠
          </h3>
          <p className="text-blue-700 text-sm mt-1">
            Yellow Line Metro is currently experiencing heavy rush. <span className="font-bold">Bus 402</span> is arriving at City Center in 4 mins with 🟢 seats available.
          </p>
        </div>
      </div>
      <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap shadow-sm">
        Switch Route
      </button>
    </div>
  );
};

export default LiveAlerts;