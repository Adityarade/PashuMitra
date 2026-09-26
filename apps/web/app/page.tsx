'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Radio, 
  Mic, 
  Sparkles, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2,
  Play,
  Layers,
  Heart
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, DEMO_LANGUAGES } from '@bhashasetu/shared';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-4">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('platform.nep', 'National Education Policy 2020 • Mother-Tongue Pedagogy')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t('platform.title', 'AI Vernacular Pedagogy & Real-Time Translation Platform')}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('platform.subtitle', "BhashaSetu bridges India's digital divide under NEP 2020. Enabling every child in any village or city to learn, ask doubts, and follow live classroom lectures in their mother tongue—from Hindi and Tamil to low-resource tribal languages like Santali (Ol Chiki).")}
          </p>

          {/* Role CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/student"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <GraduationCap className="w-5 h-5" />
              <span>{t('nav.lessons', 'Launch Student Portal')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/teacher/live"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm border border-slate-700 shadow-md transition-colors"
            >
              <Radio className="w-5 h-5 text-emerald-400" />
              <span>{t('nav.live_class', 'Live Classroom Translator')}</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>{t('nav.heatmap', 'Policy Heatmap')}</span>
            </Link>
          </div>
        </div>

        {/* 4 Featured Demo Languages */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DEMO_LANGUAGES.map((lang) => (
            <div key={lang.code} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700">
              <div className="text-2xl mb-1">{lang.flagEmoji}</div>
              <div className="font-bold text-white text-sm">{lang.nativeName}</div>
              <div className="text-xs text-slate-400">{lang.name} ({lang.family})</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Portals Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            One Platform, Every Device, Every Indian Language
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Designed for 100% Free & Open-Source deployment across states, schools, and NGOs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Portal 1: Student */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {t('nav.student_zone', 'Student Vernacular Experience')}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Voice-First Onboarding (no reading required)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Word-by-Word Karaoke Read-Along Player</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curriculum RAG Doubt Solver with Section Citations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Adaptive Micro-Quizzes (Bayesian Knowledge Tracing)</span>
                </li>
              </ul>
            </div>
            <Link
              href="/student"
              className="mt-6 w-full py-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t('nav.lessons', 'Explore Student Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Portal 2: Teacher */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {t('nav.teacher_zone', 'Teacher Console & Copilot')}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-Time Live Classroom Streaming Translator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Content Copilot (OCR, simplify, auto-worksheet gen)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Class Learning Gap Diagnostics (LLM summaries)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Human-in-the-loop Corpus Review Queue</span>
                </li>
              </ul>
            </div>
            <Link
              href="/teacher"
              className="mt-6 w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t('nav.teacher_dash', 'Open Teacher Console')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Portal 3: Government / Admin */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {t('nav.admin_zone', 'National Policy & Heatmap')}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>National Language-Gap Heatmap across 700+ Districts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State $\rightarrow$ District $\rightarrow$ Block $\rightarrow$ School drilldown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Acoustic model confidence & dialect deficits</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automated policy intervention generator</span>
                </li>
              </ul>
            </div>
            <Link
              href="/admin"
              className="mt-6 w-full py-3 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t('nav.heatmap', 'View Policy Dashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 100% Free & Open Source Stack Specs */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-4 mb-8">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            Zero Licensing Lock-In
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Built on 100% Free & Open-Source Technology Stack
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every layer of BhashaSetu is self-hostable with open weights, open codebases, and dockerized local scaling—ensuring state education departments face zero recurring software fees.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">ASR / STT</span>
            <span className="font-extrabold text-sm text-white">IndicWhisper</span>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">Translation</span>
            <span className="font-extrabold text-sm text-white">IndicTrans2</span>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">TTS Voice</span>
            <span className="font-extrabold text-sm text-white">Indic-Parler</span>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">Vector DB</span>
            <span className="font-extrabold text-sm text-white">Qdrant OSS</span>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">Offline Cache</span>
            <span className="font-extrabold text-sm text-white">Dexie IndexedDB</span>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs font-bold text-slate-400 block mb-1">Web & PWA</span>
            <span className="font-extrabold text-sm text-white">Next.js 14</span>
          </div>
        </div>
      </section>
    </div>
  );
}
