import { useState } from 'react';
import { motion } from 'framer-motion';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    eventReminders: boolean;
  };
  privacy: {
    showProfile: boolean;
    showHistory: boolean;
  };
  preferences: {
    categories: string[];
    maxTicketPrice: number;
  };
}

export default function UserSettings() {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      eventReminders: true
    },
    privacy: {
      showProfile: true,
      showHistory: false
    },
    preferences: {
      categories: [],
      maxTicketPrice: 50000
    }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Settings sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        {/* Notification toggles */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
        {/* Privacy toggles */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Event Preferences</h3>
        {/* Category selection and price range */}
      </motion.div>
    </div>
  );
} 