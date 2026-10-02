import { useNavigate } from 'react-router-dom';
import {
  Activity, AlertTriangle, Users, BarChart3, Shield,
  MapPin, Phone, ArrowRight, CheckCircle, Globe, Zap,
  Smartphone, Wifi, Clock, ChevronRight
} from 'lucide-react';

const portals = [
  {
    role: 'Farmer / किसान',
    description: 'Report disease symptoms, view advisories, track your herd health records',
    descHi: 'रोग के लक्षण रिपोर्ट करें, सलाह देखें, झुंड स्वास्थ्य रिकॉर्ड ट्रैक करें',
    icon: Users,
    route: '/farmer',
    gradient: 'from-green-500 to-emerald-600',
    badge: 'Offline Ready',
  },
  {
    role: 'Veterinarian / पशु चिकित्सक',
    description: 'Manage cases, issue advisories, triage disease reports, refer labs',
    descHi: 'मामले प्रबंधित करें, सलाह जारी करें, रोग रिपोर्ट को ट्राइएज करें',
    icon: Activity,
    route: '/vet',
    gradient: 'from-blue-500 to-sky-600',
    badge: 'AI Triage',
  },
  {
    role: 'Admin / प्रशासन',
    description: 'District-level outbreak maps, vaccination coverage, policy dashboards',
    descHi: 'जिला स्तरीय प्रकोप मानचित्र, टीकाकरण कवरेज, नीति डैशबोर्ड',
    icon: BarChart3,
    route: '/admin',
    gradient: 'from-purple-500 to-violet-600',
    badge: 'Real-time',
  },
];

const features = [
  { icon: AlertTriangle, title: 'Early Warning System', desc: 'AI-powered triage flags suspected outbreaks within minutes of first report' },
  { icon: MapPin, title: 'Geospatial Risk Maps', desc: 'Village-level disease heatmaps with weather and historical trend overlay' },
  { icon: Globe, title: 'Multilingual Support', desc: 'Hindi, English, and regional language advisories via SMS, IVR & app' },
  { icon: Wifi, title: 'Offline Capable', desc: 'Works in low-connectivity areas; data syncs when network is available' },
  { icon: Zap, title: 'Instant Alerts', desc: 'SMS and push notifications to farmers, vets and block officers' },
  { icon: Shield, title: 'Zoonotic Risk Tracking', desc: 'Monitors diseases with human health implications and triggers health dept alerts' },
];

