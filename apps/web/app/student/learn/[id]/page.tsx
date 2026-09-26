'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Sparkles, 
  Languages, 
  CheckCircle2, 
  ArrowRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { SEEDED_LESSONS, ScriptMode, Lesson } from '@bhashasetu/shared';
import KaraokePlayer from '@/components/student/KaraokePlayer';
import DoubtDrawer from '@/components/student/DoubtDrawer';
import ScriptSelector from '@/components/common/ScriptSelector';
import TrustBadge from '@/components/common/TrustBadge';

export default function LessonLearnPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = (params?.id as string) || 'sci-grade5-photo-hi';

  const [scriptMode, setScriptMode] = useState<ScriptMode>('native');
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [showDoubtDrawer, setShowDoubtDrawer] = useState(false);

  const lesson: Lesson = SEEDED_LESSONS.find((l) => l.id === lessonId) || SEEDED_LESSONS[0];
  const currentSection = lesson.sections[activeSectionIdx] || lesson.sections[0];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/student"
            className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {lesson.subject} • Grade {lesson.grade}
              </span>
              <span className="text-slate-300">•</span>
              <TrustBadge status={lesson.reviewStatus} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {lesson.title[scriptMode] || lesson.title.native}
            </h1>
          </div>
        </div>

        {/* Script & Doubt CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <ScriptSelector
            currentScript={scriptMode}
            onScriptChange={setScriptMode}
          />

          <button
            onClick={() => setShowDoubtDrawer(!showDoubtDrawer)}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black shadow-md transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask a Doubt</span>
          </button>
        </div>
      </div>

      {/* Sections Tab Navigation */}
      {lesson.sections.length > 1 && (
        <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
          {lesson.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeSectionIdx === idx
                  ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sec.title[scriptMode] || sec.title.native}
            </button>
          ))}
        </div>
      )}

      {/* Main Interactive Karaoke Read-Along Player */}
      <KaraokePlayer
        section={currentSection}
        scriptMode={scriptMode}
        onSectionComplete={() => {}}
      />

      {/* Post-Lesson Callout & Adaptive Quiz Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider">
              Step 2 • Test Your Mastery
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Ready for your Adaptive Micro-Quiz? (अभ्यास परीक्षा)
          </h3>
          <p className="text-xs text-emerald-100 font-medium max-w-lg leading-relaxed">
            Questions auto-adjust in difficulty based on Bayesian Knowledge Tracing to match your exact pace.
          </p>
        </div>

        <Link
          href={`/student/quiz/${lesson.id}`}
          className="flex items-center gap-2 px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <span>Start Micro-Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Embedded Doubt Drawer */}
      {showDoubtDrawer && (
        <div className="mt-8">
          <DoubtDrawer
            lessonId={lesson.id}
            studentLanguage={lesson.language}
            scriptMode={scriptMode}
            onClose={() => setShowDoubtDrawer(false)}
          />
        </div>
      )}
    </div>
  );
}
