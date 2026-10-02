import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Bell, FileText,
  Plus, ChevronRight, Syringe, Calendar, Phone,
  AlertCircle, Clock
} from 'lucide-react';
import { mockAlerts, mockAdvisories } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';

const quickActions = [
  { label: 'Report Symptoms', labelHi: 'लक्षण रिपोर्ट करें', icon: AlertTriangle, route: '/farmer/report', color: 'from-red-500 to-rose-600', urgent: true },
  { label: 'View Advisories', labelHi: 'सलाह देखें', icon: Bell, route: '/advisories', color: 'from-amber-500 to-orange-500', urgent: false },
  { label: 'Vaccination Record', labelHi: 'टीकाकरण रिकॉर्ड', icon: Syringe, route: '/records', color: 'from-blue-500 to-sky-600', urgent: false },
  { label: 'My Animals', labelHi: 'मेरे पशु', icon: FileText, route: '/records', color: 'from-green-500 to-emerald-600', urgent: false },
];

const myAnimals = [
  { id: 'RJ-AW-001', name: 'Lakshmi', species: 'Cow (Gir)', age: '4 yrs', status: 'healthy', nextVax: '10 Oct' },
  { id: 'RJ-AW-002', name: 'Kali', species: 'Buffalo', age: '6 yrs', status: 'due', nextVax: '28 Sep' },
  { id: 'RJ-AW-003', name: 'Moti', species: 'Cow (HF)', age: '2 yrs', status: 'sick', nextVax: '15 Nov' },
];

const statusColor = {
  healthy: 'text-green-600 bg-green-50 border-green-200',
  due: 'text-amber-600 bg-amber-50 border-amber-200',
  sick: 'text-red-600 bg-red-50 border-red-200',
};

export default function FarmerPortal() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const activeAlerts = mockAlerts.filter(a => a.status === 'active').slice(0, 3);
  const advisories = mockAdvisories.slice(0, 2);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {lang === 'en' ? 'Farmer Portal' : 'किसान पोर्टल'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {lang === 'en' ? 'Welcome, Ramesh Kumar · Alwar, Rajasthan' : 'स्वागत है, रमेश कुमार · अलवर, राजस्थान'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
            <Phone size={14} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-700">Helpline: 1962</span>
          </div>
        </div>
      </div>

      {/* Alert banner */}
      <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">
            {lang === 'en' ? '⚠ FMD Outbreak Alert in Alwar Block!' : '⚠ अलवर ब्लॉक में FMD प्रकोप की चेतावनी!'}
          </p>
          <p className="text-xs text-red-600 mt-0.5">
            {lang === 'en'
              ? 'Emergency vaccination drive on 29 Sep. Report any symptoms immediately.'
              : '29 सितंबर को आपातकालीन टीकाकरण अभियान। तुरंत किसी भी लक्षण की रिपोर्ट करें।'}
          </p>
        </div>
        <button onClick={() => navigate('/farmer/report')} className="ml-auto flex-shrink-0 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors">
          Report Now
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map(({ label, labelHi, icon: Icon, route, color, urgent }) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg card-hover ${urgent ? 'ring-2 ring-red-300 ring-offset-2' : ''}`}
          >
            {urgent && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>}
            <Icon size={22} />
            <span className="text-xs font-semibold text-center leading-tight">
              {lang === 'en' ? label : labelHi}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Animals */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <FileText size={16} className="text-primary-600" />
              {lang === 'en' ? 'My Animals' : 'मेरे पशु'}
            </h2>
            <button className="text-xs text-primary-600 hover:underline font-medium flex items-center gap-1">
              <Plus size={13} /> Add Animal
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {myAnimals.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-lg">
                  🐄
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{a.name}</p>
                    <span className={`status-badge border text-xs ${statusColor[a.status as keyof typeof statusColor]}`}>
                      {a.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{a.species} · {a.age} · ID: {a.id}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={11} />
                    <span>Next vax: {a.nextVax}</span>
                  </div>
                  {a.status === 'sick' && (
                    <button
                      onClick={() => navigate('/farmer/report')}
                      className="mt-1 text-xs text-red-600 font-semibold hover:underline"
                    >
                      Report Symptoms →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="space-y-3">
          {[
            { label: 'Total Animals', labelHi: 'कुल पशु', value: '3', icon: '🐄', color: 'bg-green-50 border-green-200' },
            { label: 'Vaccinations Due', labelHi: 'टीकाकरण बाकी', value: '1', icon: '💉', color: 'bg-amber-50 border-amber-200' },
            { label: 'Active Reports', labelHi: 'सक्रिय रिपोर्ट', value: '1', icon: '🔴', color: 'bg-red-50 border-red-200' },
            { label: 'Health Score', labelHi: 'स्वास्थ्य स्कोर', value: '72%', icon: '📈', color: 'bg-blue-50 border-blue-200' },
          ].map((s) => (
            <div key={s.label} className={`p-3 rounded-xl border ${s.color} flex items-center gap-3`}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-xs text-gray-500">{lang === 'en' ? s.label : s.labelHi}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active alerts nearby */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            {lang === 'en' ? 'Disease Alerts Near You' : 'आपके पास रोग की चेतावनियाँ'}
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium border border-red-200">
            {activeAlerts.length} Active
          </span>
        </div>
        <div className="divide-y divide-gray-50">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <SeverityBadge severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{alert.title}</p>
                <p className="text-xs text-gray-500">{alert.location.village}, {alert.location.block} · {alert.affectedAnimals} animals</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                <Clock size={11} />
                <span>2h ago</span>
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Advisories */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Bell size={16} className="text-amber-500" />
            {lang === 'en' ? 'Latest Advisories' : 'नवीनतम सलाह'}
          </h2>
          <button onClick={() => navigate('/advisories')} className="text-xs text-primary-600 hover:underline font-medium">
            View all
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {advisories.map((adv) => (
            <div key={adv.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {lang === 'en' ? adv.title : adv.titleHi}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {lang === 'en' ? adv.body : adv.bodyHi}
                  </p>
                </div>
                <SeverityBadge severity={adv.severity} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
