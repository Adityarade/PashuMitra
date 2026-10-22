const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database with Seed Data
const db = {
  surveillanceStats: {
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
  },
  
  incidents: [
    {
      id: "INC-9921",
      type: "CRITICAL OUTBREAK",
      timeAgo: "14 mins ago",
      timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
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
      vitals: { temp: "105.4°F", milkDrop: "-75%", salivation: "Profuse" },
      quarantineRadiusMeters: 500
    },
    {
      id: "INC-4418",
      type: "OBSERVATION SUSPECT",
      timeAgo: "42 mins ago",
      timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
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
      vitals: { temp: "103.8°F", milkDrop: "-40%", salivation: "Mild" },
      quarantineRadiusMeters: 300
    },
    {
      id: "INC-881294",
      type: "OBSERVATION SUSPECT",
      timeAgo: "1 hr ago",
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
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
      vitals: { temp: "104.2°F", milkDrop: "-65%", salivation: "Moderate" },
      quarantineRadiusMeters: 400
    }
  ],

  animals: [
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
    },
    {
      id: "IN-KA-9921",
      tagId: "IND-KA-9921",
      name: "Kaali",
      breed: "Murrah Buffalo",
      species: "Buffalo",
      age: "5 yrs",
      owner: "Ramesh Patil",
      location: "Kundgol Village, Plot 14",
      herdSize: 5,
      phone: "+91 98452 11029",
      imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=300",
      vitals: {
        temperature: { value: 105.4, unit: "°F", status: "CRITICAL", normal: "101.0°F" },
        milkYield: { value: 1.5, unit: "L", status: "-80%", normal: "9 L" },
        weight: { value: 520, unit: "kg", status: "Recumbent", normal: "3.5 / 5 BCS" },
        rumen: { value: 0.5, unit: "/min", status: "STASIS", normal: "2-3 / min" }
      },
      vaccinations: [
        { id: "V-201", name: "FMD Vaccine (Raksha-Ovac)", status: "Expired", date: "10 Jan 2025", batch: "#RV-7712", clinician: "Dr. Patil" }
      ],
      treatments: [
        { id: "T-301", name: "Intravenous Antiseptic & Fluid Therapy", status: "Active Course", scheduled: "Daily" }
      ],
      lockdown: {
        active: true,
        drugs: "Flunixin Meglumine & Oxytetracycline",
        prescribed: "20 Oct",
        until: "27 Oct 2026",
        remainingHours: 120,
        totalHours: 144,
        clearedPercent: 16
      }
    },
    {
      id: "IN-KA-4418",
      tagId: "IND-KA-4418",
      name: "Sundari",
      breed: "HF Crossbred Cow",
      species: "Bovine / Cattle",
      age: "3 yrs",
      owner: "Basappa Hubballi",
      location: "Byahatti Hamlet, Sector C",
      herdSize: 4,
      phone: "+91 94481 33201",
      imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=300",
      vitals: {
        temperature: { value: 103.8, unit: "°F", status: "ELEVATED", normal: "101.5°F" },
        milkYield: { value: 6.0, unit: "L", status: "-40%", normal: "10 L" },
        weight: { value: 390, unit: "kg", status: "Nodular Lesions", normal: "3.0 / 5 BCS" },
        rumen: { value: 1.5, unit: "/min", status: "MILD-SUB", normal: "2-3 / min" }
      },
      vaccinations: [
        { id: "V-301", name: "Goat Pox Vaccine (Heterologous for LSD)", status: "Completed", date: "02 Feb 2026", batch: "#GP-440", clinician: "Dr. Kulkarni" }
      ],
      treatments: [
        { id: "T-401", name: "Methylene Blue topical dressing", status: "Twice daily", scheduled: "10 Days" }
      ],
      lockdown: {
        active: true,
        drugs: "Ivermectin & Enrofloxacin",
        prescribed: "19 Oct",
        until: "29 Oct 2026",
        remainingHours: 180,
        totalHours: 240,
        clearedPercent: 25
      }
    }
  ],

  advisories: [
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
  ],

  ivrBroadcasts: [
    {
      id: "IVR-881",
      targetVillage: "Kundgol Sector 4",
      district: "Dharwad",
      callsAttempted: 2410,
      callsDelivered: 2314,
      smsDelivered: 5120,
      language: "EN, HI, MR",
      status: "COMPLETED",
      timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      reachPercent: 96
    }
  ]
};

