import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  if (activeTab === 'tactical-command') {
    return null;
  }

  const navItems: Array<{ tab: AppTab; label: string; icon: string }> = [
    { tab: 'surveillance', label: 'Surveillance', icon: 'fmd_good' },
    { tab: 'report-triage', label: 'Report & Triage', icon: 'add_alert' },
    { tab: 'herd-records', label: 'Herd Records', icon: 'inventory_2' },
    { tab: 'outbreak-radar', label: 'Outbreak Radar', icon: 'radar' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px] px-2.5 py-1 rounded-xl transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-teal-800 bg-teal-50 font-bold border border-teal-200/70 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[23px] transition-transform ${
                  isActive ? 'text-teal-700 scale-105' : 'text-slate-500'
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[11px] text-center leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
