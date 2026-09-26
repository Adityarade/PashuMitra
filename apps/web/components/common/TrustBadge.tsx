'use client';

import React, { useState } from 'react';
import { ShieldCheck, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TrustBadgeProps {
  status?: 'Verified by Teacher' | 'Community Reviewed' | 'AI Generated';
  source?: string;
}

export default function TrustBadge({
  status = 'Verified by Teacher',
  source = 'NCERT / BhashaSetu Curriculum Engine',
}: TrustBadgeProps) {
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagSubmitted, setFlagSubmitted] = useState(false);
  const [flagReason, setFlagReason] = useState('');

  const statusConfig = {
    'Verified by Teacher': {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      dot: 'bg-emerald-500',
    },
    'Community Reviewed': {
      bg: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: CheckCircle2,
      dot: 'bg-sky-500',
    },
    'AI Generated': {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: AlertCircle,
      dot: 'bg-amber-500',
    },
  };

  const current = statusConfig[status] || statusConfig['AI Generated'];
  const Icon = current.icon;

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlagSubmitted(true);
    setTimeout(() => {
      setShowFlagModal(false);
      setFlagSubmitted(false);
      setFlagReason('');
    }, 1800);
  };

  return (
    <>
      <div className="inline-flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${current.bg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
          <Icon className="w-3 h-3" />
          <span>{status}</span>
        </span>

        <button
          onClick={() => setShowFlagModal(true)}
          className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
          title="Flag translation or content inaccuracy"
        >
          <Flag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Flag Issue Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            {flagSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900">Feedback Recorded!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Thank you for improving India&apos;s vernacular pedagogy dataset. Our review team has been notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFlagSubmit}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flag className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-bold text-slate-900">Flag an Issue</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFlagModal(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Source: <span className="font-semibold text-slate-700">{source}</span>
                </p>
                <div className="space-y-3 mb-5">
                  <label className="block text-xs font-semibold text-slate-700">
                    What seems incorrect?
                  </label>
                  <select
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    required
                    className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="">Select a reason...</option>
                    <option value="grammar">Vernacular grammar or spelling mistake</option>
                    <option value="cultural">Culturally inaccurate term in dialect</option>
                    <option value="pedagogy">Scientific or conceptual inaccuracy</option>
                    <option value="audio">Mispronounced audio narration</option>
                  </select>
                  <textarea
                    rows={3}
                    placeholder="Provide corrected text or pronunciation note (optional)..."
                    className="w-full text-sm border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFlagModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm"
                  >
                    Submit Issue
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