// ── ENDPOINTS ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'PashuMitra Bio-Defense Platform',
    version: '2.0.0',
    mode: 'PRODUCTION_READY',
    timestamp: new Date().toISOString()
  });
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { phone, password, farmerId, authType } = req.body;

  // 1. Farmer ID Login
  if (authType === 'farmerid' || farmerId) {
    const id = farmerId || 'INAPH-KA-2026-9041';
    return res.json({
      token: 'jwt-pashumitra-' + Date.now(),
      user: {
        id: 'FARMER-01',
        name: 'Rameshwar Gowda',
        farmerId: id,
        role: 'Farmer',
        phone: phone || '+91 98452 87192',
        district: 'Dharwad',
        herdCount: 8
      }
    });
  }

  // 2. Google Login
  if (authType === 'google') {
    return res.json({
      token: 'jwt-google-auth-' + Date.now(),
      user: {
        id: 'GOOGLE-USER-01',
        name: 'Authorized Field User',
        role: req.body.role || 'Farmer',
        district: 'Dharwad'
      }
    });
  }

  // 3. Password Login
  if (phone) {
    let role = 'Farmer';
    let name = 'Rameshwar Gowda';
    if (phone.includes('999') || phone.includes('admin')) {
      role = 'District Admin';
      name = 'Dr. Sharma (District Officer)';
    } else if (phone.includes('vet') || phone.includes('87192')) {
      role = 'Field Vet';
      name = 'Dr. Patil (Field Vet)';
    }

    return res.json({
      token: 'jwt-token-' + Date.now(),
      user: { id: 1, phone, name, role, district: 'Dharwad' }
    });
  }

  return res.status(400).json({ error: 'Missing phone or credentials' });
});

// Surveillance stats
app.get('/api/surveillance/stats', (req, res) => {
  res.json(db.surveillanceStats);
});

