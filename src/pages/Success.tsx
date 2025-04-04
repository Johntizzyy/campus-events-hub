import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Event Posted Successfully!
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Your event has been submitted and is pending review. We'll notify
            you once it's live.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 space-y-4"
        >
          <Link
            to="events"
            className="block w-full rounded-md bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            View All Events
          </Link>
          <Link
            to="dashboard"
            className="block w-full rounded-md bg-white dark:bg-gray-800 px-4 py-2.5 text-center text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
