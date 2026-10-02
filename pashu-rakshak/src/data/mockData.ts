import type { Alert, Animal, Advisory, MapPoint, DiseaseStats } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Suspected FMD Outbreak – Alwar Block',
    disease: 'Foot & Mouth Disease',
    location: { village: 'Rampur', block: 'Alwar', district: 'Alwar', state: 'Rajasthan', lat: 27.55, lng: 76.62 },
    severity: 'critical',
    status: 'active',
    affectedAnimals: 47,
    deaths: 3,
    reportedBy: 'Ramesh Kumar (Farmer)',
    reportedAt: '2026-09-27T06:14:00Z',
    symptoms: ['Blisters on mouth', 'Limping', 'Salivation', 'Loss of appetite'],
    species: 'cattle',
  },
  {
    id: 'ALT-002',
    title: 'PPR Alert – Bharatpur Block',
    disease: 'Peste des Petits Ruminants',
    location: { village: 'Nadbai', block: 'Bharatpur', district: 'Bharatpur', state: 'Rajasthan', lat: 27.21, lng: 77.49 },
    severity: 'high',
    status: 'active',
    affectedAnimals: 120,
    deaths: 18,
    reportedBy: 'Dr. Sunita Sharma (Vet)',
    reportedAt: '2026-09-26T14:30:00Z',
    symptoms: ['Fever', 'Nasal discharge', 'Diarrhea', 'Pneumonia signs'],
    species: 'goat',
  },
  {
    id: 'ALT-003',
    title: 'HS Cases – Dausa District',
    disease: 'Haemorrhagic Septicaemia',
    location: { village: 'Lalsot', block: 'Dausa', district: 'Dausa', state: 'Rajasthan', lat: 26.57, lng: 76.34 },
    severity: 'high',
    status: 'escalated',
    affectedAnimals: 23,
    deaths: 5,
    reportedBy: 'Para-vet Worker Ajay',
    reportedAt: '2026-09-26T09:00:00Z',
    symptoms: ['Sudden fever', 'Swelling in throat', 'Difficulty breathing'],
    species: 'buffalo',
  },
  {
    id: 'ALT-004',
    title: 'Brucellosis Screening – Jaipur',
    disease: 'Brucellosis',
    location: { village: 'Chomu', block: 'Jaipur North', district: 'Jaipur', state: 'Rajasthan', lat: 27.15, lng: 75.72 },
    severity: 'medium',
    status: 'pending',
    affectedAnimals: 8,
    deaths: 0,
    reportedBy: 'Dr. R. K. Verma',
    reportedAt: '2026-09-25T11:00:00Z',
    symptoms: ['Abortions', 'Retained placenta', 'Reduced milk'],
    species: 'cattle',
  },
  {
    id: 'ALT-005',
    title: 'Poultry Mortality – Tonk',
    disease: 'Newcastle Disease',
    location: { village: 'Deoli', block: 'Tonk', district: 'Tonk', state: 'Rajasthan', lat: 25.92, lng: 75.78 },
    severity: 'medium',
    status: 'active',
    affectedAnimals: 2500,
    deaths: 380,
    reportedBy: 'Farm Owner Vijay Patel',
    reportedAt: '2026-09-24T08:00:00Z',
    symptoms: ['Respiratory distress', 'Neurological signs', 'Green diarrhea'],
    species: 'poultry',
  },
  {
    id: 'ALT-006',
    title: 'Suspected Anthrax – Sawai Madhopur',
    disease: 'Anthrax',
    location: { village: 'Gangapur', block: 'Sawai Madhopur', district: 'Sawai Madhopur', state: 'Rajasthan', lat: 26.47, lng: 76.71 },
    severity: 'critical',
    status: 'escalated',
    affectedAnimals: 12,
    deaths: 7,
    reportedBy: 'Block Veterinary Officer',
    reportedAt: '2026-09-23T07:00:00Z',
    symptoms: ['Sudden death', 'Bloody discharge', 'No rigor mortis'],
    species: 'cattle',
  },
];

export const mockAnimals: Animal[] = [
  {
    id: 'ANM-001', tagId: 'RJ-AW-2024-001', species: 'cattle', breed: 'Gir', age: 4,
    owner: 'Ramesh Kumar', location: { village: 'Rampur', block: 'Alwar', district: 'Alwar', state: 'Rajasthan', lat: 27.55, lng: 76.62 },
    vaccinations: [
      { id: 'V1', disease: 'FMD', date: '2026-03-10', nextDue: '2026-09-10', administeredBy: 'Dr. Sharma', batchNo: 'B2024-FMD-001' },
      { id: 'V2', disease: 'HS', date: '2026-04-15', nextDue: '2027-04-15', administeredBy: 'Dr. Sharma', batchNo: 'B2024-HS-032' },
    ],
    healthRecords: [
      { id: 'H1', date: '2026-01-20', diagnosis: 'Mild respiratory infection', treatment: 'Antibiotics 5 days', veterinarian: 'Dr. Ravi' },
    ],
  },
];

