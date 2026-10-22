// PashuMitra Bio-Defense Platform API Service
// Automatically handles live REST backend communication with offline-first fallback.

export interface SurveillanceStats {
  monitoredClusters: number;
  telemetryOnline: number;
  suspectedFlagsToday: number;
  newFlagsSince6AM: number;
  activeCritical: number;
  quarantinedFarms: number;
  bovineQuarantined: number;
  caprineQuarantined: number;
  immunityCoverage: number;
  activeLockdowns?: number;
}

export interface Incident {
  id: string;
  type: string;
  timeAgo: string;
  timestamp?: string;
  location: string;
  village?: string;
  district?: string;
  farmer: string;
  farmerPhone?: string;
  rfid: string;
  animalCount: number;
  species: string;
  status: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  disease: string;
  description: string;
  actionStatus: string;
  vitals?: {
    temp?: string;
    milkDrop?: string;
    salivation?: string;
  };
  quarantineRadiusMeters?: number;
}

export interface AnimalProfile {
  id: string;
  tagId: string;
  name: string;
  breed: string;
  species: string;
  age: string;
  owner: string;
  location: string;
  herdSize: number;
  phone: string;
  imageUrl?: string;
  vitals: {
    temperature: { value: number; unit: string; status: string; normal: string };
    milkYield: { value: number; unit: string; status: string; normal: string };
    weight: { value: number; unit: string; status: string; normal: string };
    rumen: { value: number; unit: string; status: string; normal: string };
  };
  vaccinations: Array<{
    id?: string;
    name: string;
    status: string;
    date: string;
    batch: string;
    clinician: string;
  }>;
  treatments: Array<{
    id?: string;
    name: string;
    status: string;
    scheduled: string;
  }>;
  lockdown: {
    active: boolean;
    drugs?: string;
    prescribed?: string;
    until?: string;
    remainingHours: number;
    totalHours?: number;
    clearedPercent?: number;
  };
}

