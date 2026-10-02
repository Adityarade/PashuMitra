import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle, User, Lock, LogIn, ChevronDown,
  Camera, MapPin, Phone, ChevronLeft, ChevronRight,
  Tractor, Stethoscope, Building2, Upload, ArrowRight,
  Eye, EyeOff, Globe, Wifi, Star
} from 'lucide-react';
import { useLang } from '../context/LangContext';

type LangCode = 'en' | 'hi' | 'mr';
const langOptions: { code: LangCode; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'mr', label: 'मराठी', short: 'MR' },
];

const STATES = [
  'Maharashtra','Karnataka','Gujarat','Rajasthan','Uttar Pradesh',
  'Madhya Pradesh','Andhra Pradesh','Tamil Nadu','Punjab','Haryana',
  'Bihar','West Bengal','Odisha','Telangana','Chhattisgarh',
];
const DISTRICTS: Record<string,string[]> = {
  Maharashtra: ['Pune','Nashik','Aurangabad','Kolhapur','Satara','Sangli','Solapur','Amravati','Nagpur','Latur'],
  Karnataka: ['Dharwad','Belagavi','Mysuru','Hubballi','Mangaluru','Vijayapura','Kalaburagi','Bidar','Raichur','Davangere'],
  Gujarat: ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Anand','Amreli','Junagadh','Mehsana','Patan'],
};
const animalTypeOptions = ['Cattle / Cow','Buffalo','Goat / Sheep','Pig / Swine','Poultry','Horse / Equine'];

const ROLES = [
  { key:'farmer', label:'Farmer', sublabel:'Pashu Palan', icon:<Tractor size={20}/>, desc:'Livestock owner & farm manager', color:'from-amber-500 to-orange-500' },
  { key:'vet', label:'Field Vet', sublabel:'Veterinarian', icon:<Stethoscope size={20}/>, desc:'Licensed veterinary officer', color:'from-primary-600 to-primary-800' },
  { key:'officer', label:'Officer', sublabel:'Block / District', icon:<Building2 size={20}/>, desc:'Government field officer', color:'from-purple-600 to-indigo-700' },
];

interface RegForm {
  name:string; phone:string; role:string; photo:string|null;
  state:string; district:string; village:string; taluk:string;
  animalCount:string; animalTypes:string[];
  password:string; confirmPassword:string; aadhaar:string;
}

