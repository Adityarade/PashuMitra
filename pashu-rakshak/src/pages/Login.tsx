import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, ArrowRight, CheckCircle, User, Lock, LogIn,
  ChevronDown, Camera, MapPin, Phone, ChevronLeft, ChevronRight,
  Tractor, Stethoscope, Building2, Upload
} from 'lucide-react';
import { useLang } from '../context/LangContext';

type LangCode = 'en' | 'hi' | 'mr';
const langOptions: { code: LangCode; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'mr', label: 'मराठी', short: 'MR' },
];

const STATES = [
  'Maharashtra', 'Karnataka', 'Gujarat', 'Rajasthan', 'Uttar Pradesh',
  'Madhya Pradesh', 'Andhra Pradesh', 'Tamil Nadu', 'Punjab', 'Haryana',
  'Bihar', 'West Bengal', 'Odisha', 'Telangana', 'Chhattisgarh',
];

const DISTRICTS: Record<string, string[]> = {
  Maharashtra: ['Pune', 'Nashik', 'Aurangabad', 'Kolhapur', 'Satara', 'Sangli', 'Solapur', 'Amravati', 'Nagpur', 'Latur'],
  Karnataka: ['Dharwad', 'Belagavi', 'Mysuru', 'Hubballi', 'Mangaluru', 'Vijayapura', 'Kalaburagi', 'Bidar', 'Raichur', 'Davangere'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Anand', 'Amreli', 'Junagadh', 'Mehsana', 'Patan'],
};

const ROLES = [
  { key: 'farmer', label: 'Farmer / Pashu Palan', icon: <Tractor size={22} />, desc: 'Livestock owner & farm manager' },
  { key: 'vet', label: 'Field Veterinarian', icon: <Stethoscope size={22} />, desc: 'Licensed veterinary officer' },
  { key: 'officer', label: 'Block/District Officer', icon: <Building2 size={22} />, desc: 'Government field officer' },
];

interface RegForm {
  name: string;
  phone: string;
  role: string;
  photo: string | null;
  state: string;
  district: string;
  village: string;
  taluk: string;
  animalCount: string;
  animalTypes: string[];
  password: string;
  confirmPassword: string;
  aadhaar: string;
}

const animalTypeOptions = ['Cattle / Cow', 'Buffalo', 'Goat / Sheep', 'Pig / Swine', 'Poultry', 'Horse / Equine'];

function RegisterForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegForm>({
    name: '', phone: '', role: '', photo: null,
    state: '', district: '', village: '', taluk: '',
    animalCount: '', animalTypes: [],
    password: '', confirmPassword: '', aadhaar: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof RegForm, val: any) => setForm(f => ({ ...f, [key]: val }));

  const toggleAnimal = (a: string) => {
    set('animalTypes', form.animalTypes.includes(a)
      ? form.animalTypes.filter(x => x !== a)
      : [...form.animalTypes, a]);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => set('photo', ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const steps = ['Role', 'Basic Info', 'Location', 'Livestock', 'Account'];
  const totalSteps = steps.length;

  const next = () => setStep(s => Math.min(s + 1, totalSteps));
  const prev = () => { if (step === 1) { onBack(); } else setStep(s => s - 1); };

  return (
    <div className="flex-1 flex flex-col justify-start px-8 py-6 overflow-y-auto">
      {/* Back + Title */}
      <div className="mb-6">
        <button onClick={prev} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-bold mb-4 transition-colors">
          <ChevronLeft size={18} /> Back
        </button>
        <h2 className="text-2xl font-black text-gray-900 mb-1">Create Account</h2>
        <p className="text-sm text-gray-500">Step {step} of {totalSteps} — {steps[step - 1]}</p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-1.5 mb-7">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < step ? 'bg-primary-700' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Select your role</p>
          {ROLES.map(r => (
            <button
              key={r.key}
              onClick={() => set('role', r.key)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                form.role === r.key
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                form.role === r.key ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {r.icon}
              </div>
              <div>
                <p className={`font-bold text-sm ${form.role === r.key ? 'text-primary-900' : 'text-gray-800'}`}>{r.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
              </div>
              {form.role === r.key && (
                <div className="ml-auto w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Basic Info */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary-400 cursor-pointer flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-primary-50 transition-colors relative group"
            >
              {form.photo
                ? <img src={form.photo} className="w-full h-full object-cover" alt="profile" />
                : <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-primary-500">
                    <Camera size={28} />
                    <span className="text-[10px] font-bold">Upload Photo</span>
                  </div>
              }
              {form.photo && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload size={20} className="text-white" />
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            <p className="text-xs text-gray-500 mt-2">Profile Photo (optional)</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" value={form.name} placeholder="e.g. Rameshwar Gowda"
                onChange={e => set('name', e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mobile Number *</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel" value={form.phone} placeholder="10-digit mobile number"
                onChange={e => set('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Aadhaar Number</label>
            <input
              type="text" value={form.aadhaar} placeholder="XXXX XXXX XXXX"
              onChange={e => set('aadhaar', e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {/* Step 3: Location */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">State *</label>
            <select
              value={form.state}
              onChange={e => { set('state', e.target.value); set('district', ''); }}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 bg-white"
            >
              <option value="">Select State</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">District *</label>
            <select
              value={form.district}
              onChange={e => set('district', e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 bg-white"
              disabled={!form.state}
            >
              <option value="">Select District</option>
              {(DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Taluk / Block</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" value={form.taluk} placeholder="e.g. Navalgund"
                onChange={e => set('taluk', e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Village Name</label>
            <input
              type="text" value={form.village} placeholder="e.g. Sherewad"
              onChange={e => set('village', e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      )}

      {/* Step 4: Livestock Details */}
      {step === 4 && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Total Animals in Herd</label>
            <input
              type="number" value={form.animalCount} placeholder="e.g. 12"
              onChange={e => set('animalCount', e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-3">Animal Types (select all that apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {animalTypeOptions.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAnimal(a)}
                  className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                    form.animalTypes.includes(a)
                      ? 'border-primary-600 bg-primary-50 text-primary-800'
                      : 'border-gray-200 text-gray-600 hover:border-primary-200'
                  }`}
                >
                  {form.animalTypes.includes(a) && <span className="text-primary-600 mr-1">✓</span>}
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Account Setup */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Create Password *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password" value={form.password} placeholder="Min 8 characters"
                onChange={e => set('password', e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm Password *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password" value={form.confirmPassword} placeholder="Re-enter password"
                onChange={e => set('confirmPassword', e.target.value)}
                className={`w-full border rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:ring-1 transition-colors ${
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                }`}
              />
            </div>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-xs text-red-500 font-semibold mt-1.5">Passwords do not match</p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Registration Summary</p>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-medium">Name</span>
              <span className="font-bold text-gray-800">{form.name || '—'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-medium">Role</span>
              <span className="font-bold text-gray-800 capitalize">{form.role || '—'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-medium">Location</span>
              <span className="font-bold text-gray-800">{[form.village, form.district, form.state].filter(Boolean).join(', ') || '—'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 font-medium">Animals</span>
              <span className="font-bold text-gray-800">{form.animalCount ? `${form.animalCount} head` : '—'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {step < totalSteps ? (
          <button
            onClick={next}
            disabled={step === 1 && !form.role}
            className="flex-1 bg-primary-800 hover:bg-primary-900 disabled:opacity-40 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            disabled={!form.name || !form.password || form.password !== form.confirmPassword}
            className="flex-1 bg-primary-800 hover:bg-primary-900 disabled:opacity-40 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <CheckCircle size={18} /> Create Account & Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const currentLang = langOptions.find(l => l.code === lang) || langOptions[0];

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel — image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=900"
          alt="Livestock"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/85 via-primary-900/65 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center pl-16 pr-8">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-bold uppercase tracking-widest mb-6 w-max">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Bio-Defense Network
          </span>
          <h1 className="text-5xl font-black text-white mb-4 leading-tight">PashuRakshak</h1>
          <p className="text-primary-100 text-base leading-relaxed max-w-md">{t.heroSubtitle}</p>
          <div className="flex gap-4 mt-8">
            {[['42+', 'Clusters'], ['12K+', 'Animals'], ['84%', 'Immunity']].map(([val, label]) => (
              <div key={label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 text-center min-w-[90px]">
                <p className="text-2xl font-black text-white">{val}</p>
                <p className="text-[10px] text-primary-200 font-bold uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[460px] bg-white flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
              <Shield size={18} className="text-primary-700" />
            </div>
            <span className="font-black text-gray-900 text-sm tracking-tight">PashuRakshak</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>{currentLang.label}</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden py-1">
                  {langOptions.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-primary-50 flex justify-between ${lang === l.code ? 'text-primary-700 bg-primary-50/50' : 'text-gray-600'}`}>
                      {l.label} <span className="text-gray-400">{l.short}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        {view === 'login' && (
          <div className="flex-1 flex flex-col justify-center px-8 py-10">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-1">{t.signIn}</h2>
              <p className="text-sm text-gray-500 font-medium">Karnataka Animal Husbandry & Bharat Pashudhan (INAPH)</p>
            </div>

            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
              <button className="flex-1 bg-white text-primary-900 font-bold py-2.5 rounded-lg text-sm shadow-sm">
                {t.signIn}
              </button>
              <button
                onClick={() => setView('register')}
                className="flex-1 text-gray-500 font-semibold py-2.5 rounded-lg text-sm hover:text-gray-700 transition-colors"
              >
                {t.newRegistration}
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.authMethod}</span>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button type="button" className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold border-r border-gray-200">{t.password}</button>
                  <button type="button" className="px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 text-xs font-semibold">{t.pinDigit}</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.mobileLabel}</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={phone} placeholder="9845287192"
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.passwordLabel}</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" value={password} placeholder="••••••••"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98] mt-2">
                <LogIn size={18} /> {t.signInBtn}
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.orContinue}</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <button type="button"
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl py-3 flex items-center justify-center gap-3 font-bold text-sm shadow-sm transition-all active:scale-[0.98]">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {t.signInGoogle}
              </button>

              {/* New Registration CTA */}
              <div className="text-center mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium mb-2">New to PashuRakshak?</p>
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 text-sm font-bold transition-colors"
                >
                  Create a Farmer Account <ArrowRight size={16} />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-emerald-600 bg-emerald-50 py-2.5 px-4 rounded-lg">
                <CheckCircle size={14} /> {t.offlineKey}
              </div>
            </div>
          </div>
        )}

        {/* Registration Flow */}
        {view === 'register' && <RegisterForm onBack={() => setView('login')} />}
      </div>
    </div>
  );
}
