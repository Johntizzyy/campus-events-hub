import { useState } from 'react';
import { motion } from 'framer-motion';
import { TicketIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface EventHistoryItem {
  id: string;
  eventTitle: string;
  date: string;
  ticketType: string;
  status: 'upcoming' | 'past' | 'cancelled';
  ticketCode?: string;
}

export default function EventHistory() {
  const [events, setEvents] = useState<EventHistoryItem[]>([]);

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <motion.div
          key={event.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{event.eventTitle}</h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-sm">{event.ticketType}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              event.status === 'upcoming' 
                ? 'bg-green-100 text-green-800'
                : event.status === 'past'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {event.status}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 