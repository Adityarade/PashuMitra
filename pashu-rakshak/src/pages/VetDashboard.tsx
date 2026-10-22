import React, { useState, useEffect } from 'react';
import {
  Megaphone, Phone, MessageSquare, Play, Pause, Send,
  Activity, Globe, Radio, AlertTriangle, BarChart2, CheckCircle, Volume2
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { api } from '../services/api';
import type { IVRBroadcastLog } from '../services/api';

export default function VetDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLog, setBroadcastLog] = useState<IVRBroadcastLog | null>(null);
  const [callCount, setCallCount] = useState(2410);
  const [smsCount, setSmsCount] = useState(5120);
  const { lang, setLang } = useLang();

  const transcriptByLang: Record<string, string> = {
    en: "Notice: Isolate all livestock immediately in Kundagol Block to prevent spread of Foot and Mouth Disease. Contact your nearest paravet officer for emergency assistance.",
    hi: "सूचना: कुंदगोल ब्लॉक में खुरपका-मुंहपका रोग के प्रसार को रोकने के लिए सभी पशुधन को तुरंत अलग करें। आपातकालीन सहायता के लिए अपने निकटतम पशुचिकित्सा अधिकारी से संपर्क करें।",
    mr: "सूचना: कुंदगोल ब्लॉकमध्ये खुरपका-मुखपका रोगाचा प्रसार रोखण्यासाठी सर्व पशुधन त्वरित वेगळे करा. आपत्कालीन मदतीसाठी तुमच्या जवळच्या पशुवैद्यकीय अधिकाऱ्याशी संपर्क साधा.",
  };

  const transcript = transcriptByLang[lang] || transcriptByLang.en;

  const langLabel: Record<string, string> = { 
    en: 'Play in English', 
    hi: 'हिन्दी में सुनें', 
    mr: 'मराठीत ऐका' 
  };

  // Web Speech API for real audio playback
  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(transcript);
      if (lang === 'hi') utterance.lang = 'hi-IN';
      else if (lang === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleBroadcast = async () => {
    setIsBroadcasting(true);
    try {
      const res = await api.triggerIVRBroadcast('Kundgol & Byahatti Sectors', lang.toUpperCase());
      setBroadcastLog(res.broadcast);
      setCallCount(prev => prev + 450);
      setSmsCount(prev => prev + 980);
      setTimeout(() => setBroadcastLog(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBroadcasting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 pb-24 space-y-6">

      {/* Field Advisory Console */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-3">
          <h2 className="flex items-center gap-2.5 font-bold text-gray-900 text-lg">
            <Megaphone className="text-primary-700" size={22} />
            Field Advisory & IVR Voice Dispatch Console
          </h2>
          <span className="bg-primary-50 text-primary-800 border border-primary-200 px-3 py-1 rounded-full text-xs font-bold">
            Advisory #04 • Zone 4B
          </span>
        </div>

        <div className="p-6">
          {/* Status line */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-primary-800 text-xs font-bold uppercase tracking-widest">
              Automated Telephony & Voice Gateway
            </span>
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              IVR Gateway Online
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1.5">Urgent FMD Containment Advisory #04</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Guidance on hoof lesion sanitation, isolation protocols, and paravet emergency contact numbers across Dharwad cluster.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center flex-shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-2xl leading-tight">{callCount.toLocaleString()} Calls</p>
                <p className="text-xs text-gray-500 font-semibold">IVR Automated Voice Dispatched</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={22} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-2xl leading-tight">{smsCount.toLocaleString()} SMS</p>
                <p className="text-xs text-gray-500 font-semibold">Push Delivered in Local Dialect</p>
              </div>
            </div>
          </div>

          {/* Voice Dispatch Preview */}
          <div className="border border-gray-200 bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-800">
                <Activity size={16} className="text-primary-700" />
                <span className="text-xs font-bold">Voice Dispatch Synthesizer & Speech Preview</span>
              </div>
              
              <div className="flex items-center gap-2">
                {(['en', 'hi', 'mr'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => {
                      if (isPlaying) {
                        window.speechSynthesis?.cancel();
                        setIsPlaying(false);
                      }
                      setLang(code);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                      lang === code 
                        ? 'bg-primary-700 text-white border-primary-700 shadow-sm' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-full bg-primary-800 text-white flex items-center justify-center hover:bg-primary-900 shadow-md transition-all flex-shrink-0 active:scale-95"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>

              <div className="flex-1 h-10 bg-white border border-gray-200 rounded-full flex items-center px-4 gap-1 shadow-inner overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${isPlaying ? 'bg-primary-600 animate-pulse' : 'bg-gray-300'}`}
                    style={{ height: `${20 + Math.sin(i * 0.7) * 16 + (isPlaying ? Math.random() * 20 : 0)}%` }}
                  />
                ))}
                <span className="ml-auto text-xs font-bold text-primary-700 pl-2 flex-shrink-0 flex items-center gap-1">
                  <Volume2 size={13} /> {isPlaying ? 'Playing...' : langLabel[lang]}
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-800 font-medium leading-relaxed italic shadow-sm">
              "{transcript}"
            </div>
          </div>

          {/* Alert Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <AlertTriangle size={20} className="text-red-500 mx-auto mb-1" />
              <p className="text-sm font-black text-red-700">3 Critical</p>
              <p className="text-[11px] text-red-500 font-bold">Zones</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <Radio size={20} className="text-amber-500 mx-auto mb-1" />
              <p className="text-sm font-black text-amber-800">Live Broadcast</p>
              <p className="text-[11px] text-amber-600 font-bold">Active</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <BarChart2 size={20} className="text-emerald-600 mx-auto mb-1" />
              <p className="text-sm font-black text-emerald-800">96.8% Reach</p>
              <p className="text-[11px] text-emerald-600 font-bold">Coverage</p>
            </div>
          </div>

          {/* Broadcast Confirmation Banner */}
          {broadcastLog && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 mb-4 flex items-center gap-3 animate-fade-in-up">
              <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Emergency Voice Advisory Broadcast Dispatched!</p>
                <p className="text-xs text-emerald-700">
                  Transmitted to {broadcastLog.targetVillage} in {broadcastLog.language}. {broadcastLog.callsAttempted} calls queued via SIP trunk.
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <button 
            onClick={handleBroadcast}
            disabled={isBroadcasting}
            className="w-full bg-primary-800 hover:bg-primary-900 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Send size={18} />
            {isBroadcasting ? 'Broadcasting Emergency Telephony...' : 'Broadcast Emergency Veterinary Advisory'}
          </button>
        </div>
      </div>

    </div>
  );
}
