import { useState } from 'react';
import React from "react";

import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import {
  TicketIcon,
  CalendarIcon,
  BookmarkIcon,
  UserCircleIcon,
  CurrencyYenIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  ticketsPurchased: number;
  eventsPosted: number;
  upcomingEvents: number;
  totalSpent: number;
  totalEarned: number;
}

// Mock data - replace with actual API calls
const mockStats: DashboardStats = {
  ticketsPurchased: 12,
  eventsPosted: 5,
  upcomingEvents: 3,
  totalSpent: 45000,
  totalEarned: 150000,
};

const mockTickets = [
  {
    id: 1,
    eventName: 'Tech Conference 2024',
    date: '2024-03-15',
    time: '10:00 AM',
    location: 'Lagos Conference Center',
    ticketType: 'VIP',
    price: 15000,
    qrCode: 'https://example.com/qr/1234',
  },
  // Add more mock tickets...
];

const mockEvents = [
  {
    id: 1,
    title: 'Campus Music Festival',
    date: '2024-04-01',
    status: 'active',
    ticketsSold: 156,
    revenue: 780000,
  },
  // Add more mock events...
];

export default function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tickets Purchased</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.ticketsPurchased}</h3>
              </div>
              <TicketIcon className="h-8 w-8 text-primary-600" />
            </div>
          </motion.div>
          
          {/* Add similar stat cards for other metrics */}
        </div>

        {/* Main Content Tabs */}
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary-900/20 p-1">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white dark:bg-gray-800 text-primary-700 shadow'
                : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary-600'}`
            }>
              My Tickets
            </Tab>
            {/* Add similar tabs for My Events, Saved Events, Settings */}
          </Tab.List>

          <Tab.Panels className="mt-6">
            {/* My Tickets Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                {mockTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {ticket.eventName}
                        </h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: {ticket.date} at {ticket.time}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Location: {ticket.location}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ticket Type: {ticket.ticketType}
                          </p>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-500">
                        View QR Code
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tab.Panel>

            {/* My Events Panel */}
            <Tab.Panel>
              <div className="space-y-6">
                {mockEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Date: {event.date}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tickets Sold: {event.ticketsSold}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Revenue: ₦{event.revenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs
                        ${event.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'}`}>
                        {event.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Tab.Panel>

            {/* Add panels for Saved Events and Settings */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 