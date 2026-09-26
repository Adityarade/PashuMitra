'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import DoubtDrawer from '@/components/student/DoubtDrawer';
import { SEEDED_LESSONS, SUPPORTED_LANGUAGES, LanguageCode } from '@bhashasetu/shared';

export default function StudentDoubtPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('hin_Deva');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('sci-grade5-photo-hi');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/student"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Lesson Context Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
          <BookOpen className="w-4 h-4 text-orange-600 ml-1" />
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="bg-transparent text-slate-800 focus:outline-none cursor-pointer"
          >
            {SEEDED_LESSONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title.native} ({l.subject})
              </option>
            ))}
          </select>
        </div>
      </div>

      <DoubtDrawer
        lessonId={selectedLessonId}
        studentLanguage={selectedLanguage}
      />
    </div>
  );
}
