import { useState, useMemo } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  { name: "All", href: "#" },
  { name: "Music", href: "#" },
  { name: "Sports", href: "#" },
  { name: "Career", href: "#" },
  { name: "Academic", href: "#" },
  { name: "Party", href: "#" },
  { name: "Art", href: "#" },
];

const mockEvents = [
  {
    id: 1,
    title: "Annual Music Festival",
    date: "2024-04-15",
    venue: "University Auditorium",
    price: 5000,
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
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
  },
];

export default function EventListings() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Filter events based on search query and selected category
  const filteredEvents = useMemo(() => {
    return mockEvents
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          default: // "Newest"
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleLoadMore = () => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    // Handle loading more events here
    // This will be implemented when we have actual pagination
  };

  return (
    <div className="min-h-screen bg-white py-8 font-roboto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none font-roboto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-md py-2 px-3 font-roboto"
            >
              <option>Newest</option>
            </select>

            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-roboto"
            >
              Filters
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  pb-4 text-sm font-medium border-b-2 font-roboto ${
                    selectedCategory === category.name
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link to={`/events/${event.id}`} key={event.id} className="group">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-600 group-hover:text-blue-700 font-roboto">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 font-roboto">
                  {event.date} • {event.venue}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-roboto">
                    {event.category}
                  </span>
                  <span
                    className={`text-sm font-medium font-roboto ${
                      event.price === 0 ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {event.price === 0
                      ? "Free"
                      : `₦${event.price.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-16 text-center">
          <button
            onClick={handleLoadMore}
            type="button"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md text-sm font-medium transition-all duration-200 font-roboto"
          >
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
