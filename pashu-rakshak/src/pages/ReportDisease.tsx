import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Truck, Check, QrCode, MapPin, 
  Camera, Brain, Activity, FileText, ChevronRight,
  ChevronLeft, AlertTriangle, RadioTower, Sparkles,
  Thermometer, Droplet, User, Phone, CheckCircle, RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

const VILLAGES = ['Kundgol', 'Byahatti', 'Sherewad', 'Navalgund', 'Kalghatgi'];

const SYMPTOM_OPTIONS = [
  { id: 'fever', label: 'High Fever (>104°F)', icon: 'device_thermostat', critical: true },
  { id: 'mouth_ulcers', label: 'Oral / Hoof Vesicular Ulcers', icon: 'coronavirus', critical: true },
  { id: 'milk_drop', label: 'Sudden Milk Drop (>60%)', icon: 'water_drop', critical: true },
  { id: 'frothy_salivation', label: 'Frothy / Ropy Salivation', icon: 'bubble_chart', critical: true },
  { id: 'nodular_lesions', label: 'Nodular Skin Lesions (2-5cm)', icon: 'circle', critical: false },
  { id: 'lameness', label: 'Lameness / Recumbency', icon: 'airline_seat_flat', critical: false },
  { id: 'respiratory_grunt', label: 'Respiratory Grunt & Dyspnea', icon: 'air', critical: false },
  { id: 'swollen_lymph', label: 'Enlarged Prescapular Lymph Nodes', icon: 'bubble_chart', critical: false },
];

