import React from 'react';
import { useApp } from '../context/AppContext';

export const Toasts: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-slate-900 text-white p-3.5 rounded-xl shadow-2xl flex items-center justify-between border border-slate-700 pointer-events-auto animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`material-symbols-outlined text-[24px] shrink-0 ${
                toast.colorClass || 'text-emerald-400'
              }`}
            >
              {toast.icon || 'check_circle'}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-white truncate">{toast.title}</span>
              <span className="text-[12px] text-slate-300 leading-snug line-clamp-2">
                {toast.desc}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white shrink-0 ml-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
