import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';

export const LanguageModal: React.FC = () => {
  const {
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    displaySettings,
    setDisplaySettings,
    showToast,
  } = useApp();

  const [selectedLang, setSelectedLang] = useState<LanguageCode>(displaySettings.language);
  const [selectedScale, setSelectedScale] = useState<100 | 115 | 130>(displaySettings.textScale);
  const [glareBoost, setGlareBoost] = useState<boolean>(displaySettings.sunGlareBoost);

  if (!isLanguageModalOpen) return null;

  const handleApply = () => {
    setDisplaySettings({
      language: selectedLang,
      textScale: selectedScale,
      sunGlareBoost: glareBoost,
    });
    setIsLanguageModalOpen(false);
    showToast(
      'Dialect & Display Updated',
      selectedLang === 'kn'
        ? 'ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಪ್ರದರ್ಶನ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಲಾಗಿದೆ.'
        : selectedLang === 'hi'
        ? 'हिन्दी भाषा एवं प्रदर्शन सेटिंग्स लागू की गईं।'
        : 'Display and dialect configuration synchronized.',
      'done_all',
      'text-teal-300'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      id="language-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsLanguageModalOpen(false);
      }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Mobile drag handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Modal Header */}
        <div className="px-5 pt-3 pb-4 border-b border-slate-200 flex items-start justify-between">
          <div className="flex flex-col min-w-0 pr-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-teal-700 text-[22px]">translate</span>
              <h3 className="text-[18px] text-slate-900 font-bold tracking-tight truncate">
                Language &amp; Display Settings
              </h3>
            </div>
            <p className="text-[12px] text-teal-800 font-semibold mt-0.5">
              ಭಾಷೆ ಮತ್ತು ಪ್ರದರ್ಶನ • भाषा एवं दृश्यता
            </p>
            <p className="text-[12px] text-slate-500 mt-1 leading-snug">
              Configure field dialect &amp; text readability for low-visibility operations
            </p>
          </div>
          <button
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            onClick={() => setIsLanguageModalOpen(false)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-5">
          {/* Primary Operation Language */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Primary Operation Language
              </span>
              <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                Offline Voice Ready
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Option 1: Kannada */}
              <div
                onClick={() => setSelectedLang('kn')}
                className={`relative flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === 'kn'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-slate-900">ಕನ್ನಡ</span>
                    <span className="text-[12px] text-slate-600 font-medium">(Kannada)</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Active State
                    </span>
                  </div>
                  <span className="text-[11px] text-teal-800 font-medium mt-0.5">
                    Official State Dialect • Karnataka Animal Husbandry
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5 text-teal-700 text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[15px]">volume_up</span>
                    <span>Audio Prompt &amp; IVR Voice Supported</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    selectedLang === 'kn'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'border-2 border-slate-300'
                  }`}
                >
                  {selectedLang === 'kn' && (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                </div>
              </div>

              {/* Option 2: Hindi */}
              <div
                onClick={() => setSelectedLang('hi')}
                className={`relative flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === 'hi'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-slate-900">हिन्दी</span>
                    <span className="text-[12px] text-slate-600 font-medium">(Hindi)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    National Portal Standard • Bharat Pashudhan (INAPH)
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5 text-slate-500 text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[15px] text-teal-700">volume_up</span>
                    <span>Offline IVR Speech Synced</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    selectedLang === 'hi'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'border-2 border-slate-300'
                  }`}
                >
                  {selectedLang === 'hi' && (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                </div>
              </div>

              {/* Option 3: English */}
              <div
                onClick={() => setSelectedLang('en')}
                className={`relative flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === 'en'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-slate-900">English</span>
                    <span className="text-[12px] text-slate-500 font-medium">(Indian English)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    International Veterinary &amp; Epidemiological Reports
                  </span>
                  <div className="flex items-center gap-1.5 mt-1.5 text-slate-500 text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[15px] text-teal-700">volume_up</span>
                    <span>Global Medical Terminology</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    selectedLang === 'en'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'border-2 border-slate-300'
                  }`}
                >
                  {selectedLang === 'en' && (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Field Text Readability */}
          <section className="flex flex-col gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-teal-700 text-[18px]">format_size</span>
                <span className="text-[13px] font-bold text-slate-900">Field Text Readability</span>
              </div>
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                {selectedScale}% Selected
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setSelectedScale(100)}
                className={`py-2 px-1 rounded-lg text-center text-[11px] transition-all cursor-pointer ${
                  selectedScale === 100
                    ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-bold'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <span className="text-[13px] font-bold block">A</span>
                Default (100%)
              </button>
              <button
                type="button"
                onClick={() => setSelectedScale(115)}
                className={`py-2 px-1 rounded-lg text-center text-[11px] transition-all cursor-pointer ${
                  selectedScale === 115
                    ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-extrabold'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <span className="text-[15px] font-extrabold block text-teal-700">A+</span>
                Large (115%)
              </button>
              <button
                type="button"
                onClick={() => setSelectedScale(130)}
                className={`py-2 px-1 rounded-lg text-center text-[11px] transition-all cursor-pointer ${
                  selectedScale === 130
                    ? 'bg-white text-teal-800 shadow-xs border border-slate-200/60 font-bold'
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <span className="text-[17px] font-extrabold block">A++</span>
                X-Large (130%)
              </button>
            </div>

            {/* Outdoor Sun Glare Boost */}
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-amber-700 text-[19px]">light_mode</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-900">Outdoor Sun Glare Boost</span>
                  <span className="text-[11px] text-slate-600">
                    Increases stroke weights &amp; border contrasts for direct sunlight work
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                <input
                  type="checkbox"
                  checked={glareBoost}
                  onChange={(e) => setGlareBoost(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
              </label>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="w-full h-12 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">done_all</span>
            <span>Apply &amp; Synchronize (ಅನ್ವಯಿಸಿ)</span>
          </button>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">cloud_done</span>
            <span>Cached offline for uninterrupted field operation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
