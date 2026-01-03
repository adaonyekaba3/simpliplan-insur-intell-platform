import Link from "next/link";
import {
  ClipboardList,
  Sparkles,
  CheckCircle,
  DollarSign,
  BarChart3,
  FileText,
  CalendarHeart,
  ShoppingCart,
  Check
} from "lucide-react";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Health Plan with{" "}
              <span className="text-pink-600">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              SimpliPlan uses AI to analyze your healthcare needs and recommend the perfect plan—in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-pink-500 text-white rounded-lg font-medium text-lg hover:bg-pink-600 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/compare"
                className="px-8 py-4 border-2 border-pink-500 text-pink-600 rounded-lg font-medium text-lg hover:bg-pink-50 transition-colors"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 border-l-4 border-pink-500 bg-pink-50 rounded-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">73%</div>
              <div className="text-gray-700">of employees choose suboptimal plans</div>
            </div>
            <div className="text-center p-6 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">$750+</div>
              <div className="text-gray-700">average annual savings with right plan</div>
            </div>
            <div className="text-center p-6 border-l-4 border-teal-500 bg-teal-50 rounded-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">&lt; 5 min</div>
              <div className="text-gray-700">to get personalized recommendation</div>
            </div>
            <div className="text-center p-6 border-l-4 border-green-500 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-gray-700">user satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to find your perfect health plan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Answer a few questions</h3>
              <p className="text-gray-600">
                Tell us about your healthcare needs, family size, prescription usage, and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Get AI-powered recommendation</h3>
              <p className="text-gray-600">
                Our algorithm analyzes your responses and calculates personalized cost estimates for each plan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Choose with confidence</h3>
              <p className="text-gray-600">
                Review our recommendations, compare plans side-by-side, and select the best option for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to make the right decision</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Side-by-Side Comparison</h3>
              <p className="text-gray-600">
                Compare all plans in an easy-to-read table with color-coded best values
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Cost Estimates</h3>
              <p className="text-gray-600">
                See your estimated annual costs based on your actual healthcare usage patterns
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Recommendation Engine</h3>
              <p className="text-gray-600">
                Advanced algorithm weighs costs, coverage, risk tolerance, and your preferences
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Plain-Language Explanations</h3>
              <p className="text-gray-600">
                Helpful tooltips explain deductibles, copays, coinsurance, and other confusing terms
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <CalendarHeart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Life Event Navigator</h3>
              <p className="text-gray-600">
                See how major life events (new baby, surgery) impact your plan choice
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Integrated POS System</h3>
              <p className="text-gray-600">
                Purchase health plans and related services directly through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Basic comparison tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Side-by-side plan view</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Basic tooltips</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-lg font-medium text-center hover:bg-pink-50 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-pink-500 rounded-2xl shadow-xl p-8 text-white relative">
              <div className="absolute -top-4 right-8 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-pink-100">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>AI recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Cost calculator</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Personalized insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Life event planning</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full px-6 py-3 bg-white text-pink-600 rounded-lg font-medium text-center hover:bg-pink-50 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">White-label options</span>
                </li>
              </ul>
              <Link
                href="#"
                className="block w-full px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-lg font-medium text-center hover:bg-pink-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to find your perfect health plan?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Join thousands of people who've saved money and stress with SimpliPlan
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-pink-600 rounded-lg font-medium text-lg hover:bg-pink-50 transition-colors shadow-lg"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
