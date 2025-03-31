import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: string;
  organizer: string;
}

interface EventGridProps {
  events: Event[];
  filters: {
    category: string;
    dateRange: {
      start: string;
      end: string;
    };
    priceRange: {
      min: number;
      max: number;
    };
    searchQuery: string;
  };
}

export default function EventGrid({ events, filters }: EventGridProps) {
  // Filter events based on criteria
  const filteredEvents = events.filter((event) => {
    // Category filter
    if (filters.category !== "All" && event.category !== filters.category) {
      return false;
    }

    // Search query
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const eventDate = new Date(event.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (eventDate < startDate || eventDate > endDate) return false;
    }

    // Price range
    if (
      event.price < filters.priceRange.min ||
      event.price > filters.priceRange.max
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400"
          >
            <p className="text-xl font-semibold">No events found</p>
            <p className="mt-2">Try adjusting your filters</p>
          </motion.div>
        </div>
      ) : (
        filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link to={`/events/${event.id}`}>
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-sm font-medium bg-white dark:bg-gray-800 rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    <span>₦{event.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    By {event.organizer}
                  </span>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      )}
    </div>
  );
}
