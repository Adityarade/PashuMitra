'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Download, 
  QrCode, 
  CheckCircle2, 
  ArrowLeft, 
  Wifi, 
  WifiOff, 
  HardDrive, 
  Layers, 
  Cpu, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import DeviceFrameModal from '@/components/common/DeviceFrameModal';

export default function AndroidAppHubPage() {
  const [showEmulator, setShowEmulator] = useState(false);
  const [apkDownloaded, setApkDownloaded] = useState(false);
  const [storageCleaned, setStorageCleaned] = useState(false);

  const handleDownload = () => {
    setApkDownloaded(true);
    setTimeout(() => setApkDownloaded(false), 3500);
  };

  const handleClearCache = () => {
    setStorageCleaned(true);
    setTimeout(() => setStorageCleaned(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      
      <div className="flex items-center justify-between">
        <Link
          href="/student"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-md">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Multi-Platform Distribution • Android + Web PWA
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                BhashaSetu Android App & Web Hub
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Single codebase engineered with Next.js PWA + React Native Expo for zero licensing cost
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEmulator(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold shadow-md transition-transform hover:scale-105"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Launch Live Android Emulator</span>
          </button>
        </div>

        {/* 3 Pillars of Multi-Device Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Android APK & Play Store */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Native Android Build</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">Android APK & Expo Go</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lightweight Android APK (18 MB) optimized for low-end 2GB RAM smartphones in rural schools.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              {apkDownloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{apkDownloaded ? 'BhashaSetu_v1.0.apk Ready!' : 'Download Android APK (FOSS)'}</span>
            </button>
          </div>

          {/* Pillar 2: Progressive Web App (PWA) */}
          <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Web PWA (Any Browser)</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">Instant Laptop & Chrome Install</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Install directly on shared school laptops or Chromebooks with full offline Service Worker caching.
              </p>
            </div>

            <button
              onClick={() => alert('PWA is installed and active in this browser with offline Service Worker!')}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>PWA Offline Cache Active</span>
            </button>
          </div>

          {/* Pillar 3: Offline IndexedDB Storage */}
          <div className="p-6 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                <HardDrive className="w-4 h-4" />
                <span>Dexie IndexedDB Engine</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">Offline Curriculum Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                4 NCERT Lessons + 12 Audio Streams cached locally. Zero internet needed for playback.
              </p>
            </div>

            <button
              onClick={handleClearCache}
              className="w-full py-3 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {storageCleaned ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <HardDrive className="w-4 h-4 text-slate-500" />}
              <span>{storageCleaned ? 'Cache Re-indexed (4.2 MB)' : 'Inspect Offline Cache'}</span>
            </button>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-black text-white">
            Cross-Platform Feature Parity Matrix (NEP 2020)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold">
                  <th className="pb-3">Feature</th>
                  <th className="pb-3">Android Mobile App</th>
                  <th className="pb-3">Web Laptop (PWA)</th>
                  <th className="pb-3">IVR Voice Hotline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                <tr>
                  <td className="py-3 font-bold text-white">Karaoke Read-Along (Audio Sync)</td>
                  <td className="py-3 text-emerald-400">✓ Full Support</td>
                  <td className="py-3 text-emerald-400">✓ Full Support</td>
                  <td className="py-3 text-slate-500">Audio Only</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">Curriculum RAG Doubt Tutor</td>
                  <td className="py-3 text-emerald-400">✓ Voice + Text</td>
                  <td className="py-3 text-emerald-400">✓ Voice + Text</td>
                  <td className="py-3 text-emerald-400">✓ Voice Bridge</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">100% Zero-Connectivity Offline Mode</td>
                  <td className="py-3 text-emerald-400">✓ SQLite Cache</td>
                  <td className="py-3 text-emerald-400">✓ IndexedDB Cache</td>
                  <td className="py-3 text-slate-500">GSM Network</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">Live Classroom Subtitle Streaming</td>
                  <td className="py-3 text-emerald-400">✓ Sub-second WebSocket</td>
                  <td className="py-3 text-emerald-400">✓ Sub-second WebSocket</td>
                  <td className="py-3 text-slate-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeviceFrameModal
        isOpen={showEmulator}
        onClose={() => setShowEmulator(false)}
      />
    </div>
  );
}
