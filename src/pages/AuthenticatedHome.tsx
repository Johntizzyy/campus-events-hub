import { useState } from "react";
import { Link } from "react-router-dom";
import {
  StarIcon,
  CalendarIcon,
  MapPinIcon,
  FireIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

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
  { name: "All", icon: FireIcon },
  { name: "Music", icon: StarIcon },
  { name: "Sports", icon: CalendarIcon },
  { name: "Career", icon: MapPinIcon },
  { name: "Academic", icon: StarIcon },
  { name: "Party", icon: StarIcon },
  { name: "Art", icon: StarIcon },
];

export default function AuthenticatedHome() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover mix-blend-overlay opacity-20"
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Campus background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome back, {user?.name?.split(" ")[0] || "there"}! 👋
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-blue-100">
              Ready to discover amazing events? We've curated the best campus
              experiences just for you.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link
                to="/post-event"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Event
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Explore Categories
            </h2>
            <Link
              to="/events"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 inline-flex items-center text-sm font-medium"
            >
              View All
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105"
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Events
            </h2>
            <Link
              to="/events"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 inline-flex items-center text-sm font-medium"
            >
              View All Events
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {promotedEvents.map((event) => (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={event.image}
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {event.promoted && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <StarIcon className="h-4 w-4 mr-1" />
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-200">
                      {event.title}
                    </h3>
                    <div className="flex items-center mt-2 text-sm text-gray-200">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {event.date}
                      <MapPinIcon className="h-4 w-4 ml-3 mr-1" />
                      {event.venue}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/my-events"
            className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold mb-2">My Events</h3>
            <p className="text-blue-100 text-sm">
              View and manage your created events
            </p>
          </Link>
          <Link
            to="/my-tickets"
            className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold mb-2">My Tickets</h3>
            <p className="text-purple-100 text-sm">
              Access your purchased event tickets
            </p>
          </Link>
          <Link
            to="/promotions"
            className="p-6 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
            <p className="text-pink-100 text-sm">
              Check out ongoing promotions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
