'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Radio } from 'lucide-react';
import LiveCaptionStreamer from '@/components/teacher/LiveCaptionStreamer';

export default function TeacherLiveStreamingPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/teacher"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Console</span>
        </Link>
      </div>

      <LiveCaptionStreamer />
    </div>
  );
}
