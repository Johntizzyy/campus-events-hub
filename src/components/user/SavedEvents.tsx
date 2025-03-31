import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';

interface SavedEvent {
  id: string;
  title: string;
  date: string;
  image: string;
  isSaved: boolean;
}

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);

  const toggleSave = async (eventId: string) => {
    // Add logic to toggle save status
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedEvents.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          {/* Event card content */}
        </motion.div>
      ))}
    </div>
  );
} 