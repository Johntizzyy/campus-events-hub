import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  PlusIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useAuth } from "../contexts/AuthContext";

const events = [
  {
    id: 1,
    title: "Annual Music Festival",
    date: "2024-04-15",
    venue: "University Auditorium",
    price: 5000,
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Join us for the biggest music festival of the year featuring top artists and bands.",
    attendees: 120,
    ticketsSold: 85,
  },
  {
    id: 2,
    title: "Tech Career Fair",
    date: "2024-04-20",
    venue: "Engineering Complex",
    price: 0,
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Connect with leading tech companies and explore exciting career opportunities.",
    attendees: 250,
    ticketsSold: 180,
  },
  {
    id: 3,
    title: "Sports Day",
    date: "2024-04-25",
    venue: "University Stadium",
    price: 2000,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description:
      "Experience an action-packed day of sports competitions and activities.",
    attendees: 300,
    ticketsSold: 220,
  },
  {
    id: 4,
    title: "Art Exhibition",
    date: "2024-04-28",
    venue: "Art Gallery",
    price: 1500,
    category: "Art",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Explore amazing artworks from talented student artists.",
    attendees: 150,
    ticketsSold: 120,
  },
  {
    id: 5,
    title: "Dance Competition",
    date: "2024-05-01",
    venue: "University Hall",
    price: 3000,
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Watch amazing dance performances and vote for your favorite.",
    attendees: 200,
    ticketsSold: 150,
  },
  {
    id: 6,
    title: "Science Fair",
    date: "2024-05-05",
    venue: "Science Complex",
    price: 0,
    category: "Academic",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Discover innovative projects from our science students.",
    attendees: 180,
    ticketsSold: 160,
  },
  {
    id: 7,
    title: "Graduation Party",
    date: "2024-05-10",
    venue: "Main Campus",
    price: 4000,
    category: "Party",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Celebrate the Class of 2024 with an unforgettable party.",
    attendees: 400,
    ticketsSold: 350,
  },
  {
    id: 8,
    title: "Entrepreneurship Workshop",
    date: "2024-05-15",
    venue: "Business School",
    price: 2500,
    category: "Career",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Learn from successful entrepreneurs and start your journey.",
    attendees: 120,
    ticketsSold: 100,
  },
];

const categories = [
  "All",
  "Music",
  "Sports",
  "Career",
  "Academic",
  "Party",
  "Art",
];

const venues = [
  "All",
  "University Auditorium",
  "Engineering Complex",
  "University Stadium",
  "Art Gallery",
  "University Hall",
  "Science Complex",
  "Main Campus",
  "Business School",
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { isDarkMode } = useDarkMode();
  const { user } = useAuth();

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesVenue =
      selectedVenue === "All" || event.venue === selectedVenue;
    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "Free" && event.price === 0) ||
      (priceRange === "Paid" && event.price > 0);
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesVenue && matchesPrice && matchesSearch;
  });

  return (
    <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Events Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and view all events in one place
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                to="/post-event"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Event
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6 py-8">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className={`block w-full rounded-md border-0 py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? "bg-gray-800 text-white ring-gray-700 placeholder:text-gray-400"
                    : "text-gray-900 ring-gray-300 placeholder:text-gray-400"
                } ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className={`rounded-md border-0 py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? "bg-gray-800 text-white ring-gray-700"
                    : "text-gray-900 ring-gray-300"
                } ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className={`rounded-md border-0 py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? "bg-gray-800 text-white ring-gray-700"
                    : "text-gray-900 ring-gray-300"
                } ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600`}
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
              >
                {venues.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
              <select
                className={`rounded-md border-0 py-2 pl-3 pr-10 ${
                  isDarkMode
                    ? "bg-gray-800 text-white ring-gray-700"
                    : "text-gray-900 ring-gray-300"
                } ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600`}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                    viewMode === "grid"
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:text-white"
                      : "bg-white text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                    viewMode === "list"
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:text-white"
                      : "bg-white text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Events Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`group relative overflow-hidden rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-blue-100">{event.date}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {event.category}
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {event.price === 0
                          ? "Free"
                          : `₦${event.price.toLocaleString()}`}
                      </span>
                    </div>
                    <div
                      className={`mt-2 flex items-center text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <MapPinIcon className="mr-1 h-4 w-4" />
                      {event.venue}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <UserGroupIcon className="mr-1 h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CurrencyDollarIcon className="mr-1 h-4 w-4" />
                        {event.ticketsSold} sold
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link
                        to={`/events/${event.id}`}
                        className={`flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/30"
                            : "text-blue-600 hover:text-blue-500 bg-blue-50 hover:bg-blue-100"
                        }`}
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        className={`inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-300 bg-gray-700/50 hover:bg-gray-700/70"
                            : "text-gray-600 hover:text-gray-500 bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table
                className={`min-w-full divide-y divide-gray-300 dark:divide-gray-700 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <thead
                  className={`${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Venue
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Attendees
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={event.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div
                              className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {event.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {event.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {event.venue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {event.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {event.price === 0
                          ? "Free"
                          : `₦${event.price.toLocaleString()}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {event.attendees}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/events/${event.id}`}
                          className={`${
                            isDarkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-500"
                          } mr-4`}
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className={`${
                            isDarkMode
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-600 hover:text-gray-500"
                          }`}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