const stats = [
  { value: '2.3 Cr', label: 'Animals Registered', sub: 'Rajasthan' },
  { value: '47', label: 'Active Outbreaks', sub: 'This Month' },
  { value: '94%', label: 'Vaccination Coverage', sub: 'FMD 2026' },
  { value: '<4 hrs', label: 'Avg Response Time', sub: 'Field to Lab' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-tight">PashuRakshak</h1>
              <p className="text-xs text-gray-400">पशु स्वास्थ्य निगरानी तंत्र</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
              <Phone size={14} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-700">Helpline: 1962</span>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 rounded-lg gradient-green text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Live Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-green-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-amber-100 opacity-40 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              SIH 2026 – Smart India Hackathon
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Early Detection &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Prevention of
              </span><br />
              Livestock Diseases
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
              A unified, real-time animal health surveillance platform connecting farmers, 
              field veterinarians, laboratories and government departments — from village to district level.
            </p>
            <p className="text-sm text-gray-500 mb-8 font-medium">
              ग्राम स्तर से जिला स्तर तक — एकीकृत पशु स्वास्थ्य निगरानी
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/farmer/report')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-green text-white font-semibold shadow-lg shadow-green-200 hover:shadow-xl hover:opacity-95 transition-all"
              >
                <AlertTriangle size={18} />
                Report Disease Now
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-green-300 hover:text-green-700 transition-all"
              >
                View Live Map
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-xs text-green-600 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – visual dashboard mockup */}
          <div className="relative lg:ml-8">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Mock dashboard header */}
              <div className="gradient-green px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/40"></div>
                  <div className="w-3 h-3 rounded-full bg-white/40"></div>
                  <div className="w-3 h-3 rounded-full bg-white/40"></div>
                </div>
                <span className="text-white text-xs font-medium ml-2">PashuRakshak Live Dashboard</span>
              </div>

              {/* Stat cards row */}
              <div className="p-4 grid grid-cols-4 gap-2">
                {[
                  { label: 'Active Alerts', val: '47', color: 'bg-red-50 border-red-200 text-red-700' },
                  { label: 'Outbreaks', val: '6', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                  { label: 'Cases Today', val: '128', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                  { label: 'Resolved', val: '91', color: 'bg-green-50 border-green-200 text-green-700' },
                ].map((s) => (
                  <div key={s.label} className={`p-2 rounded-lg border text-center ${s.color}`}>
                    <p className="text-lg font-bold">{s.val}</p>
                    <p className="text-xs font-medium leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Mock map */}
              <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-gray-100 h-36 bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-500 font-medium">Rajasthan Disease Heatmap</p>
                  </div>
                </div>
                {/* Dots */}
                {[
                  { top: '20%', left: '40%', color: 'bg-red-500', size: 'w-4 h-4' },
                  { top: '35%', left: '70%', color: 'bg-orange-500', size: 'w-3 h-3' },
                  { top: '55%', left: '30%', color: 'bg-orange-500', size: 'w-3 h-3' },
                  { top: '65%', left: '55%', color: 'bg-yellow-500', size: 'w-2.5 h-2.5' },
                  { top: '70%', left: '75%', color: 'bg-red-600', size: 'w-4 h-4' },
                ].map((d, i) => (
                  <div
                    key={i}
                    className={`absolute ${d.size} rounded-full ${d.color} animate-pulse opacity-80 ring-2 ring-white`}
                    style={{ top: d.top, left: d.left, transform: 'translate(-50%, -50%)' }}
                  />
                ))}
              </div>

              {/* Alert list */}
              <div className="px-4 pb-4 space-y-2">
                {[
                  { id: 'ALT-001', title: 'FMD – Alwar', sev: 'CRITICAL', color: 'text-red-600 bg-red-50' },
                  { id: 'ALT-002', title: 'PPR – Bharatpur', sev: 'HIGH', color: 'text-orange-600 bg-orange-50' },
                  { id: 'ALT-003', title: 'Anthrax – S. Madhopur', sev: 'CRITICAL', color: 'text-red-600 bg-red-50' },
                ].map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={13} className="text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">{a.title}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.color}`}>{a.sev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role portals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Portal</h2>
            <p className="text-gray-500">Tailored dashboards for every stakeholder in the animal health ecosystem</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portals.map(({ role, description, descHi, icon: Icon, route, gradient, badge }) => (
              <div
                key={route}
                onClick={() => navigate(route)}
                className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer card-hover shadow-card group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{role}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium border border-green-100">{badge}</span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{description}</p>
                <p className="text-xs text-gray-400 mb-4">{descHi}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  Open Portal <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Platform Capabilities</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            End-to-end animal health surveillance — from symptom capture to outbreak containment
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-gray-100 bg-white card-hover shadow-card">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Channel strip */}
      <section className="py-10 bg-primary-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Smartphone, label: 'Mobile App' },
              { icon: Globe, label: 'Web Portal' },
              { icon: Phone, label: 'IVR – 1962' },
              { icon: Wifi, label: 'Offline Sync' },
              { icon: Clock, label: '24×7 Support' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/90">
                <Icon size={20} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">PashuRakshak</p>
              <p className="text-xs">Ministry of Fisheries, Animal Husbandry & Dairying</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span>Department of Animal Husbandry, Rajasthan</span>
            <span>SIH 2026 Problem Statement</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-500" />
              <span className="text-green-400">Live System</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
