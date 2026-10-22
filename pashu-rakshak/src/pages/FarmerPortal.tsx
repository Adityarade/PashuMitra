import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Bell, FileText,
  Plus, ChevronRight, Syringe, Calendar, Phone,
  AlertCircle, Clock, ShieldCheck, QrCode
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import { api } from '../services/api';
import type { AnimalProfile } from '../services/api';

export default function FarmerPortal() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [animals, setAnimals] = useState<AnimalProfile[]>([]);

  useEffect(() => {
    api.getAnimals().then(data => setAnimals(data));
  }, []);

  const quickActions = [
    { 
      label: 'Report Symptoms', 
      labelHi: 'लक्षण रिपोर्ट करें', 
      labelMr: 'लक्षणे नोंदवा',
      icon: AlertTriangle, 
      route: '/report', 
      color: 'from-red-500 to-rose-600', 
      urgent: true 
    },
    { 
      label: 'View Advisories', 
      labelHi: 'सलाह देखें', 
      labelMr: 'सल्ला पहा',
      icon: Bell, 
      route: '/advisories', 
      color: 'from-amber-500 to-orange-500', 
      urgent: false 
    },
    { 
      label: 'Vaccination Record', 
      labelHi: 'टीकाकरण रिकॉर्ड', 
      labelMr: 'लसीकरण नोंद',
      icon: Syringe, 
      route: '/records', 
      color: 'from-blue-500 to-sky-600', 
      urgent: false 
    },
    { 
      label: 'My Herd Records', 
      labelHi: 'मेरे पशुधन', 
      labelMr: 'माझे पशुधन',
      icon: FileText, 
      route: '/records', 
      color: 'from-emerald-500 to-teal-600', 
      urgent: false 
    },
  ];

  const getActionLabel = (action: typeof quickActions[0]) => {
    if (lang === 'hi') return action.labelHi;
    if (lang === 'mr') return action.labelMr;
    return action.label;
  };

  return (
    <div className="w-full px-4 sm:px-6 space-y-6 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {lang === 'hi' ? 'किसान पोर्टल' : lang === 'mr' ? 'शेतकरी पोर्टल' : 'Farmer & Livestock Portal'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {lang === 'hi' 
              ? 'स्वागत है, रामेश्वर गौड़ा · धारवाड़, कर्नाटक' 
              : lang === 'mr' 
                ? 'स्वागत आहे, रामेश्वर गौडा · धारवाड, कर्नाटक' 
                : 'Welcome, Rameshwar Gowda · Dharwad District, Karnataka'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
            <Phone size={15} className="text-amber-700" />
            <span className="text-xs font-black text-amber-800">Toll-Free Helpline: 1962</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="p-5 rounded-3xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-red-900">
              {lang === 'hi' 
                ? '⚠ कुंदगोल और ब्याहट्टी क्षेत्र में FMD प्रकोप की चेतावनी!' 
                : lang === 'mr' 
                  ? '⚠ कुंदगोल आणि ब्याहट्टी भागात FMD रोगाची सतर्कता!' 
                  : '⚠ FMD Outbreak Alert Active in Kundgol & Byahatti Block!'}
            </p>
            <p className="text-xs text-red-700 font-medium mt-0.5">
              {lang === 'hi'
                ? 'आपातकालीन टीकाकरण अभियान सक्रिय है। किसी भी पशु में लार टपकने पर तुरंत रिपोर्ट करें।'
                : lang === 'mr'
                  ? 'तातडीचे लसीकरण सुरू आहे. जनावरांच्या तोंडात फोड आढळल्यास तात्काळ नोंदवा.'
                  : 'Emergency ring vaccination in progress. Maintain foot-bath and report symptoms immediately.'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/report')} 
          className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-black hover:bg-red-700 transition-colors shadow-sm"
        >
          {lang === 'hi' ? 'अभी रिपोर्ट करें' : lang === 'mr' ? 'आता नोंदवा' : 'Report Symptoms Now'}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className={`relative flex flex-col items-center gap-2.5 p-5 rounded-3xl bg-gradient-to-br ${action.color} text-white shadow-md hover:scale-[1.02] transition-transform ${action.urgent ? 'ring-2 ring-red-400 ring-offset-2' : ''}`}
            >
              {action.urgent && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              )}
              <Icon size={26} />
              <span className="text-xs font-black text-center leading-tight">
                {getActionLabel(action)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Registered Herd Livestock */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <FileText size={18} className="text-primary-700" />
            {lang === 'hi' ? 'मेरे पंजीकृत पशु' : lang === 'mr' ? 'माझे नोंदणीकृत पशु' : 'My Registered Livestock'}
          </h3>
          <button 
            onClick={() => navigate('/records')}
            className="text-xs font-bold text-primary-800 hover:text-primary-900"
          >
            {lang === 'hi' ? 'सभी देखें →' : lang === 'mr' ? 'सर्व पहा →' : 'View All Records →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {animals.map((a) => (
            <div key={a.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex items-center gap-3.5 hover:bg-gray-100/80 transition-colors">
              <img 
                src={a.imageUrl || "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=100"} 
                alt={a.name} 
                className="w-14 h-14 rounded-xl object-cover border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-gray-900 text-sm truncate">{a.name}</h4>
                  <span className="text-[10px] font-mono font-bold text-gray-500">#{a.tagId.slice(-6)}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium truncate">{a.breed} • {a.age}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${a.vitals?.temperature?.value > 103 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <span className="text-[10px] font-bold text-gray-600">
                    {a.vitals?.temperature?.value > 103 ? 'Needs Paravet Check' : 'Healthy & Vaccinated'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
