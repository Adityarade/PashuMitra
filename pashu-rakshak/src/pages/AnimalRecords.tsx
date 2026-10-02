import React from 'react';
import { 
  Thermometer, Droplet, Weight, Activity, 
  Phone, User, ShieldAlert, Pill, Syringe, Clipboard, Map, Shield
} from 'lucide-react';

export default function AnimalRecords() {
  return (
    <div className="w-full px-4 sm:px-6 space-y-6">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=120&h=120" 
            alt="Cow" 
            className="w-16 h-16 rounded-xl object-cover border border-gray-200"
          />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
            RFID
          </span>
        </div>
        <div>
          <h1 className="text-gray-600 flex items-center gap-2 text-sm font-medium mb-1">
            <User size={16} /> Rameshwar Gowda • Navalgund (8 Cattle)
          </h1>
          <p className="text-gray-500 flex items-center gap-2 text-sm font-medium">
            <Phone size={16} /> +91 98452 87192
          </p>
        </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Temperature Card (Elevated) */}
        <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-red-700 font-semibold text-sm">Temperature</span>
            <Thermometer className="text-red-600" size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-red-700">104.2°F</span>
              <span className="text-xs font-bold text-red-700 uppercase">Elevated</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Normal: 101.5°F</p>
          </div>
        </div>

        {/* Milk Yield Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-600 font-semibold text-sm">Daily Milk Yield</span>
            <Droplet className="text-primary-600" size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">4.2 L</span>
              <span className="text-xs font-bold text-red-600">-65%</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Baseline: 12 L</p>
          </div>
        </div>

        {/* Body Weight Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-600 font-semibold text-sm">Body Weight</span>
            <Weight className="text-primary-700" size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">410 kg</span>
              <span className="text-xs font-bold text-green-600">Stable</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">BCS Score: 3.25 / 5</p>
          </div>
        </div>

        {/* Rumen Rhythm Card */}
        <div className="bg-yellow-50/50 rounded-2xl p-4 border border-yellow-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-amber-800 font-semibold text-sm">Rumen Rhythm</span>
            <Activity className="text-amber-700" size={20} />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-amber-900">1/min</span>
              <span className="text-xs font-bold text-amber-700 uppercase">Sub-norm</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Target: 2-3 / min</p>
          </div>
        </div>
      </div>

      {/* Milk Withdrawal Safety Lockdown Card */}
      <div className="bg-red-50/30 border border-red-200 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 border border-red-200">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="font-bold text-red-900 uppercase tracking-wide text-sm">Milk Withdrawal Safety Lockdown</h3>
            <p className="text-xs font-medium text-red-700 mt-0.5">Active Antibiotic / NSAID Treatment Residue Guard</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-900">Meldon-Vet & Ceftiofur Sodium</h4>
            <span className="text-xs font-bold text-red-700">Prescribed 24 Oct</span>
          </div>
          <p className="text-red-600 font-semibold text-sm mb-4">
            DO NOT SELL MILK FOR HUMAN CONSUMPTION until 28 Oct 2024, 18:00 hrs.
          </p>
          
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-gray-600">72h Remaining (Total 96h)</span>
            <span className="text-red-700">25% Cleared</span>
          </div>
          <div className="w-full bg-red-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
        <button className="flex-1 py-2 rounded-xl bg-primary-700 text-white text-xs font-bold shadow-sm transition-colors">
          Vaccinations
        </button>
        <button className="flex-1 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-colors">
          Treatments
        </button>
        <button className="flex-1 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-colors">
          Lab Results
        </button>
        <button className="flex-1 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-colors">
          Movement
        </button>
      </div>

      {/* Tab Content: Vaccinations */}
      <div className="space-y-4 mb-8">
        {/* Overdue Alert Card (from Treatments ref, shown here for completeness) */}
        <div className="bg-white border border-critical-200 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-start">
              <ShieldAlert className="text-critical-600 mt-0.5" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-base">HS + BQ Combined Vaccine</h4>
                <p className="text-xs text-gray-500">Hemorrhagic Septicemia & Black Quarter</p>
              </div>
            </div>
            <span className="bg-critical-50 text-critical-700 border border-critical-200 px-2 py-0.5 rounded text-xs font-bold">
              Overdue 5 Days
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-600">Scheduled: Pre-Monsoon Target</span>
            <button className="text-primary-700 font-bold text-xs flex items-center gap-1 hover:underline">
              <Syringe size={14} /> Prioritize Now
            </button>
          </div>
        </div>

        {/* Regular Vaccination Card 1 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-start">
              <Shield className="text-primary-600 mt-0.5" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-base">FMD Vaccine (Raksha-Ovac Bi-valent)</h4>
                <p className="text-xs text-gray-500">Foot & Mouth Disease Protection</p>
              </div>
            </div>
            <span className="bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
              Booster in 22d
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Administered: 18 Mar 2024</span>
              <span className="font-bold text-primary-800 text-xs tracking-wide">Batch #RV-9011</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <User size={14} className="text-gray-400" />
              Clinician: Dr. Anjali Sharma (Lic: KA-VET-419)
            </div>
          </div>
        </div>

        {/* Regular Vaccination Card 2 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-start">
              <Shield className="text-primary-600 mt-0.5" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-base">Brucellosis (Cotton Strain 19)</h4>
                <p className="text-xs text-gray-500">Calfhood Stage Inoculation</p>
              </div>
            </div>
            <span className="bg-primary-50 text-primary-700 border border-primary-200 px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
              Lifelong Immune
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-600 text-xs">Completed: Age 6 Months (08 Nov 2020)</span>
            <span className="font-bold text-primary-800 text-xs tracking-wide">Batch #BR-104</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors">
            <Syringe size={18} /> + LOG VACCINE
          </button>
          <button className="bg-white border-2 border-primary-800 text-primary-800 hover:bg-primary-50 rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-colors">
            <Clipboard size={18} /> + VET VISIT
          </button>
        </div>
        <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 rounded-xl py-4 px-4 flex items-center justify-between shadow-sm transition-colors group">
          <div className="flex items-center gap-3 font-semibold text-gray-700 text-sm">
            <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span>
            </div>
            Export Encrypted Animal Health Pass (PDF/QR)
          </div>
          <span className="material-symbols-outlined text-gray-400">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
