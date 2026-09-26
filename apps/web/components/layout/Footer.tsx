'use client';

import React from 'react';
import { Heart, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-lg">
                भा
              </div>
              <span className="font-extrabold text-xl text-white">
                Bhasha<span className="text-orange-500">Setu</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {t('platform.subtitle', 'A National-Scale, 100% Free & Open-Source AI Vernacular Pedagogy & Real-Time Classroom Translation Platform. Built to fulfill NEP 2020 mother-tongue education for every child in India.')}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-orange-400 font-semibold border border-slate-700">
                AI4Bharat IndicTrans2 & IndicWhisper
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-emerald-400 font-semibold border border-slate-700">
                Bhashini Interoperable
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-sky-400 font-semibold border border-slate-700">
                Offline PWA + Dexie
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('nav.student_zone', 'Pillars & Portals')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/student" className="hover:text-orange-400 transition-colors">{t('nav.lessons', 'Student Vernacular Portal')}</a></li>
              <li><a href="/student/doubt" className="hover:text-orange-400 transition-colors">{t('nav.doubt_tutor', 'Curriculum RAG Doubt Tutor')}</a></li>
              <li><a href="/student/stories" className="hover:text-orange-400 transition-colors">{t('nav.stories', 'Cultural Tale Weaver')}</a></li>
              <li><a href="/student/corpus" className="hover:text-orange-400 transition-colors">{t('nav.corpus', 'Gamified Tribal Corpus')}</a></li>
              <li><a href="/teacher/live" className="hover:text-orange-400 transition-colors">{t('nav.live_class', 'Live Classroom Streaming')}</a></li>
              <li><a href="/teacher/copilot" className="hover:text-orange-400 transition-colors">{t('nav.content_copilot', 'Teacher Content Copilot')}</a></li>
              <li><a href="/admin" className="hover:text-orange-400 transition-colors">{t('nav.heatmap', 'National Language Heatmap')}</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('platform.nep', 'National Infrastructure')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>{t('platform.nep', 'NEP 2020 Compliant')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Zero Licensing Cost (FOSS)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>22 Scheduled + Tribal Dialects</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>{t('footer.copyright', '© 2026 BhashaSetu • National Multilingual Pedagogy Platform')}</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            {t('footer.tagline', "Quality mother-tongue education for India's Next Generation Learners.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
