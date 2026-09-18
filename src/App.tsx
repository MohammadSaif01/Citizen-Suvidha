import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RouteSearch from './components/RouteSearch';
import ReportModal from './components/ReportModal';
import LiveAlerts from './components/LiveAlerts';
import CrowdStatus from './components/CrowdStatus';
import Footer from './components/Footer';

function App() {
  // Modal toggle state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      
      {/* 1. Top Navigation */}
      <Navbar onOpenReport={() => setIsReportModalOpen(true)} />
      
      {/* 2. Crowd Reporting Modal (Hidden by default) */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      {/* 3. Floating Animated Search & Map */}
      <RouteSearch />

      {/* 4. Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
        
        {/* Hero Section */}
        <section className="text-center mt-8 md:mt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Smart Public Transport <br />
            <span className="text-[#000080]">Crowd Predictor</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Know the crowd before you board. Save time, avoid rush, and commute safely.
          </p>
        </section>

        {/* Smart Alerts Banner Component */}
        <section className="w-full max-w-5xl mx-auto">
          <LiveAlerts />
        </section>

        {/* Live Transit Status Grid Component */}
        <section className="w-full max-w-6xl mx-auto mb-10">
          <div className="flex justify-between items-end mb-6 px-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Live Transit Status</h2>
              <p className="text-sm text-gray-500 mt-1">Real-time crowd predictions for your routes</p>
            </div>
            <button className="text-blue-600 font-semibold hover:text-blue-800 hover:underline text-sm hidden sm:block transition-colors">
              View All
            </button>
          </div>
          
          <CrowdStatus />
        </section>
        
      </main>

      {/* 5. Footer */}
      <Footer />
      
    </div>
  );
}

export default App;