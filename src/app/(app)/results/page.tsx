"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Award, TrendingDown, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { UserInput } from "@/lib/types";
import { calculateRecommendations, getPlanById } from "@/lib/recommendation";
import Link from "next/link";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [showCalculation, setShowCalculation] = useState(false);

  // Parse user input from query params
  const userInput: UserInput = useMemo(() => ({
    coverageType: (searchParams.get('coverageType') as any) || 'individual',
    expectedVisits: (searchParams.get('expectedVisits') as any) || 'medium',
    prescriptionTier: (searchParams.get('prescriptionTier') as any) || 'none',
    plannedProcedures: (searchParams.get('plannedProcedures') as any) || 'none',
    riskTolerance: (searchParams.get('riskTolerance') as any) || 'predictable',
    hsaInterest: (searchParams.get('hsaInterest') as any) || 'unsure',
  }), [searchParams]);

  // Calculate recommendations
  const recommendations = useMemo(() => calculateRecommendations(userInput), [userInput]);
  const topRecommendation = recommendations[0];
  const topPlan = getPlanById(topRecommendation.planId);

  // Prepare chart data
  const chartData = recommendations.map(rec => {
    const plan = getPlanById(rec.planId)!;
    return {
      name: plan.name.replace(/ /g, '\n'),
      Premium: plan.premium.annual,
      'Est. OOP': rec.estimatedAnnualCost - plan.premium.annual,
      Total: rec.estimatedAnnualCost,
      isTop: rec.ranking === 1,
    };
  });

  const COLORS = ['#EC4899', '#DB2777', '#BE185D', '#9D174D'];

  if (!topPlan) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-2">No Results Found</h2>
            <p className="text-yellow-800 mb-4">
              We couldn't find your quiz results. Please take the quiz to get personalized recommendations.
            </p>
            <Link
              href="/quiz"
              className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Take Quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Recommendations</h1>
          <p className="text-gray-600">Based on your healthcare needs and preferences</p>
        </div>

        {/* Top Recommendation Card */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6" />
                <span className="text-pink-100 font-medium">Best Match</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{topPlan.name}</h2>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {topPlan.type}
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold mb-1">{topRecommendation.confidenceScore}%</div>
              <div className="text-pink-100">Match Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-pink-100 text-sm mb-1">Estimated Annual Cost</div>
              <div className="text-3xl font-bold">${topRecommendation.estimatedAnnualCost.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-pink-100 text-sm mb-1">Monthly Premium</div>
              <div className="text-3xl font-bold">${topPlan.premium.monthly}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Why we recommend this plan:
            </h3>
            <ul className="space-y-2">
              {topRecommendation.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <Link
              href="/compare"
              className="inline-block px-6 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors"
            >
              View Full Comparison
            </Link>
          </div>
        </div>

        {/* Cost Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-bold text-gray-900">Cost Comparison</h2>
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Premium:</strong> Monthly/annual cost regardless of usage &nbsp;|&nbsp;
              <strong>Est. OOP:</strong> Estimated out-of-pocket costs based on your healthcare needs
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{ value: 'Annual Cost ($)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: any) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey="Premium" stackId="a" fill="#EC4899" />
              <Bar dataKey="Est. OOP" stackId="a" fill="#FCA5A5">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isTop ? '#DB2777' : '#FCA5A5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* All Plans Ranked */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Plans Ranked</h2>
          <div className="space-y-4">
            {recommendations.map((rec) => {
              const plan = getPlanById(rec.planId)!;
              return (
                <div
                  key={rec.planId}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    rec.ranking === 1
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          rec.ranking === 1 ? 'bg-pink-500' :
                          rec.ranking === 2 ? 'bg-pink-400' :
                          rec.ranking === 3 ? 'bg-pink-300 text-gray-700' :
                          'bg-gray-300 text-gray-700'
                        }`}>
                          {rec.ranking}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                          {plan.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-500">Est. Annual Cost</div>
                          <div className="font-bold text-gray-900">${rec.estimatedAnnualCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Match Score</div>
                          <div className="font-bold text-gray-900">{rec.confidenceScore}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Monthly Premium</div>
                          <div className="font-bold text-gray-900">${plan.premium.monthly}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Deductible</div>
                          <div className="font-bold text-gray-900">${plan.deductible.individual.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {plan.highlights.map((highlight, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How We Calculated This */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <button
            onClick={() => setShowCalculation(!showCalculation)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900">How we calculated this</h2>
            {showCalculation ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>

          {showCalculation && (
            <div className="mt-6 space-y-4 text-gray-700">
              <p>
                Our recommendation algorithm considers multiple factors to estimate your annual healthcare costs
                and match you with the best plan:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">Cost Estimation (40% weight)</h4>
                  <p className="text-sm text-pink-800">
                    We calculate your estimated annual cost based on premiums, expected doctor visits,
                    prescription medications, planned procedures, and family size. Lower total cost = higher score.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Coverage Fit (30% weight)</h4>
                  <p className="text-sm text-purple-800">
                    We match plan features to your needs: prescription tier copays, visit frequency copays,
                    and deductibles for planned procedures.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Risk Alignment (20% weight)</h4>
                  <p className="text-sm text-blue-800">
                    We align plans with your risk tolerance: HDHPs for risk-takers who want lower premiums,
                    and traditional plans for those who prefer predictable costs.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">HSA Preference (10% weight)</h4>
                  <p className="text-sm text-green-800">
                    If you're interested in an HSA, we prioritize HSA-eligible plans. If not, we prioritize
                    non-HDHP plans.
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic mt-4">
                Note: These are estimates based on typical costs and your stated preferences.
                Actual costs may vary. Consult with your HR department or insurance provider for exact figures.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
