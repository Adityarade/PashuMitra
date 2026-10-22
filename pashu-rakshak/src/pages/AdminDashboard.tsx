import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Activity, CheckCircle, Navigation,
  AlertOctagon, BellRing, CloudLightning, ShieldCheck,
  Truck, UserPlus, ChevronRight, Map, Grid, PlusCircle,
  RadioTower, Stethoscope, Bug, Check, RefreshCw, X
} from 'lucide-react';
import { api } from '../services/api';
import type { Incident } from '../services/api';

function SpatialRiskRadar() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-2 shadow-sm mb-6">
      <div className="p-4 flex justify-between items-center border-b border-gray-100">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 text-base">
          <Map className="text-primary-700" size={20} />
          Spatial Risk Radar & Epizootic Index
        </h3>
        <span className="bg-primary-50 text-primary-800 border border-primary-200 text-xs font-bold px-3 py-1 rounded-full">
          Hubballi South Grid (Zone 4B)
        </span>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-lg mx-auto flex items-center justify-center p-4">
        {/* Radar Circles */}
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
          <circle cx="200" cy="150" r="100" fill="none" stroke="#cbd5e1" strokeDasharray="6 6" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="200" y1="30" x2="200" y2="270" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="80" y1="150" x2="320" y2="150" stroke="#e2e8f0" strokeWidth="1" />

          {/* Kundgol FMD */}
          <g transform="translate(160, 110)">
            <circle cx="0" cy="0" r="14" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
            <path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="#e11d48" strokeWidth="2" />
          </g>
          
          {/* Byahatti LSD */}
          <g transform="translate(260, 130)">
            <circle cx="0" cy="0" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="-3" cy="-3" r="2" fill="#f59e0b" />
            <circle cx="4" cy="2" r="2.5" fill="#f59e0b" />
            <circle cx="-2" cy="4" r="1.5" fill="#f59e0b" />
          </g>

          {/* Safe Nodes */}
          <circle cx="240" cy="180" r="7" fill="#10b981" />
          <circle cx="100" cy="80" r="7" fill="#10b981" />
        </svg>

        {/* CSS overlays for nodes */}
        <div className="absolute top-[20%] left-[8%] bg-white border border-gray-200 px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1.5 text-xs font-bold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Kalghatgi: Nominal
        </div>

        <div className="absolute top-[18%] right-[8%] bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 text-xs font-black text-red-700">
          <AlertOctagon size={14} /> Kundgol: FMD Hotspot
        </div>

        <div className="absolute top-[42%] left-[28%] bg-white/95 backdrop-blur-sm border border-red-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-red-700 shadow-sm">
          Kundgol (FMD 94%)
        </div>

        <div className="absolute top-[46%] right-[22%] bg-white/95 backdrop-blur-sm border border-amber-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-900 shadow-sm">
          Byahatti (LSD 78%)
        </div>

        <div className="absolute bottom-[35%] right-[32%] bg-white/95 backdrop-blur-sm border border-gray-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-700 shadow-sm">
          Navalgund (Monitored)
        </div>

        {/* Bottom Legend */}
        <div className="absolute bottom-3 left-4 bg-white/90 border border-gray-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-600 shadow-sm">
          Radius: 25km Cluster Grid
        </div>
        <div className="absolute bottom-3 right-4 bg-white/90 border border-gray-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary-800 font-mono shadow-sm">
          GPS HDOP: 0.9m
        </div>
      </div>

      {/* Weather & Vector Risk Correlation */}
      <div className="m-4 mt-0 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4 shadow-sm">
        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-amber-600 flex-shrink-0 border border-amber-200 shadow-sm">
          <CloudLightning size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900 text-sm">Weather & Vector Risk Correlation</h4>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-black">
              HIGH HS VECTOR SURGE
            </span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            Standing rain water detected along Bennihalla stream. High susceptibility for Hemorrhagic Septicemia. Cold-chain vaccination protocol enforced.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [assignedVet, setAssignedVet] = useState<string | null>(null);

  const loadIncidents = async () => {
    try {
      const data = await api.getIncidents();
      setIncidents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleAssignVet = (incidentId: string) => {
    setAssignedVet(incidentId);
    setTimeout(() => setAssignedVet(null), 3000);
  };

  return (
    <div className="w-full px-4 sm:px-6 pb-24 space-y-6">
      
      {/* Bio-Defense Vector Banner */}
      <div className="bg-red-50 rounded-3xl p-6 border border-red-200 shadow-sm mb-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="text-red-600" size={24} />
            <span className="text-red-700 font-black text-xs uppercase tracking-wider">
              Bio-Defense Vector Tier 1 Containment Active
            </span>
          </div>
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">
            FMD Type-A / LSD Ring
          </span>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-1">Kundgol & Byahatti Containment Grid</h2>
        <p className="text-gray-600 text-sm mb-4 font-medium">
          3km Zero-Livestock Movement Restriction Zone • Quarantined Hub • 42 Telemetry Clusters Monitored
        </p>
        
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-red-200/60">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <Activity className="text-red-600" size={18} />
            Active Lockdown: 36h 20m
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-red-300"></div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <Navigation className="text-red-600" size={18} />
            Hubballi South Grid (42 Farms Monitored)
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-red-300"></div>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
            <CheckCircle size={18} />
            100% Telemetry Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_480px] xl:grid-cols-[minmax(0,1fr)_540px] gap-8 items-start">
        {/* Left Column: Spatial Risk Radar */}
        <div>
          <SpatialRiskRadar />
        </div>

        {/* Right Column: Urgent Field Incident Feed */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
              <BellRing className="text-red-600" size={22} />
              Urgent Field Incident Feed
            </h3>
            <span className="bg-red-100 border border-red-200 text-red-800 font-black text-xs px-3 py-1 rounded-full">
              {incidents.length} Active Cases
            </span>
          </div>

          {assignedVet && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2 animate-fade-in-up">
              <CheckCircle size={18} className="text-emerald-600" />
              Para-Vet Unit #4 dispatched to incident {assignedVet}! GPS coordinates synced.
            </div>
          )}
          
          <div className="space-y-4">
            {incidents.map((inc) => {
              const isCrit = inc.severity === 'critical';
              return (
                <div key={inc.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-1.5 w-full ${isCrit ? 'bg-red-600' : 'bg-amber-500'}`} />
                  
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          isCrit ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {inc.type}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{inc.timeAgo}</span>
                      </div>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        isCrit ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {isCrit ? <Stethoscope size={20} /> : <Bug size={20} />}
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-1">{inc.location}</h2>
                    <p className="text-xs text-gray-500 mb-4 font-medium">
                      Farmer: {inc.farmer} • RFID: <span className="font-mono font-bold text-gray-800">{inc.rfid}</span>
                    </p>

                    <div className={`rounded-2xl p-4 mb-4 border ${
                      isCrit ? 'bg-red-50/50 border-red-100' : 'bg-amber-50/50 border-amber-100'
                    }`}>
                      <div className="flex justify-between items-center mb-1.5">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {inc.animalCount} {inc.species} Symptomatic
                        </h4>
                        <span className={`px-2.5 py-0.5 rounded text-xs font-black shadow-sm ${
                          isCrit ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'
                        }`}>
                          {inc.confidence}% {inc.disease}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        {inc.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                        <ShieldCheck size={18} />
                        {inc.actionStatus}
                      </div>
                      
                      <button 
                        onClick={() => handleAssignVet(inc.id)}
                        className="bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-2 px-4 flex items-center justify-center gap-1.5 font-bold text-xs shadow-sm transition-colors w-full sm:w-auto"
                      >
                        Assign Para-Vet <UserPlus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
