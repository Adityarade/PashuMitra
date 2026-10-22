import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Droplet, Weight, Activity, 
  Phone, User, ShieldAlert, Pill, Syringe, Clipboard, Map, Shield,
  Plus, Search, CheckCircle, Clock, X, QrCode
} from 'lucide-react';
import { api } from '../services/api';
import type { AnimalProfile } from '../services/api';

export default function AnimalRecords() {
  const [animals, setAnimals] = useState<AnimalProfile[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New Animal Form State
  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newBreed, setNewBreed] = useState('Gir Crossbred');
  const [newSpecies, setNewSpecies] = useState('Bovine / Cattle');
  const [newOwner, setNewOwner] = useState('');
  const [newPhone, setNewPhone] = useState('+91 ');
  const [newLocation, setNewLocation] = useState('Navalgund, Dharwad');

  const loadAnimals = async (query?: string) => {
    try {
      const list = await api.getAnimals(query);
      setAnimals(list);
      if (!selectedAnimal && list.length > 0) {
        setSelectedAnimal(list[0]);
      } else if (selectedAnimal) {
        const found = list.find(a => a.id === selectedAnimal.id);
        if (found) setSelectedAnimal(found);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadAnimals(searchQuery);
  };

  const handleRegisterNewAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.registerAnimal({
        tagId: newTag || `IN-KA-29-${Math.floor(100000 + Math.random() * 900000)}`,
        name: newName || 'Radha',
        breed: newBreed,
        species: newSpecies,
        owner: newOwner || 'Ramesh Patil',
        phone: newPhone || '+91 98452 00000',
        location: newLocation
      });

      setSuccessMsg(`Animal ${res.animal.name} (${res.animal.tagId}) registered in PashuMitra!`);
      setIsModalOpen(false);
      await loadAnimals();
      setSelectedAnimal(res.animal);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const animal = selectedAnimal || animals[0];

  return (
    <div className="w-full px-4 sm:px-6 space-y-6 pb-24">

      {/* ── Add New Animal Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-fade-in-up">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Plus size={20} className="text-primary-700" />
                Register New Livestock RFID Tag
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterNewAnimal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">RFID / INAPH Ear-Tag Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. IN-KA-29-994102"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 font-mono font-bold text-gray-900 text-sm outline-none focus:ring-2 focus:ring-primary-600"
                  />
                  <QrCode size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Animal Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Radha"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Breed</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Gir Crossbred"
                    value={newBreed}
                    onChange={(e) => setNewBreed(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Owner / Farmer</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Basappa Patil"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Contact Phone</label>
                  <input 
                    type="text" 
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Location / Village</label>
                <input 
                  type="text" 
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl py-2.5 px-3 text-sm font-semibold text-gray-900 outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl py-3 font-bold text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary-800 hover:bg-primary-900 text-white rounded-xl py-3 font-bold text-xs shadow-md"
                >
                  Register Animal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up">
          <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" />
          <p className="font-bold text-sm">{successMsg}</p>
        </div>
      )}

      {/* Top Bar with Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">National Herd Telemetry & Records</h1>
          <p className="text-xs text-gray-500 font-medium">Bharat Pashudhan System & INAPH Real-Time Electronic Health Book</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="Search Tag, Breed, Owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-800 hover:bg-primary-900 text-white px-4 py-2 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 flex-shrink-0"
          >
            <Plus size={16} /> Add Animal
          </button>
        </div>
      </div>

      {/* Animal Quick Picker Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {animals.map((a) => {
          const isSelected = animal?.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelectedAnimal(a)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all ${
                isSelected 
                  ? 'bg-primary-800 text-white border-primary-800 shadow-md scale-[1.02]' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{a.name} ({a.breed.split(' ')[0]})</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-primary-900 text-primary-200' : 'bg-gray-100 text-gray-600'}`}>
                #{a.tagId.slice(-6)}
              </span>
            </button>
          );
        })}
      </div>

      {animal && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Header Profile */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={animal.imageUrl || "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=140&h=140"} 
                  alt={animal.name} 
                  className="w-20 h-20 rounded-2xl object-cover border border-gray-200 shadow-sm"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded border border-slate-700 shadow-sm">
                  RFID ACTIVE
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-black text-gray-900">{animal.name}</h2>
                  <span className="bg-primary-50 text-primary-800 border border-primary-200 px-2 py-0.5 rounded text-xs font-bold">
                    {animal.breed} • {animal.age}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center gap-2 text-xs font-medium mb-1">
                  <User size={14} className="text-primary-700" /> {animal.owner} • {animal.location} ({animal.herdSize} Cattle)
                </p>
                <p className="text-gray-500 flex items-center gap-2 text-xs font-mono font-bold">
                  <Phone size={14} className="text-primary-700" /> {animal.phone} • Tag: {animal.tagId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                animal.lockdown?.active 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {animal.lockdown?.active ? '⚠ Milk Withdrawal Lockdown Active' : '✓ Safe for Dairy Collection'}
              </span>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Temperature */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-700 font-bold text-xs uppercase tracking-wider">Rectal Temperature</span>
                <Thermometer className="text-red-500" size={20} />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-3xl font-black ${animal.vitals.temperature.value > 103 ? 'text-red-600' : 'text-gray-900'}`}>
                    {animal.vitals.temperature.value}°F
                  </span>
                  <span className={`text-xs font-bold uppercase ${animal.vitals.temperature.value > 103 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {animal.vitals.temperature.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Baseline: {animal.vitals.temperature.normal}</p>
              </div>
            </div>

            {/* Daily Milk Yield */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-700 font-bold text-xs uppercase tracking-wider">Daily Milk Yield</span>
                <Droplet className="text-primary-600" size={20} />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-gray-900">{animal.vitals.milkYield.value} L</span>
                  <span className={`text-xs font-bold ${animal.vitals.milkYield.value < 6 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {animal.vitals.milkYield.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Standard Target: {animal.vitals.milkYield.normal}</p>
              </div>
            </div>

            {/* Body Weight */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-700 font-bold text-xs uppercase tracking-wider">Estimated Weight</span>
                <Weight className="text-primary-700" size={20} />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-gray-900">{animal.vitals.weight.value} kg</span>
                  <span className="text-xs font-bold text-emerald-600">{animal.vitals.weight.status}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Score: {animal.vitals.weight.normal}</p>
              </div>
            </div>

            {/* Rumen Rhythm */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-700 font-bold text-xs uppercase tracking-wider">Rumen Motility</span>
                <Activity className="text-amber-600" size={20} />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-gray-900">{animal.vitals.rumen.value} /min</span>
                  <span className="text-xs font-bold text-amber-600 uppercase">{animal.vitals.rumen.status}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Healthy: {animal.vitals.rumen.normal}</p>
              </div>
            </div>
          </div>

          {/* Milk Withdrawal Lockdown Notice */}
          {animal.lockdown?.active && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 border border-red-200">
                  <ShieldAlert size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base font-black text-red-900 uppercase tracking-wide">
                      Mandatory Milk Collection Lockdown Active
                    </h3>
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {animal.lockdown.remainingHours} hrs remaining
                    </span>
                  </div>
                  <p className="text-xs text-red-800 leading-relaxed font-medium mb-3">
                    Under active antibiotic therapy: <span className="font-bold">{animal.lockdown.drugs}</span>. Daily milk from this specimen is strictly prohibited from entering the dairy cooperative supply chain until withdrawal clearance.
                  </p>
                  <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: `${animal.lockdown.clearedPercent || 25}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vaccinations & Treatment Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vaccinations */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Syringe size={20} className="text-primary-700" />
                Verified Vaccinations
              </h3>
              <div className="space-y-3">
                {animal.vaccinations.map((v, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{v.name}</p>
                      <p className="text-xs text-gray-500 font-medium">Batch: {v.batch} • Given by {v.clinician}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescribed Treatments */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Pill size={20} className="text-primary-700" />
                Prescribed Medical Treatments
              </h3>
              <div className="space-y-3">
                {animal.treatments.map((t, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500 font-medium">Schedule: {t.scheduled}</p>
                    </div>
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