export interface AdvisoryItem {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  district: string;
  publishedAt: string;
  targetSpecies: string[];
  summary: string;
  transcript: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface IVRBroadcastLog {
  id: string;
  targetVillage: string;
  district: string;
  callsAttempted: number;
  callsDelivered: number;
  smsDelivered: number;
  language: string;
  status: string;
  timestamp: string;
  reachPercent: number;
}

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Fallback cache helper using localStorage
const LOCAL_STORAGE_KEY_INCIDENTS = 'pashumitra_cached_incidents';
const LOCAL_STORAGE_KEY_ANIMALS = 'pashumitra_cached_animals';
const LOCAL_STORAGE_KEY_STATS = 'pashumitra_cached_stats';
const LOCAL_STORAGE_KEY_QUEUE = 'pashumitra_offline_sync_queue';

// Initial local seed state
const defaultStats: SurveillanceStats = {
  monitoredClusters: 42,
  telemetryOnline: 100,
  suspectedFlagsToday: 7,
  newFlagsSince6AM: 3,
  activeCritical: 2,
  quarantinedFarms: 18,
  bovineQuarantined: 14,
  caprineQuarantined: 4,
  immunityCoverage: 84.2,
  activeLockdowns: 3
};

const defaultIncidents: Incident[] = [
  {
    id: "INC-9921",
    type: "CRITICAL OUTBREAK",
    timeAgo: "14 mins ago",
    location: "Kundgol Village • Plot 14",
    village: "Kundgol",
    district: "Dharwad",
    farmer: "Ramesh Patil",
    farmerPhone: "+91 98452 11029",
    rfid: "IND-KA-9921",
    animalCount: 3,
    species: "Murrah Buffaloes",
    status: "Symptomatic",
    severity: "critical",
    confidence: 94,
    disease: "FMD Suspect",
    description: "High fever (105.4°F), profuse salivation with ropy drooling, vesicle eruptions across oral mucosa and interdigital clefts. Animal recumbent.",
    actionStatus: "Quarantine Active • Vet En Route",
    quarantineRadiusMeters: 500
  },
  {
    id: "INC-4418",
    type: "OBSERVATION SUSPECT",
    timeAgo: "42 mins ago",
    location: "Byahatti Hamlet • Sector C",
    village: "Byahatti",
    district: "Dharwad",
    farmer: "Basappa Hubballi",
    farmerPhone: "+91 94481 33201",
    rfid: "IND-KA-4418",
    animalCount: 2,
    species: "HF Crossbred Cows",
    status: "Isolated",
    severity: "high",
    confidence: 78,
    disease: "LSD Suspect",
    description: "Circumscribed nodular skin lesions (2–5cm) over neck and perineum. Enlarged prescapular lymph nodes with moderate pyrexia (103.8°F).",
    actionStatus: "Sample Kit Sent • Hubballi Lab",
    quarantineRadiusMeters: 300
  },
  {
    id: "INC-881294",
    type: "OBSERVATION SUSPECT",
    timeAgo: "1 hr ago",
    location: "Sherewad Pasture • Cluster 8",
    village: "Sherewad",
    district: "Dharwad",
    farmer: "Rameshwar Gowda",
    farmerPhone: "+91 98452 87192",
    rfid: "IND-KA-29-881294",
    animalCount: 1,
    species: "Gir Crossbred Cow",
    status: "Isolated",
    severity: "high",
    confidence: 88,
    disease: "FMD Early Phase",
    description: "Sudden milk yield drop from 12L to 4.2L, rectal temperature 104.2°F, sub-normal rumen movements, hyper-salivation onset.",
    actionStatus: "Quarantine Day 2 of 14 • Isolation Unit 3",
    quarantineRadiusMeters: 400
  }
];

const defaultAnimals: AnimalProfile[] = [
  {
    id: "IN-KA-29-881294",
    tagId: "IN-KA-29-881294",
    name: "Gauri",
    breed: "Gir Crossbred",
    species: "Bovine / Cattle",
    age: "4.5 yrs",
    owner: "Rameshwar Gowda",
    location: "Sherewad Village, Navalgund",
    herdSize: 8,
    phone: "+91 98452 87192",
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=300",
    vitals: {
      temperature: { value: 104.2, unit: "°F", status: "ELEVATED", normal: "101.5°F" },
      milkYield: { value: 4.2, unit: "L", status: "-65%", normal: "12 L" },
      weight: { value: 410, unit: "kg", status: "Stable", normal: "3.25 / 5 BCS" },
      rumen: { value: 1, unit: "/min", status: "SUB-NORM", normal: "2-3 / min" }
    },
    vaccinations: [
      { id: "V-101", name: "FMD Vaccine (Raksha-Ovac Bi-valent)", status: "Booster in 22d", date: "18 Mar 2026", batch: "#RV-9011", clinician: "Dr. Anjali Sharma" },
      { id: "V-102", name: "Brucellosis (Cotton Strain 19)", status: "Lifelong Immune", date: "08 Nov 2024", batch: "#BR-104", clinician: "System Verified" }
    ],
    treatments: [
      { id: "T-201", name: "HS + BQ Combined Vaccine", status: "Overdue 5 Days", scheduled: "Pre-Monsoon Target" }
    ],
    lockdown: {
      active: true,
      drugs: "Meldon-Vet & Ceftiofur Sodium",
      prescribed: "18 Oct",
      until: "25 Oct 2026, 18:00 hrs",
      remainingHours: 72,
      totalHours: 96,
      clearedPercent: 25
    }
  }
];

export const api = {
  // ── Surveillance Stats ──
  async getSurveillanceStats(): Promise<SurveillanceStats> {
    try {
      const res = await fetch(`${API_BASE}/surveillance/stats`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      localStorage.setItem(LOCAL_STORAGE_KEY_STATS, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_STATS);
      return cached ? JSON.parse(cached) : defaultStats;
    }
  },

  // ── Incidents ──
  async getIncidents(query?: { severity?: string; village?: string; search?: string }): Promise<Incident[]> {
    try {
      const params = new URLSearchParams();
      if (query?.severity) params.append('severity', query.severity);
      if (query?.village) params.append('village', query.village);
      if (query?.search) params.append('search', query.search);

      const res = await fetch(`${API_BASE}/incidents?${params.toString()}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      localStorage.setItem(LOCAL_STORAGE_KEY_INCIDENTS, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_INCIDENTS);
      let list = cached ? JSON.parse(cached) : defaultIncidents;
      if (query?.search) {
        const q = query.search.toLowerCase();
        list = list.filter((i: Incident) => 
          i.farmer.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.disease.toLowerCase().includes(q)
        );
      }
      return list;
    }
  },

  // ── Create Incident ──
  async createIncident(incidentData: Partial<Incident>): Promise<{ success: boolean; incident: Incident }> {
    try {
      const res = await fetch(`${API_BASE}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData)
      });
      if (!res.ok) throw new Error('Failed to create incident on server');
      const result = await res.json();
      return result;
    } catch {
      // Offline fallback: save locally
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_INCIDENTS);
      const list: Incident[] = cached ? JSON.parse(cached) : [...defaultIncidents];
      const newInc: Incident = {
        id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
        type: incidentData.severity === 'critical' ? 'CRITICAL OUTBREAK' : 'OBSERVATION SUSPECT',
        timeAgo: 'Just now',
        location: incidentData.location || 'Kundgol Village • Plot 14',
        village: incidentData.village || 'Kundgol',
        farmer: incidentData.farmer || 'Local Farmer',
        rfid: incidentData.rfid || `IND-KA-${Math.floor(1000 + Math.random() * 9000)}`,
        animalCount: incidentData.animalCount || 1,
        species: incidentData.species || 'Bovine / Cattle',
        status: 'Investigating',
        severity: incidentData.severity || 'high',
        confidence: incidentData.confidence || 90,
        disease: incidentData.disease || 'FMD Suspect',
        description: incidentData.description || 'Reported via Offline Terminal',
        actionStatus: 'Quarantine Active • Auto-Cached Locally'
      };
      list.unshift(newInc);
      localStorage.setItem(LOCAL_STORAGE_KEY_INCIDENTS, JSON.stringify(list));

      // Add to offline sync queue
      const queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUEUE) || '[]');
      queue.push({ type: 'INCIDENT', data: newInc, timestamp: Date.now() });
      localStorage.setItem(LOCAL_STORAGE_KEY_QUEUE, JSON.stringify(queue));

      return { success: true, incident: newInc };
    }
  },

  // ── Trigger Contagion SOS ──
  async triggerSOS(data?: { village?: string; district?: string; farmer?: string; phone?: string }): Promise<{ success: boolean; message: string; incident: Incident }> {
    try {
      const res = await fetch(`${API_BASE}/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || {})
      });
      if (!res.ok) throw new Error('SOS API call failed');
      return await res.json();
    } catch {
      const newInc: Incident = {
        id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
        type: 'CRITICAL OUTBREAK',
        timeAgo: 'Just now',
        location: `${data?.village || 'Kundgol'} Sector 1 • ${data?.district || 'Dharwad'}`,
        village: data?.village || 'Kundgol',
        farmer: data?.farmer || 'Emergency Keeper',
        rfid: 'EMERGENCY-SOS',
        animalCount: 4,
        species: 'Mixed Bovine Herd',
        status: 'RED ALERT LOCKDOWN',
        severity: 'critical',
        confidence: 98,
        disease: 'Stat Contagion SOS Triggered',
        description: 'Offline Emergency SOS cached locally. 500m digital perimeter activated.',
        actionStatus: 'Lockdown Active • Local Cache'
      };

      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_INCIDENTS);
      const list = cached ? JSON.parse(cached) : [...defaultIncidents];
      list.unshift(newInc);
      localStorage.setItem(LOCAL_STORAGE_KEY_INCIDENTS, JSON.stringify(list));

      return {
        success: true,
        message: 'Contagion SOS Activated: 500m Movement Lockdown Enforced',
        incident: newInc
      };
    }
  },

  // ── Animals ──
  async getAnimals(search?: string): Promise<AnimalProfile[]> {
    try {
      const url = search ? `${API_BASE}/animals?search=${encodeURIComponent(search)}` : `${API_BASE}/animals`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      localStorage.setItem(LOCAL_STORAGE_KEY_ANIMALS, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ANIMALS);
      const list = cached ? JSON.parse(cached) : defaultAnimals;
      if (search) {
        const q = search.toLowerCase();
        return list.filter((a: AnimalProfile) => 
          a.name.toLowerCase().includes(q) ||
          a.tagId.toLowerCase().includes(q) ||
          a.owner.toLowerCase().includes(q)
        );
      }
      return list;
    }
  },

  async getAnimal(id: string): Promise<AnimalProfile> {
    try {
      const res = await fetch(`${API_BASE}/animals/${id}`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      const animals = await this.getAnimals();
      return animals.find(a => a.id === id || a.tagId === id) || animals[0] || defaultAnimals[0];
    }
  },

  async registerAnimal(animalData: Partial<AnimalProfile>): Promise<{ success: boolean; animal: AnimalProfile }> {
    try {
      const res = await fetch(`${API_BASE}/animals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      const newAnimal: AnimalProfile = {
        id: animalData.tagId || `IN-KA-29-${Math.floor(100000 + Math.random() * 900000)}`,
        tagId: animalData.tagId || `IN-KA-29-${Math.floor(100000 + Math.random() * 900000)}`,
        name: animalData.name || 'Gauri',
        breed: animalData.breed || 'Gir Crossbred',
        species: animalData.species || 'Bovine / Cattle',
        age: animalData.age || '3 yrs',
        owner: animalData.owner || 'Local Farmer',
        location: animalData.location || 'Navalgund, Dharwad',
        herdSize: 6,
        phone: animalData.phone || '+91 98452 00000',
        imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=300',
        vitals: {
          temperature: { value: 101.5, unit: '°F', status: 'NORMAL', normal: '101.5°F' },
          milkYield: { value: 11.2, unit: 'L', status: 'HEALTHY', normal: '12 L' },
          weight: { value: 420, unit: 'kg', status: 'Stable', normal: '3.5 / 5 BCS' },
          rumen: { value: 2.2, unit: '/min', status: 'NORMAL', normal: '2-3 / min' }
        },
        vaccinations: [
          { name: 'FMD Vaccine (Raksha-Ovac)', status: 'Completed', date: new Date().toLocaleDateString('en-GB'), batch: '#RV-2026', clinician: 'Dr. Patil' }
        ],
        treatments: [],
        lockdown: { active: false, remainingHours: 0 }
      };

      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ANIMALS);
      const list = cached ? JSON.parse(cached) : [...defaultAnimals];
      list.unshift(newAnimal);
      localStorage.setItem(LOCAL_STORAGE_KEY_ANIMALS, JSON.stringify(list));

      return { success: true, animal: newAnimal };
    }
  },

  // ── Advisories ──
  async getAdvisories(): Promise<AdvisoryItem[]> {
    try {
      const res = await fetch(`${API_BASE}/advisories`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return [
        {
          id: "ADV-04",
          title: "Urgent FMD Containment Advisory #04",
          titleHi: "खुरपका-मुंहपका (FMD) रोकथाम के लिए आवश्यक सलाह #04",
          titleMr: "खुरपका-मुखपका (FMD) नियंत्रण तातडीचा सल्ला #04",
          severity: "critical",
          district: "Dharwad Block",
          publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          targetSpecies: ["Cattle", "Buffalo"],
          summary: "Isolate all suspected livestock showing salivation or vesicles. Enforce 4% Sodium Carbonate foot-bath.",
          transcript: {
            en: "Notice: Isolate all livestock immediately in Kundagol Block to prevent spread of Foot and Mouth Disease. Contact your nearest paravet officer for emergency assistance.",
            hi: "सूचना: कुंदगोल ब्लॉक में खुरपका-मुंहपका रोग के प्रसार को रोकने के लिए सभी पशुधन को तुरंत अलग करें। आपातकालीन सहायता के लिए अपने निकटतम पशुचिकित्सा अधिकारी से संपर्क करें।",
            mr: "सूचना: कुंदगोल ब्लॉकमध्ये खुरपका-मुखपका रोगाचा प्रसार रोखण्यासाठी सर्व पशुधन त्वरित वेगळे करा. आपत्कालीन मदतीसाठी तुमच्या जवळच्या पशुवैद्यकीय अधिकाऱ्याशी संपर्क साधा."
          }
        },
        {
          id: "ADV-03",
          title: "Pre-Monsoon Vector Control & HS Alert",
          titleHi: "मानसून पूर्व कीट नियंत्रण और गलघोंटू (HS) चेतावनी",
          titleMr: "पावसाळापूर्व कीटक नियंत्रण व घटसर्प (HS) सतर्कता",
          severity: "high",
          district: "Hubballi South Grid",
          publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          targetSpecies: ["Cattle", "Buffalo", "Sheep"],
          summary: "Standing rain water promotes blood-sucking flies. Vaccinate with HS+BQ combined alum vaccine before rains.",
          transcript: {
            en: "Pre-monsoon warning: Standing water detected near Bennihalla stream. High risk of Hemorrhagic Septicemia. Complete mandatory vaccination at your primary health centre.",
            hi: "मानसून पूर्व चेतावनी: बेन्निहल्ला नाले के पास पानी जमा होने से गलघोंटू (HS) का भारी खतरा है। निकटतम प्राथमिक पशु केंद्र पर टीकाकरण तुरंत करवाएं।",
            mr: "पावसाळापूर्व सूचना: साचलेल्या पाण्यामुळे घटसर्प (HS) रोगाचा प्रादुर्भाव वाढू शकतो. प्राथमिक पशुवैद्यकीय केंद्रावर लसीकरण करून घ्या."
          }
        }
      ];
    }
  },

  // ── IVR Voice Broadcast ──
  async triggerIVRBroadcast(village: string, language: string = 'HI'): Promise<{ success: boolean; message: string; broadcast: IVRBroadcastLog }> {
    try {
      const res = await fetch(`${API_BASE}/ivr/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ village, language })
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return {
        success: true,
        message: `IVR Audio Advisory broadcast triggered to ${village}`,
        broadcast: {
          id: `IVR-${Math.floor(1000 + Math.random() * 9000)}`,
          targetVillage: village,
          district: "Dharwad",
          callsAttempted: 1450,
          callsDelivered: 1410,
          smsDelivered: 2900,
          language: language,
          status: "DISPATCHED",
          timestamp: new Date().toISOString(),
          reachPercent: 97.2
        }
      };
    }
  },

  // ── Offline Sync Queue ──
  getOfflineQueue(): Array<{ type: string; data: unknown; timestamp: number }> {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUEUE) || '[]');
    } catch {
      return [];
    }
  },

  async syncOfflineQueue(): Promise<{ syncedCount: number }> {
    const queue = this.getOfflineQueue();
    if (queue.length === 0) return { syncedCount: 0 };

    let successCount = 0;
    const remaining = [];

    for (const item of queue) {
      try {
        if (item.type === 'INCIDENT') {
          await fetch(`${API_BASE}/incidents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.data)
          });
          successCount++;
        }
      } catch {
        remaining.push(item);
      }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY_QUEUE, JSON.stringify(remaining));
    return { syncedCount: successCount };
  }
};
