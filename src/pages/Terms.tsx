import { motion } from "framer-motion";
import React from "react";
interface TermsSection {
  title: string;
  content: string[];
}

const termsData: TermsSection[] = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using Campus Events Hub, you agree to be bound by these Terms of Service.",
      "If you disagree with any part of these terms, you may not access our service.",
    ],
  },
  {
    title: "2. User Registration",
    content: [
      "Users must provide accurate and complete information when creating an account.",
      "Users are responsible for maintaining the security of their account credentials.",
      "Users must be at least 16 years old to use this service.",
    ],
  },
  {
    title: "3. Event Creation and Ticket Sales",
    content: [
      "Event organizers must provide accurate event information.",
      "All events must comply with local laws and university regulations.",
      "Campus Events Hub charges a 5% commission on ticket sales.",
      "Payouts are processed within 2-3 business days after the event.",
    ],
  },
  {
    title: "4. Refund Policy",
    content: [
      "Refunds are available up to 24 hours before the event starts.",
      "Processing fees are non-refundable.",
      "Canceled events will be automatically refunded.",
    ],
  },
  {
    title: "5. User Conduct",
    content: [
      "Users must not engage in fraudulent activities.",
      "Harassment and hate speech are strictly prohibited.",
      "Users must not attempt to manipulate the platform's features.",
    ],
  },
  {
    title: "6. Privacy and Data",
    content: [
      "We collect and process data as described in our Privacy Policy.",
      "Users retain ownership of their content.",
      "We implement industry-standard security measures.",
    ],
  },
];

export default function Terms() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {termsData.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}

            <div className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@campuseventshub.com"
                  className="text-primary-600 hover:text-primary-500"
                >
                  legal@campuseventshub.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
