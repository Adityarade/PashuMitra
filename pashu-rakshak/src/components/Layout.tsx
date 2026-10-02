import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin, Activity, FileText, Target,
  Shield, Plus, RadioTower, LogOut, User,
  Globe, ChevronDown, Home
} from 'lucide-react';
import { useLang } from '../context/LangContext';

type LangCode = 'en' | 'hi' | 'mr';

const langOptions: { code: LangCode; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'mr', label: 'मराठी', short: 'MR' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: t.dashboard },
    { to: '/surveillance', icon: <MapPin size={20} />, label: t.surveillance },
    { to: '/vet', icon: <Activity size={20} />, label: t.reportTriage },
    { to: '/records', icon: <FileText size={20} />, label: t.herdRecords },
    { to: '/admin', icon: <Target size={20} />, label: t.outbreakRadar },
  ];

  const isLoginPage = location.pathname === '/login';
  if (isLoginPage) return <Outlet />;

  const currentLang = langOptions.find(l => l.code === lang) || langOptions[0];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 z-50 flex-shrink-0 shadow-md">

        {/* Logo Band — teal accent */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-700 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="font-black text-white text-base tracking-tight leading-none">PashuMitra</h1>
            <p className="text-[9px] text-primary-200 font-bold uppercase tracking-widest mt-0.5">Bio-Defense Network</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 px-3">{t.fieldModules}</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-800 border border-primary-200 shadow-sm'
                    : 'text-gray-500 hover:text-primary-800 hover:bg-primary-50/50 border border-transparent'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Emergency SOS */}
        <div className="px-4 pb-3">
          <button className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl py-2.5 text-xs font-black flex items-center justify-center gap-2 transition-colors">
            <RadioTower size={14} /> Emergency SOS
          </button>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 mb-1.5">
            <MapPin size={12} className="text-primary-600 flex-shrink-0" />
            <span className="bg-primary-50 text-primary-700 border border-primary-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Dharwad District
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-medium leading-tight">Hubballi Block · Zone 4B Active</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] text-emerald-600 font-bold">All Systems Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">

        {/* Top Header */}
        <header className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 sticky top-0 z-40 shadow-lg flex-shrink-0">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">

            {/* Mobile Logo */}
            <div className="flex md:hidden items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <h1 className="font-bold text-white text-lg tracking-tight leading-none">PashuMitra</h1>
            </div>

            {/* Desktop View Title */}
            <div className="hidden md:flex flex-col">
              <div className="text-xs font-bold text-primary-200 uppercase tracking-wider flex items-center gap-2">
                ACTIVE VIEW <span className="text-primary-400">|</span>
                <span className="text-white">Bio-Defense Terminal</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-end gap-2 ml-auto">
              <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1.5 rounded-full text-[10px] font-bold hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {t.offlineReady}
              </div>

              {/* Language Selector */}
              <div className="relative hidden sm:block ml-1">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 hover:bg-white/20 transition-colors text-white font-bold text-xs"
                >
                  <Globe size={15} className="text-primary-200" />
                  <span>{currentLang.short}</span>
                  <ChevronDown size={13} className="text-primary-200" />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                      {langOptions.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-primary-50 transition-colors flex justify-between items-center ${
                            lang === l.code ? 'text-primary-700 bg-primary-50/50' : 'text-gray-600'
                          }`}
                        >
                          <span>{l.label}</span>
                          <span className="text-[10px] text-gray-400">{l.short}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Profile & Logout */}
              <div className="flex items-center gap-2 border-l border-white/20 pl-3 ml-1 relative z-30">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-white leading-tight">Dr. Patil</span>
                  <span className="text-[10px] font-bold text-emerald-300 uppercase">Field Vet</span>
                </div>
                <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                  <User size={18} />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  title={t.logout}
                  className="w-9 h-9 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center border border-red-400/30 hover:bg-red-500/40 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="hidden md:flex items-center gap-3 px-6 py-2 border-t border-white/10 bg-black/10">
            <button
              onClick={() => navigate('/report')}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg px-4 py-2 font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              <Plus size={15} /> {t.logSymptom}
            </button>
            <button
              onClick={() => navigate('/report')}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-2 font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              <RadioTower size={15} /> Contagion SOS
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full pt-4 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile-only Floating Action Buttons */}
      <div className="md:hidden fixed bottom-[72px] left-0 right-0 z-30 pointer-events-none px-4 flex gap-3">
        <button
          onClick={() => navigate('/report')}
          className="flex-1 pointer-events-auto bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm shadow-xl transition-transform active:scale-95 border border-primary-700"
        >
          <Plus size={18} /> {t.logSymptom}
        </button>
        <button
          onClick={() => navigate('/report')}
          className="flex-1 pointer-events-auto bg-[#e11d48] hover:bg-red-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm shadow-xl transition-transform active:scale-95 border border-red-600"
        >
          <RadioTower size={18} /> Contagion SOS
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                  isActive ? 'text-white' : 'text-primary-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-white/20 shadow-sm' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-bold leading-tight -mt-1 text-center px-1">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