export const mockAdvisories: Advisory[] = [
  {
    id: 'ADV-001',
    title: 'FMD Vaccination Drive – Alwar District',
    titleHi: 'खुरपका-मुँहपका टीकाकरण अभियान – अलवर जिला',
    body: 'An emergency FMD vaccination drive is scheduled for 29 Sep 2026 in Alwar Block. All cattle and buffalo owners must present their animals at the nearest veterinary dispensary.',
    bodyHi: 'अलवर ब्लॉक में 29 सितंबर 2026 को आपातकालीन खुरपका-मुँहपका टीकाकरण अभियान निर्धारित है। सभी गाय और भैंस मालिक अपने पशुओं को नजदीकी पशु चिकित्सालय में ले जाएँ।',
    severity: 'critical',
    publishedAt: '2026-09-27T08:00:00Z',
    targetSpecies: ['cattle', 'buffalo'],
    district: 'Alwar',
  },
  {
    id: 'ADV-002',
    title: 'PPR Control Measures – Bharatpur',
    titleHi: 'पीपीआर नियंत्रण उपाय – भरतपुर',
    body: 'Strict movement restriction of small ruminants from Bharatpur district. Infected animals must be isolated. Contact block veterinary officer immediately.',
    bodyHi: 'भरतपुर जिले से छोटे जुगाली करने वाले पशुओं की आवाजाही पर सख्त प्रतिबंध। संक्रमित पशुओं को तुरंत अलग करें। ब्लॉक पशु चिकित्सा अधिकारी से संपर्क करें।',
    severity: 'high',
    publishedAt: '2026-09-26T10:00:00Z',
    targetSpecies: ['goat', 'sheep'],
    district: 'Bharatpur',
  },
  {
    id: 'ADV-003',
    title: 'Monsoon Disease Advisory – All Districts',
    titleHi: 'मानसून रोग सलाह – सभी जिले',
    body: 'With the monsoon season, risk of FMD, HS, and BQ increases. Ensure timely vaccination. Maintain hygiene in cattle sheds. Report any unusual mortality to helpline 1962.',
    bodyHi: 'मानसून सीजन के साथ FMD, HS और BQ का खतरा बढ़ता है। समय पर टीकाकरण सुनिश्चित करें। गौशाला में स्वच्छता बनाए रखें। किसी भी असामान्य मृत्यु की सूचना हेल्पलाइन 1962 पर दें।',
    severity: 'medium',
    publishedAt: '2026-09-20T09:00:00Z',
    targetSpecies: ['cattle', 'buffalo', 'goat', 'sheep'],
    district: 'All',
  },
];

export const mockDiseaseStats: DiseaseStats[] = [
  { name: 'FMD', cases: 120, month: 'Apr' },
  { name: 'FMD', cases: 98, month: 'May' },
  { name: 'FMD', cases: 85, month: 'Jun' },
  { name: 'FMD', cases: 140, month: 'Jul' },
  { name: 'FMD', cases: 190, month: 'Aug' },
  { name: 'FMD', cases: 210, month: 'Sep' },
];

export const monthlyTrend = [
  { month: 'Apr', cases: 45, resolved: 38 },
  { month: 'May', cases: 52, resolved: 44 },
  { month: 'Jun', cases: 61, resolved: 55 },
  { month: 'Jul', cases: 87, resolved: 72 },
  { month: 'Aug', cases: 103, resolved: 88 },
  { month: 'Sep', cases: 128, resolved: 91 },
];

export const speciesDistribution = [
  { name: 'Cattle', value: 38, color: '#16a34a' },
  { name: 'Buffalo', value: 22, color: '#0ea5e9' },
  { name: 'Goat/Sheep', value: 25, color: '#f59e0b' },
  { name: 'Poultry', value: 12, color: '#8b5cf6' },
  { name: 'Others', value: 3, color: '#94a3b8' },
];

export const mapPoints: MapPoint[] = [
  { id: '1', lat: 27.55, lng: 76.62, severity: 'critical', disease: 'FMD', location: 'Alwar', cases: 47 },
  { id: '2', lat: 27.21, lng: 77.49, severity: 'high', disease: 'PPR', location: 'Bharatpur', cases: 120 },
  { id: '3', lat: 26.57, lng: 76.34, severity: 'high', disease: 'HS', location: 'Dausa', cases: 23 },
  { id: '4', lat: 27.15, lng: 75.72, severity: 'medium', disease: 'Brucellosis', location: 'Jaipur', cases: 8 },
  { id: '5', lat: 25.92, lng: 75.78, severity: 'medium', disease: 'Newcastle', location: 'Tonk', cases: 2500 },
  { id: '6', lat: 26.47, lng: 76.71, severity: 'critical', disease: 'Anthrax', location: 'Sawai Madhopur', cases: 12 },
];
