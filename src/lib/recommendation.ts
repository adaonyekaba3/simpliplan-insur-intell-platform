import { HealthPlan, UserInput, Recommendation } from './types';
import { healthPlans } from './plans';

export function calculateRecommendations(userInput: UserInput): Recommendation[] {
  const recommendations = healthPlans.map(plan => {
    const estimatedCost = estimateAnnualCost(plan, userInput);
    const score = calculateScore(plan, userInput, estimatedCost);
    const reasons = generateReasons(plan, userInput, estimatedCost);

    return {
      planId: plan.id,
      confidenceScore: score,
      estimatedAnnualCost: estimatedCost,
      reasons,
      ranking: 0, // Will be set after sorting
    };
  });

  // Sort by score descending
  recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);

  // Set rankings
  recommendations.forEach((rec, index) => {
    rec.ranking = index + 1;
  });

  return recommendations;
}

function estimateAnnualCost(plan: HealthPlan, userInput: UserInput): number {
  let totalCost = plan.premium.annual;

  // Visit costs based on frequency
  const visitCosts = {
    low: { pcp: 1, specialist: 0, er: 0, urgentCare: 0 },
    medium: { pcp: 3, specialist: 2, er: 0, urgentCare: 1 },
    high: { pcp: 6, specialist: 4, er: 1, urgentCare: 2 }
  };

  const visits = visitCosts[userInput.expectedVisits];
  const deductibleApplies = plan.copays.pcp === 0; // HDHP

  if (deductibleApplies) {
    // For HDHP, user pays full cost until deductible is met
    totalCost += Math.min(plan.deductible.individual,
      visits.pcp * 150 + visits.specialist * 250 + visits.er * 1500 + visits.urgentCare * 200);
  } else {
    // For other plans, user pays copays
    totalCost += visits.pcp * plan.copays.pcp +
                 visits.specialist * plan.copays.specialist +
                 visits.er * plan.copays.er +
                 visits.urgentCare * plan.copays.urgentCare;
  }

  // Prescription costs
  const rxCosts = {
    none: 0,
    generic: plan.rxTiers.generic * 12,
    brand: plan.rxTiers.preferred * 12,
    specialty: plan.rxTiers.specialty * 12
  };
  totalCost += rxCosts[userInput.prescriptionTier];

  // Planned procedures
  const procedureCosts = {
    none: 0,
    minor: 2000,
    major: 15000,
    baby: 12000
  };

  if (userInput.plannedProcedures !== 'none') {
    const procedureCost = procedureCosts[userInput.plannedProcedures];
    const costAfterInsurance = deductibleApplies
      ? Math.min(procedureCost, plan.deductible.individual) + (procedureCost - plan.deductible.individual) * (plan.coinsurance / 100)
      : procedureCost * (plan.coinsurance / 100);

    totalCost += Math.max(0, costAfterInsurance);
  }

  // Family multiplier
  const familyMultipliers = {
    individual: 1,
    couple: 1.8,
    family: 2.5
  };
  totalCost *= familyMultipliers[userInput.coverageType];

  // Cap at out-of-pocket maximum
  const oopMax = userInput.coverageType === 'individual'
    ? plan.oopMax.individual
    : plan.oopMax.family;

  totalCost = Math.min(totalCost, plan.premium.annual + oopMax);

  return Math.round(totalCost);
}

function calculateScore(plan: HealthPlan, userInput: UserInput, estimatedCost: number): number {
  let score = 0;

  // Cost score (40% weight) - Lower cost = higher score
  const allCosts = healthPlans.map(p => estimateAnnualCost(p, userInput));
  const minCost = Math.min(...allCosts);
  const maxCost = Math.max(...allCosts);
  const costRange = maxCost - minCost;
  const costScore = costRange > 0 ? ((maxCost - estimatedCost) / costRange) * 40 : 20;
  score += costScore;

  // Coverage fit (30% weight)
  let coverageScore = 0;

  // Match prescription needs
  if (userInput.prescriptionTier === 'specialty' && plan.rxTiers.specialty < 150) {
    coverageScore += 10;
  } else if (userInput.prescriptionTier === 'brand' && plan.rxTiers.preferred < 40) {
    coverageScore += 10;
  } else if (userInput.prescriptionTier === 'generic' && plan.rxTiers.generic < 15) {
    coverageScore += 10;
  } else if (userInput.prescriptionTier === 'none') {
    coverageScore += 5;
  }

  // Match visit frequency
  if (userInput.expectedVisits === 'high' && plan.copays.pcp < 20) {
    coverageScore += 10;
  } else if (userInput.expectedVisits === 'medium' && plan.copays.pcp < 30) {
    coverageScore += 10;
  } else if (userInput.expectedVisits === 'low') {
    coverageScore += 5;
  }

  // Match planned procedures
  if (userInput.plannedProcedures !== 'none' && plan.deductible.individual < 1000) {
    coverageScore += 10;
  }

  score += coverageScore;

  // Risk alignment (20% weight)
  let riskScore = 0;
  if (userInput.riskTolerance === 'risktaker' && plan.type === 'HDHP') {
    riskScore += 20;
  } else if (userInput.riskTolerance === 'predictable' && plan.type !== 'HDHP') {
    riskScore += 20;
  } else {
    riskScore += 10;
  }
  score += riskScore;

  // HSA preference (10% weight)
  let hsaScore = 0;
  if (userInput.hsaInterest === 'yes' && plan.hsaEligible) {
    hsaScore += 10;
  } else if (userInput.hsaInterest === 'no' && !plan.hsaEligible) {
    hsaScore += 10;
  } else {
    hsaScore += 5;
  }
  score += hsaScore;

  return Math.round(score);
}

function generateReasons(plan: HealthPlan, userInput: UserInput, estimatedCost: number): string[] {
  const reasons: string[] = [];

  // Cost-based reason
  const allCosts = healthPlans.map(p => estimateAnnualCost(p, userInput));
  const minCost = Math.min(...allCosts);
  if (estimatedCost === minCost) {
    reasons.push("Lowest estimated annual cost for your needs");
  } else if (estimatedCost < minCost * 1.15) {
    reasons.push("Excellent value for your healthcare usage");
  }

  // Coverage-based reasons
  if (userInput.expectedVisits === 'high' && plan.copays.pcp < 20) {
    reasons.push("Low copays ideal for frequent doctor visits");
  }

  if (userInput.prescriptionTier === 'specialty' && plan.rxTiers.specialty < 150) {
    reasons.push("Competitive specialty medication pricing");
  }

  if (userInput.plannedProcedures !== 'none' && plan.deductible.individual < 1000) {
    reasons.push("Low deductible helps with planned procedures");
  }

  // Plan-specific reasons
  if (plan.type === 'HDHP' && userInput.hsaInterest === 'yes') {
    reasons.push("HSA-eligible for tax-advantaged savings");
  }

  if (plan.type === 'PPO' && plan.copays.pcp < 30) {
    reasons.push("Flexible PPO network with no referrals needed");
  }

  if (plan.deductible.individual === 0) {
    reasons.push("No deductible for immediate coverage");
  }

  // Add plan highlights if we don't have enough reasons
  if (reasons.length < 3) {
    reasons.push(...plan.highlights.slice(0, 3 - reasons.length));
  }

  return reasons.slice(0, 4);
}

export function getPlanById(planId: string): HealthPlan | undefined {
  return healthPlans.find(plan => plan.id === planId);
}
