import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SurveillanceView: React.FC = () => {
  const {
    setActiveTab,
    pendingSyncCount,
    isSyncing,
    triggerSync,
    incidents,
    setIsBroadcastModalOpen,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'high-risk' | 'suspect' | 'quarantine'>('all');

  const filteredIncidents = incidents.filter((inc) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high-risk') return inc.type === 'critical' || inc.suspectPercent >= 80;
    if (activeFilter === 'suspect') return inc.type === 'suspect';
    if (activeFilter === 'quarantine') return inc.statusBadge.toLowerCase().includes('quarantine');
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto">
      {/* Bio-Surveillance Feed Header & Filter Chips */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">dynamic_feed</span>
            <h2 className="text-[17px] text-slate-900 tracking-tight font-bold">
              Village Bio-Surveillance Feed
            </h2>
          </div>
          <span className="text-[11px] text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-semibold">
            Zone 4B Active
          </span>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>All Villages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('high-risk')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'high-risk'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>High Risk (3)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('suspect')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'suspect'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Suspected Outbreak</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('quarantine')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'quarantine'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-rose-600">emergency</span>
            <span>Quarantine Active (2)</span>
          </button>
        </div>
      </section>

      {/* Offline Sync Banner */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 text-slate-900 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">cloud_off</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] text-slate-900 font-bold truncate">Offline Storage Active</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-bold">
                {pendingSyncCount} Cached
              </span>
            </div>
            <p className="text-[12px] text-slate-500 truncate">
              {pendingSyncCount > 0
                ? 'Pending auto-sync once LTE/Mesh reconnects'
                : 'All local records synchronized with server'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={triggerSync}
          disabled={isSyncing}
          className={`shrink-0 min-h-[36px] px-3.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
            isSyncing
              ? 'bg-teal-800 text-teal-100'
              : pendingSyncCount === 0
              ? 'bg-slate-100 border border-slate-200 text-slate-700'
              : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
          }`}
        >
          <span className={`material-symbols-outlined text-[17px] ${isSyncing ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isSyncing ? 'Syncing...' : pendingSyncCount === 0 ? 'Synced' : 'Sync Now'}</span>
        </button>
      </div>

      {/* Quick Metrics Grid */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Monitored Clusters */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Monitored Clusters</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">42</div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>100% telemetry online</span>
            </span>
          </div>
        </div>

        {/* Suspected Flags Today */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Suspected Flags Today</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-rose-700 tracking-tight font-mono">
              7 <span className="text-[13px] font-normal text-slate-500">Head</span>
            </div>
            <span className="text-[11px] text-rose-700 font-semibold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              <span>+3 since 06:00 IST</span>
            </span>
          </div>
        </div>

        {/* Active Isolation */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Active Isolation</span>
            <span className="material-symbols-outlined text-amber-600 text-[18px]">fence</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">18</div>
            <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
              Bovine (14) • Caprine (4)
            </span>
          </div>
        </div>

        {/* Booster Coverage */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-[12px] text-slate-500 font-medium">Booster Coverage</span>
            <span className="material-symbols-outlined text-teal-700 text-[18px]">vaccines</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-teal-800 tracking-tight font-mono">84.2%</div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full transition-all duration-500" style={{ width: '84.2%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Spatial Risk Radar & Epizootic Index */}
      <section className="rounded-xl bg-white border border-slate-200/80 flex flex-col overflow-hidden shadow-sm">
        <div className="p-3 flex items-center justify-between bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">radar</span>
            <span className="text-[14px] font-bold text-slate-900">Spatial Risk Radar &amp; Epizootic Index</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold">
            Hubballi South Block
          </span>
        </div>

        <div className="relative w-full h-56 bg-slate-100/70 overflow-hidden flex items-center justify-center">
          {/* Light Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="radar-grid-feed" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#cbd5e1" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radar-grid-feed)"></rect>
            <circle cx="50%" cy="50%" r="85" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="4 4" className="opacity-60"></circle>
            <circle cx="50%" cy="50%" r="45" fill="none" stroke="#0d9488" strokeWidth="1" className="opacity-40"></circle>
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#0d9488" strokeWidth="1" className="opacity-30"></line>
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#0d9488" strokeWidth="1" className="opacity-30"></line>
          </svg>

          {/* Interactive Radar Overlays */}
          <div className="absolute inset-0 p-3.5 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 border border-slate-200/90 shadow-sm px-2.5 py-1 rounded-lg backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] font-semibold text-slate-800">Kalghatgi: Low</span>
              </div>
              <div
                onClick={() => setActiveTab('outbreak-radar')}
                className="pointer-events-auto flex items-center gap-1.5 bg-red-50 border border-red-200 shadow-sm px-2.5 py-1 rounded-lg backdrop-blur-sm animate-pulse cursor-pointer hover:bg-red-100"
              >
                <span className="material-symbols-outlined text-rose-600 text-[16px]">warning</span>
                <span className="text-[11px] text-rose-800 font-bold">Kundgol: FMD Hotspot</span>
              </div>
            </div>

            <div className="relative w-full h-24 pointer-events-auto">
              {/* Kundgol FMD Marker */}
              <div
                onClick={() => setActiveTab('outbreak-radar')}
                className="absolute left-1/4 top-2 flex flex-col items-center cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute h-8 w-8 rounded-full bg-rose-400 opacity-60"></span>
                  <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[13px] text-white">emergency</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-800 mt-1 bg-white/95 border border-rose-200 px-1.5 py-0.5 rounded shadow-xs">
                  Kundgol (FMD)
                </span>
              </div>

              {/* Byahatti LSD Marker */}
              <div
                onClick={() => {
                  showToast('Byahatti Sector C', 'Lumpy Skin Disease containment cluster under active observation.', 'coronavirus', 'text-amber-500');
                }}
                className="absolute right-1/4 top-6 flex flex-col items-center cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-pulse absolute h-7 w-7 rounded-full bg-amber-400 opacity-50"></span>
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[11px] text-white">bubble_chart</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1 bg-white/95 border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
                  Byahatti (LSD)
                </span>
              </div>

              {/* Navalgund Safe Marker */}
              <div
                onClick={() => {
                  showToast('Navalgund Hub', 'Zero active outbreaks reported in Navalgund cluster.', 'verified', 'text-emerald-500');
                }}
                className="absolute left-1/2 bottom-1 flex flex-col items-center cursor-pointer"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm flex items-center justify-center"></div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1 bg-white/95 border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
                  Navalgund
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[11px] bg-white/80 px-1.5 py-0.5 rounded border border-slate-200/60 font-medium">
                Radius: 25km Cluster Grid
              </span>
              <span className="text-[11px] font-bold text-teal-800 bg-white/80 px-1.5 py-0.5 rounded border border-slate-200/60 font-mono">
                GPS HDOP: 0.9m
              </span>
            </div>
          </div>
        </div>

        {/* Weather & Vector Risk Correlation */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-amber-700 text-[18px]">thunderstorm</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-slate-900 font-bold">Weather &amp; Vector Risk Correlation</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 border border-amber-300/80 text-amber-900 font-bold">
                High HS Risk
              </span>
            </div>
            <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">
              Monsoon standing water + vector surge detected. High susceptibility for Hemorrhagic Septicemia in low-lying riparian pastures along Bennihalla stream.
            </p>
          </div>
        </div>
      </section>

      {/* Urgent Field Incident Feed */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-rose-600 text-[20px]">notifications_active</span>
            <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Urgent Field Incident Feed</h3>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            2 Active Critical
          </span>
        </div>

        {filteredIncidents.map((incident) => {
          const isCritical = incident.type === 'critical';
          return (
            <div
              key={incident.id}
              className="p-4 rounded-xl bg-white border border-slate-200/80 flex flex-col gap-3 shadow-sm relative overflow-hidden"
            >
              {/* Border Color Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${isCritical ? 'bg-rose-600' : 'bg-amber-500'}`}></div>

              <div className="flex items-start justify-between gap-2 pt-0.5">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${
                        isCritical
                          ? 'bg-rose-100 border border-rose-200 text-rose-800'
                          : 'bg-amber-100 border border-amber-200 text-amber-900'
                      }`}
                    >
                      {isCritical ? 'Critical Outbreak' : 'Observation Suspect'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{incident.timestamp}</span>
                  </div>
                  <h4 className="text-[16px] text-slate-900 font-bold mt-1.5 truncate">{incident.title}</h4>
                  <span className="text-[12px] text-slate-500 font-medium">
                    Farmer: {incident.farmer} • RFID: {incident.rfid}
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isCritical ? 'bg-rose-50 border border-rose-100 text-rose-600' : 'bg-amber-50 border border-amber-100 text-amber-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{incident.icon}</span>
                </div>
              </div>

              {/* Symptom summary callout box */}
              <div
                className={`p-3 rounded-lg flex flex-col gap-1.5 ${
                  isCritical ? 'bg-rose-50/60 border border-rose-100' : 'bg-amber-50/50 border border-amber-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-900 font-bold">{incident.symptomsCountSummary}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-extrabold ${
                      isCritical ? 'bg-rose-200/80 text-rose-900' : 'bg-amber-200/80 text-amber-950'
                    }`}
                  >
                    {incident.suspectPercent}% {incident.suspectDisease}
                  </span>
                </div>
                <p className="text-[12px] text-slate-700 leading-relaxed">{incident.clinicalNotes}</p>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span className="material-symbols-outlined text-[17px]">
                    {isCritical ? 'verified' : 'local_shipping'}
                  </span>
                  <span className="text-[11px] font-semibold truncate">{incident.statusBadge}</span>
                </div>

                {isCritical ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('report-triage')}
                    className="min-h-[40px] px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[13px] font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    <span>View Case &amp; Protocol</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      showToast(
                        'Para-Vet Dispatched',
                        'Assigned Dr. Suresh Patil to Byahatti Hamlet Sector C.',
                        'person_add',
                        'text-teal-300'
                      );
                    }}
                    className="min-h-[40px] px-4 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-[13px] font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Assign Para-Vet</span>
                    <span className="material-symbols-outlined text-[16px]">person_add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Sticky Quick Action CTAs */}
      <div className="sticky bottom-20 z-30 flex items-center gap-2 mt-2 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('report-triage')}
          className="flex-1 min-h-[50px] px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Log Rapid Symptom</span>
        </button>

        <button
          type="button"
          onClick={() => setIsBroadcastModalOpen(true)}
          className="min-h-[50px] px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">cell_tower</span>
          <span className="hidden sm:inline">Contagion SOS</span>
          <span className="sm:hidden">Broadcast</span>
        </button>
      </div>
    </div>
  );
};
