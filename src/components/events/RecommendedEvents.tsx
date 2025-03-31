import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RecommendedEvent {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  matchScore: number;
}

export default function RecommendedEvents() {
  const [recommendations, setRecommendations] = useState<RecommendedEvent[]>([]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  {event.category}
                </span>
                <span className="text-sm text-gray-600">
                  {event.matchScore}% match
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 