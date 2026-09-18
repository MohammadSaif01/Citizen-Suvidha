import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LiveAlerts from './components/LiveAlerts';
import RouteSearch from './components/RouteSearch';
import CrowdStatus from './components/CrowdStatus';
import ReportModal from './components/ReportModal';
import Footer from './components/Footer'; // Naya import

function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    /* bg-white for the middle section */
    <div className="min-h-screen bg-white flex flex-col relative">
      <Navbar onOpenReport={() => setIsReportModalOpen(true)} />
      
      <LiveAlerts />
      
      {/* Main Content Area (flex-grow keeps footer at bottom) */}
      <main className="flex-grow flex flex-col items-center pt-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Smart Public Transport <br className="hidden md:block" />
          <span className="text-blue-900 drop-shadow-sm">Crowd Predictor</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Know the crowd before you board. Save time, avoid rush, and commute safely.
        </p>

        <CrowdStatus />
      </main>

      {/* Floating Animated Button component runs independently */}
      <RouteSearch />

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />

      {/* Flag Theme Footer */}
      <Footer />
    </div>
  );
}

export default App;