import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

const tiers = [
  {
    name: "Basic",
    price: "₦0",
    description: "Perfect for students looking to discover events",
    features: [
      "Browse all events",
      "Create an account",
      "Save favorite events",
      "Basic event search",
      "Email notifications",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₦2,000",
    period: "per month",
    description: "Ideal for event organizers and clubs",
    features: [
      "Everything in Basic",
      "Create unlimited events",
      "Advanced analytics",
      "Priority support",
      "Custom event branding",
      "Early access to new features",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations and institutions",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
      "API access",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 gap-y-8 sm:gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-lg border ${
                tier.popular 
                  ? 'border-blue-600 shadow-md' 
                  : 'border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      /{tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm transition-colors ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-4xl mt-24">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I change plans later?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We accept all major credit cards, bank transfers, and mobile
                money payments.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is there a refund policy?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, we offer a 30-day money-back guarantee if you're not
                satisfied with our service.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer student discounts?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, we offer special discounts for students. Contact our
                support team with your student ID for verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
