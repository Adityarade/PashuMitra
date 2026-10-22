import React, { useState, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin, Activity, FileText, Target,
  Shield, Plus, RadioTower, LogOut, User,
  Globe, ChevronDown, Home, Camera, Upload,
  Trash2, Check, X, Edit3, BadgeCheck
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import AIPashuSahayak from './AIPashuSahayak';

export interface UserProfile {
  name: string;
  role: string;
  phone: string;
  district: string;
  badgeId: string;
  avatarUrl: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Dr. Patil',
  role: 'Field Vet',
  phone: '+91 98452 87192',
  district: 'Dharwad District',
  badgeId: 'VET-KA-2026-4401',
  avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
};

const PRESET_AVATARS = [
  { label: 'Veterinarian', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200' },
  { label: 'Farmer / Keeper', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200' },
  { label: 'Bio-Defense Officer', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { label: 'Para-Vet Specialist', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
];

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

  // User Profile State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pashumitra_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setTempProfile(prev => ({
          ...prev,
          avatarUrl: uploadEvent.target!.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(tempProfile);
    localStorage.setItem('pashumitra_user_profile', JSON.stringify(tempProfile));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setProfileModalOpen(false);
    }, 1000);
  };

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

      {/* ── Profile Edit Modal ── */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-700 p-5 flex items-center justify-between sticky top-0 z-10">
              <h2 className="font-black text-white text-lg flex items-center gap-2">
                <Edit3 size={20} /> Edit Profile
              </h2>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-6">

              {/* Photo Upload Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {tempProfile.avatarUrl ? (
                    <img
                      src={tempProfile.avatarUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                      <User size={36} className="text-gray-400" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-primary-700 text-white flex items-center justify-center border-2 border-white shadow-md hover:bg-primary-800 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <div className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-primary-700 flex items-center gap-1.5 hover:text-primary-900 transition-colors"
                  >
                    <Upload size={14} /> Upload Custom Photo
                  </button>
                  <p className="text-[11px] text-gray-400">JPG, PNG up to 5MB</p>
                  {tempProfile.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setTempProfile(prev => ({ ...prev, avatarUrl: '' }))}
                      className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={11} /> Remove Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Preset Avatars Grid */}
              <div>
                <p className="text-xs font-bold text-gray-600 mb-2">Or choose a preset:</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map((av, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTempProfile(prev => ({ ...prev, avatarUrl: av.url }))}
                      className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition-all ${
                        tempProfile.avatarUrl === av.url
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-300'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="w-12 h-12 rounded-full object-cover" />
                      <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Full Name</label>
                  <input
                    value={tempProfile.name}
                    onChange={e => setTempProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Role / Designation</label>
                  <select
                    value={tempProfile.role}
                    onChange={e => setTempProfile(p => ({ ...p, role: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-bold text-gray-900 bg-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  >
                    <option>Field Vet</option>
                    <option>District Admin</option>
                    <option>Farmer / Keeper</option>
                    <option>Para-Vet Officer</option>
                    <option>Bio-Defense Officer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Phone Number</label>
                  <input
                    value={tempProfile.phone}
                    onChange={e => setTempProfile(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">District</label>
                  <input
                    value={tempProfile.district}
                    onChange={e => setTempProfile(p => ({ ...p, district: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <BadgeCheck size={14} className="text-primary-700" /> Official Badge / INAPH ID
                  </label>
                  <input
                    value={tempProfile.badgeId}
                    onChange={e => setTempProfile(p => ({ ...p, badgeId: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-mono font-bold text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* Save / Cancel Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl py-3 font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 rounded-2xl py-3 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    saveSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary-800 hover:bg-primary-900 text-white'
                  }`}
                >
                  {saveSuccess ? <><Check size={18} /> Saved!</> : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


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

        {/* Footer Info — dynamic profile */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5 mb-2 cursor-pointer group" onClick={() => { setTempProfile(profile); setProfileModalOpen(true); }}>
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-full object-cover border-2 border-primary-200 group-hover:border-primary-500 transition-colors flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-200 flex-shrink-0">
                <User size={14} className="text-primary-600" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-gray-800 truncate group-hover:text-primary-700 transition-colors">{profile.name}</p>
              <p className="text-[9px] text-gray-500 font-medium truncate">{profile.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={12} className="text-primary-600 flex-shrink-0" />
            <span className="bg-primary-50 text-primary-700 border border-primary-200 text-[10px] font-bold px-2 py-0.5 rounded-full truncate">
              {profile.district}
            </span>
          </div>
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
                <button
                  type="button"
                  onClick={() => {
                    setTempProfile(profile);
                    setProfileModalOpen(true);
                  }}
                  className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
                  title="Click to Edit Profile & Photo"
                >
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-bold text-white leading-tight group-hover:text-emerald-200 transition-colors flex items-center gap-1">
                      {profile.name}
                      <Edit3 size={11} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-300" />
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase">
                      {profile.role}
                    </span>
                  </div>

                  <div className="relative">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-white/30 group-hover:border-emerald-400 shadow-sm transition-all"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 group-hover:border-emerald-400 transition-colors">
                        <User size={18} />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-white text-[9px] shadow-sm">
                      <Camera size={9} />
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/login')}
                  title={t.logout}
                  className="w-9 h-9 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center border border-red-400/30 hover:bg-red-500/40 transition-colors ml-1"
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

        {/* Global AI Pashu Sahayak Assistant */}
        <AIPashuSahayak />
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
