import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Truck, Wifi, Check, QrCode, MapPin, 
  Camera, Brain, Activity, Plus, FileText, ChevronRight
} from 'lucide-react';

export default function ReportDisease() {
  const navigate = useNavigate();
  const [step, setStep] = useState(3); 

  const renderStepper = () => (
    <div className="flex items-center justify-between px-2 mb-6 relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
      
      {['Origin', 'Signs', 'AI Triage', 'Action'].map((label, i) => {
        const stepNum = i + 1;
        const isActive = step === stepNum;
        const isPast = step > stepNum;
        
        return (
          <div key={label} className="flex flex-col items-center gap-1.5 bg-[#f8fafc] px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              isActive 
                ? 'bg-primary-700 border-primary-700 text-white' 
                : isPast 
                  ? 'bg-white border-primary-400 text-primary-600'
                  : 'bg-white border-gray-200 text-gray-400'
            }`}>
              {isPast ? <Check size={16} /> : stepNum}
            </div>
            <span className={`text-[10px] font-bold ${isActive || isPast ? 'text-gray-700' : 'text-gray-400'}`}>
              {stepNum}. {label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-24 space-y-6">
      
      {/* Universal Header: Offline Engine */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary-600"></div>
          <div>
            <h3 className="font-bold text-gray-900 text-xs">Offline Engine Active</h3>
            <p className="text-[10px] text-gray-500 font-medium">GPS Locked • SQLite Cache Ready</p>
          </div>
        </div>
        <span className="bg-primary-50 border border-primary-200 text-primary-700 px-2 py-1 rounded flex items-center gap-1 text-[10px] font-bold">
          <Check size={12} /> Zero Latency
        </span>
      </div>

      {renderStepper()}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Reporter Mode */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Reporter Mode</h3>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-50 border border-gray-200 rounded-xl">
              <button className="flex flex-col items-center gap-1 py-2 bg-white rounded-lg shadow-sm border border-primary-200 text-primary-700">
                <ShieldAlert size={18} />
                <span className="text-[10px] font-bold">Field Vet</span>
              </button>
              <button className="flex flex-col items-center gap-1 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <Truck size={18} />
                <span className="text-[10px] font-bold">Farmer</span>
              </button>
              <button className="flex flex-col items-center gap-1 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <Activity size={18} />
                <span className="text-[10px] font-bold">IVR Voice</span>
              </button>
            </div>
          </div>

          {/* Specimen Subject */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                <FileText className="text-primary-700" size={18} />
                Specimen Subject
              </h3>
              <span className="bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded text-xs font-bold">
                Pre-Verified
              </span>
            </div>
            
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Tag / RFID (Bharat Pashudhan System)</label>
            <div className="flex gap-2 mb-5">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value="IN-KA-29-881294" 
                  readOnly
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 font-mono font-bold text-gray-900 outline-none"
                />
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600" size={18} />
              </div>
              <button className="w-12 h-12 bg-primary-800 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <QrCode size={20} />
              </button>
            </div>

            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Target Species</label>
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-primary-50 border border-primary-400 text-primary-800 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm">
                <Check size={14} /> Bovine / Cattle
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold whitespace-nowrap bg-gray-50">Buffalo</button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold whitespace-nowrap bg-gray-50">Sheep / Goat</button>
              <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold whitespace-nowrap bg-gray-50">Swine</button>
            </div>
          </div>

          {/* Herd & Cluster Risk */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Herd at Risk</p>
              <p className="text-lg font-black text-gray-900 leading-tight mb-1">14 Animals</p>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">Closed paddock enclosure</p>
            </div>
            <div className="bg-critical-50 border border-critical-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-critical-700 uppercase tracking-wider mb-1">Cluster Index</p>
              <p className="text-lg font-black text-critical-700 leading-tight mb-1">2 Mortalities</p>
              <p className="text-[10px] text-critical-600 font-bold leading-tight">Last 18 hours</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <MapPin className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-bold text-gray-900 text-sm mb-0.5">15.3647° N, 75.1240° E (Navalgund Taluk)</p>
              <p className="text-xs text-gray-500 font-medium">Sherewad Village • Spatial GPS Locked & Offline Stamped</p>
            </div>
          </div>

          {/* AI Vision Analysis */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                <Camera className="text-primary-700" size={18} />
                Vision Diagnostic Analysis
              </h3>
              <span className="bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded text-[10px] font-bold">
                On-Device TFLite
              </span>
            </div>

            <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden mb-4 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800" 
                alt="Snout Analysis"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Brain size={14} className="text-primary-600" />
                Model v3.8 Active
              </div>
              
              {/* Bounding Box overlay */}
              <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] border-2 border-primary-400 bg-primary-400/20 rounded-lg shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                <div className="absolute -top-3 -left-0.5 bg-primary-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  LESION 92%
                </div>
              </div>

              {/* Result Bar */}
              <div className="absolute bottom-2 left-2 right-2 bg-white rounded-xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">Vesicular Lesions Identified</p>
                    <p className="text-xs text-gray-500 font-medium">92% Neural Confidence</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-primary-700 hover:bg-gray-50">
                  <Camera size={14} /> Retake
                </button>
              </div>
            </div>

            {/* Symptoms */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-gray-900 text-sm">Reported Clinical Symptoms</h4>
              <span className="text-xs text-gray-500 font-medium">4 Selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-critical-50 border border-critical-200 text-critical-700 px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">device_thermostat</span> Fever {'>'} 104°F
              </div>
              <div className="flex items-center gap-1.5 bg-critical-50 border border-critical-200 text-critical-700 px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">coronavirus</span> Mouth/Hoof Ulcers
              </div>
              <div className="flex items-center gap-1.5 bg-critical-50 border border-critical-200 text-critical-700 px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
                <Activity size={16} /> Milk Drop ({'>'}60%)
              </div>
              <div className="flex items-center gap-1.5 bg-critical-50 border border-critical-200 text-critical-700 px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-[16px]">water_drop</span> Frothy Salivation
              </div>
              
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">airline_seat_flat</span> Lameness / Recumbency
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-xl text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">air</span> Respiratory Grunt
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(4)}
            className="w-full bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Process AI Triage & Generate Action Plan <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Header Telemetry */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-critical-600 animate-pulse"></span>
              <h2 className="font-bold text-critical-700 tracking-wide uppercase text-sm">Alert Telemetry</h2>
            </div>
            <span className="bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">
              Index Confidence: <span className="text-gray-900">90.8%</span>
            </span>
          </div>

          {/* High Risk Suspect Card */}
          <div className="bg-critical-50 border border-critical-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="text-critical-600" size={24} />
              <h3 className="text-critical-700 font-bold text-base uppercase tracking-wide">
                High Risk — Stat Outbreak Suspect
              </h3>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Foot-and-Mouth Disease (FMD) Serotype O / A</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Matches 4/4 primary pathognomonic indicators under Indian Veterinary Research Institute (IVRI) triage protocol.
            </p>
          </div>

          {/* Action Prescription */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-4">
              Algorithmic Action Prescription
            </h3>
            <div className="space-y-3">
              
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Enforce 500m Containment Perimeter</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Halt all cattle movement, inter-village grazing, and raw milk haulage on premise immediately.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Cold-Chain Sample Collection Protocol</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Draw vesicular fluid & EDTA blood tubes for immediate dispatch to NIVEDI / Regional Diagnostic Lab.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Antiseptic Foot-Bath Broadcast</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Automated Kannada & Hindi IVR/SMS issued to keeper: 4% Sodium Carbonate soak at paddock gate.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Final Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-200 mt-6">
            <button 
              onClick={() => navigate('/admin')}
              className="w-full bg-[#e60000] hover:bg-red-700 text-white rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-base shadow-md transition-all active:scale-[0.98]"
            >
              <ShieldAlert size={22} />
              SUBMIT & TRIGGER QUARANTINE PROTOCOL
            </button>
            
            <button className="w-full bg-white border-2 border-primary-700 text-primary-800 hover:bg-primary-50 rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-base shadow-sm transition-all active:scale-[0.98]">
              <Truck size={22} />
              Request Emergency Mobile Lab Referral
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
