import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  TicketIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const featuredEvents = [
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
  { name: "Music", icon: "🎵" },
  { name: "Sports", icon: "⚽" },
  { name: "Career", icon: "💼" },
  { name: "Academic", icon: "📚" },
  { name: "Party", icon: "🎉" },
  { name: "Art", icon: "🎨" },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-[90vh]">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Campus events background"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Amazing Events on Campus
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Find, create, and manage events all in one place. Connect with
              your campus community and make memories that last.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/events"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50"
              >
                Browse Events
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Post an Event →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Events
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Check out these exciting events happening on campus
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
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

      {/* Categories Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Find events that match your interests
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-blue-50 h-64 flex flex-col items-center justify-center"
              >
                <span className="text-4xl">{category.icon}</span>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-blue-600">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-10"
            src="https://images.unsplash.com/photo-1511795409834-432f31197ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Join thousands of students who are already discovering and
              creating amazing events on campus.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50"
              >
                Create Account
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
