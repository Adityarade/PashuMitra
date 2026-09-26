'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Play, 
  Volume2, 
  Sparkles, 
  Filter,
  Layers,
  Award
} from 'lucide-react';
import { SEEDED_CORPUS_ITEMS, CorpusItem } from '@bhashasetu/shared';

export default function TeacherReviewQueuePage() {
  const [items, setItems] = useState<CorpusItem[]>(SEEDED_CORPUS_ITEMS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const playAudioMock = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredItems = selectedFilter === 'all'
    ? items
    : items.filter((i) => i.status === selectedFilter);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Console</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              Human-in-the-Loop Validation
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-0.5">
              Corpus Review Queue (भाषाई सत्यापन कतार)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Review and approve community speech recordings before they feed into AI model fine-tuning
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(['all', 'pending', 'approved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  selectedFilter === f
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f} ({items.filter((i) => f === 'all' || i.status === f).length})
              </button>
            ))}
          </div>
        </div>

        {/* List of Queue Submissions */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isPending = item.status === 'pending';
            const isApproved = item.status === 'approved';

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border-2 transition-all space-y-4 ${
                  isPending
                    ? 'bg-amber-50/30 border-amber-200'
                    : isApproved
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-black uppercase">
                      {item.script}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      Dialect: {item.dialect || 'Standard'}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize self-start sm:self-auto ${
                      isPending
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isApproved
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-red-100 text-red-900 border border-red-300'
                    }`}
                  >
                    Status: {item.status}
                  </span>
                </div>

                {/* Main Phrase Text */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-relaxed">
                      {item.promptText}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium mt-1">
                      Recorded by: <span className="font-semibold text-slate-700">{item.recordedBy}</span> • {item.durationSeconds}s
                    </div>
                  </div>

                  <button
                    onClick={() => playAudioMock(item.promptText)}
                    className="p-3 bg-white text-orange-600 hover:bg-orange-50 border border-orange-200 rounded-xl shadow-2xs shrink-0"
                    title="Listen to student recording"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Reviewer Actions */}
                {isPending ? (
                  <div className="pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-slate-500">
                      Model Confidence: {(item.confidenceScore * 100).toFixed(0)}% (Active Learning Priority)
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(item.id, 'rejected')}
                        className="px-4 py-2 bg-white text-red-600 hover:bg-red-50 border border-red-200 font-bold text-xs rounded-xl transition-colors"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleAction(item.id, 'approved')}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-transform hover:scale-105 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve for Model Fine-Tuning</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified by linguistic reviewer. Added to training partition.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
