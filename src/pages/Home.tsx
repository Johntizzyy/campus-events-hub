import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="absolute inset-0 w-full h-[600px] object-cover"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Discover Amazing Events on Campus
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your one-stop platform for finding and promoting the best events
              at University of Ilorin. From concerts to career fairs, we've got
              you covered.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/events")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </button>
              <button
                onClick={() => navigate("/post-event")}
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Post an Event →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Find the perfect event that matches your interests
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/events?category=${category.name}`)}
              >
                <div className="flex flex-col items-center p-12 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow h-[280px] justify-center">
                  <span className="text-6xl mb-6">{category.icon}</span>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Featured Events
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Check out these upcoming events you won't want to miss
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <motion.div
                key={event.id}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {event.date} • {event.location}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
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
      </div>

      {/* Footer */}
      <footer className="relative mt-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Footer background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Campus Events Hub
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your one-stop platform for discovering and promoting campus
                events at University of Ilorin.
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2">→</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2">→</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Browse Events
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2">→</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Contact Us
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-blue-400 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-300">
                    University of Ilorin, Ilorin, Nigeria
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-blue-400 mr-3 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-300">
                    info@campuseventshub.com
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Newsletter
              </h4>
              <p className="text-gray-300 mb-4">
                Subscribe to get updates about new events
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Campus Events Hub. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
