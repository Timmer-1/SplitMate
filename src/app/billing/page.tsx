'use client'

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  X, 
  Crown,
  ArrowLeft,
  Gift,
  Star,
  Infinity
} from 'lucide-react';
import Link from 'next/link';

const BillingPage = () => {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' or 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      icon: Gift,
      color: 'from-slate-500 to-slate-600',
      popular: false,
      features: [
        'Up to 3 groups',
        'Basic expense tracking',
        'Simple split calculations',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'Limited to 10 expenses per month',
        'No advanced analytics',
        'No receipt scanning',
        'No export features'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Everything you need to split like a pro',
      price: { monthly: 9.99, yearly: 7.99 },
      icon: Crown,
      color: 'from-emerald-500 to-green-600',
      popular: true,
      features: [
        'Unlimited groups',
        'Advanced expense tracking',
        'Smart categorization',
        'Receipt scanning with AI',
        'Detailed analytics & reports',
        'Multiple currencies',
        'Expense templates',
        'Priority support',
        'Export to CSV/PDF',
        'Custom expense categories',
        'Recurring expenses',
        'Settlement reminders'
      ],
      limitations: []
    }
  ];
  const handlePlanSelect = (planId: 'free' | 'premium') => {
    setSelectedPlan(planId as any); // Type assertion to fix type mismatch
    // Here you would typically redirect to checkout or handle subscription
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
  };

  const getDiscountPercentage = () => {
    const premiumPlan = plans.find(p => p.id === 'premium');
    if (!premiumPlan) return 0;
    
    const monthlyPrice = premiumPlan.price.monthly;
    const yearlyPrice = premiumPlan.price.yearly;
    const yearlyTotal = yearlyPrice * 12;
    const monthlyTotal = monthlyPrice * 12;
    
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-full blur-2xl animate-pulse [animation-duration:3s]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl animate-pulse [animation-duration:4s]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                  <Sparkles className="h-3 w-3 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                  SplitMate
                </h1>
              </div>
            </div>

            {/* Navigation Help */}
            <div className="text-sm text-slate-600">
              Need help?{' '}
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-slate-800 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upgrade to Premium and unlock powerful features to split expenses like never before. 
            Start your free trial today!
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-2 shadow-lg">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-800 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                Yearly
                {getDiscountPercentage() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{getDiscountPercentage()}%
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/80 backdrop-blur-xl border-2 rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-emerald-500 shadow-emerald-500/20' 
                  : 'border-slate-200/50 hover:border-slate-300/70'
              } ${
                selectedPlan === plan.id ? 'ring-4 ring-emerald-500/30' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-gradient-to-br ${plan.color} rounded-2xl shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                
                {/* Pricing */}
                <div className="mb-6">
                  {plan.price[billingCycle] === 0 ? (
                    <div className="text-4xl font-black text-slate-800">Free</div>
                  ) : (
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-black text-slate-800">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-slate-600">
                        /{billingCycle === 'yearly' ? 'month' : 'month'}
                      </span>
                    </div>
                  )}
                  
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <div className="text-sm text-slate-500 mt-2">
                      Billed annually (${(plan.price.yearly * 12).toFixed(2)}/year)
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <h4 className="font-bold text-slate-800 flex items-center">
                  <Check className="h-5 w-5 text-emerald-500 mr-2" />
                  What's included:
                </h4>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations for Free Plan */}
                {plan.limitations.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-600 flex items-center mb-3">
                      <X className="h-5 w-5 text-slate-400 mr-2" />
                      Limitations:
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <X className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  plan.id === 'free'
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-200'
                    : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/30'
                } ${
                  selectedPlan === plan.id ? 'ring-4 ring-emerald-500/50' : ''
                }`}
              >
                {plan.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
              </button>

              {plan.id === 'premium' && (
                <p className="text-center text-sm text-slate-500 mt-3">
                  14-day free trial • No credit card required
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Compare Plans
            </h3>
            <p className="text-slate-600 text-lg">
              See what you get with each plan
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="text-left p-6 font-bold text-slate-800">Features</th>
                    <th className="text-center p-6 font-bold text-slate-800">Free</th>
                    <th className="text-center p-6 font-bold text-emerald-600">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50">
                  {[
                    { feature: 'Groups', free: '3', premium: 'Unlimited' },
                    { feature: 'Monthly Expenses', free: '10', premium: 'Unlimited' },
                    { feature: 'Receipt Scanning', free: false, premium: true },
                    { feature: 'Analytics & Reports', free: false, premium: true },
                    { feature: 'Multiple Currencies', free: false, premium: true },
                    { feature: 'Export Features', free: false, premium: true },
                    { feature: 'Priority Support', free: false, premium: true },
                    { feature: 'Recurring Expenses', free: false, premium: true },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-6 font-medium text-slate-800">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-slate-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-slate-700">{row.free}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-slate-400 mx-auto" />
                          )
                        ) : row.premium === 'Unlimited' ? (
                          <div className="flex items-center justify-center">
                            <Infinity className="h-5 w-5 text-emerald-500" />
                          </div>
                        ) : (
                          <span className="text-emerald-600 font-semibold">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Premium comes with a 14-day free trial. No credit card required to start."
              },
              {
                question: "How does billing work?",
                answer: "You'll be charged at the start of each billing cycle. You can cancel anytime."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 text-left shadow-lg">
                <h4 className="font-bold text-slate-800 mb-3">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to split expenses like a pro?
            </h3>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SplitMate to manage their group expenses effortlessly.
            </p>
            <button
              onClick={() => handlePlanSelect('premium')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;