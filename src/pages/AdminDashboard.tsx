import { useState } from "react";
import React from "react";

import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import {
  UsersIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface DashboardStats {
  totalUsers: number;
  activeEvents: number;
  pendingEvents: number;
  totalRevenue: number;
  dailyActiveUsers: number;
}

interface Event {
  id: number;
  title: string;
  organizer: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  ticketsSold: number;
  revenue: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "organizer" | "attendee";
  status: "active" | "suspended";
  joinDate: string;
  eventsCreated: number;
  ticketsPurchased: number;
}

// Mock data
const mockStats: DashboardStats = {
  totalUsers: 1250,
  activeEvents: 45,
  pendingEvents: 12,
  totalRevenue: 2500000,
  dailyActiveUsers: 320,
};

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Meetup 2024",
    organizer: "Computer Science Association",
    date: "2024-03-20",
    status: "pending",
    ticketsSold: 0,
    revenue: 0,
  },
  // Add more mock events...
];

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@university.edu.ng",
    role: "organizer",
    status: "active",
    joinDate: "2024-01-15",
    eventsCreated: 5,
    ticketsPurchased: 12,
  },
  // Add more mock users...
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.totalUsers}
                </h3>
              </div>
              <UsersIcon className="h-8 w-8 text-primary-600" />
            </div>
          </motion.div>
          {/* Add similar stat cards for other metrics */}
        </div>

        {/* Main Content */}
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary-900/20 p-1">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white dark:bg-gray-800 text-primary-700 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-primary-600"
              }`
              }
            >
              Events
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white dark:bg-gray-800 text-primary-700 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-primary-600"
              }`
              }
            >
              Users
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? "bg-white dark:bg-gray-800 text-primary-700 shadow"
                  : "text-gray-600 hover:bg-white/[0.12] hover:text-primary-600"
              }`
              }
            >
              Reports
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-6">
            {/* Events Panel */}
            <Tab.Panel>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Pending Events
                    </h2>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Search events..."
                        className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                      />
                      <select className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Event
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Organizer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockEvents.map((event) => (
                          <tr key={event.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {event.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.organizer}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.date}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full
                                ${
                                  event.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : event.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {event.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <button className="text-green-600 hover:text-green-500">
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-500">
                                  <XCircleIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Users Panel */}
            <Tab.Panel>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {/* Similar structure to Events panel but for Users */}
              </div>
            </Tab.Panel>

            {/* Reports Panel */}
            <Tab.Panel>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {/* Add charts and reports here */}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