export default function ReportDisease() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any>(null);

  // Step 1: Origin Data
  const [reporterMode, setReporterMode] = useState<'vet' | 'farmer' | 'ivr'>('farmer');
  const [rfid, setRfid] = useState('IN-KA-29-881294');
  const [farmerName, setFarmerName] = useState('Rameshwar Gowda');
  const [farmerPhone, setFarmerPhone] = useState('+91 98452 87192');
  const [species, setSpecies] = useState('Bovine / Cattle');
  const [village, setVillage] = useState('Kundgol');
  const [gpsLocation, setGpsLocation] = useState('15.3647° N, 75.1240° E');
  const [herdSize, setHerdSize] = useState('14');

  // Step 2: Clinical Signs & Vision
  const [visionMode, setVisionMode] = useState<'optical' | 'thermal'>('optical');
  const [acousticMode, setAcousticMode] = useState<'idle' | 'recording' | 'analyzed'>('idle');
  const [selectedAcousticPattern, setSelectedAcousticPattern] = useState<'brd' | 'stridor' | 'normal'>('brd');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'fever', 'mouth_ulcers', 'milk_drop', 'frothy_salivation'
  ]);
  const [temperature, setTemperature] = useState('104.2');
  const [milkDropPercent, setMilkDropPercent] = useState('65');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageAnalyzed, setImageAnalyzed] = useState(true);

  // Auto-detect GPS
  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
        },
        () => {
          setGpsLocation('15.3647° N, 75.1240° E (Locked Navalgund)');
        }
      );
    }
  };

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  // Dynamic Disease Prediction Logic
  const hasFMD = selectedSymptoms.includes('mouth_ulcers') && selectedSymptoms.includes('frothy_salivation');
  const hasLSD = selectedSymptoms.includes('nodular_lesions');
  
  const predictedDisease = hasFMD 
    ? 'Foot-and-Mouth Disease (FMD) Serotype O / A'
    : hasLSD 
      ? 'Lumpy Skin Disease (LSD) Capripoxvirus'
      : 'Acute Infectious Bovine Pyrexia';

  const confidenceScore = hasFMD ? 94.2 : hasLSD ? 88.5 : 79.0;
  const isCritical = selectedSymptoms.filter(s => ['fever', 'mouth_ulcers', 'frothy_salivation', 'milk_drop'].includes(s)).length >= 3;

  // Handle Submission
  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    try {
      const result = await api.createIncident({
        farmer: farmerName,
        farmerPhone: farmerPhone,
        rfid: rfid,
        species: species,
        village: village,
        district: 'Dharwad',
        location: `${village} Village • Plot 14`,
        symptoms: selectedSymptoms.map(id => SYMPTOM_OPTIONS.find(o => o.id === id)?.label || id),
        temp: `${temperature}°F`,
        milkDrop: `-${milkDropPercent}%`,
        confidence: confidenceScore,
        disease: predictedDisease,
        severity: isCritical ? 'critical' : 'high',
        description: `Field triage: ${selectedSymptoms.length} clinical signs reported. Rectal Temp ${temperature}°F, Milk Yield drop -${milkDropPercent}%.`
      });

      // Auto-trigger IVR broadcast if critical
      if (isCritical) {
        await api.triggerIVRBroadcast(village, 'HI');
      }

      setSubmitSuccess(result.incident);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepper = () => (
    <div className="flex items-center justify-between px-2 mb-6 relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
      
      {['Origin', 'Signs', 'AI Triage', 'Action'].map((label, i) => {
        const stepNum = i + 1;
        const isActive = step === stepNum;
        const isPast = step > stepNum;
        
        return (
          <button 
            key={label}
            onClick={() => stepNum <= 4 && setStep(stepNum)}
            className="flex flex-col items-center gap-1.5 bg-[#f8fafc] px-2 cursor-pointer focus:outline-none"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              isActive 
                ? 'bg-primary-700 border-primary-700 text-white shadow-sm' 
                : isPast 
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {isPast ? <Check size={16} /> : stepNum}
            </div>
            <span className={`text-[10px] font-bold ${isActive ? 'text-primary-800' : isPast ? 'text-emerald-700' : 'text-gray-400'}`}>
              {stepNum}. {label}
            </span>
          </button>
        );
      })}
    </div>
  );

  // Success Modal
  if (submitSuccess) {
    return (
      <div className="w-full px-4 sm:px-6 py-10 max-w-2xl mx-auto animate-fade-in-up">
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
            <CheckCircle size={44} />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">
              Protocol Initiated
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-3">Bio-Defense Alert Dispatched!</h2>
            <p className="text-gray-600 text-sm mt-1 max-w-md mx-auto">
              Incident <span className="font-mono font-bold text-gray-900">{submitSuccess.id}</span> has been logged to the National Epizootic Radar. Field Veterinarian & IVR village broadcast notified.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-bold">Animal Tag:</span>
              <span className="font-mono font-bold text-gray-900">{submitSuccess.rfid}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-bold">Predicted Pathogen:</span>
              <span className="font-bold text-critical-700">{submitSuccess.disease} ({submitSuccess.confidence}%)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-bold">Containment Perimeter:</span>
              <span className="font-bold text-primary-800">500m Movement Lockdown</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-500 font-bold">IVR Broadcast:</span>
              <span className="text-emerald-700 font-bold">Auto-Dialing {submitSuccess.village} (EN / HI / MR)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/admin')}
              className="flex-1 bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3.5 font-bold text-sm shadow-md transition-colors"
            >
              Track on Outbreak Radar
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl py-3.5 font-bold text-sm transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 pb-24 space-y-6">
      
      {/* Universal Header: Offline Engine */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Offline Triage Engine Active</h3>
            <p className="text-xs text-gray-500 font-medium">GPS Locked • SQLite Edge Storage Ready • Trilingual Support</p>
          </div>
        </div>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold">
          <Check size={14} /> Zero Latency
        </span>
      </div>

      {renderStepper()}

      {/* ── STEP 1: ORIGIN & SPECIMEN ── */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Reporter Mode Selector */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Reporter Mode</h3>
            <div className="grid grid-cols-3 gap-3 p-1.5 bg-gray-100 border border-gray-200 rounded-2xl">
              <button 
                onClick={() => setReporterMode('farmer')}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                  reporterMode === 'farmer' 
                    ? 'bg-white shadow-sm border border-primary-200 text-primary-800 font-bold' 
                    : 'text-gray-500 hover:bg-white/60'
                }`}
              >
                <User size={20} />
                <span className="text-xs">Farmer / Keeper</span>
              </button>
              <button 
                onClick={() => setReporterMode('vet')}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                  reporterMode === 'vet' 
                    ? 'bg-white shadow-sm border border-primary-200 text-primary-800 font-bold' 
                    : 'text-gray-500 hover:bg-white/60'
                }`}
              >
                <ShieldAlert size={20} />
                <span className="text-xs">Field Vet / Paravet</span>
              </button>
              <button 
                onClick={() => setReporterMode('ivr')}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                  reporterMode === 'ivr' 
                    ? 'bg-white shadow-sm border border-primary-200 text-primary-800 font-bold' 
                    : 'text-gray-500 hover:bg-white/60'
                }`}
              >
                <Activity size={20} />
                <span className="text-xs">IVR Voice Helpline</span>
              </button>
            </div>
          </div>

          {/* Specimen & Farmer Info Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 text-base">
                <FileText className="text-primary-700" size={20} />
                Specimen & Farmer Identification
              </h3>
              <span className="bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                INAPH Integrated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Animal RFID / Tag ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={rfid}
                    onChange={(e) => setRfid(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-3 px-4 font-mono font-bold text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                  <QrCode className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600" size={20} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Target Species</label>
                <select 
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 font-bold text-gray-900 bg-white focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                >
                  <option value="Bovine / Cattle">Bovine / Cattle</option>
                  <option value="Murrah Buffalo">Buffalo (Murrah / Local)</option>
                  <option value="Sheep / Goat">Caprine (Sheep / Goat)</option>
                  <option value="Swine">Swine / Porcine</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Farmer / Owner Name</label>
                <input 
                  type="text" 
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 font-medium text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Contact Phone Number</label>
                <input 
                  type="text" 
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 font-medium text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Location & GPS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Village Cluster</label>
                <select 
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-3 px-4 font-bold text-gray-900 bg-white text-sm"
                >
                  {VILLAGES.map(v => <option key={v} value={v}>{v} Village</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex justify-between items-center">
                  <span>Spatial GPS Coordinates</span>
                  <button 
                    onClick={handleDetectGPS}
                    className="text-primary-700 hover:text-primary-900 text-xs font-bold flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> Auto-Detect
                  </button>
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl py-3 px-4 bg-gray-50">
                  <MapPin size={18} className="text-primary-600 flex-shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">{gpsLocation}</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Continue to Clinical Signs & AI Vision <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── STEP 2: CLINICAL SIGNS & VISION ── */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* AI Vision Diagnostic & Thermal Scanner */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 text-base">
                <Camera className="text-primary-700" size={20} />
                Dual-Mode AI Vision & Thermal Scanner
              </h3>
              
              {/* Dual Mode Switcher */}
              <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setVisionMode('optical')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    visionMode === 'optical' 
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  📷 Optical Lesion AI
                </button>
                <button
                  type="button"
                  onClick={() => setVisionMode('thermal')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    visionMode === 'thermal' 
                      ? 'bg-red-600 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  🌡️ FLIR Thermal Heatmap
                </button>
              </div>
            </div>

            <div className="relative w-full h-64 bg-slate-950 rounded-2xl overflow-hidden shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800" 
                alt="Livestock Snout"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  visionMode === 'thermal' 
                    ? 'filter invert hue-rotate-[240deg] contrast-150 brightness-110 saturate-200' 
                    : 'opacity-85'
                }`}
              />

              {/* Mode Badges */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className="bg-slate-900/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Brain size={13} className="text-emerald-400" />
                  {visionMode === 'thermal' ? 'Infrared Pyrexia Mesh' : 'Edge Model v3.8'}
                </div>
              </div>

              {visionMode === 'optical' ? (
                /* Optical Bounding Box */
                <div className="absolute top-[22%] left-[28%] w-[45%] h-[48%] border-2 border-emerald-400 bg-emerald-400/20 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <div className="absolute -top-3 -left-0.5 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded">
                    VESICULAR LESION: 94.2%
                  </div>
                </div>
              ) : (
                /* Thermal Hotspots */
                <>
                  <div className="absolute top-[28%] left-[34%] bg-red-600/90 text-white font-mono text-[10px] font-black px-2 py-1 rounded-lg border border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse">
                    Muzzle Mucosa: 105.1°F (High Pyrexia)
                  </div>
                  <div className="absolute top-[45%] left-[55%] bg-amber-500/90 text-white font-mono text-[10px] font-black px-2 py-1 rounded-lg border border-amber-200 shadow-md">
                    Oral Cleft: 104.6°F
                  </div>
                  <div className="absolute bottom-16 right-6 bg-blue-900/80 text-blue-200 font-mono text-[10px] px-2 py-0.5 rounded border border-blue-500">
                    Ambient Baseline: 86.4°F
                  </div>
                </>
              )}

              {/* Result Bar */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
                      {visionMode === 'thermal' 
                        ? 'Thermal Gradient Confirms Systemic Pyrexia (>104.5°F Hotspot)' 
                        : 'Epithelial Vesicles & Salivation Lesions Identified'}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {visionMode === 'thermal' ? 'Radiometric Infrared Sensor Simulation' : 'IVRI Neural Pattern Standard'}
                    </p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setAnalyzingImage(true);
                    setTimeout(() => setAnalyzingImage(false), 800);
                  }}
                  className="bg-primary-50 border border-primary-200 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-primary-100 flex items-center gap-1"
                >
                  <RefreshCw size={12} className={analyzingImage ? 'animate-spin' : ''} /> Rescan
                </button>
              </div>
            </div>
          </div>

          {/* ── PashuSuno AI: Bio-Acoustic Respiratory & Cough Diagnostic ── */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Activity size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    PashuSuno AI: Bio-Acoustic Cough & Respiration Analyzer
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Acoustic frequency analysis for early Bovine Respiratory Disease (BRD) & pneumonia
                  </p>
                </div>
              </div>

              <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                Spectral Mel-Acoustic
              </span>
            </div>

            {/* Acoustic Sample Selector */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'brd', label: 'Bronchial Wheeze / Cough (BRD)', freq: '840 Hz', confidence: '92.4%' },
                { id: 'stridor', label: 'Tracheal Stridor / Grunt', freq: '620 Hz', confidence: '87.1%' },
                { id: 'normal', label: 'Normal Vesicular Respiration', freq: '310 Hz', confidence: '96.0%' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedAcousticPattern(opt.id as any);
                    setAcousticMode('analyzed');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedAcousticPattern === opt.id && acousticMode === 'analyzed'
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Visualizer Waveform Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setAcousticMode(acousticMode === 'recording' ? 'analyzed' : 'recording');
                    if (acousticMode !== 'recording') {
                      setTimeout(() => setAcousticMode('analyzed'), 1200);
                    }
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs transition-all flex-shrink-0 ${
                    acousticMode === 'recording'
                      ? 'bg-red-500 animate-pulse text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  }`}
                >
                  {acousticMode === 'recording' ? '...' : '▶ Listen'}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-1 h-9 mb-1">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          acousticMode === 'recording'
                            ? 'bg-indigo-400 animate-pulse'
                            : selectedAcousticPattern === 'normal'
                              ? 'bg-emerald-400'
                              : 'bg-amber-400'
                        }`}
                        style={{
                          height: `${15 + Math.sin(i * 0.6) * 14 + (acousticMode === 'recording' ? Math.random() * 25 : 8)}%`
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Spectrogram Bandwidth: 100 Hz – 4.2 kHz • Zero Latency Audio Edge Buffer
                  </p>
                </div>
              </div>

              {acousticMode === 'analyzed' && (
                <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-right">
                  <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Acoustic Diagnosis</p>
                  <p className="text-sm font-black text-white">
                    {selectedAcousticPattern === 'brd' 
                      ? 'BRD Acute Wheeze (92.4%)' 
                      : selectedAcousticPattern === 'stridor' 
                        ? 'Laryngeal Stridor (87.1%)' 
                        : 'Clear Lung Fields (Normal)'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Vitals Input Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                <Thermometer size={16} className="text-red-500" /> Rectal Body Temperature (°F)
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="border border-gray-300 rounded-xl py-2 px-3 font-mono font-black text-xl text-red-600 w-32 outline-none"
                />
                <span className={`text-xs font-bold px-2 py-1 rounded ${Number(temperature) > 103 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {Number(temperature) > 103 ? 'ELEVATED PYREXIA' : 'NORMAL'}
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                <Droplet size={16} className="text-primary-600" /> Daily Milk Yield Drop (%)
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  value={milkDropPercent}
                  onChange={(e) => setMilkDropPercent(e.target.value)}
                  className="border border-gray-300 rounded-xl py-2 px-3 font-mono font-black text-xl text-gray-900 w-32 outline-none"
                />
                <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">
                  CRITICAL YIELD REDUCTION
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Symptoms Multi-Select */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-900 text-sm">Select Observed Clinical Symptoms</h4>
              <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                {selectedSymptoms.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYMPTOM_OPTIONS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-primary-50 border-primary-500 text-primary-900 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-primary-700 border-primary-700 text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check size={14} />}
                      </div>
                      <span className="text-xs font-bold">{symptom.label}</span>
                    </div>
                    {symptom.critical && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                        Critical
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep(1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-1 bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Run AI Pathology Triage <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: AI TRIAGE REVIEW ── */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Header Telemetry */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-critical-600 animate-pulse"></span>
              <h2 className="font-bold text-critical-700 tracking-wide uppercase text-sm">Automated Triage Index</h2>
            </div>
            <span className="bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">
              Neural Confidence: <span className="text-gray-900">{confidenceScore}%</span>
            </span>
          </div>

          {/* High Risk Suspect Card */}
          <div className="bg-critical-50 border border-critical-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="text-critical-600" size={26} />
              <h3 className="text-critical-700 font-bold text-xs uppercase tracking-widest">
                Tier 1 Bio-Defense Threat Identified
              </h3>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">
              {predictedDisease}
            </h1>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              Matches {selectedSymptoms.length} pathognomonic clinical markers under Indian Veterinary Research Institute (IVRI) triage protocol. Rapid spread risk is estimated at HIGH.
            </p>
          </div>

          {/* Risk Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Paddock Containment</p>
              <p className="text-lg font-black text-gray-900 leading-tight mb-1">{herdSize} Animals</p>
              <p className="text-[10px] text-gray-500 font-medium">Immediate isolation advised</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Recommended Radius</p>
              <p className="text-lg font-black text-critical-700 leading-tight mb-1">500 Meters</p>
              <p className="text-[10px] text-critical-600 font-bold">Zero livestock movement</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location Node</p>
              <p className="text-base font-black text-gray-900 leading-tight mb-1">{village} Sector</p>
              <p className="text-[10px] text-gray-500 font-medium">Dharwad District Grid</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep(2)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button 
              onClick={() => setStep(4)}
              className="flex-1 bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Review Action Prescription <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: ALGORITHMIC ACTION & CONTAINMENT ── */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-primary-700" />
              Algorithmic Action Prescription (IVRI & DAHD Protocol)
            </h3>

            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-black flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">Enforce 500m Containment Perimeter</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Halt all cattle movement, inter-village grazing, and raw milk transport immediately at premise coordinates ({gpsLocation}).
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-black flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">Cold-Chain Sample Collection Protocol</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Draw vesicular fluid and EDTA blood tubes under ice-cold storage for dispatch to NIVEDI / Regional Diagnostic Lab.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-black flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">Automated Trilingual IVR & SMS Broadcast</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Automated voice broadcast in English, Hindi, and Marathi will be dispatched to all registered dairy farmers in {village}: 4% Sodium Carbonate foot-bath instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200 mt-6">
            <button 
              onClick={handleSubmitReport}
              disabled={isSubmitting}
              className="w-full bg-critical-600 hover:bg-critical-700 text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-bold text-base shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <ShieldAlert size={22} />
              {isSubmitting ? 'TRANSMITTING BIO-DEFENSE TELEMETRY...' : 'SUBMIT & TRIGGER QUARANTINE PROTOCOL'}
            </button>
            
            <button 
              onClick={() => {
                api.triggerSOS({ village, farmer: farmerName, phone: farmerPhone });
                handleSubmitReport();
              }}
              className="w-full bg-white border-2 border-primary-800 text-primary-800 hover:bg-primary-50 rounded-2xl py-4 flex items-center justify-center gap-3 font-bold text-base shadow-sm transition-all active:scale-[0.98]"
            >
              <Truck size={22} />
              Request Emergency Mobile Paravet Dispatch
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
