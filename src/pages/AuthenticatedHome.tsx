import { useState } from "react";
import { Link } from "react-router-dom";
import {
  StarIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const promotedEvents = [
  {
    id: 1,
    title: "Annual Music Festival",
    date: "2024-04-15",
    venue: "University Auditorium",
    price: 5000,
    category: "Music",
    promoted: true,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Join us for the biggest music festival of the year featuring top artists and bands from across the country.",
  },
  {
    id: 2,
    title: "Tech Career Fair",
    date: "2024-04-20",
    venue: "Engineering Complex",
    price: 0,
    category: "Career",
    promoted: true,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Connect with leading tech companies and explore exciting career opportunities in the tech industry.",
  },
  {
    id: 3,
    title: "Sports Day",
    date: "2024-04-25",
    venue: "University Stadium",
    price: 2000,
    category: "Sports",
    promoted: true,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Experience an action-packed day of sports competitions and activities for all skill levels.",
  },
];

const categories = [
  { name: "All", count: 12 },
  { name: "Music", count: 4 },
  { name: "Sports", count: 3 },
  { name: "Career", count: 2 },
  { name: "Academic", count: 1 },
  { name: "Party", count: 1 },
  { name: "Art", count: 1 },
];

export default function AuthenticatedHome() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-blue-600 dark:bg-blue-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1511795409834-432f31197ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome Back!
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            Discover and explore the latest promoted events on campus. Get
            exclusive access to premium events and special offers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Promoted Events Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {promotedEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="relative h-48">
                <img
                  className="h-full w-full object-cover"
                  src={event.image}
                  alt={event.title}
                />
                {event.promoted && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Promoted
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {event.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {event.date}
                  <MapPinIcon className="h-5 w-5 ml-4 mr-2" />
                  {event.venue}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {event.category}
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {event.price === 0
                      ? "Free"
                      : `₦${event.price.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