// Incidents list
app.get('/api/incidents', (req, res) => {
  const { severity, village, search } = req.query;
  let results = [...db.incidents];

  if (severity) {
    results = results.filter(i => i.severity === severity.toLowerCase());
  }
  if (village) {
    results = results.filter(i => i.village && i.village.toLowerCase().includes(village.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(i => 
      i.farmer.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.disease.toLowerCase().includes(q) ||
      i.rfid.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Create new Incident (From Report Disease / Triage)
app.post('/api/incidents', (req, res) => {
  const {
    farmer, farmerPhone, rfid, species, village, district,
    symptoms = [], temp, milkDrop, confidence = 90,
    disease = "FMD Suspect", description, severity = "high"
  } = req.body;

  const newId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
  const newIncident = {
    id: newId,
    type: severity === 'critical' ? "CRITICAL OUTBREAK" : "OBSERVATION SUSPECT",
    timeAgo: "Just now",
    timestamp: new Date().toISOString(),
    location: `${village || 'Kundgol Village'} • ${district || 'Dharwad'}`,
    village: village || 'Kundgol',
    district: district || 'Dharwad',
    farmer: farmer || 'Registered Keeper',
    farmerPhone: farmerPhone || '+91 98452 00000',
    rfid: rfid || `IND-KA-${Math.floor(1000 + Math.random() * 9000)}`,
    animalCount: 1,
    species: species || "Bovine / Cattle",
    status: "Investigating",
    severity: severity,
    confidence: Number(confidence),
    disease: disease,
    description: description || `Reported symptoms: ${symptoms.join(', ')}. Temperature: ${temp || '104.2°F'}. Milk drop: ${milkDrop || '60%'}.`,
    actionStatus: "Triage Processed • Para-Vet Dispatched",
    vitals: { temp: temp || "104.2°F", milkDrop: milkDrop || "-60%", salivation: "Detected" },
    quarantineRadiusMeters: severity === 'critical' ? 500 : 300
  };

  // Add to top of list
  db.incidents.unshift(newIncident);

  // Update stats
  db.surveillanceStats.suspectedFlagsToday += 1;
  db.surveillanceStats.newFlagsSince6AM += 1;
  if (severity === 'critical') {
    db.surveillanceStats.activeCritical += 1;
    db.surveillanceStats.quarantinedFarms += 1;
  }

  res.status(201).json({
    success: true,
    message: "Disease incident recorded & bio-defense telemetry alerted",
    incident: newIncident,
    stats: db.surveillanceStats
  });
});

// Update incident status
app.patch('/api/incidents/:id/status', (req, res) => {
  const { id } = req.params;
  const { actionStatus, status } = req.body;
  const inc = db.incidents.find(i => i.id === id);

  if (!inc) return res.status(404).json({ error: "Incident not found" });

  if (actionStatus) inc.actionStatus = actionStatus;
  if (status) inc.status = status;

  res.json({ success: true, incident: inc });
});

// Emergency SOS trigger
app.post('/api/sos', (req, res) => {
  const { village = "Kundgol", district = "Dharwad", farmer = "Local Farmer", phone } = req.body;

  const sosIncident = {
    id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
    type: "CRITICAL OUTBREAK",
    timeAgo: "Just now",
    timestamp: new Date().toISOString(),
    location: `${village} Sector 1 • ${district}`,
    village,
    district,
    farmer,
    farmerPhone: phone || "+91 99000 88776",
    rfid: `EMERGENCY-SOS`,
    animalCount: 4,
    species: "Mixed Bovine Herd",
    status: "RED ALERT LOCKDOWN",
    severity: "critical",
    confidence: 98,
    disease: "Stat Contagion SOS Triggered",
    description: "Emergency Contagion SOS triggered by keeper. Rapid viral spread suspected. Automatic containment perimeter established.",
    actionStatus: "500m Movement Lockdown Enforced • IVR Broadcast Dispatched",
    vitals: { temp: "High Pyrexia", milkDrop: "Complete Drop", salivation: "Profuse" },
    quarantineRadiusMeters: 1000
  };

  db.incidents.unshift(sosIncident);
  db.surveillanceStats.activeCritical += 1;
  db.surveillanceStats.quarantinedFarms += 1;
  db.surveillanceStats.suspectedFlagsToday += 1;

  // Also auto-dispatch an IVR broadcast
  const ivrLog = {
    id: `IVR-${Math.floor(1000 + Math.random() * 9000)}`,
    targetVillage: village,
    district: district,
    callsAttempted: 1850,
    callsDelivered: 1790,
    smsDelivered: 3900,
    language: "EN, HI, MR",
    status: "COMPLETED",
    timestamp: new Date().toISOString(),
    reachPercent: 97
  };
  db.ivrBroadcasts.unshift(ivrLog);

  res.json({
    success: true,
    message: "CONTAGION SOS ACTIVATED: Emergency units and digital quarantine perimeter initialized.",
    incident: sosIncident,
    ivr: ivrLog
  });
});

// Animals list & search
app.get('/api/animals', (req, res) => {
  const { search } = req.query;
  let results = db.animals;

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.tagId.toLowerCase().includes(q) ||
      a.owner.toLowerCase().includes(q) ||
      a.breed.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Single animal by ID or Tag
app.get('/api/animals/:id', (req, res) => {
  const id = req.params.id;
  const animal = db.animals.find(a => a.id === id || a.tagId === id) || db.animals[0];
  res.json(animal);
});

// Register new animal
app.post('/api/animals', (req, res) => {
  const { tagId, name, breed, species, age, owner, location, phone } = req.body;

  const newAnimal = {
    id: tagId || `IN-KA-29-${Math.floor(100000 + Math.random() * 900000)}`,
    tagId: tagId || `IN-KA-29-${Math.floor(100000 + Math.random() * 900000)}`,
    name: name || "Lakshmi",
    breed: breed || "Gir Crossbred",
    species: species || "Bovine / Cattle",
    age: age || "3 yrs",
    owner: owner || "Ramesh Patil",
    location: location || "Navalgund, Dharwad",
    herdSize: 6,
    phone: phone || "+91 98452 00000",
    imageUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=300",
    vitals: {
      temperature: { value: 101.5, unit: "°F", status: "NORMAL", normal: "101.5°F" },
      milkYield: { value: 11.2, unit: "L", status: "HEALTHY", normal: "12 L" },
      weight: { value: 425, unit: "kg", status: "Stable", normal: "3.5 / 5 BCS" },
      rumen: { value: 2.2, unit: "/min", status: "NORMAL", normal: "2-3 / min" }
    },
    vaccinations: [
      { id: `V-${Date.now()}`, name: "FMD Vaccine (Raksha-Ovac)", status: "Completed", date: new Date().toLocaleDateString('en-GB'), batch: "#RV-2026", clinician: "Dr. Patil" }
    ],
    treatments: [],
    lockdown: { active: false, remainingHours: 0 }
  };

  db.animals.unshift(newAnimal);
  res.status(201).json({ success: true, animal: newAnimal });
});

// Advisories
app.get('/api/advisories', (req, res) => {
  res.json(db.advisories);
});

// Trigger IVR Broadcast
app.post('/api/ivr/broadcast', (req, res) => {
  const { village = "Kundgol", language = "HI" } = req.body;
  const newBroadcast = {
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
  };
  db.ivrBroadcasts.unshift(newBroadcast);

  res.json({
    success: true,
    message: `IVR Audio Advisory broadcast triggered to ${village}`,
    broadcast: newBroadcast
  });
});

app.get('/api/ivr/broadcasts', (req, res) => {
  res.json(db.ivrBroadcasts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ PashuMitra Bio-Defense API server running on port ${PORT}`);
  console.log(`📡 Endpoints active at http://localhost:${PORT}/api/`);
});
