import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import RouteSearch from './components/RouteSearch';
import ReportModal from './components/ReportModal';
import LiveAlerts from './components/LiveAlerts';
import CrowdStatus from './components/CrowdStatus';
import Footer from './components/Footer';
import AshokaChakra from './components/AshokaChakra';
import OtherServices from './components/OtherServices';
import WomenSafetyModal from './components/WomenSafetyModal';
import LoginModal from './components/LoginModal';

import Admin from './components/admin';
import UserFeedback from './components/UserFeedback';
import CitizenPanel from './components/CitizenPanel'; // <-- Added CitizenPanel import

function App() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // State to track if Admin is logged in (shows top control strip)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans relative overflow-hidden">

        {/* TOP STRIP: Appears only when Admin is logged in */}
        {isAdminLoggedIn && (
          <div className="bg-slate-950 text-white px-6 py-2 flex justify-between items-center text-xs border-b border-slate-800 relative z-50 animate-[fadeIn_0.3s_ease-out]">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin Control Mode Active
            </span>
            <div className="flex gap-4 items-center">
              <Link to="/" className="text-slate-300 hover:text-white transition">Public View</Link>
              <Link to="/admin" className="text-blue-400 hover:text-blue-300 font-semibold transition">Dashboard</Link>
              <Link to="/feedback" className="text-amber-400 hover:text-amber-300 font-semibold transition">Grievances</Link>
              <button 
                onClick={() => {
                  setIsAdminLoggedIn(false); 
                  window.location.href = '/'; 
                }} 
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Global Modals */}
        <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
        <WomenSafetyModal isOpen={isSafetyModalOpen} onClose={() => setIsSafetyModalOpen(false)} />
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          onAdminLogin={() => setIsAdminLoggedIn(true)} 
        />

        <Routes>
          {/* Public Home View */}
          <Route path="/" element={
            <>
              <AshokaChakra />
              
              <div className="fixed right-4 md:right-6 top-52 z-40 flex flex-col gap-4">
                <button 
                  onClick={() => setIsSafetyModalOpen(true)}
                  title="Women Safety Assist"
                  className="relative group w-14 h-14 bg-gradient-to-br from-[#FF9933] to-[#e68a2e] rounded-full shadow-[0_4px_20px_rgba(255,153,51,0.5)] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 animate-[bounce_3s_infinite]"
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40 group-hover:animate-ping"></span>
                  <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
              </div>

              <Navbar 
                onOpenReport={() => setIsReportModalOpen(true)} 
                onOpenLogin={() => setIsLoginModalOpen(true)} 
              />

              <div className="relative z-10 flex-grow w-full flex flex-col">
                <RouteSearch />

                <main className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-10 md:gap-14">
                  <section className="text-center mt-6 animate-[fadeIn_0.8s_ease-out] relative">
                    
                    <div className="w-full flex justify-start mb-4">
                      <OtherServices />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                      Smart Public Transport <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000080] to-blue-500">
                        Crowd Predictor
                      </span>
                    </h1>
                    
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                      Know the crowd before you board. Save time, avoid rush, and commute safely with real-time AI insights powered by fellow citizens.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
                      <div className="bg-white/80 backdrop-blur-md border border-gray-100 px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-green-100 p-3 rounded-full text-[#138808] text-xl">👥</div>
                        <div className="text-left">
                          <div className="text-2xl font-extrabold text-gray-900">24.5k+</div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Commuters</div>
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-md border border-gray-100 px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">🚌</div>
                        <div className="text-left">
                          <div className="text-2xl font-extrabold text-gray-900">342</div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Routes</div>
                        </div>
                      </div>
                      
                      <div className="hidden sm:flex bg-white/80 backdrop-blur-md border border-gray-100 px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 text-xl">⭐</div>
                        <div className="text-left">
                          <div className="text-2xl font-extrabold text-gray-900">12.1k</div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reports Today</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="w-full max-w-5xl mx-auto">
                    <LiveAlerts />
                  </section>

                  <section className="w-full max-w-6xl mx-auto mb-12">
                    <div className="flex justify-between items-end mb-8 px-2 border-b border-gray-200 pb-4">
                      <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Live Transit Status</h2>
                        <p className="text-sm text-gray-500 mt-1.5 font-medium">Real-time crowd predictions for your active routes</p>
                      </div>
                      <button className="text-blue-600 font-bold hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm hidden sm:block transition-all">
                        View All Routes &rarr;
                      </button>
                    </div>
                    <CrowdStatus />
                  </section>
                </main>
              </div>
              
              <Footer />
            </>
          } />

          {/* Dedicated Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/feedback" element={<UserFeedback />} />
          <Route path="/citizen-panel" element={<CitizenPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;