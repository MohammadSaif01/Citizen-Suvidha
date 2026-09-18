import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CitizenPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'passes' | 'sos' | 'history'>('overview');
  const [sosActive, setSosActive] = useState(false);

  // Mock Data for Citizen Panel
  const [activePasses] = useState([
    { id: 'PASS-9021', route: 'Metro Line (Blue/Yellow)', type: 'Monthly Commuter Pass', validity: 'Active till 15 Oct 2026', qrCode: 'VERIFIED-ACTIVE' },
    { id: 'PASS-4412', route: 'Electric Feeder Bus 402', type: 'Daily Smart Pass', validity: 'Valid for Today', qrCode: 'VERIFIED-TODAY' },
  ]);

  const [myGrievances] = useState([
    { id: 'GRV-8921', station: 'Rajiv Chowk Metro', category: 'Overcrowding', status: 'In Progress', date: '19 Sep 2026' },
    { id: 'GRV-7104', station: 'Kashmere Gate ISBT', category: 'Cleanliness', status: 'Resolved', date: '18 Sep 2026' },
  ]);

  const handleTriggerSOS = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 4000); // 4 seconds alert simulation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-[#FF9933] text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-black text-xl border border-white/30">
              👤
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Citizen Portal & Dashboard</h1>
              <p className="text-xs text-orange-50 font-medium">Welcome back, Mohammad Saif • Contributor Level 2</p>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs font-bold bg-white text-[#FF9933] hover:bg-orange-50 px-4 py-2 rounded-xl transition shadow-sm"
          >
            &larr; Back to Public View
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-grow space-y-8">
        
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF9933] flex items-center justify-center text-xl font-bold">🎫</div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Active Passes</span>
              <p className="text-xl font-black text-gray-900 mt-0.5">{activePasses.length} Digital Passes</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">⭐</div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Reward Points</span>
              <p className="text-xl font-black text-gray-900 mt-0.5">150 Contributor Pts</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">📝</div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Grievances Filed</span>
              <p className="text-xl font-black text-gray-900 mt-0.5">{myGrievances.length} Reports</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#138808] flex items-center justify-center text-xl font-bold">🛡️</div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Safety Status</span>
              <p className="text-xl font-black text-emerald-600 mt-0.5">Secured & Verified</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-8 text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-b-2 border-[#FF9933] text-[#FF9933]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('passes')}
            className={`pb-3 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'passes'
                ? 'border-b-2 border-[#FF9933] text-[#FF9933]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Digital Smart Passes & QR
          </button>
          <button
            onClick={() => setActiveTab('sos')}
            className={`pb-3 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'sos'
                ? 'border-b-2 border-[#FF9933] text-[#FF9933]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Emergency & Quick SOS
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-b-2 border-[#FF9933] text-[#FF9933]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            My Grievance History
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
              <h3 className="text-xl font-black text-gray-900">Recent Commuter Activity & Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚌</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Bus 402 Regular Route</h4>
                      <p className="text-xs text-gray-500">Last scanned at City Center Terminal • Normal Crowd</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-[#138808] px-3 py-1 rounded-full">Smooth</span>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚇</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Metro Yellow Line Pass</h4>
                      <p className="text-xs text-gray-500">Rajiv Chowk Interchange • Heavy Rush Warning Active</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Moderate</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <Link to="/feedback" className="flex-1 bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold py-3 px-4 rounded-xl text-center shadow-md transition">
                  File New Grievance
                </Link>
                <button onClick={() => setActiveTab('passes')} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl text-center shadow-md transition">
                  View Smart Passes
                </button>
              </div>
            </div>

            {/* Quick Emergency Widget on Sidebar */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">🚨</div>
                <h3 className="text-xl font-black">Instant Women & Public SOS</h3>
                <p className="text-xs text-red-100 leading-relaxed">
                  Triggering this alert will instantly broadcast your live GPS coordinates to the Police Control Room and emergency contacts.
                </p>
              </div>

              <button
                onClick={handleTriggerSOS}
                className="mt-6 w-full bg-white text-red-600 hover:bg-red-50 font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95 text-center"
              >
                {sosActive ? '🚨 SOS BROADCASTED!' : 'TRIGGER EMERGENCY SOS'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL PASSES */}
        {activeTab === 'passes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePasses.map((pass) => (
              <div key={pass.id} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933] opacity-5 rounded-full blur-2xl"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-xs font-bold text-[#FF9933] bg-orange-50 px-3 py-1 rounded-full">{pass.id}</span>
                    <h3 className="text-xl font-black text-gray-900 mt-2">{pass.type}</h3>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5">{pass.route}</p>
                  </div>
                  <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-mono font-bold text-xs shadow-md">
                    QR
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center relative z-10">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Validity Status</span>
                    <span className="text-sm font-bold text-emerald-600">{pass.validity}</span>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl">
                    {pass.qrCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: EMERGENCY & QUICK SOS */}
        {activeTab === 'sos' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black animate-pulse">
              🚨
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">Emergency Response Center</h3>
              <p className="text-sm text-gray-500 mt-1">Tap below in case of immediate danger, medical emergency, or harassment.</p>
            </div>

            <button
              onClick={handleTriggerSOS}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-5 rounded-2xl shadow-xl shadow-red-500/30 transition-all active:scale-95"
            >
              {sosActive ? '🚨 ALERT DISPATCHED TO AUTHORITIES!' : 'SEND HIGH-PRIORITY SOS ALERT'}
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <a href="tel:1090" className="p-3 bg-gray-50 hover:bg-orange-50 border rounded-xl font-bold text-xs text-gray-700">
                Women Helpline<br/><span className="text-[#FF9933]">1090</span>
              </a>
              <a href="tel:112" className="p-3 bg-gray-50 hover:bg-orange-50 border rounded-xl font-bold text-xs text-gray-700">
                National Emergency<br/><span className="text-[#FF9933]">112</span>
              </a>
              <a href="tel:108" className="p-3 bg-gray-50 hover:bg-orange-50 border rounded-xl font-bold text-xs text-gray-700">
                Medical Ambulance<br/><span className="text-[#FF9933]">108</span>
              </a>
              <a href="tel:101" className="p-3 bg-gray-50 hover:bg-orange-50 border rounded-xl font-bold text-xs text-gray-700">
                Fire Department<br/><span className="text-[#FF9933]">101</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: GRIEVANCE HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <h3 className="text-xl font-black text-gray-900">Your Submitted Complaints & Tracking</h3>
            <div className="space-y-3">
              {myGrievances.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 border border-gray-200/60 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#FF9933] bg-orange-50 px-2.5 py-0.5 rounded">{item.id}</span>
                    <h4 className="font-bold text-gray-900 text-sm mt-1">{item.station} • <span className="text-gray-500">{item.category}</span></h4>
                    <span className="text-[11px] text-gray-400">Filed on: {item.date}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}