// Core data types for PashuRakshak system

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'active' | 'resolved' | 'pending' | 'escalated';
export type Species = 'cattle' | 'buffalo' | 'goat' | 'sheep' | 'pig' | 'poultry' | 'horse' | 'other';
export type UserRole = 'farmer' | 'vet' | 'paravet' | 'admin';

export interface Location {
  village: string;
  block: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  title: string;
  disease: string;
  location: Location;
  severity: Severity;
  status: Status;
  affectedAnimals: number;
  deaths: number;
  reportedBy: string;
  reportedAt: string;
  symptoms: string[];
  species: Species;
}

export interface Animal {
  id: string;
  tagId: string;
  species: Species;
  breed: string;
  age: number;
  owner: string;
  location: Location;
  vaccinations: Vaccination[];
  healthRecords: HealthRecord[];
}

export interface Vaccination {
  id: string;
  disease: string;
  date: string;
  nextDue: string;
  administeredBy: string;
  batchNo: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  followUpDate?: string;
}

export interface DiseaseStats {
  name: string;
  cases: number;
  month: string;
}

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  severity: Severity;
  disease: string;
  location: string;
  cases: number;
}

export interface Advisory {
  id: string;
  title: string;
  titleHi: string;
  body: string;
  bodyHi: string;
  severity: Severity;
  publishedAt: string;
  targetSpecies: Species[];
  district: string;
}
