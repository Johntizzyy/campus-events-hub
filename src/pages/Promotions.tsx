import React from "react";

import { motion } from "framer-motion";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface PromotionPackage {
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const packages: PromotionPackage[] = [
  {
    name: "Basic",
    price: 0,
    description: "Essential features for getting started",
    features: [
      "Standard event listing",
      "Basic search visibility",
      "Social sharing features",
      "Event page customization",
    ],
  },
  {
    name: "Premium",
    price: 5000,
    description: "Enhanced visibility and features",
    features: [
      "Featured on homepage",
      "Priority in search results",
      "Enhanced event page",
      "Analytics dashboard",
      "Email promotion",
    ],
    recommended: true,
  },
  {
    name: "Pro",
    price: 10000,
    description: "Maximum exposure and premium features",
    features: [
      "All Premium features",
      "Social media promotion",
      "Push notifications",
      "Premium badge",
      "Priority support",
      "Custom branding",
    ],
  },
];

const additionalFeatures = [
  {
    name: "Homepage Spotlight",
    price: 5000,
    description: "Feature your event on our homepage for maximum visibility",
  },
  {
    name: "Email Blast",
    price: 2000,
    description: "Send your event to our subscriber base",
  },
  {
    name: "Social Media Promotion",
    price: 3000,
    description: "Promote your event across our social media channels",
  },
];

export default function Promotions() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl py-16 sm:py-24"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Boost Your Event's Visibility
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Choose from our promotional packages to reach more students and
              sell more tickets.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Packages Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 ${
                pkg.recommended
                  ? "ring-2 ring-primary-600 bg-white/5 dark:bg-gray-800/5"
                  : "ring-1 ring-gray-200 dark:ring-gray-800"
              }`}
            >
              {pkg.recommended && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-800/20 dark:text-primary-400">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                {pkg.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {pkg.description}
              </p>
              <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                ₦{pkg.price.toLocaleString()}
              </p>
              <ul className="mt-8 space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Additional Promotional Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg"
              >
                <SparklesIcon className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
                <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  ₦{feature.price.toLocaleString()}
                </p>
                <button className="mt-4 w-full rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600">
                  Add Feature
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
