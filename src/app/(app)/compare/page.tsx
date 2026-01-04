"use client";

import { healthPlans } from "@/lib/plans";
import Link from "next/link";
import { Info } from "lucide-react";
import { useState } from "react";

export default function ComparePage() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  // Helper to determine best/worst values
  const getBestWorst = (values: number[], lower_is_better: boolean = true) => {
    const best = lower_is_better ? Math.min(...values) : Math.max(...values);
    const worst = lower_is_better ? Math.max(...values) : Math.min(...values);
    return { best, worst };
  };

  const monthlyPremiums = healthPlans.map(p => p.premium.monthly);
  const annualPremiums = healthPlans.map(p => p.premium.annual);
  const indDeductibles = healthPlans.map(p => p.deductible.individual);
  const famDeductibles = healthPlans.map(p => p.deductible.family);
  const indOopMax = healthPlans.map(p => p.oopMax.individual);
  const coinsurance = healthPlans.map(p => p.coinsurance);
  const pcpCopays = healthPlans.map(p => p.copays.pcp);
  const specCopays = healthPlans.map(p => p.copays.specialist);
  const erCopays = healthPlans.map(p => p.copays.er);
  const genericRx = healthPlans.map(p => p.rxTiers.generic);

  interface ValueCellProps {
    value: number;
    values: number[];
    lowerIsBetter?: boolean;
    format?: (v: number) => string;
  }

  const ValueCell = ({ value, values, lowerIsBetter = true, format = (v: number) => `$${v}` }: ValueCellProps) => {
    const { best, worst } = getBestWorst(values, lowerIsBetter);
    const isBest = value === best;
    const isWorst = value === worst;

    return (
      <td
        className={`px-4 py-3 text-center ${
          isBest ? 'bg-green-50 text-green-700 font-semibold' :
          isWorst ? 'bg-red-50 text-red-700' :
          'bg-white'
        }`}
      >
        {format(value)}
      </td>
    );
  };

  const Tooltip = ({ text, id }: { text: string; id: string }) => (
    <div className="relative inline-block ml-2">
      <button
        onClick={() => setTooltip(tooltip === id ? null : id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <Info className="w-4 h-4" />
      </button>
      {tooltip === id && (
        <div className="absolute z-10 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-6">
          {text}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  );

  const planTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'HMO': return 'bg-blue-100 text-blue-700';
      case 'PPO': return 'bg-purple-100 text-purple-700';
      case 'HDHP': return 'bg-amber-100 text-amber-700';
      case 'EPO': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Health Plans</h1>
        <p className="text-gray-600 mb-4">See all your options side-by-side</p>
        <Link
          href="/quiz"
          className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
        >
          Take Quiz for Recommendation
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-4 text-left font-semibold text-gray-900 min-w-[200px]">
                  Feature
                </th>
                {healthPlans.map(plan => (
                  <th key={plan.id} className="px-4 py-4 text-center min-w-[160px]">
                    <div className="font-bold text-gray-900">{plan.name}</div>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${planTypeBadgeColor(plan.type)}`}>
                        {plan.type}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/* Monthly Premium */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Monthly Premium
                    <Tooltip id="monthly-premium" text="The amount you pay each month regardless of whether you use healthcare services." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.premium.monthly}
                    values={monthlyPremiums}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* Annual Premium */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Annual Premium
                    <Tooltip id="annual-premium" text="Total premium cost for the year (Monthly Premium × 12)." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.premium.annual}
                    values={annualPremiums}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* Individual Deductible */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Deductible (Individual)
                    <Tooltip id="ind-deductible" text="The amount you pay out-of-pocket before insurance starts covering costs." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.deductible.individual}
                    values={indDeductibles}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* Family Deductible */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Deductible (Family)
                    <Tooltip id="fam-deductible" text="The deductible that applies when covering a family." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.deductible.family}
                    values={famDeductibles}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* OOP Max */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Out-of-Pocket Max
                    <Tooltip id="oop-max" text="The maximum you'll pay in a year for covered services. After this, insurance pays 100%." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.oopMax.individual}
                    values={indOopMax}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* Coinsurance */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Coinsurance
                    <Tooltip id="coinsurance" text="The percentage of costs you pay after meeting your deductible." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.coinsurance}
                    values={coinsurance}
                    lowerIsBetter={true}
                    format={(v) => `${v}%`}
                  />
                ))}
              </tr>

              {/* PCP Copay */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    PCP Copay
                    <Tooltip id="pcp-copay" text="The fixed amount you pay for a primary care physician visit." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.copays.pcp}
                    values={pcpCopays}
                    lowerIsBetter={true}
                    format={(v) => v === 0 ? 'Deductible' : `$${v}`}
                  />
                ))}
              </tr>

              {/* Specialist Copay */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Specialist Copay
                    <Tooltip id="spec-copay" text="The fixed amount you pay for a specialist visit." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.copays.specialist}
                    values={specCopays}
                    lowerIsBetter={true}
                    format={(v) => v === 0 ? 'Deductible' : `$${v}`}
                  />
                ))}
              </tr>

              {/* ER Copay */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    ER Copay
                    <Tooltip id="er-copay" text="The fixed amount you pay for an emergency room visit." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.copays.er}
                    values={erCopays}
                    lowerIsBetter={true}
                    format={(v) => v === 0 ? 'Deductible' : `$${v}`}
                  />
                ))}
              </tr>

              {/* Generic Rx */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    Generic Rx
                    <Tooltip id="generic-rx" text="Copay for generic prescription medications." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <ValueCell
                    key={plan.id}
                    value={plan.rxTiers.generic}
                    values={genericRx}
                    lowerIsBetter={true}
                  />
                ))}
              </tr>

              {/* HSA Eligible */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex items-center">
                    HSA Eligible
                    <Tooltip id="hsa-eligible" text="Whether this plan allows you to contribute to a Health Savings Account for tax-advantaged savings." />
                  </div>
                </td>
                {healthPlans.map(plan => (
                  <td key={plan.id} className="px-4 py-3 text-center bg-white">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      plan.hsaEligible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.hsaEligible ? 'Yes' : 'No'}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
          <span className="text-gray-600">Best value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
          <span className="text-gray-600">Highest cost</span>
        </div>
      </div>
    </div>
  );
}
