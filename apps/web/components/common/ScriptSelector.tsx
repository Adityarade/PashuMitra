'use client';

import React from 'react';
import { ScriptMode } from '@bhashasetu/shared';
import { FileText, Type } from 'lucide-react';

interface ScriptSelectorProps {
  currentScript: ScriptMode;
  onScriptChange: (mode: ScriptMode) => void;
  languageName?: string;
}

export default function ScriptSelector({
  currentScript,
  onScriptChange,
  languageName = 'Santali / Hindi',
}: ScriptSelectorProps) {
  const scripts: { id: ScriptMode; label: string; sub: string }[] = [
    { id: 'native', label: 'Native Script', sub: 'Ol Chiki / Devanagari / Tamil' },
    { id: 'devanagari', label: 'Devanagari', sub: 'मानक देवनागरी लिप्यंतरण' },
    { id: 'roman', label: 'Roman (English Letters)', sub: 'Pronounceable English script' },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
      <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-slate-500 text-xs font-semibold">
        <Type className="w-3.5 h-3.5 text-orange-500" />
        <span>Script:</span>
      </div>
      {scripts.map((s) => (
        <button
          key={s.id}
          onClick={() => onScriptChange(s.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            currentScript === s.id
              ? 'bg-white text-orange-600 shadow-sm border border-orange-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
          title={s.sub}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
