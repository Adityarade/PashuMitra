import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimalProfile, AppTab, DisplaySettings, IncidentCase, IngestionPacket, LanguageCode, TelemetryNode } from '../types';
import { INITIAL_ANIMALS, INITIAL_INCIDENTS, INITIAL_INGESTION_PACKETS, INITIAL_TELEMETRY_NODES } from '../data/mockData';

interface ToastData {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  colorClass?: string;
}

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  displaySettings: DisplaySettings;
  setDisplaySettings: React.Dispatch<React.SetStateAction<DisplaySettings>>;
  updateLanguage: (lang: LanguageCode) => void;
  updateTextScale: (scale: 100 | 115 | 130) => void;
  toggleSunGlare: () => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  isScannerModalOpen: boolean;
  setIsScannerModalOpen: (open: boolean) => void;
  isHealthPassModalOpen: boolean;
  setIsHealthPassModalOpen: (open: boolean) => void;
  isLogVaccineModalOpen: boolean;
  setIsLogVaccineModalOpen: (open: boolean) => void;
  isLogVetVisitModalOpen: boolean;
  setIsLogVetVisitModalOpen: (open: boolean) => void;
  isBroadcastModalOpen: boolean;
  setIsBroadcastModalOpen: (open: boolean) => void;
  isPingModalOpen: boolean;
  setIsPingModalOpen: (open: boolean) => void;
  selectedPingNode: TelemetryNode | null;
  setSelectedPingNode: (node: TelemetryNode | null) => void;
  pendingSyncCount: number;
  isSyncing: boolean;
  triggerSync: () => void;
  incidents: IncidentCase[];
  addIncident: (incident: Omit<IncidentCase, 'id' | 'timestamp'>) => void;
  animals: AnimalProfile[];
  selectedAnimal: AnimalProfile;
  selectAnimalById: (id: string) => void;
  addVaccination: (animalId: string, name: string, disease: string, batch?: string) => void;
  addTreatment: (animalId: string, title: string, notes: string, attending: string) => void;
  telemetryNodes: TelemetryNode[];
  ingestionPackets: IngestionPacket[];
  pollNodes: () => void;
  toasts: ToastData[];
  showToast: (title: string, desc: string, icon?: string, colorClass?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('surveillance');
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    language: 'kn',
    textScale: 115,
    sunGlareBoost: true,
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isHealthPassModalOpen, setIsHealthPassModalOpen] = useState(false);
  const [isLogVaccineModalOpen, setIsLogVaccineModalOpen] = useState(false);
  const [isLogVetVisitModalOpen, setIsLogVetVisitModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isPingModalOpen, setIsPingModalOpen] = useState(false);
  const [selectedPingNode, setSelectedPingNode] = useState<TelemetryNode | null>(null);

  const [pendingSyncCount, setPendingSyncCount] = useState(4);
  const [isSyncing, setIsSyncing] = useState(false);

  const [incidents, setIncidents] = useState<IncidentCase[]>(INITIAL_INCIDENTS);
  const [animals, setAnimals] = useState<AnimalProfile[]>(INITIAL_ANIMALS);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalProfile>(INITIAL_ANIMALS[0]);
  const [telemetryNodes, setTelemetryNodes] = useState<TelemetryNode[]>(INITIAL_TELEMETRY_NODES);
  const [ingestionPackets, setIngestionPackets] = useState<IngestionPacket[]>(INITIAL_INGESTION_PACKETS);

  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Apply root document font scaling based on textScale
  useEffect(() => {
    const root = document.documentElement;
    if (displaySettings.textScale === 100) {
      root.style.fontSize = '16px';
    } else if (displaySettings.textScale === 115) {
      root.style.fontSize = '17.5px';
    } else {
      root.style.fontSize = '19px';
    }
  }, [displaySettings.textScale]);

  const updateLanguage = (lang: LanguageCode) => {
    setDisplaySettings((prev) => ({ ...prev, language: lang }));
  };

  const updateTextScale = (scale: 100 | 115 | 130) => {
    setDisplaySettings((prev) => ({ ...prev, textScale: scale }));
  };

  const toggleSunGlare = () => {
    setDisplaySettings((prev) => ({ ...prev, sunGlareBoost: !prev.sunGlareBoost }));
  };

  const showToast = (title: string, desc: string, icon = 'check_circle', colorClass = 'text-emerald-400') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, desc, icon, colorClass }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
      showToast(
        'Offline Records Synced',
        '4 clinical telemetry records synchronized to Karnataka Animal Husbandry INAPH server.',
        'cloud_done',
        'text-teal-300'
      );
    }, 1400);
  };

  const addIncident = (incidentData: Omit<IncidentCase, 'id' | 'timestamp'>) => {
    const newInc: IncidentCase = {
      ...incidentData,
      id: 'inc-' + Date.now(),
      timestamp: 'Just now',
    };
    setIncidents((prev) => [newInc, ...prev]);
    setPendingSyncCount((c) => c + 1);
  };

  const selectAnimalById = (id: string) => {
    const found = animals.find((a) => a.id === id || a.tagId === id);
    if (found) setSelectedAnimal(found);
  };

  const addVaccination = (animalId: string, name: string, disease: string, batch = '#NEW-VAC-2024') => {
    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id === animalId) {
          const newVac = {
            id: 'v-' + Date.now(),
            name,
            disease,
            status: 'Current' as const,
            statusText: 'Administered Today',
            dateOrDue: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            batchNumber: batch,
            clinician: 'Attending Field Vet',
          };
          return {
            ...a,
            vaccinations: [newVac, ...a.vaccinations],
          };
        }
        return a;
      })
    );
    // update current selected animal if matches
    if (selectedAnimal.id === animalId) {
      setSelectedAnimal((curr) => ({
        ...curr,
        vaccinations: [
          {
            id: 'v-' + Date.now(),
            name,
            disease,
            status: 'Current' as const,
            statusText: 'Administered Today',
            dateOrDue: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            batchNumber: batch,
            clinician: 'Attending Field Vet',
          },
          ...curr.vaccinations,
        ],
      }));
    }
    showToast('Vaccine Dose Recorded', `${name} logged into Bharat Pashudhan registry.`, 'vaccines', 'text-teal-300');
  };

  const addTreatment = (animalId: string, title: string, notes: string, attending: string) => {
    const newTreat = {
      id: 't-' + Date.now(),
      title,
      statusBadge: 'Active Course',
      notes,
      attending,
      progress: 'Initiated',
    };
    setAnimals((prev) =>
      prev.map((a) => (a.id === animalId ? { ...a, treatments: [newTreat, ...a.treatments] } : a))
    );
    if (selectedAnimal.id === animalId) {
      setSelectedAnimal((curr) => ({ ...curr, treatments: [newTreat, ...curr.treatments] }));
    }
    showToast('Vet Visit Logged', `Clinical protocol saved for ${selectedAnimal.name}.`, 'clinical_notes', 'text-emerald-400');
  };

  const pollNodes = () => {
    // jitter the nodes ping slightly to show live dynamism
    setTelemetryNodes((prev) =>
      prev.map((n) => {
        const delta = (Math.random() - 0.5) * 2;
        const newPing = Math.max(10, Math.round((n.avgPingMs + delta) * 10) / 10);
        const lastPoints = n.pingData.slice(1);
        lastPoints.push(Math.round(newPing));
        return {
          ...n,
          avgPingMs: newPing,
          lastSeenSec: 0.2,
          pingData: lastPoints,
        };
      })
    );

    // prepend a simulated packet
    const newPacket: IngestionPacket = {
      id: 'pkt-' + Date.now(),
      timestamp: new Date().toISOString().substring(11, 23),
      targetCluster: 'AP-SOUTH-1 (Hubballi-04)',
      protocol: 'LoRaWAN-EU868',
      packetHash: '0x' + Math.random().toString(16).substring(2, 6).toUpperCase() + '...F01',
      latencyMs: Math.round(20 + Math.random() * 8),
      payload: '32 Bovine Ear-Tags (Temp/Rumen/Vitals Heartbeat)',
      integrity: 'VERIFIED',
    };
    setIngestionPackets((prev) => [newPacket, ...prev.slice(0, 7)]);
    showToast('Nodes Polled', 'Handshake confirmed across 24/24 operational clusters.', 'router', 'text-teal-300');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        displaySettings,
        setDisplaySettings,
        updateLanguage,
        updateTextScale,
        toggleSunGlare,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
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
        setSelectedPingNode,
        pendingSyncCount,
        isSyncing,
        triggerSync,
        incidents,
        addIncident,
        animals,
        selectedAnimal,
        selectAnimalById,
        addVaccination,
        addTreatment,
        telemetryNodes,
        ingestionPackets,
        pollNodes,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
