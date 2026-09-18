import React from 'react';

const CrowdStatus: React.FC = () => {
  const routes = [
    {
      type: 'Bus 🚌',
      name: 'Route 402 (City Center)',
      time: '2 Min Away',
      status: 'Packed',
      percentage: 88,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      type: 'Metro 🚆',
      name: 'Yellow Line (Coach A2)',
      time: '5 Min Away',
      status: 'Seats Available',
      percentage: 35,
      color: 'bg-[#138808]', // Footer Green
      textColor: 'text-[#138808]',
      bgColor: 'bg-green-50'
    },
    {
      type: 'Bus 🚌',
      name: 'Route 112 (Tech Park)',
      time: '8 Min Away',
      status: 'Moderate',
      percentage: 65,
      color: 'bg-[#FF9933]', // Navbar Saffron
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="text-gray-500 text-sm font-medium">{route.type}</div>
            <div className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              {route.time}
            </div>
          </div>
          
          {/* Route Name */}
          <h3 className="text-lg font-extrabold text-gray-900 mb-6 min-h-[56px] leading-tight">
            {route.name}
          </h3>
          
          {/* Status Label */}
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${route.bgColor} ${route.textColor}`}>
              {route.status}
            </span>
            <span className="text-sm font-bold text-gray-700">{route.percentage}% Full</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full ${route.color}`} 
              style={{ width: `${route.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrowdStatus;