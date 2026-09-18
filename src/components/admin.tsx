import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface StationItem {
  id: string;
  name: string;
  line: string;
  density: number;
  temperature: number; // in °C
  season: 'Monsoon' | 'Summer' | 'Winter' | 'Normal';
  status: 'Normal' | 'Congested' | 'Critical';
  busesDispatched: number;
}

interface IncidentReport {
  id: string;
  station: string;
  crowdLevel: 'Severe' | 'High' | 'Moderate';
  issue: string;
  time: string;
  status: 'Pending' | 'Action Taken' | 'Resolved';
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'stations' | 'reports' | 'broadcast'>('stations');

  // Dynamic Station State with Temperature & Season
  const [stations, setStations] = useState<StationItem[]>([
    {
      id: 'ST-101',
      name: 'Rajiv Chowk Metro',
      line: 'Blue / Yellow Line',
      density: 92,
      temperature: 34,
      season: 'Summer',
      status: 'Critical',
      busesDispatched: 3,
    },
    {
      id: 'ST-102',
      name: 'Kashmere Gate ISBT',
      line: 'Red Line',
      density: 76,
      temperature: 28,
      season: 'Monsoon',
      status: 'Congested',
      busesDispatched: 1,
    },
    {
      id: 'ST-103',
      name: 'Hauz Khas Junction',
      line: 'Magenta Line',
      density: 42,
      temperature: 22,
      season: 'Winter',
      status: 'Normal',
      busesDispatched: 0,
    },
  ]);

  // Form States
  const [stationName, setStationName] = useState('');
  const [lineName, setLineName] = useState('');
  const [densityVal, setDensityVal] = useState<number>(50);
  const [temperatureVal, setTemperatureVal] = useState<number>(30);
  const [seasonVal, setSeasonVal] = useState<'Monsoon' | 'Summer' | 'Winter' | 'Normal'>('Normal');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Reports State
  const [reports, setReports] = useState<IncidentReport[]>([
    { id: 'REP-101', station: 'Rajiv Chowk Metro', crowdLevel: 'Severe', issue: 'Heavy rain causing sudden footfall surge', time: '8m ago', status: 'Pending' },
    { id: 'REP-102', station: 'Kashmere Gate ISBT', crowdLevel: 'High', issue: 'Bus delay due to waterlogging near terminal', time: '20m ago', status: 'Action Taken' },
  ]);

  // Broadcast Alert Form State
  const [targetStation, setTargetStation] = useState('Rajiv Chowk Metro');
  const [alertText, setAlertText] = useState('');
  const [broadcastLog, setBroadcastLog] = useState([
    { id: 1, text: '[Kashmere Gate ISBT] Monsoon delays on outer depot lines.', time: '10:15 AM' },
  ]);

  const getStatusFromDensity = (val: number): 'Normal' | 'Congested' | 'Critical' => {
    if (val >= 80) return 'Critical';
    if (val >= 55) return 'Congested';
    return 'Normal';
  };

