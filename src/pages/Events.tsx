import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

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
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
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
                className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
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
                className="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-blue-100">{event.date}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {event.category}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {event.price === 0
                        ? "Free"
                        : `₦${event.price.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPinIcon className="mr-1 h-4 w-4" />
                    {event.venue}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {event.description}
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
