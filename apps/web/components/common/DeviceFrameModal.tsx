'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  RotateCw, 
  X, 
  Download, 
  Wifi, 
  WifiOff, 
  Battery, 
  Signal, 
  Sparkles,
  QrCode,
  CheckCircle2
} from 'lucide-react';

interface DeviceFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeviceFrameModal({ isOpen, onClose }: DeviceFrameModalProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [simulatedNetwork, setSimulatedNetwork] = useState<'4g' | '2g_patchy' | 'offline'>('4g');
  const [apkDownloaded, setApkDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    setApkDownloaded(true);
    setTimeout(() => {
      setApkDownloaded(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl p-6 text-white shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Web + Android App Live Device Emulator
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Test responsive behavior across low-end rural Android phones, tablets, and wide screens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  deviceMode === 'mobile' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android (6.5&quot;)</span>
              </button>

              <button
                onClick={() => setDeviceMode('tablet')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  deviceMode === 'tablet' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet (10&quot;)</span>
              </button>

              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  deviceMode === 'desktop' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Full Web</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Network & Low-Bandwidth Simulator Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Simulate Rural Bandwidth:</span>
            <div className="flex items-center gap-1.5">
              {(['4g', '2g_patchy', 'offline'] as const).map((net) => (
                <button
                  key={net}
                  onClick={() => setSimulatedNetwork(net)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    simulatedNetwork === net
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {net === '4g' ? '⚡ 4G / Broadband' : net === '2g_patchy' ? '📶 Patchy 2G (Audio Only)' : '📴 100% Offline (PWA)'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadApk}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              {apkDownloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{apkDownloaded ? 'BhashaSetu.apk Generated!' : 'Download Android APK (FOSS)'}</span>
            </button>
          </div>
        </div>

        {/* Live Device Frame Container */}
        <div className="flex items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden min-h-[520px]">
          {deviceMode === 'mobile' ? (
            <div className="relative w-[360px] h-[640px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col">
              {/* Android Notch & Camera */}
              <div className="h-6 w-full flex items-center justify-between px-6 pt-1 text-[10px] text-slate-400 select-none">
                <span>10:30</span>
                <div className="w-16 h-3 bg-black rounded-full" />
                <div className="flex items-center gap-1">
                  <Signal className="w-3 h-3 text-emerald-400" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* In-Frame Embedded Browser */}
              <div className="flex-1 w-full bg-slate-50 rounded-[32px] overflow-hidden border border-slate-800 relative mt-1">
                <iframe
                  src="/student"
                  className="w-full h-full border-0"
                  title="Android Mobile View"
                />
              </div>

              {/* Android Home Navigation Bar */}
              <div className="h-4 flex items-center justify-center pt-1">
                <div className="w-24 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          ) : deviceMode === 'tablet' ? (
            <div className="relative w-[720px] h-[500px] bg-slate-900 rounded-[36px] p-4 shadow-2xl border-4 border-slate-700 flex flex-col">
              <div className="flex-1 w-full bg-slate-50 rounded-[24px] overflow-hidden border border-slate-800">
                <iframe
                  src="/student"
                  className="w-full h-full border-0"
                  title="Android Tablet View"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-[520px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-700">
              <iframe
                src="/student"
                className="w-full h-full border-0"
                title="Full Web View"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