  // Add / Edit Station Submit
  const handleSaveStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationName.trim() || !lineName.trim()) return;

    if (editingId) {
      setStations((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: stationName,
                line: lineName,
                density: Number(densityVal),
                temperature: Number(temperatureVal),
                season: seasonVal,
                status: getStatusFromDensity(Number(densityVal)),
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newStation: StationItem = {
        id: `ST-${Math.floor(100 + Math.random() * 900)}`,
        name: stationName,
        line: lineName,
        density: Number(densityVal),
        temperature: Number(temperatureVal),
        season: seasonVal,
        status: getStatusFromDensity(Number(densityVal)),
        busesDispatched: 0,
      };
      setStations([newStation, ...stations]);
    }

    setStationName('');
    setLineName('');
    setDensityVal(50);
    setTemperatureVal(30);
    setSeasonVal('Normal');
  };

  const handleStartEdit = (st: StationItem) => {
    setEditingId(st.id);
    setStationName(st.name);
    setLineName(st.line);
    setDensityVal(st.density);
    setTemperatureVal(st.temperature);
    setSeasonVal(st.season);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setStationName('');
    setLineName('');
    setDensityVal(50);
    setTemperatureVal(30);
    setSeasonVal('Normal');
  };

  const handleDeleteStation = (id: string) => {
    setStations((prev) => prev.filter((st) => st.id !== id));
  };

  const handleDeployBus = (id: string) => {
    setStations((prev) =>
      prev.map((st) =>
        st.id === id
          ? {
              ...st,
              busesDispatched: st.busesDispatched + 1,
              density: Math.max(15, st.density - 10),
              status: getStatusFromDensity(Math.max(15, st.density - 10)),
            }
          : st
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-lg font-bold">
              CITIZEN SUVIDHA <span className="text-blue-400">COMMAND & PREDICTOR DESK</span>
            </h1>
            <p className="text-xs text-slate-400">Weather, Season & Real-Time Congestion Analytics</p>
          </div>
        </div>

        <Link
          to="/"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          ← Go to Public View
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto p-6 flex-grow space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Stations</span>
            <p className="text-2xl font-black text-slate-800 mt-1">{stations.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-rose-500 uppercase">Critical Overcrowding</span>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {stations.filter((s) => s.status === 'Critical').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-sky-600 uppercase">Avg Temperature</span>
            <p className="text-2xl font-black text-sky-700 mt-1">
              {Math.round(stations.reduce((sum, s) => sum + s.temperature, 0) / stations.length)}°C
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-emerald-500 uppercase">Feeder Fleet Deployed</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {stations.reduce((sum, s) => sum + s.busesDispatched, 0)} Buses
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 space-x-6 text-sm">
          <button
            onClick={() => setActiveTab('stations')}
            className={`pb-3 font-semibold transition cursor-pointer ${
              activeTab === 'stations'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🏢 Stations Directory & Weather Model
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 font-semibold transition cursor-pointer ${
              activeTab === 'reports'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📋 Citizen Complaints Desk ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`pb-3 font-semibold transition cursor-pointer ${
              activeTab === 'broadcast'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📢 Public Alert Broadcaster
          </button>
        </div>

        {/* TAB 1: Stations with Weather & Season Form */}
        {activeTab === 'stations' && (
          <div className="space-y-6">
            {/* Form */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingId ? '✏️ Edit Station & Environmental Data' : '➕ Register Station with Weather Predictors'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Set temperature and season triggers to simulate crowd congestion conditions.
                  </p>
                </div>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveStation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Station Name</label>
                    <input
                      type="text"
                      value={stationName}
                      onChange={(e) => setStationName(e.target.value)}
                      placeholder="e.g. Anand Vihar Terminal"
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Transit Route / Line</label>
                    <input
                      type="text"
                      value={lineName}
                      onChange={(e) => setLineName(e.target.value)}
                      placeholder="e.g. Blue Line Metro / Depot"
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Current Season</label>
                    <select
                      value={seasonVal}
                      onChange={(e) => setSeasonVal(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    >
                      <option value="Normal">Normal Season</option>
                      <option value="Monsoon">🌧️ Monsoon (Rush Surge)</option>
                      <option value="Summer">☀️ Summer (Peak Heat)</option>
                      <option value="Winter">❄️ Winter (Fog Delays)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 uppercase mb-1">
                      <span>Live Ambient Temperature</span>
                      <span className="text-blue-600 text-sm font-bold">{temperatureVal}°C</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={temperatureVal}
                      onChange={(e) => setTemperatureVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-400">Extreme temperatures alter citizen commute timings</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 uppercase mb-1">
                      <span>Crowd Density Index</span>
                      <span className={`text-sm font-bold ${densityVal >= 80 ? 'text-rose-600' : 'text-slate-800'}`}>
                        {densityVal}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={densityVal}
                      onChange={(e) => setDensityVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-400">Simulate footfall surge directly on dashboard</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`py-2.5 px-6 rounded-lg text-sm font-semibold text-white transition cursor-pointer shadow-sm ${
                      editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {editingId ? 'Save Station Changes' : '+ Register Station Listing'}
                  </button>
                </div>
              </form>
            </div>

            {/* Stations Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stations.map((st) => (
                <div key={st.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">{st.id}</span>
                      <h4 className="text-base font-bold text-slate-900">{st.name}</h4>
                      <span className="text-xs text-slate-500">{st.line}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          st.status === 'Critical'
                            ? 'bg-rose-100 text-rose-700'
                            : st.status === 'Congested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {st.status} ({st.density}%)
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        🌡️ {st.temperature}°C • {st.season}
                      </span>
                    </div>
                  </div>

                  {/* Visual Density Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        st.density >= 80 ? 'bg-rose-600' : st.density >= 55 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${st.density}%` }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <div className="space-x-3 text-xs">
                      <button
                        onClick={() => handleStartEdit(st)}
                        className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStation(st.id)}
                        className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeployBus(st.id)}
                      className="text-xs bg-slate-900 hover:bg-slate-800 text-white font-medium px-3 py-1.5 rounded transition cursor-pointer"
                    >
                      Deploy Feeder Bus ({st.busesDispatched})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Citizen Complaints Desk */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase border-b">
                <tr>
                  <th className="p-4">Station / ID</th>
                  <th className="p-4">Crowd Density</th>
                  <th className="p-4">Report Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <span className="text-xs font-bold text-slate-400 block">{item.id}</span>
                      <span className="font-semibold text-slate-800">{item.station}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          item.crowdLevel === 'Severe'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.crowdLevel}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 text-xs max-w-xs">
                      <p>{item.issue}</p>
                      <span className="text-slate-400 text-[10px]">{item.time}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          item.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {item.status !== 'Resolved' && (
                        <button
                          onClick={() =>
                            setReports((prev) =>
                              prev.map((r) => (r.id === item.id ? { ...r, status: 'Resolved' } : r))
                            )
                          }
                          className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded transition cursor-pointer"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: Alert Broadcaster */}
        {activeTab === 'broadcast' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-800">Publish Emergency Delay Broadcast</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Target Station</label>
                <input
                  type="text"
                  value={targetStation}
                  onChange={(e) => setTargetStation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Alert Message</label>
                <textarea
                  rows={3}
                  value={alertText}
                  onChange={(e) => setAlertText(e.target.value)}
                  placeholder="e.g. Signal failure causing 15 min delays on this line."
                  className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <button
                onClick={() => {
                  if (!alertText.trim()) return;
                  setBroadcastLog([{ id: Date.now(), text: `[${targetStation}] ${alertText}`, time: 'Just now' }, ...broadcastLog]);
                  setAlertText('');
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Broadcast to Live Ticker
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Past Broadcasts</h4>
              <div className="space-y-2">
                {broadcastLog.map((b) => (
                  <div key={b.id} className="p-2.5 bg-slate-50 border rounded text-xs flex justify-between">
                    <span>{b.text}</span>
                    <span className="text-slate-400">{b.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}