'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Radio, 
  Sparkles, 
  FileText, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TeacherDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Teacher Profile & Welcome */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-3xl shadow-md">
              👩‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('teacher.welcome', 'Teacher Console • Smt. Sunita Murmu')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Bilingual Educator
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('teacher.bilingual_educator', 'Class 5 (Sections A & B) • Dumka Central Model School')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/teacher/live"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black shadow-md transition-transform hover:scale-105"
            >
              <Radio className="w-4 h-4" />
              <span>{t('teacher.launch_live_btn', 'Launch Live Translator')}</span>
            </Link>
          </div>
        </div>

        {/* 3 Core Teacher Daily Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <Link
            href="/teacher/live"
            className="p-5 bg-orange-50 hover:bg-orange-100/70 border border-orange-200 rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">{t('nav.live_class', 'Live Classroom Streaming')}</h3>
            <p className="text-xs text-slate-600 mt-1">
              Speak in Hindi $\rightarrow$ Instant live captions in Santali & Tamil on student tablets.
            </p>
          </Link>

          <Link
            href="/teacher/copilot"
            className="p-5 bg-sky-50 hover:bg-sky-100/70 border border-sky-200 rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">{t('nav.content_copilot', 'Content Copilot & OCR')}</h3>
            <p className="text-xs text-slate-600 mt-1">
              Translate & simplify textbooks, generate worksheets and illustrated stories.
            </p>
          </Link>

          <Link
            href="/teacher/review"
            className="p-5 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base">{t('nav.review_queue', 'Corpus Review Queue')}</h3>
            <p className="text-xs text-slate-600 mt-1">
              3 student dialect recordings pending teacher linguistic verification.
            </p>
          </Link>
        </div>
      </div>

      {/* Class Gap Analysis */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {t('teacher.class_gap_title', 'Class Learning Gap Diagnostics (कक्षा अधिगम विश्लेषण)')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                LLM-generated plain language summary derived from 32 student quiz attempts
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">Updated 10 mins ago</span>
        </div>

        <div className="bg-purple-50/60 rounded-2xl p-5 border border-purple-200 text-slate-800 font-medium text-sm leading-relaxed">
          &ldquo;{t('teacher.gap_summary_html', '60% of students understand that chlorophyll gives leaves their green color, but 58% are confused between Oxygen release vs Carbon Dioxide intake during photosynthesis. 42% of tribal language learners also need a bilingual demonstration for Fraction numerators.')}&rdquo;
        </div>

        {/* Actionable recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
              01
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t('teacher.action1_title', 'Suggested Pedagogical Action')}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t('teacher.action1_desc', 'Conduct a 5-minute visual bilingual leaf diagram demonstration before starting Section 2.')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
              02
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t('teacher.action2_title', 'Auto-Generated Remedial Worksheet')}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t('teacher.action2_desc', 'Ready for one-click print/distribution in Hindi and Santali (Ol Chiki).')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
