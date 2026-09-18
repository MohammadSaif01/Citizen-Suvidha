import React from 'react';

const mockTransitData = [
  {
    id: 1,
    type: 'Bus 🚌',
    route: 'Route 402 (City Center)',
    eta: '2 Min Away',
    crowdLevel: 'Packed',
    occupancy: 88, // Percentage
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
  {
    id: 2,
    type: 'Metro 🚆',
    route: 'Yellow Line (Coach A2)',
    eta: '5 Min Away',
    crowdLevel: 'Seats Available',
    occupancy: 35,
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  {
    id: 3,
    type: 'Bus 🚌',
    route: 'Route 112 (Tech Park)',
    eta: '8 Min Away',
    crowdLevel: 'Moderate',
    occupancy: 65,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
  }
];

const CrowdStatus = () => {
  return (
    <div className="w-full max-w-5xl mt-12 mb-10 px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Transit Status</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time crowd predictions for your routes</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTransitData.map((transit) => (
          <div key={transit.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">{transit.type}</span>
                <h3 className="font-bold text-gray-900 text-lg mt-1">{transit.route}</h3>
              </div>
              <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                {transit.eta}
              </span>
            </div>

            {/* Occupancy Indicator */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-bold ${transit.textColor} px-2 py-1 rounded-md ${transit.bgColor}`}>
                  {transit.crowdLevel}
                </span>
                <span className="text-sm font-bold text-gray-700">{transit.occupancy}% Full</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${transit.color}`} 
                  style={{ width: `${transit.occupancy}%` }}
                ></div>
              </div>
            </div>

            <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl border border-gray-200 transition-colors">
              View Route Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrowdStatus;