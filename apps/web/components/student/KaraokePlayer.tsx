'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Gauge, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LessonSection, ScriptMode, TimedWord } from '@bhashasetu/shared';
import { useLanguage } from '@/lib/LanguageContext';

interface KaraokePlayerProps {
  section: LessonSection;
  scriptMode: ScriptMode;
  onSectionComplete?: () => void;
}

export default function KaraokePlayer({
  section,
  scriptMode,
  onSectionComplete,
}: KaraokePlayerProps) {
  const { t, trans } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timedWords = section.timedWords || [];
  const maxDuration = timedWords.length > 0
    ? timedWords[timedWords.length - 1].endTime + 1.0
    : 10.0;

  // Find active word index based on currentTime
  const activeWordIndex = timedWords.findIndex(
    (w) => currentTime >= w.startTime && currentTime <= w.endTime
  );

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 50;
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + (intervalMs / 1000) * playbackSpeed;
          if (next >= maxDuration) {
            setIsPlaying(false);
            if (onSectionComplete) onSectionComplete();
            return maxDuration;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, maxDuration, onSectionComplete]);

  // Speech synthesis audio trigger
  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= maxDuration) {
        setCurrentTime(0);
      }
      setIsPlaying(true);
      if ('speechSynthesis' in window && !isMuted) {
        window.speechSynthesis.cancel();
        const textToRead = section.content[scriptMode] || trans(section.content);
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = playbackSpeed * 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>{t('nav.karaoke', 'Interactive Read-Along')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {section.title[scriptMode] || trans(section.title)}
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${
              isPlaying ? 'bg-amber-600' : 'bg-orange-600'
            }`}
            title={isPlaying ? t('common.pause', 'Pause') : t('common.play', 'Play')}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
            title={t('common.replay', 'Replay')}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={changeSpeed}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
            title={t('common.speed', 'Speed')}
          >
            {playbackSpeed}x
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="my-6">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-75"
            style={{ width: `${Math.min(100, (currentTime / maxDuration) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
          <span>{currentTime.toFixed(1)}s</span>
          <span>{maxDuration.toFixed(1)}s</span>
        </div>
      </div>

      {/* Synchronized Read-Along Karaoke Text Area */}
      <div className="bg-amber-50/40 rounded-2xl p-6 sm:p-8 border border-amber-200/60 leading-loose text-lg sm:text-xl md:text-2xl font-medium text-slate-800 tracking-wide transition-all">
        {timedWords.length > 0 ? (
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {timedWords.map((tw, index) => {
              const isActive = index === activeWordIndex;
              const isPast = currentTime > tw.endTime;

              return (
                <span
                  key={tw.id}
                  className={`transition-all duration-150 rounded-lg px-1.5 py-0.5 cursor-pointer ${
                    isActive
                      ? 'karaoke-active-word scale-110 shadow-sm'
                      : isPast
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-500 opacity-80'
                  }`}
                  onClick={() => setCurrentTime(tw.startTime)}
                >
                  {tw.word}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-800">
            {section.content[scriptMode] || trans(section.content)}
          </p>
        )}
      </div>

      {/* Illustration & Key Concepts */}
      {section.imageUrl && (
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-6 p-4">
          <img
            src={section.imageUrl}
            alt="Lesson illustration"
            className="w-full sm:w-48 h-32 object-cover rounded-xl shadow-sm"
          />
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
              {t('common.key_concepts', 'Key Concepts In This Section')}
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {section.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg shadow-2xs"
                >
                  #{concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
