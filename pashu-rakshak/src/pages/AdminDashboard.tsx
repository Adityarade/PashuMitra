import React from 'react';
import { 
  ShieldAlert, Activity, CheckCircle, Navigation,
  AlertOctagon, BellRing, CloudLightning, ShieldCheck,
  Truck, UserPlus, ChevronRight, Map, Grid
} from 'lucide-react';

function SpatialRiskRadar() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-1 shadow-sm mb-6">
      <div className="p-4 flex justify-between items-center border-b border-gray-50">
        <h3 className="flex items-center gap-2 font-bold text-gray-900">
          <Map className="text-primary-700" size={20} />
          Spatial Risk Radar & Epizootic Index
        </h3>
        <span className="status-badge bg-primary-50 text-primary-700 border border-primary-200 text-[10px] font-bold">
          Hubballi South Block
        </span>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-lg mx-auto flex items-center justify-center p-4">
        {/* Grid Background */}
        <div className="absolute inset-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGExIDEgMCAwMTEgMXY4YTEgMSAwIDAxLTIgMHYtOGExIDEgMCAwMTEtMXptMC0xMGExIDEgMCAwMTEgMXY4YTEgMSAwIDAxLTIgMFYxYTEgMSAwIDAxMS0xeiIgZmlsbD0iI2YxZjVmOSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50 rounded-xl"></div>
        
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
          {/* Radar Circles */}
          <circle cx="200" cy="150" r="100" fill="none" stroke="#cbd5e1" strokeDasharray="6 6" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="200" y1="30" x2="200" y2="270" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="80" y1="150" x2="320" y2="150" stroke="#e2e8f0" strokeWidth="1" />

          {/* Nodes */}
          {/* Kundgol FMD */}
          <g transform="translate(160, 110)">
            <circle cx="0" cy="0" r="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
            <path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="#e11d48" strokeWidth="2" />
          </g>
          
          {/* Byahatti LSD */}
          <g transform="translate(260, 130)">
            <circle cx="0" cy="0" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="-3" cy="-3" r="2" fill="#f59e0b" />
            <circle cx="4" cy="2" r="2.5" fill="#f59e0b" />
            <circle cx="-2" cy="4" r="1.5" fill="#f59e0b" />
          </g>

          {/* Navalgund / Kalghatgi */}
          <circle cx="240" cy="180" r="6" fill="#10b981" />
          <circle cx="100" cy="80" r="6" fill="#10b981" />
        </svg>

        {/* CSS overlays for labels to match exact styling */}
        <div className="absolute top-[20%] left-[10%] bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-bold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Kalghatgi: Low
        </div>

        <div className="absolute top-[20%] right-[10%] bg-critical-50 border border-critical-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 text-xs font-bold text-critical-700">
          <AlertOctagon size={14} /> Kundgol: FMD Hotspot
        </div>

        <div className="absolute top-[42%] left-[30%] bg-white/90 backdrop-blur-sm border border-critical-100 px-2 py-0.5 rounded text-[10px] font-bold text-critical-700">
          Kundgol (FMD)
        </div>

        <div className="absolute top-[46%] right-[22%] bg-white/90 backdrop-blur-sm border border-yellow-200 px-2 py-0.5 rounded text-[10px] font-bold text-amber-800">
          Byahatti (LSD)
        </div>

        <div className="absolute bottom-[35%] right-[32%] bg-white/90 backdrop-blur-sm border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold text-gray-600">
          Navalgund
        </div>

        {/* Bottom Legend */}
        <div className="absolute bottom-4 left-4 bg-white/80 px-2 py-1 rounded text-[10px] font-semibold text-gray-500">
          Radius: 25km Cluster Grid
        </div>
        <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-[10px] font-bold text-primary-700 font-mono">
          GPS HDOP: 0.9m
        </div>
      </div>

      {/* Weather & Vector Risk Correlation */}
      <div className="m-4 mt-0 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4 flex gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 flex-shrink-0 border border-amber-100 shadow-sm">
          <CloudLightning size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-gray-900 text-sm">Weather & Vector Risk Correlation</h4>
            <span className="bg-[#fef3c7] text-amber-800 border border-[#fcd34d] px-2 py-0.5 rounded text-[10px] font-bold">High HS Risk</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Monsoon standing water + vector surge detected. High susceptibility for Hemorrhagic Septicemia in low-lying riparian pastures along Bennihalla stream.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="w-full px-4 sm:px-6 space-y-6">
      
      {/* Bio-Defense Vector Banner */}
      <div className="bg-critical-50 rounded-2xl p-5 border border-critical-100 shadow-sm mb-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-critical-600" size={20} />
            <span className="text-critical-700 font-bold text-xs uppercase tracking-wider">Bio-Defense Vector Tier 1</span>
          </div>
          <span className="bg-critical-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">FMD Type-A</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-1">Kundgol Block Containment</h2>
        <p className="text-gray-600 text-sm mb-4">3km Zero-Movement Restriction Zone • Quarantined Hub</p>
        
        <div className="flex items-center gap-6 pt-4 border-t border-critical-200/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Activity className="text-critical-600" size={18} />
            Active: 36h 20m
          </div>
          <div className="w-1 h-1 rounded-full bg-critical-300"></div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Navigation className="text-critical-600" size={18} />
            Hubballi South Grid
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_450px] xl:grid-cols-[minmax(0,1fr)_500px] gap-8 items-start">
        {/* Left Column: Spatial Risk Radar */}
        <div>
          <SpatialRiskRadar />
        </div>

        {/* Right Column: Urgent Field Incident Feed */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
              <BellRing className="text-critical-600" size={22} />
              Urgent Field Incident Feed
            </h3>
            <span className="bg-critical-50 border border-critical-200 text-critical-700 font-bold text-[10px] px-3 py-1 rounded-full">
              2 Active Critical
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Critical Outbreak Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1.5 w-full bg-critical-600"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-critical-50 text-critical-700 border border-critical-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Critical Outbreak
                    </span>
                    <span className="text-xs text-gray-400 font-medium">14 mins ago</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-critical-50 text-critical-600 flex items-center justify-center border border-critical-100 flex-shrink-0">
                    <span className="material-symbols-outlined">medical_bag</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">Kundgol Village • Plot 14</h2>
                <p className="text-xs text-gray-500 mb-4">Farmer: Ramesh Patil • RFID: #IND-KA-9921</p>

                <div className="bg-critical-50/50 border border-critical-100 rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm">3 Murrah Buffaloes Symptomatic</h4>
                    <span className="bg-critical-200 text-critical-800 px-2 py-0.5 rounded text-xs font-bold shadow-sm whitespace-nowrap">
                      94% FMD Suspect
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    High fever (105.4°F), profuse salivation with ropy drooling, vesicle eruptions across oral mucosa and interdigital clefts. Animal recumbent.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <ShieldCheck size={18} />
                    Quarantine Active • Vet En Route
                  </div>
                  <button className="bg-critical-600 hover:bg-critical-700 text-white rounded-xl py-2.5 px-5 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-colors">
                    View Case & Protocol <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Observation Suspect 1 (Byahatti Hamlet) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1.5 w-full bg-amber-500"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-100 text-amber-900 border border-yellow-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Observation Suspect
                    </span>
                    <span className="text-xs text-gray-400 font-medium">42 mins ago</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-amber-600 flex items-center justify-center border border-orange-100 flex-shrink-0">
                    <span className="material-symbols-outlined">coronavirus</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">Byahatti Hamlet • Sector C</h2>
                <p className="text-xs text-gray-500 mb-4">Farmer: Basappa Hubballi • RFID: #IND-KA-4418</p>

                <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm">2 HF Crossbred Cows</h4>
                    <span className="bg-[#fcd34d] text-amber-900 px-2 py-0.5 rounded text-xs font-bold shadow-sm whitespace-nowrap">
                      78% LSD Suspect
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Circumscribed nodular skin lesions (2–5cm) over neck and perineum. Enlarged prescapular lymph nodes with moderate pyrexia (103.8°F).
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-primary-700 font-bold text-xs">
                    <Truck size={18} />
                    Sample Kit Sent • Hubballi Lab
                  </div>
                  <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl py-2 px-4 flex items-center justify-center gap-2 font-bold text-xs shadow-sm transition-colors">
                    Assign Para-Vet <UserPlus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Observation Suspect 2 (Sherewad Pasture) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1.5 w-full bg-amber-500"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-100 text-amber-900 border border-yellow-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Observation Suspect
                    </span>
                    <span className="text-xs text-gray-400 font-medium">1 hr ago</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-amber-600 flex items-center justify-center border border-orange-100 flex-shrink-0">
                    <span className="material-symbols-outlined">grid_view</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">Sherewad Pasture • Cluster 8</h2>
                <p className="text-xs text-gray-500 mb-4">Farmer: Rameshwar Gowda • RFID: #IND-KA-29-881294</p>

                <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm">1 Gir Crossbred Cow Isolated</h4>
                    <span className="bg-[#fcd34d] text-amber-900 px-2 py-0.5 rounded text-xs font-bold shadow-sm whitespace-nowrap">
                      88% FMD Early Phase
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Sudden milk yield drop from 12L to 4.2L, rectal temperature 104.2°F, sub-normal rumen movements, hyper-salivation onset.
                  </p>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors">
                      <span className="material-symbols-outlined text-[18px]">add_circle</span> Log Rapid Symptom
                    </button>
                    <button className="flex-1 bg-[#e11d48] hover:bg-red-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors">
                      <span className="material-symbols-outlined text-[18px]">cell_tower</span> Contagion SOS
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-primary-700 font-bold text-xs">
                    <Truck size={18} />
                    Quarantine Day 2 of 14 • Isolation Unit 3
                  </div>
                  <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl py-2 px-4 flex items-center justify-center gap-2 font-bold text-xs shadow-sm transition-colors">
                    Assign Para-Vet <UserPlus size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
