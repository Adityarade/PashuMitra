import React, { useState } from 'react';
import {
  Megaphone, Phone, MessageSquare, Play, Pause, Send,
  Activity, Globe, Radio, AlertTriangle, BarChart2
} from 'lucide-react';
import { useLang } from '../context/LangContext';

export default function VetDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { lang } = useLang();

  const transcriptByLang: Record<string, string> = {
    en: '"Notice: Isolate all livestock immediately in Kundagol Block to prevent spread of Foot and Mouth Disease. Contact your nearest paravet officer for emergency assistance."',
    hi: '"सूचना: कुंदगोल ब्लॉक में खुरपका-मुंहपका रोग के प्रसार को रोकने के लिए सभी पशुधन को तुरंत अलग करें। आपातकालीन सहायता के लिए अपने निकटतम पशुचिकित्सा अधिकारी से संपर्क करें।"',
    mr: '"सूचना: कुंदगोल ब्लॉकमध्ये खुरपका-मुखपका रोगाचा प्रसार रोखण्यासाठी सर्व पशुधन त्वरित वेगळे करा. आपत्कालीन मदतीसाठी तुमच्या जवळच्या पशुवैद्यकीय अधिकाऱ्याशी संपर्क साधा."',
  };

  const transcript = transcriptByLang[lang] || transcriptByLang.en;

  const langLabel: Record<string, string> = { en: 'Play in English', hi: 'हिन्दी में सुनें', mr: 'मराठीत ऐका' };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-24 space-y-6">

      {/* Field Advisory Console */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="flex items-center gap-2.5 font-bold text-gray-900 text-lg">
            <Megaphone className="text-primary-700" size={22} />
            Field Advisory Console
          </h2>
          <span className="bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1 rounded-lg text-xs font-bold">
            Advisory #04
          </span>
        </div>

        <div className="p-6">
          {/* Status line */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-primary-800 text-xs font-bold uppercase tracking-widest">Active Broadcast Stream</span>
            <div className="flex items-center gap-1.5 text-primary-600 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
              Live Sync
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1.5">Urgent FMD Containment Advisory #04</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Guidance on hoof lesion sanitation, isolation protocols, and paravet emergency contact numbers.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg leading-tight">2,410 Calls</p>
                <p className="text-xs text-gray-500 font-medium">IVR Automated</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg leading-tight">5,120 SMS</p>
                <p className="text-xs text-gray-500 font-medium">Push Delivered</p>
              </div>
            </div>
          </div>

          {/* Voice Dispatch Preview */}
          <div className="border border-gray-200 bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Activity size={15} className="text-primary-600" />
                <span className="text-xs font-bold">Voice Dispatch Preview (0:48)</span>
              </div>
              <button className="bg-white border border-gray-200 text-primary-700 font-bold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 hover:bg-primary-50 transition-colors">
                <Globe size={13} />
                {langLabel[lang]}
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-primary-800 text-white flex items-center justify-center hover:bg-primary-900 shadow-md transition-colors flex-shrink-0"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>

              <div className="flex-1 h-9 bg-white border border-gray-200 rounded-full flex items-center px-4 gap-1 shadow-inner overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${isPlaying ? 'bg-primary-500 animate-pulse' : 'bg-primary-200'}`}
                    style={{ height: `${18 + Math.sin(i * 0.8) * 14 + Math.random() * 12}%` }}
                  />
                ))}
                <span className="ml-auto text-xs font-bold text-gray-400 pl-2 flex-shrink-0">0:24</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 font-medium leading-relaxed italic">
              {transcript}
            </div>
          </div>

          {/* Alert Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
              <AlertTriangle size={18} className="text-red-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-red-700">3 Critical</p>
              <p className="text-[10px] text-red-400 font-medium">Zones</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
              <Radio size={18} className="text-amber-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-amber-700">Live Broadcast</p>
              <p className="text-[10px] text-amber-400 font-medium">Active</p>
            </div>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 text-center">
              <BarChart2 size={18} className="text-primary-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-primary-700">87% Reach</p>
              <p className="text-[10px] text-primary-400 font-medium">Coverage</p>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full bg-primary-800 hover:bg-primary-900 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors">
            <Send size={18} />
            Broadcast Emergency Veterinary Advisory
          </button>
        </div>
      </div>

    </div>
  );
}
