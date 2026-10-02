export type AppTab = 'surveillance' | 'report-triage' | 'herd-records' | 'outbreak-radar' | 'tactical-command';

export type LanguageCode = 'kn' | 'hi' | 'en';

export interface DisplaySettings {
  language: LanguageCode;
  textScale: 100 | 115 | 130;
  sunGlareBoost: boolean;
}

export interface IncidentCase {
  id: string;
  type: 'critical' | 'suspect' | 'cleared';
  title: string;
  location: string;
  farmer: string;
  rfid: string;
  symptomsCountSummary: string;
  suspectPercent: number;
  suspectDisease: string;
  clinicalNotes: string;
  statusBadge: string;
  timestamp: string;
  icon: string;
}

export interface AnimalProfile {
  id: string;
  name: string;
  tagId: string;
  breed: string;
  age: string;
  farmerName: string;
  village: string;
  contactNumber: string;
  herdSize: number;
  imageUrl: string;
  quarantineDay?: number;
  quarantineUnit?: string;
  isQuarantined: boolean;
  vitals: {
    temperature: number;
    tempStatus: 'Normal' | 'Elevated' | 'Critical';
    normalTemp: number;
    milkYield: number;
    milkChangePercent: number;
    baselineYield: number;
    bodyWeight: number;
    weightStatus: 'Stable' | 'Decreased';
    bcsScore: number;
    rumenRhythm: string;
    rumenStatus: 'Normal' | 'Sub-norm' | 'Atony';
  };
  milkWithdrawal?: {
    active: boolean;
    drugs: string;
    prescribedDate: string;
    prohibitedUntil: string;
    hoursRemaining: number;
    totalHours: number;
    clearedPercent: number;
  };
  vaccinations: Array<{
    id: string;
    name: string;
    disease: string;
    status: 'Overdue' | 'Current' | 'Lifelong';
    statusText: string;
    dateOrDue: string;
    batchNumber?: string;
    clinician?: string;
    isUrgent?: boolean;
  }>;
  treatments: Array<{
    id: string;
    title: string;
    statusBadge: string;
    notes: string;
    attending: string;
    progress: string;
  }>;
  labResults: Array<{
    id: string;
    testName: string;
    status: 'Positive' | 'Negative' | 'Trace Positive';
    description: string;
    sampleCode: string;
  }>;
  movementHistory: Array<{
    id: string;
    event: string;
    statusBadge: string;
    description: string;
    passCode: string;
  }>;
}

export interface TelemetryNode {
  id: string;
  code: string;
  name: string;
  subtext: string;
  uplinkType: string;
  region: 'Americas' | 'EMEA' | 'APAC' | 'Relay Shards';
  qualityPercent: number;
  signalPowerDbm: number;
  signalDesc: string;
  avgPingMs: number;
  minPingMs: number;
  peakPingMs: number;
  lossPercent: number;
  jitterMs: number;
  streamRateSec: number;
  uptimePercent: number;
  bufferPercent: number;
  bufferDesc: string;
  lastSeenSec: number;
  pingData: number[];
}

export interface IngestionPacket {
  id: string;
  timestamp: string;
  targetCluster: string;
  protocol: string;
  packetHash: string;
  latencyMs: number;
  payload: string;
  integrity: 'VERIFIED' | 'PENDING' | 'REJECTED';
}
