import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const featuredEvents = [
  {
    id: 1,
    title: "Annual Music Festival",
    date: "2024-04-15",
    location: "University Auditorium",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "₦5,000",
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Career Fair",
    date: "2024-04-20",
    location: "Engineering Complex",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "Free",
    category: "Career",
  },
  {
    id: 3,
    title: "Sports Day",
    date: "2024-04-25",
    location: "University Stadium",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "₦2,000",
    category: "Sports",
  },
];

const categories = [
  { name: "Music", icon: "🎵" },
  { name: "Sports", icon: "⚽" },
  { name: "Career", icon: "💼" },
  { name: "Academic", icon: "📚" },
  { name: "Party", icon: "🎉" },
  { name: "Art", icon: "🎨" },
];

interface AuthContextType {
  isAuthenticated: boolean;
}

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth() as AuthContextType;
  const [searchQuery, setSearchQuery] = useState("");

  const handleActionClick = (path: string): void => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Campus Events Hub
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Discover and create amazing events on your campus
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => handleActionClick("/post-event")}
              className="rounded-md bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Create an Event
            </button>

            <button
              onClick={() => handleActionClick("/dashboard")}
              className="rounded-md bg-gray-100 dark:bg-gray-800 px-6 py-3 text-lg font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              View Dashboard
            </button>
          </div>
        </motion.div>

        {/* Featured Events Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Featured Events
          </h2>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="flex flex-col"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {event.date} • {event.location}
                  </p>
                  <div className="mt-4 flex items-center gap-x-4">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {event.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Event Categories
          </h2>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