/* ── Welcome Splash ─────────────────────────────────────── */
function WelcomeSplash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in'|'hold'|'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100);
    const t2 = setTimeout(() => setPhase('out'), 2200);
    const t3 = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-emerald-900 transition-opacity duration-600 ${phase === 'out' ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-8">
        <div className={`absolute w-32 h-32 rounded-full border-2 border-emerald-400/20 transition-all duration-700 ${phase==='hold'||phase==='out' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} style={{animationDelay:'0.1s'}} />
        <div className={`absolute w-24 h-24 rounded-full border-2 border-emerald-400/30 transition-all duration-700 ${phase==='hold'||phase==='out' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} style={{animationDelay:'0.2s'}} />
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-primary-500 flex items-center justify-center shadow-2xl transition-all duration-700 ${phase==='hold'||phase==='out' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-45'}`}>
          <Shield size={32} className="text-white" />
        </div>
      </div>

      <div className={`text-center transition-all duration-700 ${phase==='hold'||phase==='out' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-2">Welcome to</p>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">PashuMitra</h1>
        <p className="text-primary-300 text-sm font-medium">Bio-Defense Network · Loading your dashboard...</p>
      </div>

      {/* Loading bar */}
      <div className={`mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden transition-all duration-700 ${phase==='hold'||phase==='out' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-full bg-emerald-400 rounded-full animate-[loadbar_1.8s_ease-in-out_forwards]" />
      </div>

      <style>{`
        @keyframes loadbar {
          0% { width: 0% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  );
}

/* ── Registration Wizard ─────────────────────────────────── */
function RegisterForm({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSplash, setShowSplash] = useState(false);
  const [form, setForm] = useState<RegForm>({
    name:'', phone:'', role:'', photo:null,
    state:'', district:'', village:'', taluk:'',
    animalCount:'', animalTypes:[], password:'', confirmPassword:'', aadhaar:'',
  });
  const [showPw, setShowPw] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k:keyof RegForm, v:any) => setForm(f=>({...f,[k]:v}));
  const toggleAnimal = (a:string) => set('animalTypes', form.animalTypes.includes(a) ? form.animalTypes.filter(x=>x!==a) : [...form.animalTypes,a]);
  const handlePhoto = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){ const r=new FileReader(); r.onload=ev=>set('photo',ev.target?.result as string); r.readAsDataURL(file); }
  };
  const steps = ['Role','Profile','Location','Livestock','Account'];

  if(showSplash) return <WelcomeSplash onDone={() => navigate('/')} />;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-3 flex-shrink-0">
        <button onClick={()=>step===1?onBack():setStep(s=>s-1)} className="flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs font-bold mb-4 transition-colors">
          <ChevronLeft size={14}/> Back
        </button>
        <h2 className="text-lg font-black text-gray-900">Create Account</h2>
        <p className="text-xs text-gray-400 mt-0.5">Step {step}/{steps.length} — <span className="text-primary-700 font-bold">{steps[step-1]}</span></p>
        <div className="flex gap-1 mt-2">
          {steps.map((_,i)=><div key={i} className={`h-1 flex-1 rounded-full transition-all ${i<step?'bg-primary-600':'bg-gray-200'}`}/>)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3">
        {step===1 && (
          <div className="space-y-2 pt-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select your role</p>
            {ROLES.map(r=>(
              <button key={r.key} onClick={()=>set('role',r.key)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${form.role===r.key?'border-primary-500 bg-primary-50':'border-gray-200 bg-white hover:border-gray-300'}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center flex-shrink-0 shadow`}>{r.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-gray-900 text-sm">{r.label} <span className="text-gray-400 font-semibold text-xs">· {r.sublabel}</span></p>
                  <p className="text-xs text-gray-500 truncate">{r.desc}</p>
                </div>
                {form.role===r.key && <CheckCircle size={16} className="text-primary-600 flex-shrink-0"/>}
              </button>
            ))}
          </div>
        )}

        {step===2 && (
          <div className="space-y-3 pt-1">
            <div className="flex justify-center mb-1">
              <div onClick={()=>fileRef.current?.click()} className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary-400 cursor-pointer flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-primary-50 transition-all group">
                {form.photo ? <img src={form.photo} className="w-full h-full object-cover" alt="profile"/> : <div className="flex flex-col items-center gap-0.5 text-gray-400 group-hover:text-primary-500"><Camera size={20}/><span className="text-[9px] font-bold">Photo</span></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto}/>
            </div>
            {[
              {label:'Full Name *',key:'name',type:'text',placeholder:'e.g. Rameshwar Patil',icon:<User size={14}/>},
              {label:'Mobile Number *',key:'phone',type:'tel',placeholder:'10-digit mobile',icon:<Phone size={14}/>},
              {label:'Aadhaar Number',key:'aadhaar',type:'text',placeholder:'XXXX XXXX XXXX',icon:<Shield size={14}/>},
            ].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{f.icon}</span>
                  <input type={f.type} value={(form as any)[f.key]} placeholder={f.placeholder} onChange={e=>set(f.key as keyof RegForm,e.target.value)} className="w-full border border-gray-200 rounded-xl py-2.5 pl-8 pr-3 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {step===3 && (
          <div className="space-y-3 pt-1">
            {[{label:'State *',key:'state',options:STATES},{label:'District *',key:'district',options:DISTRICTS[form.state]||[]}].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
                <select value={(form as any)[f.key]} disabled={f.key==='district'&&!form.state} onChange={e=>{set(f.key as keyof RegForm,e.target.value);if(f.key==='state')set('district','');}} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 bg-gray-50 focus:bg-white transition-all">
                  <option value="">Select {f.label.replace(' *','')}</option>
                  {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            {[{label:'Taluk / Block',key:'taluk',placeholder:'e.g. Navalgund'},{label:'Village Name',key:'village',placeholder:'e.g. Sherewad'}].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input type="text" value={(form as any)[f.key]} placeholder={f.placeholder} onChange={e=>set(f.key as keyof RegForm,e.target.value)} className="w-full border border-gray-200 rounded-xl py-2.5 pl-8 pr-3 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {step===4 && (
          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Total Animals in Herd</label>
              <input type="number" value={form.animalCount} placeholder="e.g. 12" onChange={e=>set('animalCount',e.target.value)} className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 bg-gray-50 focus:bg-white transition-all"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Animal Types</label>
              <div className="grid grid-cols-2 gap-2">
                {animalTypeOptions.map(a=>(
                  <button key={a} type="button" onClick={()=>toggleAnimal(a)} className={`py-2 px-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all ${form.animalTypes.includes(a)?'border-primary-500 bg-primary-50 text-primary-800':'border-gray-200 text-gray-600 hover:border-gray-300 bg-gray-50'}`}>
                    {form.animalTypes.includes(a)&&'✓ '}{a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step===5 && (
          <div className="space-y-3 pt-1">
            {[{label:'Create Password *',key:'password',placeholder:'Min 8 characters'},{label:'Confirm Password *',key:'confirmPassword',placeholder:'Re-enter password'}].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{f.label}</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                  <input type={showPw?'text':'password'} value={(form as any)[f.key]} placeholder={f.placeholder} onChange={e=>set(f.key as keyof RegForm,e.target.value)} className={`w-full border rounded-xl py-2.5 pl-8 pr-9 text-sm font-medium text-gray-900 outline-none focus:ring-2 bg-gray-50 focus:bg-white transition-all ${f.key==='confirmPassword'&&form.confirmPassword&&form.password!==form.confirmPassword?'border-red-300 focus:border-red-400 focus:ring-red-100':'border-gray-200 focus:border-primary-500 focus:ring-primary-100'}`}/>
                  <button type="button" onClick={()=>setShowPw(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                </div>
                {f.key==='confirmPassword'&&form.confirmPassword&&form.password!==form.confirmPassword&&<p className="text-xs text-red-500 font-semibold mt-1">Passwords do not match</p>}
              </div>
            ))}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1.5 mt-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Summary</p>
              {[{l:'Name',v:form.name||'—'},{l:'Role',v:ROLES.find(r=>r.key===form.role)?.label||'—'},{l:'Location',v:[form.village,form.district,form.state].filter(Boolean).join(', ')||'—'},{l:'Animals',v:form.animalCount?`${form.animalCount} head`:'—'}].map(r=>(
                <div key={r.l} className="flex justify-between text-xs"><span className="text-gray-500">{r.l}</span><span className="font-bold text-gray-800">{r.v}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 pt-2 flex-shrink-0">
        {step<steps.length
          ? <button onClick={()=>setStep(s=>s+1)} disabled={step===1&&!form.role} className="w-full bg-primary-800 hover:bg-primary-900 disabled:opacity-40 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow transition-all active:scale-[0.98]">Continue <ChevronRight size={16}/></button>
          : <button onClick={()=>setShowSplash(true)} disabled={!form.name||!form.password||form.password!==form.confirmPassword} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow transition-all active:scale-[0.98]"><CheckCircle size={16}/> Create Account & Sign In</button>
        }
      </div>
    </div>
  );
}

/* ── Main Login Page ─────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [selectedRole, setSelectedRole] = useState<string|null>(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [view, setView] = useState<'role'|'login'|'register'>('role');
  const [showSplash, setShowSplash] = useState(false);
  const [loginTab, setLoginTab] = useState<'password'|'farmerid'>('password');

  const currentLang = langOptions.find(l=>l.code===lang)||langOptions[0];
  const role = ROLES.find(r=>r.key===selectedRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSplash(true);
  };

  if (showSplash) return <WelcomeSplash onDone={() => navigate('/')} />;

  return (
    <div className="min-h-screen flex font-sans bg-[#f0f4f8]">

      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200" alt="Livestock" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/92 via-primary-900/78 to-emerald-900/55"/>

        <div className="relative z-10 p-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <Shield size={20} className="text-white"/>
            </div>
            <div>
              <h1 className="font-black text-white text-base leading-none">PashuMitra</h1>
              <p className="text-[9px] text-primary-300 font-bold uppercase tracking-widest">Bio-Defense Network</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 pb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 border border-emerald-400/30 rounded-full px-3 py-1 mb-5 w-max">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Secured Government Portal</span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight mb-3">
            Protecting India's<br/><span className="text-emerald-300">Livestock Economy</span>
          </h2>
          <p className="text-primary-200 text-xs leading-relaxed max-w-xs mb-8">
            Real-time bio-surveillance, AI-assisted disease triage, and automated farmer alert systems.
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {[{val:'42+',label:'Clusters',icon:<Wifi size={14}/>},{val:'12K+',label:'Animals',icon:<Star size={14}/>},{val:'84%',label:'Immunity',icon:<Shield size={14}/>}].map(s=>(
              <div key={s.label} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-3 text-center">
                <div className="flex justify-center text-emerald-300 mb-1">{s.icon}</div>
                <p className="text-xl font-black text-white">{s.val}</p>
                <p className="text-[9px] text-primary-300 font-bold uppercase mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 px-10 py-4 flex items-center gap-4">
          <p className="text-[9px] text-primary-400 font-bold uppercase tracking-widest">Backed by</p>
          {['INAPH','NLM','DAHD','NIC'].map(g=>(
            <span key={g} className="text-[10px] font-black text-white/50 border border-white/15 px-2.5 py-1 rounded-lg">{g}</span>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="w-full lg:w-[420px] bg-white flex flex-col min-h-screen shadow-2xl">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div className="flex lg:hidden items-center gap-2">
            <Shield size={17} className="text-primary-700"/>
            <span className="font-black text-gray-900 text-sm">PashuMitra</span>
          </div>
          <div className="hidden lg:block"/>
          <div className="relative">
            <button onClick={()=>setLangOpen(!langOpen)} className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Globe size={12} className="text-primary-700"/>{currentLang.label}<ChevronDown size={11} className="text-gray-400"/>
            </button>
            {langOpen && (
              <><div className="fixed inset-0 z-40" onClick={()=>setLangOpen(false)}/>
              <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                {langOptions.map(l=>(
                  <button key={l.code} onClick={()=>{setLang(l.code);setLangOpen(false);}} className={`w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-primary-50 flex justify-between ${lang===l.code?'text-primary-700 bg-primary-50/60':'text-gray-600'}`}>
                    {l.label}<span className="text-gray-400">{l.short}</span>
                  </button>
                ))}
              </div></>
            )}
          </div>
        </div>

        {/* ── Role Picker ── */}
        {view==='role' && (
          <div className="flex-1 flex flex-col justify-center px-6 py-8">
            <div className="mb-6">
              <h2 className="text-xl font-black text-gray-900 mb-1">Welcome Back 👋</h2>
              <p className="text-xs text-gray-500 font-medium">Select your role to sign in to PashuMitra</p>
            </div>
            <div className="space-y-2.5 mb-7">
              {ROLES.map(r=>(
                <button key={r.key} onClick={()=>{setSelectedRole(r.key);setView('login');}} className="w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group text-left">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>{r.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm">{r.label} <span className="text-gray-400 font-semibold text-xs">· {r.sublabel}</span></p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0"/>
                </button>
              ))}
            </div>
            <div className="text-center border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-400 mb-1.5">New to PashuMitra?</p>
              <button onClick={()=>setView('register')} className="inline-flex items-center gap-1.5 text-primary-700 hover:text-primary-900 text-sm font-bold transition-colors">
                Create a Farmer Account <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        )}

        {/* ── Login Form ── */}
        {view==='login' && (
          <div className="flex-1 flex flex-col justify-center px-6 py-6 overflow-y-auto">
            <button onClick={()=>setView('role')} className="flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs font-bold mb-4 transition-colors">
              <ChevronLeft size={14}/> All Roles
            </button>
            {role && (
              <div className={`inline-flex items-center gap-2.5 bg-gradient-to-r ${role.color} text-white px-4 py-2 rounded-xl mb-4 w-max shadow-md`}>
                {React.cloneElement(role.icon as React.ReactElement<any>, { size: 16 })}
                <div><p className="font-black text-sm leading-none">{role.label}</p><p className="text-[10px] text-white/70 font-bold">{role.sublabel}</p></div>
              </div>
            )}
            <h2 className="text-xl font-black text-gray-900 mb-0.5">Sign In</h2>
            <p className="text-xs text-gray-400 mb-4">Bharat Pashudhan · INAPH Integrated Portal</p>

            {/* Login Method Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
              <button
                onClick={() => setLoginTab('password')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${loginTab==='password' ? 'bg-white text-primary-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                🔐 Password
              </button>
              <button
                onClick={() => setLoginTab('farmerid')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${loginTab==='farmerid' ? 'bg-white text-primary-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                🪪 Farmer ID
              </button>
            </div>

            {/* Password Tab */}
            {loginTab === 'password' && (
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">{t.mobileLabel}</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input type="text" value={phone} placeholder="Mobile number / Email" onChange={e=>setPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">{t.passwordLabel}</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input type={showPw?'text':'password'} value={password} placeholder="••••••••" onChange={e=>setPassword(e.target.value)} className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-9 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                    <button type="button" onClick={()=>setShowPw(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">{showPw?<EyeOff size={15}/>:<Eye size={15}/>}</button>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]">
                  <LogIn size={16}/> {t.signInBtn}
                </button>
              </form>
            )}

            {/* Farmer ID Tab */}
            {loginTab === 'farmerid' && (
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex items-start gap-2 mb-1">
                  <span className="text-amber-500 text-sm mt-0.5">🪪</span>
                  <p className="text-xs text-amber-700 font-medium leading-snug">Enter your <strong>Government-issued Farmer ID</strong> (from Bharat Pashudhan / INAPH registration)</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Farmer ID / INAPH ID</label>
                  <div className="relative">
                    <Tractor size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"/>
                    <input type="text" placeholder="e.g. MH-DWD-2024-00412" className="w-full border border-amber-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-amber-50/50 focus:bg-white transition-all"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Date of Birth (Verification)</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm font-medium text-gray-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Registered Mobile (OTP)</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input type="tel" placeholder="10-digit mobile" className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-gray-50 focus:bg-white transition-all"/>
                  </div>
                </div>
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-[0.98]">
                  <Tractor size={16}/> Login with Farmer ID
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100"/>
              <span className="text-xs font-bold text-gray-400">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-gray-100"/>
            </div>

            {/* Google Buttons */}
            <div className="space-y-2.5">
              <button type="button" onClick={() => setShowSplash(true)}
                className="w-full bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 text-gray-700 rounded-xl py-2.5 flex items-center justify-center gap-2.5 font-bold text-sm shadow-sm transition-all active:scale-[0.98]">
                <svg viewBox="0 0 24 24" width="17" height="17"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign in with Google
              </button>
              <button type="button" onClick={() => setView('register')}
                className="w-full bg-white border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50/20 text-gray-600 rounded-xl py-2.5 flex items-center justify-center gap-2.5 font-bold text-sm transition-all active:scale-[0.98]">
                <svg viewBox="0 0 24 24" width="17" height="17"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign up with Google
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 rounded-xl py-2 px-3">
              <CheckCircle size={12}/> Credentials cached offline for field use
            </div>
          </div>
        )}

        {/* ── Register ── */}
        {view==='register' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <RegisterForm onBack={()=>setView('role')}/>
          </div>
        )}
      </div>
    </div>
  );
}
