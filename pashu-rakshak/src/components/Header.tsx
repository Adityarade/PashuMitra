import React from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    displaySettings,
    setIsLanguageModalOpen,
    pendingSyncCount,
    isSyncing,
    triggerSync,
  } = useApp();

  const lang = displaySettings.language;
  const isCommandView = activeTab === 'tactical-command';

  const viewTitles: Record<string, string> = {
    surveillance: TRANSLATIONS.surveillance[lang] || 'Surveillance',
    'report-triage': TRANSLATIONS.reportTriage[lang] || 'Report & Triage',
    'herd-records': TRANSLATIONS.herdRecords[lang] || 'Herd Records',
    'outbreak-radar': TRANSLATIONS.outbreakRadar[lang] || 'Outbreak Radar',
    'tactical-command': TRANSLATIONS.tacticalCommand[lang] || 'Tactical Command',
  };

  if (isCommandView) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-800 flex items-center justify-center text-teal-100 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">radar</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-slate-900 leading-none">AEROVET TELEMETRY</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tactical Command Core</span>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-200 hidden md:block"></div>

            <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
              <button
                type="button"
                className="px-3 py-1 bg-teal-800 text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                Global Nodes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('surveillance')}
                className="px-3 py-1 text-slate-600 hover:text-slate-900 text-xs font-medium rounded-lg transition-colors"
              >
                Field Operations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('outbreak-radar')}
                className="px-3 py-1 text-slate-600 hover:text-slate-900 text-xs font-medium rounded-lg transition-colors"
              >
                Topology Map
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('herd-records')}
                className="px-3 py-1 text-slate-600 hover:text-slate-900 text-xs font-medium rounded-lg transition-colors"
              >
                Telemetry Logs
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">SYSTEM OPTIMAL</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('surveillance')}
              className="px-3 py-1.5 bg-teal-50 border border-teal-200/80 rounded-lg text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors flex items-center gap-1.5 active:scale-95 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span className="hidden sm:inline">Back to Field Ops</span>
              <span className="sm:hidden">Field</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLanguageModalOpen(true)}
              className="min-h-[36px] px-2.5 flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-700 hover:bg-slate-200 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-teal-700">translate</span>
              <span className="font-semibold">EN | हि | ಕ</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm">
      <div className="h-28 px-4 flex flex-col justify-center gap-1.5 max-w-7xl mx-auto">
        {/* Row 1: Brand & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/70 flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-teal-700 text-[22px]">shield_with_heart</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] text-slate-900 tracking-tight truncate font-bold">
                  {TRANSLATIONS.appTitle[lang] || 'PashuRakshak'}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/70 text-[10px] text-teal-800 uppercase tracking-wider font-bold">
                  {TRANSLATIONS.fieldOps[lang] || 'Field Ops'}
                </span>
              </div>
              <span className="text-[12px] text-slate-500 truncate font-medium">
                {TRANSLATIONS.districtSub[lang] || 'Dharwad District • Hubballi Block'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="min-h-[38px] px-2.5 flex items-center gap-1.5 bg-slate-100 border border-slate-200/80 rounded-full text-[12px] text-slate-700 hover:bg-slate-200/80 transition-colors active:scale-95 shadow-2xs"
              type="button"
              title="Change Dialect & Display Readability"
            >
              <span className="material-symbols-outlined text-[16px] text-teal-700">translate</span>
              <span className="font-semibold">EN | हि | ಕ</span>
            </button>

            {/* Switch to Tactical Command Core */}
            <button
              onClick={() => setActiveTab('tactical-command')}
              className="p-1.5 bg-slate-100 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-full text-teal-800 transition-colors active:scale-95 shadow-2xs"
              title="AeroVet Telemetry Tactical Command Core"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </button>

            {/* Profile Avatar */}
            <img
              alt="Field Officer Profile"
              className="w-8 h-8 rounded-full ring-2 ring-slate-100 object-cover shrink-0 shadow-sm cursor-pointer hover:ring-teal-400 transition-all"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Ua6z5WmncRB_jNyscSTWCjG2TlAIxhaACyJkMyTnYpgxzvo6FA6QZLzx7q7jkBofyHHS_LiD3EApanE7AwZ0f6Nw_6-_cG423czu0XZg6DblleX3JM3dcWTitd0ALJFJnM-Gx0LDVFRRTUEbSA8WBjsEZjKm88qaX0rataK36vZABVN-RdW-UemfK_l4ERyWQRzH3wYnztjowhpHTTq0mnT6eMKVkOUsbHp6DClCSfYcP0hgnYDlFqkiw"
              onClick={() => setActiveTab('tactical-command')}
            />
          </div>
        </div>

        {/* Row 2: View Title & Offline Telemetry Banner */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="text-[12px] text-slate-400 tracking-wide uppercase font-semibold shrink-0">View:</span>
            <span className="text-[15px] text-teal-800 font-bold truncate">
              {viewTitles[activeTab] || 'Surveillance'}
            </span>
          </div>

          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 shrink-0 hover:bg-emerald-100 transition-colors active:scale-95 text-left cursor-pointer"
            type="button"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-800 whitespace-nowrap">
              {isSyncing
                ? 'Syncing Ingestions...'
                : pendingSyncCount > 0
                ? `Offline Ready • ${pendingSyncCount} Pending`
                : 'Offline Ready • Synced'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
