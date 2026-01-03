import { HealthPlan } from './types';

export const healthPlans: HealthPlan[] = [
  {
    id: "bronze-hdhp",
    name: "Basic Bronze HDHP",
    type: "HDHP",
    premium: { monthly: 180, annual: 2160 },
    deductible: { individual: 3000, family: 6000 },
    oopMax: { individual: 7000, family: 14000 },
    coinsurance: 20,
    copays: { pcp: 0, specialist: 0, er: 0, urgentCare: 0 }, // Deductible first
    rxTiers: { generic: 10, preferred: 35, nonPreferred: 70, specialty: 150 },
    hsaEligible: true,
    highlights: ["Lowest premium", "HSA eligible", "Good for healthy individuals"]
  },
  {
    id: "silver-ppo",
    name: "Silver Select PPO",
    type: "PPO",
    premium: { monthly: 350, annual: 4200 },
    deductible: { individual: 1500, family: 3000 },
    oopMax: { individual: 5000, family: 10000 },
    coinsurance: 20,
    copays: { pcp: 25, specialist: 50, er: 250, urgentCare: 75 },
    rxTiers: { generic: 10, preferred: 40, nonPreferred: 80, specialty: 200 },
    hsaEligible: false,
    highlights: ["Broad network", "Balance of cost & coverage", "No referrals needed"]
  },
  {
    id: "gold-hmo",
    name: "Gold Plus HMO",
    type: "HMO",
    premium: { monthly: 450, annual: 5400 },
    deductible: { individual: 500, family: 1000 },
    oopMax: { individual: 3500, family: 7000 },
    coinsurance: 10,
    copays: { pcp: 15, specialist: 30, er: 150, urgentCare: 50 },
    rxTiers: { generic: 5, preferred: 25, nonPreferred: 50, specialty: 100 },
    hsaEligible: false,
    highlights: ["Low copays", "Predictable costs", "Great for families"]
  },
  {
    id: "platinum-ppo",
    name: "Platinum Premier PPO",
    type: "PPO",
    premium: { monthly: 600, annual: 7200 },
    deductible: { individual: 0, family: 0 },
    oopMax: { individual: 2000, family: 4000 },
    coinsurance: 10,
    copays: { pcp: 10, specialist: 20, er: 100, urgentCare: 25 },
    rxTiers: { generic: 5, preferred: 15, nonPreferred: 35, specialty: 75 },
    hsaEligible: false,
    highlights: ["No deductible", "Lowest out-of-pocket", "Premium coverage"]
  }
];
