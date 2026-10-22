import React, { useState, useEffect } from 'react';
import { Bell, Filter, Globe, Volume2, VolumeX, ShieldAlert, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { api } from '../services/api';
import type { AdvisoryItem } from '../services/api';

export default function Advisories() {
  const { lang, setLang } = useLang();
  const [advisories, setAdvisories] = useState<AdvisoryItem[]>([]);
  const [filterSev, setFilterSev] = useState('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    api.getAdvisories().then(data => setAdvisories(data));
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = (adv: AdvisoryItem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingId === adv.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const text = adv.transcript[lang] || adv.transcript.en;
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'hi') utterance.lang = 'hi-IN';
      else if (lang === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
      setPlayingId(adv.id);
    }
  };

  const filtered = advisories.filter(a => filterSev === 'all' || a.severity === filterSev);

  return (
    <div className="w-full px-4 sm:px-6 pb-24 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {lang === 'hi' ? 'आधिकारिक पशु स्वास्थ्य सलाह' : lang === 'mr' ? 'अधिकृत पशु आरोग्य सल्ला' : 'Official Veterinary Disease Advisories'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Department of Animal Husbandry & Dairying (DAHD) • Real-Time Alert Broadcasts
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['en', 'hi', 'mr'] as const).map(code => (
            <button
              key={code}
              onClick={() => {
                if (playingId) {
                  window.speechSynthesis?.cancel();
                  setPlayingId(null);
                }
                setLang(code);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                lang === code
                  ? 'bg-primary-800 text-white border-primary-800 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {code === 'en' ? 'English' : code === 'hi' ? 'हिन्दी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribe Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-primary-800 via-primary-700 to-emerald-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Bell size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base">Receive Direct Voice & SMS Alerts on Your Mobile</h3>
            <p className="text-xs text-primary-200 mt-0.5">
              Dial Toll-Free 1962 or WhatsApp your village location to connect with your paravet station.
            </p>
          </div>
        </div>
        <span className="bg-white text-primary-900 px-4 py-2 rounded-xl text-xs font-black shadow-sm flex-shrink-0">
          Auto-Subscribed
        </span>
      </div>

      {/* Severity Filter */}
      <div className="flex items-center gap-2">
        <Filter size={15} className="text-gray-400" />
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl">
          {(['all', 'critical', 'high', 'medium'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterSev(s)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filterSev === s 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Advisories List */}
      <div className="space-y-4">
        {filtered.map((adv) => {
          const isCrit = adv.severity === 'critical';
          const isPlaying = playingId === adv.id;
          const displayTitle = lang === 'hi' ? adv.titleHi : lang === 'mr' ? adv.titleMr : adv.title;

          return (
            <div 
              key={adv.id} 
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                isCrit ? 'border-red-200' : 'border-gray-200'
              }`}
            >
              <div className={`h-1.5 w-full ${isCrit ? 'bg-red-600' : 'bg-amber-500'}`} />

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        isCrit ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {adv.severity} ALERT
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-400">
                        {adv.id} • {adv.district}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-gray-900">
                      {displayTitle}
                    </h2>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(adv)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex-shrink-0 ${
                      isPlaying 
                        ? 'bg-red-600 text-white animate-pulse' 
                        : 'bg-primary-50 text-primary-800 border border-primary-200 hover:bg-primary-100'
                    }`}
                  >
                    {isPlaying ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    {isPlaying ? 'Stop Speech' : 'Listen in Local Audio'}
                  </button>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium mb-4">
                  {adv.summary}
                </p>

                {/* Localized Audio Transcript Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs text-gray-700 italic leading-relaxed mb-4">
                  "{adv.transcript[lang] || adv.transcript.en}"
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary-700" />
                    Published: {new Date(adv.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">Target Species:</span>
                    {adv.targetSpecies.map(s => (
                      <span key={s} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
