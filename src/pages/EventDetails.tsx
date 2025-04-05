import { useState, useEffect } from "react";
import React from "react";

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShareIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

// Import events data
import { events } from "./Events";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [lookingForBuddy, setLookingForBuddy] = useState(false);
  const [interestedBuddies, setInterestedBuddies] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Find the event based on the ID parameter
  const currentEvent = events.find((event) => event.id.toString() === id);

  // If event is not found, show error
  if (!currentEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Event not found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="../events"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // Define ticket types based on event price
  const ticketTypes = [
    {
      name: "Regular",
      price: currentEvent.price,
      description: "Standard admission",
    },
    {
      name: "VIP",
      price: currentEvent.price * 2,
      description: "Premium seating and exclusive perks",
    },
  ];

  // Set selected ticket if not set
  useEffect(() => {
    if (!selectedTicket && ticketTypes.length > 0) {
      setSelectedTicket(ticketTypes[0]);
    }
  }, [selectedTicket, ticketTypes]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentEvent.title,
          text: currentEvent.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  // Mock data for demonstration
  const mockBuddies = [
    {
      id: 1,
      name: "Alex Smith",
      interests: ["Music", "Dance"],
      matchScore: 85,
      contactPreference: "email",
      email: "alex.s@example.com",
    },
    {
      id: 2,
      name: "Jordan Lee",
      interests: ["Tech", "Networking"],
      matchScore: 75,
      contactPreference: "phone",
      phone: "+234 XXX XXXX XXX",
    },
  ];

  const toggleLookingForBuddy = () => {
    setLookingForBuddy(!lookingForBuddy);
    if (!lookingForBuddy) {
      setInterestedBuddies(mockBuddies);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Event Banner */}
      <div className="relative h-96">
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{currentEvent.title}</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                {currentEvent.date}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <h2>About This Event</h2>
              <p>{currentEvent.description}</p>
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
                    {currentEvent.venue}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {currentEvent.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {currentEvent.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Purchase */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Get Tickets
              </h3>

              {/* Ticket Types */}
              <div className="space-y-4 mb-6">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.name}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedTicket?.name === ticket.name
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
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
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ₦{ticket.price.toLocaleString()}
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
              {selectedTicket && (
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total
                    </span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      ₦{(selectedTicket.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  to={`../tickets/${currentEvent.id}`}
                  className="w-full inline-flex justify-center items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
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

        {/* Event Buddy Feature */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UsersIcon className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Looking for an Event Buddy?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't go alone! Find someone to enjoy the event with.
                </p>
              </div>
            </div>
            <button
              onClick={toggleLookingForBuddy}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                lookingForBuddy
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              }`}
            >
              <UserIcon className="h-5 w-5" />
              <span>
                {lookingForBuddy ? "Looking for Buddy" : "Find a Buddy"}
              </span>
            </button>
          </div>

          {/* Buddy List */}
          {lookingForBuddy && (
            <div className="mt-6 space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Potential Event Buddies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interestedBuddies.map((buddy) => (
                  <div
                    key={buddy.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {buddy.name}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Interests: {buddy.interests.join(", ")}
                        </p>
                        <div className="mt-2">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {buddy.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Contact via:
                        </p>
                        {buddy.contactPreference === "email" && buddy.email && (
                          <a
                            href={`mailto:${buddy.email}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            ✉️ Email
                          </a>
                        )}
                        {buddy.contactPreference === "phone" && buddy.phone && (
                          <a
                            href={`tel:${buddy.phone}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          >
                            📱 Phone
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
