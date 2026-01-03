"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { UserInput } from "@/lib/types";

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState<UserInput>({
    coverageType: 'individual',
    expectedVisits: 'medium',
    prescriptionTier: 'none',
    plannedProcedures: 'none',
    riskTolerance: 'predictable',
    hsaInterest: 'unsure',
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Redirect to results with query params
      const params = new URLSearchParams(formData as any);
      router.push(`/results?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const OptionCard = ({ value, label, description, selected, onClick }: any) => (
    <button
      onClick={() => onClick(value)}
      className={`
        w-full p-6 rounded-xl border-2 text-left transition-all
        ${selected
          ? 'border-pink-500 bg-pink-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-pink-200 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        {selected && (
          <div className="ml-4 flex-shrink-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Best Plan</h1>
          <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Step 1: Coverage Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Who needs coverage?</h2>
              <OptionCard
                value="individual"
                label="Just me"
                description="Individual coverage"
                selected={formData.coverageType === 'individual'}
                onClick={(val: any) => setFormData({ ...formData, coverageType: val })}
              />
              <OptionCard
                value="couple"
                label="Me + Spouse"
                description="Coverage for you and your spouse/partner"
                selected={formData.coverageType === 'couple'}
                onClick={(val: any) => setFormData({ ...formData, coverageType: val })}
              />
              <OptionCard
                value="family"
                label="Me + Children or Family"
                description="Coverage for you and dependents"
                selected={formData.coverageType === 'family'}
                onClick={(val: any) => setFormData({ ...formData, coverageType: val })}
              />
            </div>
          )}

          {/* Step 2: Expected Visits */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How often do you visit the doctor?</h2>
              <OptionCard
                value="low"
                label="Rarely"
                description="1-2 visits per year for check-ups"
                selected={formData.expectedVisits === 'low'}
                onClick={(val: any) => setFormData({ ...formData, expectedVisits: val })}
              />
              <OptionCard
                value="medium"
                label="Sometimes"
                description="3-5 visits per year"
                selected={formData.expectedVisits === 'medium'}
                onClick={(val: any) => setFormData({ ...formData, expectedVisits: val })}
              />
              <OptionCard
                value="high"
                label="Often"
                description="6+ visits per year or ongoing treatment"
                selected={formData.expectedVisits === 'high'}
                onClick={(val: any) => setFormData({ ...formData, expectedVisits: val })}
              />
            </div>
          )}

          {/* Step 3: Prescriptions */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Do you take prescription medications?</h2>
              <OptionCard
                value="none"
                label="None"
                description="I don't take regular medications"
                selected={formData.prescriptionTier === 'none'}
                onClick={(val: any) => setFormData({ ...formData, prescriptionTier: val })}
              />
              <OptionCard
                value="generic"
                label="Generic medications"
                description="Low-cost generic prescriptions"
                selected={formData.prescriptionTier === 'generic'}
                onClick={(val: any) => setFormData({ ...formData, prescriptionTier: val })}
              />
              <OptionCard
                value="brand"
                label="Brand-name medications"
                description="Preferred or non-generic prescriptions"
                selected={formData.prescriptionTier === 'brand'}
                onClick={(val: any) => setFormData({ ...formData, prescriptionTier: val })}
              />
              <OptionCard
                value="specialty"
                label="Specialty medications"
                description="High-cost specialty drugs"
                selected={formData.prescriptionTier === 'specialty'}
                onClick={(val: any) => setFormData({ ...formData, prescriptionTier: val })}
              />
            </div>
          )}

          {/* Step 4: Planned Procedures */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Any planned medical procedures?</h2>
              <OptionCard
                value="none"
                label="None"
                description="No planned procedures this year"
                selected={formData.plannedProcedures === 'none'}
                onClick={(val: any) => setFormData({ ...formData, plannedProcedures: val })}
              />
              <OptionCard
                value="minor"
                label="Minor procedure"
                description="Outpatient procedure or minor surgery"
                selected={formData.plannedProcedures === 'minor'}
                onClick={(val: any) => setFormData({ ...formData, plannedProcedures: val })}
              />
              <OptionCard
                value="major"
                label="Major surgery"
                description="Planned major operation or hospitalization"
                selected={formData.plannedProcedures === 'major'}
                onClick={(val: any) => setFormData({ ...formData, plannedProcedures: val })}
              />
              <OptionCard
                value="baby"
                label="Having a baby"
                description="Maternity or newborn care"
                selected={formData.plannedProcedures === 'baby'}
                onClick={(val: any) => setFormData({ ...formData, plannedProcedures: val })}
              />
            </div>
          )}

          {/* Step 5: Risk Tolerance */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your preference?</h2>
              <OptionCard
                value="predictable"
                label="Predictable costs"
                description="I prefer knowing exactly what I'll pay with copays and low deductibles"
                selected={formData.riskTolerance === 'predictable'}
                onClick={(val: any) => setFormData({ ...formData, riskTolerance: val })}
              />
              <OptionCard
                value="risktaker"
                label="Lower premiums"
                description="I'm healthy and willing to pay higher deductibles for lower monthly costs"
                selected={formData.riskTolerance === 'risktaker'}
                onClick={(val: any) => setFormData({ ...formData, riskTolerance: val })}
              />
            </div>
          )}

          {/* Step 6: HSA Interest */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Are you interested in a Health Savings Account (HSA)?</h2>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>What's an HSA?</strong> A tax-advantaged savings account for medical expenses.
                  Only available with high-deductible health plans (HDHPs).
                </p>
              </div>
              <OptionCard
                value="yes"
                label="Yes, I want HSA eligibility"
                description="I want to save pre-tax dollars for healthcare"
                selected={formData.hsaInterest === 'yes'}
                onClick={(val: any) => setFormData({ ...formData, hsaInterest: val })}
              />
              <OptionCard
                value="no"
                label="No, not interested"
                description="I don't want or need an HSA"
                selected={formData.hsaInterest === 'no'}
                onClick={(val: any) => setFormData({ ...formData, hsaInterest: val })}
              />
              <OptionCard
                value="unsure"
                label="Not sure / What's an HSA?"
                description="Show me all options"
                selected={formData.hsaInterest === 'unsure'}
                onClick={(val: any) => setFormData({ ...formData, hsaInterest: val })}
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            {step === totalSteps ? 'See My Recommendations' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
