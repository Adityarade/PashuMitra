const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock Data for the updated PashuRakshak UI
const db = {
  surveillanceStats: {
    monitoredClusters: 42,
    telemetryOnline: 100,
    suspectedFlagsToday: 7,
    newFlagsSince6AM: 3,
    activeCritical: 2,
    quarantinedFarms: 18,
    bovineQuarantined: 14,
    caprineQuarantined: 4
  },
  incidents: [
    {
      id: "INC-9921",
      type: "CRITICAL OUTBREAK",
      timeAgo: "14 mins ago",
      location: "Kundgol Village • Plot 14",
      farmer: "Ramesh Patil",
      rfid: "IND-KA-9921",
      animalCount: 3,
      species: "Murrah Buffaloes",
      status: "Symptomatic",
      confidence: 94,
      disease: "FMD Suspect",
      description: "High fever (105.4°F), profuse salivation with ropy drooling, vesicle eruptions across oral mucosa and interdigital clefts. Animal recumbent.",
      actionStatus: "Quarantine Active • Vet En Route"
    },
    {
      id: "INC-4418",
      type: "OBSERVATION SUSPECT",
      timeAgo: "42 mins ago",
      location: "Byahatti Hamlet • Sector C",
      farmer: "Basappa Hubballi",
      rfid: "IND-KA-4418",
      animalCount: 2,
      species: "HF Crossbred Cows",
      status: "Isolated",
      confidence: 78,
      disease: "LSD Suspect",
      description: "Circumscribed nodular skin lesions (2–5cm) over neck and perineum. Enlarged prescapular lymph nodes with moderate pyrexia (103.8°F).",
      actionStatus: "Sample Kit Sent • Hubballi Lab"
    },
    {
      id: "INC-881294",
      type: "OBSERVATION SUSPECT",
      timeAgo: "1 hr ago",
      location: "Sherewad Pasture • Cluster 8",
      farmer: "Rameshwar Gowda",
      rfid: "IND-KA-29-881294",
      animalCount: 1,
      species: "Gir Crossbred Cow",
      status: "Isolated",
      confidence: 88,
      disease: "FMD Early Phase",
      description: "Sudden milk yield drop from 12L to 4.2L, rectal temperature 104.2°F, sub-normal rumen movements, hyper-salivation onset.",
      actionStatus: "Quarantine Day 2 of 14 • Isolation Unit 3"
    }
  ],
  animal: {
    id: "IN-KA-29-881294",
    name: "Gauri",
    breed: "Gir Cross",
    age: "4.5y",
    farmer: "Rameshwar Gowda",
    location: "Navalgund",
    herdSize: 8,
    phone: "+91 98452 87192",
    vitals: {
      temperature: { value: 104.2, unit: "°F", status: "ELEVATED", normal: "101.5°F" },
      milkYield: { value: 4.2, unit: "L", status: "-65%", normal: "12 L" },
      weight: { value: 410, unit: "kg", status: "Stable", normal: "3.25 / 5 BCS" },
      rumen: { value: 1, unit: "/min", status: "SUB-NORM", normal: "2-3 / min" }
    },
    vaccinations: [
      { name: "FMD Vaccine (Raksha-Ovac Bi-valent)", status: "Booster in 22d", date: "18 Mar 2024", batch: "#RV-9011", clinician: "Dr. Anjali Sharma" },
      { name: "Brucellosis (Cotton Strain 19)", status: "Lifelong Immune", date: "08 Nov 2020", batch: "#BR-104", clinician: "System" }
    ],
    treatments: [
      { name: "HS + BQ Combined Vaccine", status: "Overdue 5 Days", scheduled: "Pre-Monsoon Target" }
    ],
    lockdown: {
      active: true,
      drugs: "Meldon-Vet & Ceftiofur Sodium",
      prescribed: "24 Oct",
      until: "28 Oct 2024, 18:00 hrs",
      remainingHours: 72,
      totalHours: 96,
      clearedPercent: 25
    }
  }
};

// Endpoints
app.post('/api/auth/login', (req, res) => {
  const { phone, password } = req.body;
  // Dummy authentication
  if (phone === '9845287192' && password) {
    res.json({ token: 'mock-jwt-token-123', user: { id: 1, role: 'Field Vet', name: 'Dr. Patil' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/surveillance/stats', (req, res) => {
  res.json(db.surveillanceStats);
});

app.get('/api/incidents', (req, res) => {
  res.json(db.incidents);
});

app.get('/api/animals/:id', (req, res) => {
  if (req.params.id === db.animal.id || req.params.id === '881294') {
    res.json(db.animal);
  } else {
    res.status(404).json({ error: 'Animal not found' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`PashuRakshak API server running on port ${PORT}`);
});
