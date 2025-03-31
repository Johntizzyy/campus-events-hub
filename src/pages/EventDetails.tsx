import { useState } from "react";
import React from "react";

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShareIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

// Mock data - replace with API call
const event = {
  id: 1,
  title: "Annual Music Festival",
  date: "2024-04-15",
  time: "6:00 PM",
  location: "University Auditorium",
  image:
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  price: "₦5,000",
  category: "Music",
  description: `Join us for an unforgettable evening of music and entertainment at the Annual Music Festival! 
  Featuring top student bands, solo artists, and special guest performances. 
  Don't miss out on this incredible showcase of talent from across campus.`,
  organizer: {
    name: "Student Entertainment Committee",
    contact: "+234 123 456 7890",
    email: "sec@unilorin.edu.ng",
  },
  ticketTypes: [
    {
      name: "VIP",
      price: "₦10,000",
      description: "Front row seats, meet & greet",
    },
    { name: "Regular", price: "₦5,000", description: "Standard seating" },
    { name: "Early Bird", price: "₦3,000", description: "Limited time offer" },
  ],
  relatedEvents: [
    {
      id: 2,
      title: "Jazz Night",
      date: "2024-04-20",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: "₦3,000",
    },
    {
      id: 3,
      title: "Acoustic Session",
      date: "2024-04-25",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      price: "₦2,000",
    },
  ],
};

export default function EventDetails() {
  const { id } = useParams();
  const [selectedTicket, setSelectedTicket] = useState(event.ticketTypes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Event Banner */}
      <div className="relative h-96">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                {event.date}
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                {event.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>

            {/* Event Details */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Event Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {event.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {event.organizer.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Organizer Contact */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Organizer
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {event.organizer.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.organizer.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.organizer.contact}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Purchase */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Get Tickets
                </h3>

                {/* Ticket Types */}
                <div className="space-y-4 mb-6">
                  {event.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedTicket.name === ticket.name
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary-500"
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {ticket.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {ticket.description}
                          </p>
                        </div>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {ticket.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total
                    </span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      ₦
                      {parseInt(selectedTicket.price.replace(/[^0-9]/g, "")) *
                        quantity}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Link
                    to={`/tickets/${event.id}`}
                    className="w-full inline-flex justify-center items-center rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Buy Tickets
                  </Link>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.relatedEvents.map((relatedEvent) => (
              <motion.div
                key={relatedEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/events/${relatedEvent.id}`} className="group">
                  <div className="relative">
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {relatedEvent.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {relatedEvent.date}
                    </p>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {relatedEvent.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
