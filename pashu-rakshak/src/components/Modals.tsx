import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ModalsContainer: React.FC = () => {
  const {
    isScannerModalOpen,
    setIsScannerModalOpen,
    isHealthPassModalOpen,
    setIsHealthPassModalOpen,
    isLogVaccineModalOpen,
    setIsLogVaccineModalOpen,
    isLogVetVisitModalOpen,
    setIsLogVetVisitModalOpen,
    isBroadcastModalOpen,
    setIsBroadcastModalOpen,
    isPingModalOpen,
    setIsPingModalOpen,
    selectedPingNode,
    selectedAnimal,
    addVaccination,
    addTreatment,
    showToast,
  } = useApp();

  // Local state for forms
  const [vaccineName, setVaccineName] = useState('HS + BQ Combined Vaccine');
  const [vaccineDisease, setVaccineDisease] = useState('Hemorrhagic Septicemia & Black Quarter');
  const [vaccineBatch, setVaccineBatch] = useState('RV-9042');

  const [visitDiagnosis, setVisitDiagnosis] = useState('Post-Quarantine Follow-up & Antiseptic Wash');
  const [visitPrescription, setVisitPrescription] = useState('Potassium Permanganate 1:1000 topical rinse for oral lesions');
  const [visitVet, setVisitVet] = useState('Dr. Anjali Sharma (Lic: KA-VET-419)');

  const [broadcastTitle, setBroadcastTitle] = useState('Emergency FMD Containment Extension (Zone 4B)');
  const [broadcastDialect, setBroadcastDialect] = useState<'kn' | 'hi' | 'en'>('kn');
  const [broadcastTarget, setBroadcastTarget] = useState('Kundgol & Sherewad Perimeters (3km Radius)');

  return (
    <>
      {/* 1. SCANNER MODAL */}
      {isScannerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsScannerModalOpen(false);
          }}
        >
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-sm w-full p-5 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-400 text-[22px]">qr_code_scanner</span>
                <span className="font-bold text-sm text-slate-100">Bharat Pashudhan Scanner</span>
              </div>
              <button
                type="button"
                onClick={() => setIsScannerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Viewfinder simulation */}
            <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-4 border-2 border-teal-500/60 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-teal-400"></div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-teal-400"></div>
                </div>
                {/* Red laser scanning line */}
                <div className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-teal-400"></div>
                  <div className="w-4 h-4 border-b-2 border-r-2 border-teal-400"></div>
                </div>
              </div>

              <div className="text-center z-10 px-4">
                <span className="material-symbols-outlined text-slate-600 text-[48px] animate-bounce">nfc</span>
                <p className="text-xs text-slate-400 mt-2 font-medium">
                  Align ear-tag barcode or hold RFID tag near device antenna
                </p>
              </div>
            </div>

            {/* Simulated Tag Detection Selectors */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Simulate Nearby RFID Transponder:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { tag: 'IN-KA-29-881294', animal: 'Gauri (Gir Cross)', status: 'Quarantined' },
                  { tag: 'IN-KA-29-943011', animal: 'Nandini (HF Cross)', status: 'Healthy' },
                  { tag: 'IN-KA-29-109283', animal: 'Bhima (Murrah Bull)', status: 'Acute FMD' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => {
                      setIsScannerModalOpen(false);
                      showToast(
                        'Tag Scanned & Verified',
                        `Bharat Pashudhan RFID [${item.tag}] locked for ${item.animal}.`,
                        'verified',
                        'text-emerald-400'
                      );
                    }}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-teal-900/60 border border-slate-700 hover:border-teal-500/80 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-xs font-bold text-teal-300">{item.tag}</span>
                      <span className="text-[11px] text-slate-300">{item.animal}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-200 font-bold">
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEALTH PASS MODAL */}
      {isHealthPassModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsHealthPassModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl flex flex-col gap-4">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-teal-700 text-[20px]">verified</span>
                  <span className="text-sm font-bold text-slate-900">Encrypted Animal Health Pass</span>
                </div>
                <span className="text-[11px] text-slate-500">Govt. of Karnataka • AH&amp;VS Dept</span>
              </div>
              <button
                type="button"
                onClick={() => setIsHealthPassModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Pass Body */}
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl flex flex-col items-center gap-3 text-center">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-teal-300 shadow-sm flex items-center justify-center">
                {/* Visual SVG QR representation */}
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="#004d40">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h20 v10 h-20 z M40,30 h10 v30 h-10 z M60,40 h20 v10 h-20 z M40,80 h20 v10 h-20 z M70,70 h10 v20 h-10 z M80,60 h20 v10 h-20 z M80,80 h20 v20 h-20 z" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-teal-900">{selectedAnimal.tagId}</span>
                <span className="text-sm font-bold text-slate-900">Subject: {selectedAnimal.name} ({selectedAnimal.breed})</span>
                <span className="text-xs text-slate-600">Keeper: {selectedAnimal.farmerName} • {selectedAnimal.village}</span>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                  RESTRICTED TRANSIT • QUARANTINE PERMITTED ONLY
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsHealthPassModalOpen(false);
                  showToast(
                    'Health Pass Saved',
                    'Signed cryptographic certificate cached to device storage (1.2 MB).',
                    'download_for_offline',
                    'text-emerald-400'
                  );
                }}
                className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Download Encrypted PDF Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setIsHealthPassModalOpen(false)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. LOG VACCINE MODAL */}
      {isLogVaccineModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLogVaccineModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-700 text-[22px]">vaccines</span>
                <span className="text-sm font-bold text-slate-900">Record Vaccine Dose</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLogVaccineModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-slate-500 font-medium">Target Specimen</label>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  {selectedAnimal.name} ({selectedAnimal.tagId})
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Vaccine Formulation</label>
                <select
                  value={vaccineName}
                  onChange={(e) => {
                    setVaccineName(e.target.value);
                    if (e.target.value.includes('HS')) {
                      setVaccineDisease('Hemorrhagic Septicemia & Black Quarter');
                    } else if (e.target.value.includes('FMD')) {
                      setVaccineDisease('Foot & Mouth Disease Protection');
                    } else {
                      setVaccineDisease('Lumpy Skin Disease Protection');
                    }
                  }}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white font-medium focus:ring-1 focus:ring-teal-600 outline-none"
                >
                  <option value="HS + BQ Combined Vaccine">HS + BQ Combined Vaccine (Pre-Monsoon)</option>
                  <option value="FMD Vaccine (Raksha-Ovac Bi-valent)">FMD Vaccine (Raksha-Ovac Bi-valent)</option>
                  <option value="LSD-Prophylactic GoATPox Strain">LSD-Prophylactic Goat Pox Strain</option>
                  <option value="Anthrax Spore Vaccine">Anthrax Spore Vaccine (Livestock Tier)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Batch / Lot Number</label>
                <input
                  type="text"
                  value={vaccineBatch}
                  onChange={(e) => setVaccineBatch(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs font-mono text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                Cold-chain verification: <strong>4.2°C logged</strong> via NFC digital logger vial probe.
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  addVaccination(selectedAnimal.id, vaccineName, vaccineDisease, vaccineBatch);
                  setIsLogVaccineModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95"
              >
                <span>Save to Bharat Pashudhan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. LOG VET VISIT MODAL */}
      {isLogVetVisitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLogVetVisitModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-700 text-[22px]">clinical_notes</span>
                <span className="text-sm font-bold text-slate-900">Record Field Vet Visit</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLogVetVisitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-slate-600 font-semibold">Diagnosis / Clinical Impression</label>
                <input
                  type="text"
                  value={visitDiagnosis}
                  onChange={(e) => setVisitDiagnosis(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Prescribed Protocol / Medication</label>
                <textarea
                  rows={3}
                  value={visitPrescription}
                  onChange={(e) => setVisitPrescription(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Attending Veterinary Officer</label>
                <input
                  type="text"
                  value={visitVet}
                  onChange={(e) => setVisitVet(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  addTreatment(selectedAnimal.id, visitDiagnosis, visitPrescription, visitVet);
                  setIsLogVetVisitModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95"
              >
                <span>Commit Clinical Record</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. BROADCAST ADVISORY MODAL */}
      {isBroadcastModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBroadcastModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 text-[22px]">cell_tower</span>
                <span className="text-sm font-bold text-slate-900">Broadcast Veterinary Advisory</span>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-slate-600 font-semibold">Advisory Title</label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Target Grid / Corridor</label>
                <input
                  type="text"
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-semibold">Broadcast Language Dialect</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['kn', 'hi', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setBroadcastDialect(l)}
                      className={`py-1.5 rounded-lg text-xs font-semibold border ${
                        broadcastDialect === l
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {l === 'kn' ? 'ಕನ್ನಡ' : l === 'hi' ? 'हिन्दी' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-[11px] flex flex-col gap-1">
                <span className="font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">sensors</span>
                  Omni-channel Trigger:
                </span>
                <span>• 2,400+ Automated IVR Voice calls to registered livestock owners</span>
                <span>• 5,000+ Geo-targeted SMS alerts with IVRI disinfectant guidelines</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsBroadcastModalOpen(false);
                  showToast(
                    'Advisory Broadcast Live',
                    '2,410 IVR voice calls and 5,120 SMS pushed to Dharwad livestock keepers.',
                    'cell_tower',
                    'text-rose-400'
                  );
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Dispatch Live Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. PING TEST & TOPOLOGY MODAL */}
      {isPingModalOpen && selectedPingNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPingModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-bold text-slate-900">
                  Node Diagnostic: {selectedPingNode.code}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedPingNode.name}</h4>
                <p className="text-xs text-slate-500">{selectedPingNode.subtext}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Signal</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {selectedPingNode.signalPowerDbm} dBm
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">RTT Mean</span>
                  <span className="text-xs font-bold text-emerald-700 font-mono">
                    {selectedPingNode.avgPingMs} ms
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Packet Loss</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {selectedPingNode.lossPercent}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl flex flex-col gap-1 overflow-x-auto">
                <div className="text-slate-400"># ICMP Diagnostic Probe to {selectedPingNode.code}</div>
                <div>64 bytes from {selectedPingNode.code}: icmp_seq=1 ttl=56 time={selectedPingNode.avgPingMs} ms</div>
                <div>64 bytes from {selectedPingNode.code}: icmp_seq=2 ttl=56 time={selectedPingNode.minPingMs} ms</div>
                <div>64 bytes from {selectedPingNode.code}: icmp_seq=3 ttl=56 time={selectedPingNode.peakPingMs} ms</div>
                <div className="text-teal-300">--- {selectedPingNode.code} ping statistics ---</div>
                <div>3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = {selectedPingNode.minPingMs}/{selectedPingNode.avgPingMs}/{selectedPingNode.peakPingMs} ms</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsPingModalOpen(false);
                  showToast('Diagnostic Cleared', `Telemetry stream validated on ${selectedPingNode.name}.`, 'verified', 'text-teal-400');
                }}
                className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs"
              >
                Close Diagnostic Console
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
