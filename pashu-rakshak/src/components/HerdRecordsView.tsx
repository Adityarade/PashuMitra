import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HerdRecordsView: React.FC = () => {
  const {
    animals,
    selectedAnimal,
    selectAnimalById,
    setIsLogVaccineModalOpen,
    setIsLogVetVisitModalOpen,
    setIsHealthPassModalOpen,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('IN-KA-29-881294');
  const [filterType, setFilterType] = useState<'all' | 'vaccine' | 'treatment' | 'quarantined'>('all');
  const [dossierTab, setDossierTab] = useState<'vaccinations' | 'treatments' | 'labs' | 'movement'>('vaccinations');

  const filteredAnimals = animals.filter((animal) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      animal.tagId.toLowerCase().includes(q) ||
      animal.name.toLowerCase().includes(q) ||
      animal.farmerName.toLowerCase().includes(q) ||
      animal.village.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (filterType === 'all') return true;
    if (filterType === 'vaccine') {
      return animal.vaccinations.some((v) => v.status === 'Overdue');
    }
    if (filterType === 'treatment') {
      return animal.treatments.length > 0;
    }
    if (filterType === 'quarantined') {
      return animal.isQuarantined;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto pb-24">
      {/* Offline Sync Operational Bar */}
      <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[20px] text-teal-700">wifi_tethering</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-slate-900 font-bold uppercase tracking-wider truncate">
              INAPH Core Synchronization
            </span>
            <span className="text-[12px] text-slate-500 truncate">NDDB Host Linked • Real-time Records</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-teal-50 border border-teal-200 shrink-0">
          <span className="material-symbols-outlined text-[14px] text-teal-700">verified</span>
          <span className="text-[11px] text-teal-800 font-bold">Pass Valid</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-teal-700 text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Tag ID (12-digit), Farmer Aadhaar/Phone, Village..."
            className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-[14px] pl-10 pr-10 py-3 rounded-xl outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-sm transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-transform active:scale-95 cursor-pointer ${
              filterType === 'all'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Profiles (8)
          </button>
          <button
            type="button"
            onClick={() => setFilterType('vaccine')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-transform active:scale-95 cursor-pointer ${
              filterType === 'vaccine'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            Due for Vaccination (2)
          </button>
          <button
            type="button"
            onClick={() => setFilterType('treatment')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-transform active:scale-95 cursor-pointer ${
              filterType === 'treatment'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            Under Treatment (1)
          </button>
          <button
            type="button"
            onClick={() => setFilterType('quarantined')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-transform active:scale-95 flex items-center gap-1 cursor-pointer ${
              filterType === 'quarantined'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Quarantined (1)</span>
          </button>
        </div>
      </div>

      {/* Animal Switcher Chips (if multiple match) */}
      {filteredAnimals.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredAnimals.map((anim) => (
            <button
              key={anim.id}
              type="button"
              onClick={() => {
                selectAnimalById(anim.id);
                setSearchQuery(anim.tagId);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border cursor-pointer ${
                selectedAnimal.id === anim.id
                  ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>{anim.name}</span>
              <span className="font-mono text-[10px] text-slate-500">({anim.tagId.slice(-6)})</span>
            </button>
          ))}
        </div>
      )}

      {/* Active Animal Profile Card */}
      <div className="relative w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Bio-Security Pulse Ribbon */}
        {selectedAnimal.isQuarantined && (
          <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
              </span>
              <span className="text-[11px] text-amber-900 uppercase tracking-wider font-bold">
                Quarantine Observation (Day {selectedAnimal.quarantineDay || 2} of 14)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-[11px] text-amber-900 font-semibold">
              {selectedAnimal.quarantineUnit || 'Isolation Unit #3'}
            </span>
          </div>
        )}

        <div className="p-4 flex flex-col gap-4">
          {/* Animal Header & Farmer Info */}
          <div className="flex gap-3 items-start">
            <div className="relative shrink-0">
              <img
                className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-200 shadow-sm"
                alt={selectedAnimal.name}
                src={selectedAnimal.imageUrl}
              />
              <span className="absolute -bottom-1.5 -right-1 px-1.5 py-0.5 rounded bg-slate-900 text-teal-300 text-[10px] shadow font-mono font-bold">
                RFID
              </span>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[17px] text-slate-900 font-bold truncate">
                  {selectedAnimal.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                  {selectedAnimal.breed} ({selectedAnimal.age})
                </span>
              </div>
              <div className="text-[12px] text-teal-800 tracking-wide font-mono truncate font-bold">
                {selectedAnimal.tagId}
              </div>
              <div className="flex items-center gap-1 mt-1 text-slate-600 text-[12px] truncate">
                <span className="material-symbols-outlined text-[15px] text-slate-400 shrink-0">person</span>
                <span className="truncate">
                  {selectedAnimal.farmerName} • {selectedAnimal.village} ({selectedAnimal.herdSize} Cattle)
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 text-[12px] truncate">
                <span className="material-symbols-outlined text-[15px] text-slate-400 shrink-0">call</span>
                <span className="font-medium font-mono">{selectedAnimal.contactNumber}</span>
              </div>
            </div>
          </div>

          {/* Live Clinical Vitals Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Temp */}
            <div
              className={`p-3 rounded-xl flex flex-col gap-0.5 border ${
                selectedAnimal.vitals.tempStatus === 'Elevated' || selectedAnimal.vitals.tempStatus === 'Critical'
                  ? 'bg-rose-50/70 border-rose-200/80'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold ${
                    selectedAnimal.vitals.tempStatus === 'Elevated' ? 'text-rose-900' : 'text-slate-600'
                  }`}
                >
                  Temperature
                </span>
                <span className="material-symbols-outlined text-[16px] text-rose-600">thermostat</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-bold text-rose-700 font-mono">
                  {selectedAnimal.vitals.temperature}°F
                </span>
                <span className="text-[11px] text-rose-800 font-bold uppercase">
                  {selectedAnimal.vitals.tempStatus}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">Normal: {selectedAnimal.vitals.normalTemp}°F</span>
            </div>

            {/* Milk Yield */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Daily Milk Yield</span>
                <span className="material-symbols-outlined text-[16px] text-teal-700">water_drop</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-bold text-slate-900 font-mono">
                  {selectedAnimal.vitals.milkYield} L
                </span>
                {selectedAnimal.vitals.milkChangePercent !== 0 && (
                  <span
                    className={`text-[11px] font-bold ${
                      selectedAnimal.vitals.milkChangePercent < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {selectedAnimal.vitals.milkChangePercent}%
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-500">
                Baseline: {selectedAnimal.vitals.baselineYield} L
              </span>
            </div>

            {/* Weight */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-semibold">Body Weight</span>
                <span className="material-symbols-outlined text-[16px] text-teal-700">scale</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-bold text-slate-900 font-mono">
                  {selectedAnimal.vitals.bodyWeight} kg
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">
                  {selectedAnimal.vitals.weightStatus}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">BCS Score: {selectedAnimal.vitals.bcsScore} / 5</span>
            </div>

            {/* Rumen */}
            <div
              className={`p-3 rounded-xl flex flex-col gap-0.5 border ${
                selectedAnimal.vitals.rumenStatus !== 'Normal'
                  ? 'bg-amber-50/70 border-amber-200/80'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-amber-900 font-semibold">Rumen Rhythm</span>
                <span className="material-symbols-outlined text-[16px] text-amber-700">save_as</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-bold text-amber-900 font-mono">
                  {selectedAnimal.vitals.rumenRhythm}
                </span>
                <span className="text-[11px] text-amber-800 font-bold uppercase">
                  {selectedAnimal.vitals.rumenStatus}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">Target: 2-3 / min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Drug Withdrawal Guard (Strict Safety Callout) */}
      {selectedAnimal.milkWithdrawal?.active && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] text-red-700">warning</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-red-900 tracking-wide uppercase font-bold">
                Milk Withdrawal Safety Lockdown
              </span>
              <span className="text-[11px] text-red-700">
                Active Antibiotic / NSAID Treatment Residue Guard
              </span>
            </div>
          </div>

          <div className="bg-white border border-red-200/80 rounded-lg p-3 flex flex-col gap-1 mt-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-slate-900 font-bold truncate">
                {selectedAnimal.milkWithdrawal.drugs}
              </span>
              <span className="text-[11px] text-red-700 font-mono font-semibold">
                Prescribed {selectedAnimal.milkWithdrawal.prescribedDate}
              </span>
            </div>
            <p className="text-[12px] text-red-700 font-medium">
              DO NOT SELL MILK FOR HUMAN CONSUMPTION until {selectedAnimal.milkWithdrawal.prohibitedUntil}.
            </p>
            {/* Progress Bar for Remaining Hours */}
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span className="font-medium">
                  {selectedAnimal.milkWithdrawal.hoursRemaining}h Remaining (Total {selectedAnimal.milkWithdrawal.totalHours}h)
                </span>
                <span className="text-red-700 font-bold">
                  {selectedAnimal.milkWithdrawal.clearedPercent}% Cleared
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-red-100 overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${selectedAnimal.milkWithdrawal.clearedPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traceability Navigation Tabs */}
      <div className="w-full flex flex-col gap-2.5">
        <div className="flex items-center justify-between border border-slate-200 bg-slate-100 rounded-xl p-1 shadow-xs">
          {(['vaccinations', 'treatments', 'labs', 'movement'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setDossierTab(tab)}
              className={`flex-1 py-2 rounded-lg text-[12px] text-center font-semibold transition-all cursor-pointer capitalize ${
                dossierTab === tab
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'labs' ? 'Lab Results' : tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Vaccinations View */}
        {dossierTab === 'vaccinations' && (
          <div className="flex flex-col gap-2">
            {selectedAnimal.vaccinations.length === 0 ? (
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                No vaccination records found for this specimen.
              </div>
            ) : (
              selectedAnimal.vaccinations.map((vac) => {
                const isOverdue = vac.status === 'Overdue';
                const isCurrent = vac.status === 'Current';
                return (
                  <div
                    key={vac.id}
                    className={`bg-white border rounded-xl p-3 flex flex-col gap-2 shadow-sm ${
                      isOverdue ? 'border-rose-200' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <span
                          className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                            isOverdue ? 'text-rose-600' : 'text-teal-700'
                          }`}
                        >
                          {isOverdue ? 'report_problem' : isCurrent ? 'verified_user' : 'shield'}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] text-slate-900 font-bold truncate">
                            {vac.name}
                          </span>
                          <span className="text-[12px] text-slate-500">{vac.disease}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap ${
                          isOverdue
                            ? 'bg-rose-100 border border-rose-200 text-rose-800'
                            : isCurrent
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : 'bg-teal-50 border border-teal-200 text-teal-800'
                        }`}
                      >
                        {vac.statusText}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col gap-1 text-slate-600 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span>{vac.dateOrDue}</span>
                        {vac.batchNumber && (
                          <span className="font-mono text-teal-800 font-bold">Batch {vac.batchNumber}</span>
                        )}
                      </div>
                      {vac.clinician && (
                        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                          <span className="material-symbols-outlined text-[14px] text-slate-400">badge</span>
                          <span>Clinician: {vac.clinician}</span>
                        </div>
                      )}
                      {vac.isUrgent && (
                        <button
                          type="button"
                          onClick={() => setIsLogVaccineModalOpen(true)}
                          className="text-teal-800 text-[11px] flex items-center gap-1 font-bold hover:underline self-end mt-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">syringe</span>
                          <span>Prioritize Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Treatments View */}
        {dossierTab === 'treatments' && (
          <div className="flex flex-col gap-2">
            {selectedAnimal.treatments.length === 0 ? (
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                No active treatments logged.
              </div>
            ) : (
              selectedAnimal.treatments.map((treat) => (
                <div
                  key={treat.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-slate-900 font-bold">{treat.title}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold">
                      {treat.statusBadge}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600">{treat.notes}</p>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex justify-between text-[11px] text-slate-800">
                    <span>Attending: {treat.attending}</span>
                    <span className="text-teal-800 font-mono font-bold">{treat.progress}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Lab Results View */}
        {dossierTab === 'labs' && (
          <div className="flex flex-col gap-2">
            {selectedAnimal.labResults.length === 0 ? (
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                No diagnostic laboratory assays pending for this subject.
              </div>
            ) : (
              selectedAnimal.labResults.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-slate-900 font-bold">{lab.testName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        lab.status === 'Negative'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-amber-100 border border-amber-200 text-amber-900'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600">{lab.description}</p>
                  <div className="text-slate-500 text-[11px] font-mono">{lab.sampleCode}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Movement View */}
        {dossierTab === 'movement' && (
          <div className="flex flex-col gap-2">
            {selectedAnimal.movementHistory.length === 0 ? (
              <div className="p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                Zero interstate/shandy movements recorded. Closed farm premise protocol.
              </div>
            ) : (
              selectedAnimal.movementHistory.map((mov) => (
                <div
                  key={mov.id}
                  className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-slate-900 font-bold">{mov.event}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      {mov.statusBadge}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600">{mov.description}</p>
                  <span className="text-slate-500 text-[11px] font-mono">{mov.passCode}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Veterinary Quick Actions Panel */}
      <div className="flex flex-col gap-2 pt-1 pb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsLogVaccineModalOpen(true)}
            className="flex-1 min-h-[52px] px-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl flex items-center justify-center gap-2 text-[14px] uppercase tracking-wide transition-all active:scale-95 shadow-sm font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">vaccines</span>
            <span>+ Log Vaccine</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLogVetVisitModalOpen(true)}
            className="flex-1 min-h-[52px] px-3 bg-white hover:bg-slate-50 border border-teal-800/30 text-teal-900 rounded-xl flex items-center justify-center gap-2 text-[14px] uppercase tracking-wide transition-all active:scale-95 shadow-sm font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-teal-800">clinical_notes</span>
            <span>+ Vet Visit</span>
          </button>
        </div>

        {/* Offline Health Pass Download */}
        <button
          type="button"
          onClick={() => {
            setIsHealthPassModalOpen(true);
            showToast('Health Pass Cached Locally', 'QR verifiable offline by checkposts.', 'check_circle', 'text-emerald-400');
          }}
          className="w-full min-h-[48px] px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl flex items-center justify-between text-[13px] transition-colors shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-teal-700">download_for_offline</span>
            <span className="font-semibold text-slate-800">Export Encrypted Animal Health Pass (PDF/QR)</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-slate-400">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
