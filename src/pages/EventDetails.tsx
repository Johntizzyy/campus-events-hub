import { useState, useEffect } from "react";
import React from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShareIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  StarIcon,
  MegaphoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext";

// Import events data
import { events } from "./Events";

// Import new components
import { EventReviews } from "../components/events/EventReviews";
import { TicketTiers } from "../components/events/TicketTiers";
import { EventAnnouncements } from "../components/events/EventAnnouncements";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [lookingForBuddy, setLookingForBuddy] = useState(false);
  const [interestedBuddies, setInterestedBuddies] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

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

  // Handle tab navigation
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBuyTickets = () => {
    // TODO: Implement ticket purchase logic
    console.log("Buying tickets:", { eventId: currentEvent.id, quantity });
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Event Image */}
          <div className="relative h-96">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {currentEvent.title}
              </h1>
              <div className="flex items-center text-white space-x-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {currentEvent.date}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  7:00 PM
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  {currentEvent.venue}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Event
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentEvent.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <UserGroupIcon className="h-6 w-6 text-primary-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total Attendees
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {currentEvent.attendees}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <TicketIcon className="h-6 w-6 text-primary-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tickets Sold
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {currentEvent.ticketsSold}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Purchase */}
            <div className="lg:col-span-1">
              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Get Tickets
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">
                      {currentEvent.price === 0
                        ? "Free"
                        : `₦${currentEvent.price.toLocaleString()}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per ticket
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white sm:text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "ticket" : "tickets"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Price
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentEvent.price === 0
                        ? "Free"
                        : `₦${(
                            currentEvent.price * quantity
                          ).toLocaleString()}`}
                    </p>
                  </div>

                  <button
                    onClick={handleBuyTickets}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    {currentEvent.price === 0 ? "Register Now" : "Buy Tickets"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabClick("details")}
              className={`${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Details
            </button>
            <button
              onClick={() => handleTabClick("tickets")}
              className={`${
                activeTab === "tickets"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <TicketIcon className="h-4 w-4 mr-1" />
              Tickets
            </button>
            <button
              onClick={() => handleTabClick("reviews")}
              className={`${
                activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <StarIcon className="h-4 w-4 mr-1" />
              Reviews
            </button>
            <button
              onClick={() => handleTabClick("announcements")}
              className={`${
                activeTab === "announcements"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <MegaphoneIcon className="h-4 w-4 mr-1" />
              Announcements
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "details" && (
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
        )}

        {activeTab === "tickets" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <TicketTiers eventId={id!} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <EventReviews eventId={id!} />
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <EventAnnouncements eventId={id!} isOrganizer={false} />
          </div>
        )}

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
