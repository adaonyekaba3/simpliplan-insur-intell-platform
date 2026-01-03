export interface HealthPlan {
  id: string;
  name: string;
  type: 'HMO' | 'PPO' | 'EPO' | 'HDHP';
  premium: {
    monthly: number;
    annual: number;
  };
  deductible: {
    individual: number;
    family: number;
  };
  oopMax: {
    individual: number;
    family: number;
  };
  coinsurance: number;
  copays: {
    pcp: number;
    specialist: number;
    er: number;
    urgentCare: number;
  };
  rxTiers: {
    generic: number;
    preferred: number;
    nonPreferred: number;
    specialty: number;
  };
  hsaEligible: boolean;
  highlights: string[];
}

export interface UserInput {
  coverageType: 'individual' | 'couple' | 'family';
  expectedVisits: 'low' | 'medium' | 'high';
  prescriptionTier: 'none' | 'generic' | 'brand' | 'specialty';
  plannedProcedures: 'none' | 'minor' | 'major' | 'baby';
  riskTolerance: 'predictable' | 'risktaker';
  hsaInterest: 'yes' | 'no' | 'unsure';
}

export interface Recommendation {
  planId: string;
  confidenceScore: number;
  estimatedAnnualCost: number;
  reasons: string[];
  ranking: number;
}
