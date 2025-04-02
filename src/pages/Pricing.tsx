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
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="absolute inset-0 w-full h-[400px] object-cover"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include a 14-day
              free trial.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl border ${
                tier.popular
                  ? "border-blue-600 shadow-xl"
                  : "border-gray-200 dark:border-gray-700"
              } p-8`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      /{tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon
                      className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                  tier.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                } transition-colors`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Can I change plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards, bank transfers, and mobile
                money payments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Is there a refund policy?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer a 30-day money-back guarantee if you're not
                satisfied with our service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Do you offer student discounts?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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
