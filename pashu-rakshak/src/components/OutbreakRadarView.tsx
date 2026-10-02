import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const OutbreakRadarView: React.FC = () => {
  const { setIsBroadcastModalOpen, showToast } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [advisoryLang, setAdvisoryLang] = useState<'kn' | 'hi' | 'en'>('kn');
  const [playbackTime, setPlaybackTime] = useState(24);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play synthetic voice preview tone
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setPlaybackTime((t) => (t >= 48 ? 0 : t + 1));
      }, 1000);

      // Sound synthesis
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
          const osc = audioContextRef.current.createOscillator();
          const gain = audioContextRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
          gain.gain.setValueAtTime(0.04, audioContextRef.current.currentTime);
          osc.connect(gain);
          gain.connect(audioContextRef.current.destination);
          osc.start();
          setTimeout(() => {
            try {
              osc.stop();
            } catch (e) {}
          }, 800);
        }
      } catch (err) {}
    } else {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
      }
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleLanguage = () => {
    if (advisoryLang === 'kn') {
      setAdvisoryLang('hi');
      showToast('Advisory Audio Switch', 'Language changed to Hindi (हिन्दी).', 'translate', 'text-teal-300');
    } else if (advisoryLang === 'hi') {
      setAdvisoryLang('en');
      showToast('Advisory Audio Switch', 'Language changed to Indian English.', 'translate', 'text-teal-300');
    } else {
      setAdvisoryLang('kn');
      showToast('Advisory Audio Switch', 'Language changed to Kannada (ಕನ್ನಡ).', 'translate', 'text-teal-300');
    }
  };

  const getAudioTranscript = () => {
    if (advisoryLang === 'kn') {
      return '"ಸೂಚನೆ: ಕುಂದಗೋಳ ಬ್ಲಾಕ್‌ನಲ್ಲಿ ಕಾಲುಬಾಯಿ ರೋಗ ಹರಡದಂತೆ ಜಾನುವಾರುಗಳನ್ನು ತಕ್ಷಣ ಪ್ರತ್ಯೇಕಿಸಿ..."';
    }
    if (advisoryLang === 'hi') {
      return '"सूचना: कुंडगोल ब्लॉक में खुरपका-मुंहपका रोग (FMD) को रोकने हेतु पशुओं को तुरंत पृथक करें..."';
    }
    return '"Alert: Immediately isolate cattle showing salivation or foot lesions in Kundgol Block..."';
  };

  const getLangBtnLabel = () => {
    if (advisoryLang === 'kn') return 'ಕನ್ನಡದಲ್ಲಿ ಪ್ಲೇ ಮಾಡಿ';
    if (advisoryLang === 'hi') return 'हिंदी में सुनें (Play Hindi)';
    return 'Play in English';
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto pb-24">
      {/* Top Urgent Alert Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-red-50/70 border border-rose-200 text-rose-950 shadow-sm">
        <div className="p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-red-600 animate-pulse">
                crisis_alert
              </span>
              <span className="text-[11px] uppercase tracking-wider text-rose-800 font-bold">
                Bio-Defense Vector Tier 1
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-[11px] font-bold text-white shadow-xs">
              FMD Type-A
            </span>
          </div>

          <div>
            <p className="text-[16px] text-slate-900 leading-tight font-bold">
              Kundgol Block Containment
            </p>
            <p className="text-[12px] text-slate-600 mt-0.5">
              3km Zero-Movement Restriction Zone • Quarantined Hub
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 mt-1 border-t border-rose-200/60">
            <div className="flex items-center gap-1 text-slate-700">
              <span className="material-symbols-outlined text-[16px] text-rose-600">timer</span>
              <span className="text-[11px] font-medium">Active: 36h 20m</span>
            </div>
            <span className="text-rose-300">•</span>
            <div className="flex items-center gap-1 text-slate-700">
              <span className="material-symbols-outlined text-[16px] text-rose-600">location_on</span>
              <span className="text-[11px] font-medium">Hubballi South Grid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outbreak Contagion Radar Card */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[22px]">radar</span>
            <h2 className="text-[16px] text-slate-900 font-bold">Outbreak Contagion Radar</h2>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-semibold">
            Real-time Echo
          </span>
        </div>

        {/* Concentric Interactive Radar Telemetry */}
        <div className="relative w-full rounded-xl bg-slate-50 border border-slate-200/80 p-4 flex flex-col items-center justify-center overflow-hidden">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* SVG Concentric Radar Grid */}
            <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 224 224">
              <circle
                className="text-slate-300"
                cx="112"
                cy="112"
                r="106"
                stroke="currentColor"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              ></circle>
              <circle
                className="text-slate-300"
                cx="112"
                cy="112"
                r="74"
                stroke="currentColor"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              ></circle>
              <circle
                className="text-rose-400"
                cx="112"
                cy="112"
                r="38"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
              <circle
                className="text-rose-500"
                cx="112"
                cy="112"
                fill="currentColor"
                fillOpacity="0.08"
                r="38"
              ></circle>
              <line x1="112" y1="6" x2="112" y2="218" stroke="currentColor" strokeWidth="1" className="text-slate-200"></line>
              <line x1="6" y1="112" x2="218" y2="112" stroke="currentColor" strokeWidth="1" className="text-slate-200"></line>

              {/* 0-5km Red Hotspots */}
              <circle cx="104" cy="98" r="4.5" fill="currentColor" className="text-rose-600 animate-ping"></circle>
              <circle cx="104" cy="98" r="4" fill="currentColor" className="text-rose-600"></circle>
              <circle cx="122" cy="118" r="3.5" fill="currentColor" className="text-rose-600"></circle>
              <circle cx="116" cy="100" r="3.5" fill="currentColor" className="text-rose-600"></circle>
              <circle cx="98" cy="118" r="3" fill="currentColor" className="text-rose-600"></circle>

              {/* 5-15km Buffer Vaccinated Units */}
              <circle cx="148" cy="76" r="3.5" fill="currentColor" className="text-emerald-600"></circle>
              <circle cx="82" cy="148" r="3.5" fill="currentColor" className="text-emerald-600"></circle>
              <circle cx="160" cy="130" r="3.5" fill="currentColor" className="text-emerald-600"></circle>
              <circle cx="68" cy="88" r="3.5" fill="currentColor" className="text-emerald-600"></circle>

              {/* 15-30km Checkpoints */}
              <circle cx="198" cy="112" r="3.5" fill="currentColor" className="text-teal-700"></circle>
              <circle cx="26" cy="112" r="3.5" fill="currentColor" className="text-teal-700"></circle>
              <circle cx="112" cy="18" r="3.5" fill="currentColor" className="text-teal-700"></circle>
            </svg>

            {/* Center Hub Pin */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-rose-600 ring-4 ring-rose-100 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-slate-600 text-[11px] mt-2 px-1 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>0-5km Red Zone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>5-15km Buffer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-700"></span>15-30km Guard
            </span>
          </div>
        </div>

        {/* Distance Layer Telemetry Breakdown */}
        <div className="flex flex-col gap-2">
          {/* 0-5 km */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-slate-900 font-bold">0 - 5 km Core</span>
                <span className="px-2 py-0.5 rounded bg-rose-100 border border-rose-200 text-[11px] text-rose-700 font-bold">
                  Quarantined
                </span>
              </div>
              <p className="text-[12px] text-slate-600 mt-0.5">4 farms affected • Strictest Containment Zone</p>
            </div>
            <span className="material-symbols-outlined text-rose-600 shrink-0 text-[20px]">block</span>
          </div>

          {/* 5-15 km */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-slate-900 font-bold">5 - 15 km Ring Buffer</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200 text-[11px] text-emerald-800 font-bold">
                  62% Done
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold font-mono">
                2,108 / 3,400 Head
              </span>
            </div>
            <p className="text-[12px] text-slate-600">
              Ring Vaccination Shield actively deploying by Paravet Squad C
            </p>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
            </div>
          </div>

          {/* 15-30 km */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-slate-900 font-bold">15 - 30 km Outer Arc</span>
                <span className="px-2 py-0.5 rounded bg-teal-100 border border-teal-200 text-[11px] text-teal-800 font-bold">
                  Surveillance
                </span>
              </div>
              <p className="text-[12px] text-slate-600 mt-0.5">
                Heightened Surveillance &amp; 3 Transit Highway Checkposts
              </p>
            </div>
            <span className="material-symbols-outlined text-teal-700 shrink-0 text-[20px]">verified_user</span>
          </div>
        </div>

        {/* Disease Distribution Mini Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">
              Foot &amp; Mouth (FMD)
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-extrabold text-rose-600 font-mono">4</span>
              <span className="text-[11px] text-slate-600 font-medium">Clusters</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">
              Lumpy Skin Disease
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-extrabold text-teal-800 font-mono">1</span>
              <span className="text-[11px] text-slate-600 font-medium">Cluster</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Anthrax</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-extrabold text-emerald-600 font-mono">0</span>
              <span className="text-[11px] text-emerald-700 font-bold">Clear</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Brucellosis</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-extrabold text-slate-800">Active</span>
              <span className="text-[11px] text-slate-600 font-medium">Screening</span>
            </div>
          </div>
        </div>
      </div>

      {/* Laboratory Sample & Referral Tracking Pipeline */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[22px]">biotech</span>
            <h2 className="text-[16px] text-slate-900 font-bold">Lab Diagnostics Referral</h2>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold">
            Priority High
          </span>
        </div>

        {/* Telemetry Card Sample Details */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold tracking-wider">SAMPLE TRACKING CODE</span>
            <span className="text-[12px] text-teal-800 font-mono font-bold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              SMP-2024-DH-0891
            </span>
          </div>
          <div className="flex flex-col mt-0.5">
            <p className="text-[14px] text-slate-900 font-bold">Epithelial Tissue &amp; Serum Assay</p>
            <p className="text-[12px] text-slate-600">Host: Buffalo #KA-29-019 • Tag #8839-A</p>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-slate-600 text-[12px]">
            <span className="material-symbols-outlined text-[16px] text-teal-700">local_hospital</span>
            <span className="truncate font-medium">Destination: SRDDL, Bengaluru</span>
          </div>
        </div>

        {/* Stepper Pipeline */}
        <div className="flex flex-col gap-2 pt-1">
          {/* Step 1 Done */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div className="w-0.5 h-7 bg-emerald-600 mt-0.5"></div>
            </div>
            <div className="flex flex-col min-w-0 pb-1">
              <span className="text-[12px] text-slate-900 font-bold">
                Collected in Field (Kundgol Sector 2)
              </span>
              <span className="text-[12px] text-slate-500">Logged by Paravet Dr. Ananth • Yesterday, 16:30</span>
            </div>
          </div>

          {/* Step 2 In-Transit */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div className="w-0.5 h-7 bg-teal-600 mt-0.5"></div>
            </div>
            <div className="flex flex-col min-w-0 pb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-slate-900 font-bold">
                  In-Transit via Medical Cryo-Courier
                </span>
                <span className="px-2 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-semibold">
                  @ 4°C Monitored
                </span>
              </div>
              <span className="text-[12px] text-slate-500">Cold Chain verified GPS Logger #CC-90</span>
            </div>
          </div>

          {/* Step 3 Active RT-PCR */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-teal-700 flex items-center justify-center text-white animate-pulse shadow-xs">
                <span className="material-symbols-outlined text-[14px]">science</span>
              </div>
              <div className="w-0.5 h-7 bg-slate-300 mt-0.5"></div>
            </div>
            <div className="flex flex-col min-w-0 pb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-teal-800 font-bold">
                  RT-PCR Serotype In-Progress
                </span>
                <span className="px-2 py-0.2 rounded bg-teal-100 text-teal-800 text-[10px] font-semibold">
                  Active Lab
                </span>
              </div>
              <span className="text-[12px] text-slate-500">
                SRDDL Viral Genotyping Unit • 14 hrs remaining
              </span>
            </div>
          </div>

          {/* Step 4 Pending */}
          <div className="flex items-start gap-3 opacity-60">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[14px]">fact_check</span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-slate-800 font-semibold">
                Official Serotype Confirmation &amp; Quarantine Notice
              </span>
              <span className="text-[12px] text-slate-500">
                Automated push notification to District Collectorate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Multilingual Voice & SMS Advisory Broadcast Console */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[22px]">record_voice_over</span>
            <h2 className="text-[16px] text-slate-900 font-bold">Field Advisory Console</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-semibold">
            Advisory #04
          </span>
        </div>

        {/* Active Advisory Card */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-teal-800 uppercase font-bold tracking-wider">
              Active Broadcast Stream
            </span>
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div>
            <h3 className="text-[14px] text-slate-900 font-bold">Urgent FMD Containment Advisory #04</h3>
            <p className="text-[12px] text-slate-600 mt-0.5">
              Guidance on hoof lesion sanitation, isolation protocols, and paravet emergency contact numbers.
            </p>
          </div>

          {/* Channel Reach Statistics */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2 rounded-md bg-white border border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-teal-700 text-[18px]">phone_in_talk</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-slate-900 font-bold">2,410 Calls</span>
                <span className="text-[10px] text-slate-500 truncate">IVR Automated</span>
              </div>
            </div>

            <div className="p-2 rounded-md bg-white border border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-700 text-[18px]">sms</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-slate-900 font-bold">5,120 SMS</span>
                <span className="text-[10px] text-slate-500 truncate">Push Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player Waveform Box */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-teal-700">graphic_eq</span>
              <span>Voice Dispatch Preview (0:48)</span>
            </span>

            {/* Language Selector Micro-toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-teal-800 hover:bg-slate-100 transition-colors active:scale-95 flex items-center gap-1 font-semibold shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">translate</span>
              <span>{getLangBtnLabel()}</span>
            </button>
          </div>

          {/* Waveform Visualizer Micro-Widget */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-900 flex items-center justify-center text-white shadow hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Waveform Lines */}
            <div className="flex items-center gap-1 flex-1 h-8 px-2 bg-white rounded-lg border border-slate-200 overflow-hidden justify-between">
              {[12, 20, 28, 16, 24, 10, 30, 22, 14, 25, 18, 12, 16, 26, 14].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isPlayingAudio ? 'bg-teal-600 animate-pulse' : 'bg-teal-400'
                  }`}
                  style={{ height: `${h}px` }}
                ></span>
              ))}
            </div>

            <span className="text-[11px] text-slate-500 font-mono font-bold">
              0:{playbackTime.toString().padStart(2, '0')}
            </span>
          </div>

          <p className="text-[12px] text-slate-600 italic bg-white p-2 rounded border border-slate-200">
            {getAudioTranscript()}
          </p>
        </div>

        {/* Primary Dispatch Action Button */}
        <button
          type="button"
          onClick={() => setIsBroadcastModalOpen(true)}
          className="w-full min-h-[50px] rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-[14px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          <span>+ Broadcast Emergency Veterinary Advisory</span>
        </button>
      </div>

      {/* Inter-Departmental Coordination Status */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[22px]">policy</span>
            <h2 className="text-[16px] text-slate-900 font-bold">Inter-Agency Directives</h2>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">
            Joint Protocol
          </span>
        </div>

        {/* Directive Item 1 */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">traffic</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-slate-900 font-bold">
                Checkpost Transit Restrictions
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 border border-rose-200 text-[11px] text-rose-700 font-bold">
                Active
              </span>
            </div>
            <p className="text-[12px] text-slate-600 mt-0.5">
              Police &amp; Transport Dept notified. Live vehicle quarantine at NH-48 Dharwad Border.
            </p>
          </div>
        </div>

        {/* Directive Item 2 */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">storefront</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-slate-900 font-bold">
                Cattle Market (Shandy) Closures
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-[11px] text-amber-800 font-bold">
                Suspended
              </span>
            </div>
            <p className="text-[12px] text-slate-600 mt-0.5">
              2 weekly livestock shandies in Kundgol &amp; Annigeri closed for 14 days by APMC order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
