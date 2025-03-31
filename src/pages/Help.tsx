import { useState } from "react";
import React from "react";

import { motion } from "framer-motion";
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  TicketIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "tickets" | "events" | "payments";
}

const faqs: FAQItem[] = [
  {
    question: "How do I purchase tickets?",
    answer:
      "Select your desired event, choose ticket quantity, and proceed to checkout. We accept various payment methods including cards and bank transfers.",
    category: "tickets",
  },
  {
    question: "How do I create an event?",
    answer:
      "Click 'Post Event' in the navigation menu, fill in your event details, set ticket types and prices, then submit for review.",
    category: "events",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept debit/credit cards and bank transfers. All payments are processed securely through our payment partners.",
    category: "payments",
  },
  // Add more FAQs...
];

const popularTopics = [
  { title: "Buying Tickets", icon: TicketIcon },
  { title: "Creating Events", icon: CalendarIcon },
  { title: "Account Settings", icon: UserIcon },
  { title: "Payments & Refunds", icon: CurrencyDollarIcon },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              How can we help?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Find answers to common questions or get in touch with our support
              team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <topic.icon className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {topic.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="tickets">Tickets</option>
            <option value="events">Events</option>
            <option value="payments">Payments</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Still need help?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Our support team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center"
            >
              <ChatBubbleLeftIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Chat with our support team (9 AM - 5 PM WAT)
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                Start Chat
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center"
            >
              <EnvelopeIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:support@campuseventshub.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Send Email
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
