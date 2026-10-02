import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, FileText, Target, Plus, ShieldCheck,
  MapPin, AlertTriangle, Syringe, Bell, Wifi, TrendingUp,
  RadioTower, Users, ClipboardList, Zap
} from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function LandingDashboard() {
  const navigate = useNavigate();
  const { t } = useLang();

  const alerts = [
    { village: 'Sherewad', type: 'FMD Suspected', time: '08:12 IST', color: 'bg-red-500' },
    { village: 'Kundagol', type: 'Quarantine Active', time: '07:45 IST', color: 'bg-amber-500' },
    { village: 'Navalgund', type: 'Vaccination Due', time: '06:30 IST', color: 'bg-blue-500' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 space-y-6 pb-8">

      {/* ── Hero Section ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[340px]">

        {/* Background image — much more visible */}
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1400"
          alt="Livestock Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark amber/teal overlay so image stays visible but text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent" />

        <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row lg:items-center gap-8">

          {/* Left Text */}
          <div className="flex-1">
            <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Bio-Defense Network Active
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight drop-shadow-lg">
              {t.welcomeTo}{' '}
              <span className="text-emerald-300">PashuMitra</span>
            </h1>

            <p className="text-gray-200 text-sm md:text-base leading-relaxed font-medium mb-6 max-w-xl drop-shadow">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/report')}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all active:scale-95 text-sm"
              >
                <Plus size={18} /> {t.logSymptom}
              </button>
              <button
                onClick={() => navigate('/surveillance')}
                className="bg-white/15 hover:bg-white/25 backdrop-blur text-white border border-white/30 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm"
              >
                <MapPin size={16} /> {t.viewFeed}
              </button>
              <button
                onClick={() => navigate('/report')}
                className="bg-red-500/80 hover:bg-red-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all active:scale-95 text-sm"
              >
                <RadioTower size={16} /> Contagion SOS
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[11px] text-white font-bold">{t.systemNominal}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                <Wifi size={14} className="text-emerald-400" />
                <span className="text-[11px] text-white font-bold">{t.allNodesOnline}</span>
              </div>
            </div>
          </div>

          {/* Right — Stats Panel */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full lg:w-[320px]">
            {[
              { label: t.monitored, value: '42', sub: '↑ 100% online', color: 'text-emerald-300' },
              { label: t.suspectedFlags, value: '7', sub: '↑ +3 since 06:00', color: 'text-red-300' },
              { label: t.quarantinedFarms, value: '18', sub: 'Bovine 14 · Caprine 4', color: 'text-white' },
              { label: t.immunityCoverage, value: '84%', sub: '', color: 'text-white', bar: true },
            ].map((s, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">{s.label}</p>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                {s.bar
                  ? <div className="w-full bg-white/20 h-1.5 rounded-full mt-2"><div className="bg-emerald-400 h-full rounded-full" style={{ width: '84%' }} /></div>
                  : <p className={`text-[10px] font-bold mt-1 ${s.color}`}>{s.sub}</p>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Live Alerts Strip ── */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-red-500" />
            <span className="font-bold text-gray-900 text-sm">Live Field Alerts</span>
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">3</span>
          </div>
          <button className="text-xs font-bold text-primary-700 hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${a.color}`}></span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{a.village}</p>
                <p className="text-xs text-gray-500 font-medium">{a.type}</p>
              </div>
              <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Access Modules ── */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.quickAccess}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div onClick={() => navigate('/surveillance')}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t.liveSurveillance}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{t.liveSurveillanceDesc}</p>
          </div>

          <div onClick={() => navigate('/vet')}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-300 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-100 transition-all">
              <Activity size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t.reportTriageLabel}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{t.reportTriageDesc}</p>
          </div>

          <div onClick={() => navigate('/records')}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-100 transition-all">
              <FileText size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t.herdRecordsLabel}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{t.herdRecordsDesc}</p>
          </div>

          <div onClick={() => navigate('/admin')}
            className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-lg hover:border-red-300 cursor-pointer transition-all group">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-red-100 transition-all">
              <Target size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t.outbreakRadarLabel}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{t.outbreakRadarDesc}</p>
          </div>

        </div>
      </div>

      {/* ── New Feature Rows ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* IVR Dispatch */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-5 text-white shadow-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <RadioTower size={22} className="text-emerald-300" />
          </div>
          <h4 className="font-bold text-base mb-1">IVR Mass Alert</h4>
          <p className="text-xs text-primary-200 leading-relaxed mb-4">Instantly dispatch voice alerts to 1,000+ farmers in a risk zone in their native language.</p>
          <button onClick={() => navigate('/vet')} className="bg-white/15 hover:bg-white/25 border border-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors w-full">
            Launch Advisory →
          </button>
        </div>

        {/* Vaccination Tracker */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Syringe size={22} />
          </div>
          <h4 className="font-bold text-gray-900 text-base mb-1">Vaccination Tracker</h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">Track herd-wide vaccination schedules, pending doses, and immunity progress.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold"><span className="text-gray-600">FMD Coverage</span><span className="text-indigo-600">84%</span></div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-indigo-500 h-full rounded-full" style={{ width: '84%' }} /></div>
            <div className="flex justify-between text-xs font-bold"><span className="text-gray-600">LSD Coverage</span><span className="text-amber-600">62%</span></div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-amber-500 h-full rounded-full" style={{ width: '62%' }} /></div>
          </div>
        </div>

        {/* Field Stats */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <TrendingUp size={22} />
          </div>
          <h4 className="font-bold text-gray-900 text-base mb-3">Weekly Activity</h4>
          <div className="space-y-2.5">
            {[
              { label: 'Reports Filed', val: '128', icon: <ClipboardList size={14} className="text-gray-400" /> },
              { label: 'Vets Deployed', val: '14', icon: <Users size={14} className="text-gray-400" /> },
              { label: 'Alerts Sent', val: '3,240', icon: <Zap size={14} className="text-gray-400" /> },
              { label: 'Cases Resolved', val: '97', icon: <ShieldCheck size={14} className="text-emerald-500" /> },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">{r.icon}{r.label}</div>
                <span className="text-sm font-black text-gray-900">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
