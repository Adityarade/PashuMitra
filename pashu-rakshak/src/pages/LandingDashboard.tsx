import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, FileText, Target, Plus, ShieldCheck,
  MapPin, AlertTriangle, Syringe, Bell, Wifi, TrendingUp,
  RadioTower, Users, ClipboardList, Zap, CheckCircle, ShieldAlert,
  Phone, X, RefreshCw
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { api } from '../services/api';
import type { SurveillanceStats, Incident } from '../services/api';

export default function LandingDashboard() {
  const navigate = useNavigate();
  const { t } = useLang();

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
  const [loading, setLoading] = useState(true);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosSending, setSosSending] = useState(false);
  const [sosSuccess, setSosSuccess] = useState<string | null>(null);
  const [ivrSuccess, setIvrSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [s, inc] = await Promise.all([
        api.getSurveillanceStats(),
        api.getIncidents()
      ]);
      setStats(s);
      setIncidents(inc);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerSOS = async () => {
    setSosSending(true);
    try {
      const res = await api.triggerSOS({
        village: 'Kundgol',
        district: 'Dharwad',
        farmer: 'Rapid SOS Dispatcher',
        phone: '+91 99000 88776'
      });
      setSosSuccess(res.message);
      await loadData();
      setTimeout(() => {
        setSosSuccess(null);
        setSosModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSosSending(false);
    }
  };

  const handleQuickIVR = async () => {
    try {
      const res = await api.triggerIVRBroadcast('Kundgol Village', 'HI');
      setIvrSuccess(res.message);
      setTimeout(() => setIvrSuccess(null), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 space-y-6 pb-12">

      {/* ── SOS Emergency Modal ── */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-red-500 animate-fade-in-up">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">CONTAGION SOS</h3>
                  <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Emergency Outbreak Containment</p>
                </div>
              </div>
              <button 
                onClick={() => setSosModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {sosSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                <CheckCircle size={36} className="text-emerald-600 mx-auto" />
                <p className="font-black text-emerald-900 text-base">{sosSuccess}</p>
                <p className="text-xs text-emerald-700">Digital perimeter locked. Paravet response team notified.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Triggering Contagion SOS will immediately initialize an automatic 500-meter digital quarantine ring, dispatch emergency paravets, and send automated IVR voice alerts to all surrounding cattle owners.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <RadioTower size={14} /> Affected Node: Kundgol Sector 1 (Zone 4B)
                  </p>
                  <p className="text-[11px] text-red-700">Estimated outreach: ~1,850 farmers via IVR phone broadcast</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSosModalOpen(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl py-3 text-sm font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTriggerSOS}
                    disabled={sosSending}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <RadioTower size={16} />
                    {sosSending ? 'Broadcasting...' : 'ACTIVATE SOS NOW'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Hero Section ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[340px]">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1400"
          alt="Livestock Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

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
                onClick={() => setSosModalOpen(true)}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all active:scale-95 text-sm animate-pulse"
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
          <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full lg:w-[340px]">
            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">{t.monitored}</p>
              <p className="text-3xl font-black text-emerald-300">{stats.monitoredClusters}</p>
              <p className="text-[10px] font-bold mt-1 text-emerald-400">↑ {stats.telemetryOnline}% online</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">{t.suspectedFlags}</p>
              <p className="text-3xl font-black text-red-400">{stats.suspectedFlagsToday}</p>
              <p className="text-[10px] font-bold mt-1 text-red-300">↑ +{stats.newFlagsSince6AM} today</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">{t.quarantinedFarms}</p>
              <p className="text-3xl font-black text-white">{stats.quarantinedFarms}</p>
              <p className="text-[10px] font-bold mt-1 text-gray-300">Bovine {stats.bovineQuarantined} · Caprine {stats.caprineQuarantined}</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-1">{t.immunityCoverage}</p>
              <p className="text-3xl font-black text-white">{stats.immunityCoverage}%</p>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-2">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${stats.immunityCoverage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Alerts Strip ── */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Bell size={18} className="text-red-500" />
            <span className="font-bold text-gray-900 text-sm sm:text-base">Live Field Telemetry & Outbreak Alerts</span>
            <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {incidents.length} Active
            </span>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="text-xs font-bold text-primary-700 hover:text-primary-900 transition-colors"
          >
            View Tactical Radar →
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {incidents.slice(0, 4).map((inc) => (
            <div key={inc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${inc.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">{inc.location}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {inc.disease}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{inc.actionStatus} • {inc.farmer}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 sm:text-right">{inc.timeAgo}</span>
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

      {/* ── Feature Cards Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* IVR Dispatch */}
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
              <RadioTower size={24} className="text-emerald-300" />
            </div>
            <h4 className="font-bold text-lg mb-1">IVR Mass Voice Alert</h4>
            <p className="text-xs text-primary-200 leading-relaxed mb-4">
              Simulate dispatching automated voice phone calls in regional languages to 1,000+ registered farmers in the high-risk perimeter.
            </p>
          </div>

          <div>
            {ivrSuccess ? (
              <div className="bg-white/20 rounded-xl p-2.5 text-xs text-emerald-200 font-bold mb-2 text-center">
                ✓ {ivrSuccess}
              </div>
            ) : null}
            <button 
              onClick={handleQuickIVR}
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-xl text-xs font-black transition-all w-full flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone size={14} /> Trigger Test IVR Broadcast
            </button>
          </div>
        </div>

        {/* Vaccination Tracker */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Syringe size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-1">Vaccination Ring Tracker</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Tracking herd-wide cold-chain vaccination campaigns and booster intervals across Dharwad cluster.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-700">FMD Raksha-Ovac Coverage</span>
                <span className="text-indigo-600">84%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-700">LSD Goat Pox Heterologous</span>
                <span className="text-amber-600">62%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <TrendingUp size={24} />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-3">Live Network Telemetry</h4>
          <div className="space-y-3">
            {[
              { label: 'Reports Filed', val: '128', icon: <ClipboardList size={15} className="text-gray-400" /> },
              { label: 'Paravets Deployed', val: '14', icon: <Users size={15} className="text-gray-400" /> },
              { label: 'Alerts Push Delivered', val: '3,240', icon: <Zap size={15} className="text-amber-500" /> },
              { label: 'Outbreak Perimeters Active', val: `${stats.activeCritical}`, icon: <ShieldAlert size={15} className="text-red-500" /> },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between pb-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">{r.icon}{r.label}</div>
                <span className="text-sm font-black text-gray-900">{r.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
