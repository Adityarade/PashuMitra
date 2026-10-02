import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReportTriageView: React.FC = () => {
  const {
    setIsScannerModalOpen,
    addIncident,
    showToast,
    setActiveTab,
  } = useApp();

  // Active step
  const [activeStep, setActiveStep] = useState<number>(3);
  // Reporter mode
  const [reporterMode, setReporterMode] = useState<'vet' | 'farmer' | 'ivr'>('vet');
  // Tag ID
  const [tagId, setTagId] = useState('IN-KA-29-881294');
  // Species
  const [species, setSpecies] = useState<'cattle' | 'buffalo' | 'sheep' | 'swine' | 'poultry'>('cattle');

  // Symptoms state
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({
    fever: true,
    ulcers: true,
    milkDrop: true,
    salivation: true,
    lameness: false,
    grunt: false,
    mortality: false,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sampleImages = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVuGNVKUiCCucafgKGHcidcWS1HxSqJ8nw0hGDZ3BF1dfp5G2ZXdmIRIPR60Ci8K74bsbo4TJdDQxASxP86jCTjDmC66UIWD1APVt36jF_2dNtT0r3evxvsVWN0OTde7CA1lq2HfqOaHPnVhq3JJ26Jk82iGQ5EMmVWN9lqBaAfte8Z-sEgF9k4TFo5MVQTIhxYyA_a9DQqZqhhlJkk9GW_rV__8BzvOnBD8DWWmjWv14sGuvuVzo-QA',
      label: 'Vesicular Lesions Identified',
      confidence: 92,
      bboxLabel: 'Lesion 92%',
      disease: 'Foot-and-Mouth Disease (FMD)',
    },
    {
      url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      label: 'Nodular Cutaneous Edema',
      confidence: 84,
      bboxLabel: 'Nodule 84%',
      disease: 'Lumpy Skin Disease (LSD)',
    },
  ];

  const currentSample = sampleImages[currentImageIndex];

  const toggleSymptom = (key: string) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  // Calculate dynamic confidence based on symptoms count
  const calculatedConfidence = Math.min(99.2, Math.max(65.0, 70 + selectedCount * 5.2)).toFixed(1);

  const handleQuarantineSubmit = () => {
    addIncident({
      type: 'critical',
      title: `Sherewad Village • Sector 4`,
      location: 'Navalgund Taluk, Sherewad Pasture',
      farmer: 'Rameshwar Gowda',
      rfid: `#${tagId}`,
      symptomsCountSummary: `${species === 'cattle' ? 'Cattle' : 'Buffalo'} Quarantined (${selectedCount} Signs)`,
      suspectPercent: Math.round(Number(calculatedConfidence)),
      suspectDisease: 'FMD Serotype O/A',
      clinicalNotes: `High pyrexia, vesicular lesions, profuse salivation verified via On-Device TFLite (92% confidence). 500m perimeter locked.`,
      statusBadge: 'Quarantine Active • Vet En Route',
      icon: 'medical_services',
    });

    showToast(
      'Quarantine Active & Logged',
      'Bio-alert dispatched to Dharwad District Task Force. GPS perimeter stamped.',
      'shield_with_heart',
      'text-emerald-400'
    );
  };

  const handleMobileLabRequest = () => {
    showToast(
      'Mobile Van Dispatched',
      'Hubballi Emergency Unit #4 notified. ETA 35 minutes to Sherewad Village.',
      'local_shipping',
      'text-teal-300'
    );
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto">
      {/* Offline Cache Pinned Telemetry */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-3 h-3 rounded-full bg-teal-700 shrink-0 shadow-[0_0_6px_rgba(0,108,74,0.4)]"></span>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-slate-900 font-bold truncate">Offline Engine Active</span>
            <span className="text-[12px] text-slate-500 truncate">GPS Locked • SQLite Cache Ready</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg shrink-0">
          <span className="material-symbols-outlined text-teal-700 text-[16px]">sync_saved_locally</span>
          <span className="text-[11px] text-emerald-800 font-semibold">Zero Latency</span>
        </div>
      </section>

      {/* Stepper Indicator */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
        <div className="grid grid-cols-4 gap-1 relative">
          {[
            { step: 1, label: '1. Origin', done: true },
            { step: 2, label: '2. Signs', done: true },
            { step: 3, label: '3. AI Triage', done: false, active: true },
            { step: 4, label: '4. Action', done: false },
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`flex flex-col items-center gap-1 text-center cursor-pointer ${
                s.step > activeStep ? 'opacity-70' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  s.active || activeStep === s.step
                    ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-200'
                    : s.done || s.step < activeStep
                    ? 'bg-teal-50 border border-teal-200 text-teal-800'
                    : 'bg-slate-100 border border-slate-200 text-slate-500'
                }`}
              >
                {s.step < activeStep || s.done ? (
                  <span className="material-symbols-outlined text-[14px]">check</span>
                ) : (
                  s.step
                )}
              </div>
              <span
                className={`text-[11px] truncate w-full ${
                  activeStep === s.step ? 'text-teal-800 font-bold' : 'text-slate-500 font-medium'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Reporter Mode Switch */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
          Reporter Mode
        </span>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setReporterMode('vet')}
            className={`min-h-[44px] px-1 py-1 rounded-md text-[11px] font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
              reporterMode === 'vet'
                ? 'bg-white border border-slate-200 text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">medical_services</span>
            <span className="truncate w-full text-center">Field Vet</span>
          </button>
          <button
            type="button"
            onClick={() => setReporterMode('farmer')}
            className={`min-h-[44px] px-1 py-1 rounded-md text-[11px] font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
              reporterMode === 'farmer'
                ? 'bg-white border border-slate-200 text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">agriculture</span>
            <span className="truncate w-full text-center">Farmer</span>
          </button>
          <button
            type="button"
            onClick={() => setReporterMode('ivr')}
            className={`min-h-[44px] px-1 py-1 rounded-md text-[11px] font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
              reporterMode === 'ivr'
                ? 'bg-white border border-slate-200 text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
            <span className="truncate w-full text-center">IVR Voice</span>
          </button>
        </div>
      </section>

      {/* Animal ID & Premise Metadata */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">badge</span>
            <span className="text-[16px] text-slate-900 font-bold">Specimen Subject</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
            Pre-Verified
          </span>
        </div>

        {/* Animal ID Scanner Bar */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] text-slate-600 font-medium">
            Tag / RFID (Bharat Pashudhan System)
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 min-h-[52px] bg-slate-50 border border-slate-200 rounded-lg px-4 flex items-center justify-between">
              <span className="text-[16px] text-teal-800 tracking-wider font-mono font-bold">
                {tagId}
              </span>
              <span className="material-symbols-outlined text-teal-700 text-[20px]">check_circle</span>
            </div>
            <button
              aria-label="Scan NFC or QR Code"
              onClick={() => setIsScannerModalOpen(true)}
              className="min-h-[52px] min-w-[52px] bg-teal-700 text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-teal-800 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            </button>
          </div>
        </div>

        {/* Species Selection Row */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] text-slate-600 font-medium">Target Species</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'cattle', label: 'Bovine / Cattle' },
              { id: 'buffalo', label: 'Buffalo' },
              { id: 'sheep', label: 'Sheep / Goat' },
              { id: 'swine', label: 'Swine' },
              { id: 'poultry', label: 'Poultry' },
            ].map((sp) => {
              const isSelected = species === sp.id;
              return (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSpecies(sp.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-[12px] shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border border-teal-300 text-teal-900 font-semibold shadow-sm'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 font-medium hover:bg-slate-200'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] text-teal-700">check</span>
                  )}
                  {sp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Herd & Cohort Metrics */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex flex-col gap-0.5">
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Herd At Risk
            </span>
            <span className="text-[16px] text-slate-900 font-bold">14 Animals</span>
            <span className="text-[12px] text-slate-500">Closed paddock enclosure</span>
          </div>
          <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg flex flex-col gap-0.5">
            <span className="text-[11px] text-red-700 font-semibold uppercase tracking-wider">
              Cluster Index
            </span>
            <span className="text-[16px] text-red-700 font-bold">2 Mortalities</span>
            <span className="text-[12px] text-red-600 font-medium">Last 18 hours</span>
          </div>
        </div>

        {/* Geographic Coordinates & Village Lock */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-teal-700 text-[22px] shrink-0 mt-0.5">pin_drop</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] text-slate-900 font-bold truncate">
              15.3647° N, 75.1240° E (Navalgund Taluk)
            </span>
            <span className="text-[12px] text-slate-500">
              Sherewad Village • Spatial GPS Locked &amp; Offline Stamped
            </span>
          </div>
        </div>
      </section>

      {/* Visual Symptom & Specimen Capture Card */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">photo_camera</span>
            <span className="text-[16px] text-slate-900 font-bold">Vision Diagnostic Analysis</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-[11px] text-teal-800 font-semibold">
            On-Device TFLite
          </span>
        </div>

        {/* Camera / Visual Preview with Bounding Box Overlay */}
        <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-inner bg-slate-900 border border-slate-200">
          <img
            className="w-full h-full object-cover transition-opacity duration-300"
            alt="Veterinary clinical macro documentation of oral lesions"
            src={currentSample.url}
          />

          {/* AI Bounding Box Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-3 pointer-events-none">
            <div className="self-end bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-200 pointer-events-auto">
              <span className="material-symbols-outlined text-teal-700 text-[16px]">neurology</span>
              <span className="text-[11px] text-slate-800 font-semibold">Model v3.8 Active</span>
            </div>

            {/* Bounding Box Visual Overlay */}
            <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/3 rounded-lg ring-2 ring-teal-500 bg-teal-500/20 flex items-start justify-start p-1 pointer-events-none animate-pulse">
              <span className="bg-teal-700 text-white px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase font-bold shadow-sm">
                {currentSample.bboxLabel}
              </span>
            </div>

            {/* Bottom Neural Confidence Bar */}
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-lg flex items-center justify-between border border-slate-200 shadow-sm pointer-events-auto">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-teal-700 text-[20px] shrink-0">check_box</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] text-slate-900 font-bold truncate">
                    {currentSample.label}
                  </span>
                  <span className="text-[12px] text-slate-600 font-medium">
                    {currentSample.confidence}% Neural Confidence
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0))}
                className="min-h-[38px] px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-teal-800 text-[11px] font-bold rounded-lg shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
                <span>Retake</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clinical Signs Checklist (Tactile Multi-Select) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] text-slate-900 font-bold">Reported Clinical Symptoms</label>
            <span className="text-[11px] text-slate-500 font-semibold">{selectedCount} Selected</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: 'fever', label: 'Fever > 104°F', icon: 'emergency' },
              { key: 'ulcers', label: 'Mouth/Hoof Ulcers', icon: 'coronavirus' },
              { key: 'milkDrop', label: 'Milk Drop (>60%)', icon: 'trending_down' },
              { key: 'salivation', label: 'Frothy Salivation', icon: 'water_drop' },
              { key: 'lameness', label: 'Lameness / Recumbency', icon: 'airline_seat_flat' },
              { key: 'grunt', label: 'Respiratory Grunt', icon: 'air' },
              { key: 'mortality', label: 'Mortality Recorded', icon: 'dangerous' },
            ].map((sym) => {
              const isChecked = symptoms[sym.key];
              return (
                <button
                  key={sym.key}
                  type="button"
                  onClick={() => toggleSymptom(sym.key)}
                  className={`min-h-[46px] px-3 py-2 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-red-100 border border-red-300 text-red-900 shadow-sm'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isChecked ? 'text-red-700' : 'text-slate-500'
                    }`}
                  >
                    {sym.icon}
                  </span>
                  <span>{sym.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instant Rule-Based & AI Triage Decision Card */}
      <section className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-md flex flex-col gap-4 relative overflow-hidden">
        {/* Crimson Alert Indicator Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600"></div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[12px] text-red-700 font-bold tracking-wider uppercase">
              Alert Telemetry
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-semibold font-mono">
            Index Confidence: {calculatedConfidence}%
          </span>
        </div>

        {/* Severity Banner */}
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-red-700 text-[24px]">crisis_alert</span>
            <span className="text-[15px] text-red-700 font-bold">
              HIGH RISK — STAT OUTBREAK SUSPECT
            </span>
          </div>
          <span className="text-[16px] text-slate-900 font-bold">
            Foot-and-Mouth Disease (FMD) Serotype O / A
          </span>
          <p className="text-[12px] text-slate-600">
            Matches {selectedCount}/4 primary pathognomonic indicators under Indian Veterinary Research Institute (IVRI) triage protocol.
          </p>
        </div>

        {/* Algorithmic Action Prescription List */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-slate-800 uppercase tracking-wider font-bold">
            Algorithmic Action Prescription
          </span>

          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 border border-teal-200 flex items-center justify-center shrink-0 text-xs font-bold">
              1
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-slate-900 font-bold">Enforce 500m Containment Perimeter</span>
              <span className="text-[12px] text-slate-600">
                Halt all cattle movement, inter-village grazing, and raw milk haulage on premise immediately.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 border border-teal-200 flex items-center justify-center shrink-0 text-xs font-bold">
              2
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-slate-900 font-bold">Cold-Chain Sample Collection Protocol</span>
              <span className="text-[12px] text-slate-600">
                Draw vesicular fluid &amp; EDTA blood tubes for immediate dispatch to NIVEDI / Regional Diagnostic Lab.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-900 border border-teal-200 flex items-center justify-center shrink-0 text-xs font-bold">
              3
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-slate-900 font-bold">Antiseptic Foot-Bath Broadcast</span>
              <span className="text-[12px] text-slate-600">
                Automated Kannada &amp; Hindi IVR/SMS issued to keeper: 4% Sodium Carbonate soak at paddock gate.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary & Secondary Operational CTA Buttons */}
      <section className="flex flex-col gap-2.5 pt-1 pb-24">
        <button
          type="button"
          onClick={handleQuarantineSubmit}
          className="w-full min-h-[52px] bg-red-600 hover:bg-red-700 text-white rounded-xl text-[14px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
          <span className="tracking-wide uppercase">Submit &amp; Trigger Quarantine Protocol</span>
        </button>

        <button
          type="button"
          onClick={handleMobileLabRequest}
          className="w-full min-h-[52px] bg-white hover:bg-teal-50 border-2 border-teal-700 text-teal-800 rounded-xl text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-bold shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">directions_bus</span>
          <span>Request Emergency Mobile Lab Referral</span>
        </button>
      </section>
    </div>
  );
};
