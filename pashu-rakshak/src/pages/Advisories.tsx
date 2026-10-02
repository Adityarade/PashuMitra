import { useState } from 'react';
import { Bell, Filter, Globe, Volume2 } from 'lucide-react';
import { mockAdvisories } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';
import type { Severity } from '../types';

export default function Advisories() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [filterSev, setFilterSev] = useState('all');

  const filtered = mockAdvisories.filter(a => filterSev === 'all' || a.severity === filterSev);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'Disease Advisories & Alerts' : 'रोग सलाह और चेतावनियाँ'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {lang === 'en' ? 'Official advisories from Department of Animal Husbandry' : 'पशुपालन विभाग की आधिकारिक सलाह'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <Globe size={14} />
            {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
            <Volume2 size={14} /> IVR Audio
          </button>
        </div>
      </div>

      {/* Subscribe banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-primary-600 to-emerald-600 flex items-center gap-4">
        <Bell className="w-8 h-8 text-white flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-white">Get SMS alerts directly on your phone!</p>
          <p className="text-white/80 text-xs mt-0.5">Call 1962 or WhatsApp your location to +91-XXXX-XXXXXX to subscribe</p>
        </div>
        <button className="flex-shrink-0 px-4 py-2 bg-white text-primary-700 rounded-xl text-sm font-bold hover:bg-green-50 transition-colors">
          Subscribe
        </button>
      </div>

      {/* Severity filter */}
      <div className="flex items-center gap-2">
        <Filter size={15} className="text-gray-400" />
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map(s => (
            <button key={s} onClick={() => setFilterSev(s)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${filterSev === s ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Advisory cards */}
      <div className="space-y-4">
        {filtered.map(adv => (
          <div key={adv.id} className={`bg-white rounded-2xl border shadow-card overflow-hidden ${
            adv.severity === 'critical' ? 'border-red-200' :
            adv.severity === 'high' ? 'border-orange-200' :
            'border-gray-100'
          }`}>
            {/* Top strip */}
            <div className={`h-1.5 w-full ${
              adv.severity === 'critical' ? 'gradient-red' :
              adv.severity === 'high' ? 'gradient-amber' :
              adv.severity === 'medium' ? 'bg-yellow-400' :
              'gradient-green'
            }`} />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <SeverityBadge severity={adv.severity} />
                    <span className="text-xs text-gray-400">{adv.id} · {adv.district}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    {lang === 'en' ? adv.title : adv.titleHi}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(adv.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1 justify-end">
                    {adv.targetSpecies.map((s: Severity | string) => (
                      <span key={String(s)} className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{String(s)}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English */}
                <div className={`p-3 rounded-xl ${lang === 'en' ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50 border border-gray-100'}`}>
                  <p className="text-xs font-semibold text-gray-500 mb-1">🇮🇳 English</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{adv.body}</p>
                </div>
                {/* Hindi */}
                <div className={`p-3 rounded-xl ${lang === 'hi' ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50 border border-gray-100'}`}>
                  <p className="text-xs font-semibold text-gray-500 mb-1">🇮🇳 हिंदी</p>
                  <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{adv.bodyHi}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-green text-white text-xs font-semibold">
                  <Volume2 size={12} /> Listen (IVR)
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                  📲 Share via WhatsApp
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold">
                  🖨 Print
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
