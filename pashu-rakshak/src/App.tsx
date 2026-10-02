import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layers, Map, AlertOctagon, CloudOff, RefreshCw, CheckCircle, ArrowUp } from 'lucide-react';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import VetDashboard from './pages/VetDashboard';
import FarmerPortal from './pages/FarmerPortal';
import Advisories from './pages/Advisories';
import AnimalRecords from './pages/AnimalRecords';
import ReportDisease from './pages/ReportDisease';
import Login from './pages/Login';
import LandingDashboard from './pages/LandingDashboard';

// Placeholder for the Village Feed component
function VillageFeed() {
  return (
    <div className="w-full px-4 sm:px-6 space-y-6">
      
      {/* Feed Filters */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <h2 className="flex items-center gap-2 font-bold text-gray-900 text-lg">
          <Layers className="text-primary-700" size={20} />
          Village Bio-Surveillance Feed
        </h2>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
          Zone 4B Active
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button className="flex items-center gap-2 bg-primary-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          <Map size={16} /> All Villages
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-critical-500"></span> High Risk (3)
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Suspected Outbreak
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          <AlertOctagon size={16} className="text-critical-500" /> Quarantined
        </button>
      </div>

      {/* Offline Storage Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center border border-primary-100">
            <CloudOff size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-base">Offline Storage Active</h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">4 Cached</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Pending auto-sync once LTE/Mesh reconnects</p>
          </div>
        </div>
        <button className="bg-primary-800 hover:bg-primary-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 transition-colors">
          <RefreshCw size={18} /> Sync Now
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Monitored Clusters</p>
          <p className="text-3xl font-black text-gray-900 mb-2">42</p>
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle size={16} /> 100% telemetry online
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-critical-500 shadow-[0_0_8px_rgba(225,29,72,0.5)]"></div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Suspected Flags Today</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-black text-critical-700">7</p>
            <span className="text-xs font-semibold text-gray-500">Head</span>
          </div>
          <p className="flex items-center gap-1 text-xs font-bold text-critical-600">
            <ArrowUp size={16} /> +3 since 06:00 IST
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quarantined Farms</p>
          <p className="text-3xl font-black text-gray-900 mb-2">18</p>
          <p className="text-xs font-semibold text-gray-500">Bovine (14) • Caprine (4)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Immunity Coverage</p>
          <p className="text-3xl font-black text-primary-800 mb-2">84.2%</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
            <div className="bg-primary-600 h-full rounded-full" style={{ width: '84.2%' }}></div>
          </div>
        </div>
      </div>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingDashboard />} />
        <Route path="surveillance" element={<VillageFeed />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="vet" element={<VetDashboard />} />
        <Route path="farmer" element={<FarmerPortal />} />
        <Route path="advisories" element={<Advisories />} />
        <Route path="records" element={<AnimalRecords />} />
        <Route path="report" element={<ReportDisease />} />
      </Route>
    </Routes>
  );
}

export default App;
