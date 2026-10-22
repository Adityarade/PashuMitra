import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Layers, Map, AlertOctagon, CloudOff, RefreshCw, 
  CheckCircle, ArrowUp, AlertTriangle, RadioTower, Check
} from 'lucide-react';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import VetDashboard from './pages/VetDashboard';
import FarmerPortal from './pages/FarmerPortal';
import Advisories from './pages/Advisories';
import AnimalRecords from './pages/AnimalRecords';
import ReportDisease from './pages/ReportDisease';
import Login from './pages/Login';
import LandingDashboard from './pages/LandingDashboard';
import { api } from './services/api';
import type { SurveillanceStats, Incident } from './services/api';

function VillageFeed() {
  const [stats, setStats] = useState<SurveillanceStats>({
    monitoredClusters: 42,
    telemetryOnline: 100,
    suspectedFlagsToday: 7,
    newFlagsSince6AM: 3,
    activeCritical: 2,
    quarantinedFarms: 18,
    bovineQuarantined: 14,
    caprineQuarantined: 4,
    immunityCoverage: 84.2,
    activeLockdowns: 3
  });

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'suspected' | 'quarantined'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const loadFeed = async () => {
    try {
      const [s, inc] = await Promise.all([
        api.getSurveillanceStats(),
        api.getIncidents()
      ]);
      setStats(s);
      setIncidents(inc);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await api.syncOfflineQueue();
      setSyncStatus(`Edge database synced! (${res.syncedCount} queued reports uploaded)`);
      await loadFeed();
      setTimeout(() => setSyncStatus(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredIncidents = incidents.filter(i => {
    if (activeFilter === 'critical') return i.severity === 'critical';
    if (activeFilter === 'suspected') return i.disease.toLowerCase().includes('suspect');
    if (activeFilter === 'quarantined') return i.actionStatus.toLowerCase().includes('quarantine');
    return true;
  });

  return (
    <div className="w-full px-4 sm:px-6 space-y-6 pb-24">
      
      {/* Feed Filters */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <h2 className="flex items-center gap-2 font-black text-gray-900 text-lg">
          <Layers className="text-primary-700" size={20} />
          Village Bio-Surveillance Feed
        </h2>
        <span className="bg-primary-50 text-primary-800 px-3 py-1 rounded-full text-xs font-bold border border-primary-200">
          Zone 4B Active Grid
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition-colors ${
            activeFilter === 'all' ? 'bg-primary-800 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Map size={16} /> All Clusters ({incidents.length})
        </button>
        <button 
          onClick={() => setActiveFilter('critical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition-colors ${
            activeFilter === 'critical' ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-400"></span> Critical High Risk
        </button>
        <button 
          onClick={() => setActiveFilter('suspected')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition-colors ${
            activeFilter === 'suspected' ? 'bg-amber-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span> Suspected Outbreaks
        </button>
        <button 
          onClick={() => setActiveFilter('quarantined')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition-colors ${
            activeFilter === 'quarantined' ? 'bg-slate-800 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <AlertOctagon size={16} className="text-red-400" /> Quarantined Zones
        </button>
      </div>

      {/* Offline Storage & Edge Sync Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center border border-primary-100 flex-shrink-0">
            <CloudOff size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-base">Offline Storage & Edge Sync</h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                SQLite Cached
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Auto-syncs local disease telemetry once 2G/4G/Mesh connection is restored
            </p>
          </div>
        </div>

        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="bg-primary-800 hover:bg-primary-900 text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 flex-shrink-0"
        >
          <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing Telemetry...' : 'Sync Now'}
        </button>
      </div>

      {syncStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in-up">
          <Check size={16} className="text-emerald-600" /> {syncStatus}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monitored Clusters</p>
          <p className="text-3xl font-black text-gray-900 mb-1">{stats.monitoredClusters}</p>
          <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            <CheckCircle size={15} /> {stats.telemetryOnline}% telemetry online
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(225,29,72,0.5)]"></div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Suspected Flags Today</p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-black text-red-600">{stats.suspectedFlagsToday}</p>
            <span className="text-xs font-semibold text-gray-500">Specimens</span>
          </div>
          <p className="flex items-center gap-1 text-xs font-bold text-red-500">
            <ArrowUp size={15} /> +{stats.newFlagsSince6AM} since 06:00 IST
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Quarantined Farms</p>
          <p className="text-3xl font-black text-gray-900 mb-1">{stats.quarantinedFarms}</p>
          <p className="text-xs font-bold text-gray-500">Bovine ({stats.bovineQuarantined}) • Caprine ({stats.caprineQuarantined})</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Immunity Coverage</p>
          <p className="text-3xl font-black text-primary-800 mb-1">{stats.immunityCoverage}%</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
            <div className="bg-primary-600 h-full rounded-full" style={{ width: `${stats.immunityCoverage}%` }}></div>
          </div>
        </div>
      </div>

      {/* Cluster Incidents Stream */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-base">Active Village Feed Incidents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIncidents.map(inc => (
            <div key={inc.id} className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    inc.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {inc.type}
                  </span>
                  <h4 className="font-black text-gray-900 text-base mt-1.5">{inc.location}</h4>
                  <p className="text-xs text-gray-500 font-medium">Keeper: {inc.farmer} • Tag: {inc.rfid}</p>
                </div>
                <span className="text-xs font-bold text-gray-400">{inc.timeAgo}</span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 text-xs text-gray-700 leading-relaxed font-medium">
                {inc.description}
              </div>

              <div className="flex justify-between items-center text-xs font-bold pt-1">
                <span className="text-primary-800 flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-emerald-600" />
                  {inc.actionStatus}
                </span>
                <span className="text-gray-500 font-mono">
                  Confidence: {inc.confidence}%
                </span>
              </div>
            </div>
          ))}
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
