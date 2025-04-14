import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  UserIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  TicketIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import QRScanner from "../events/QRScanner";

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const [showScanner, setShowScanner] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any navigation
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section with logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                Campus Events
              </span>
            </div>

            {/* Center section with search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Right section with user menu */}
            <div className="flex items-center">
              <button
                onClick={() => setShowScanner(true)}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Scan QR Code"
              >
                <QrCodeIcon className="h-6 w-6" />
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Messages Icon */}
                  <Link
                    to="/messages"
                    className="text-gray-900 hover:text-blue-600 relative"
                  >
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Link>

                  {/* Notifications Icon */}
                  <Link
                    to="/notifications"
                    className="text-gray-900 hover:text-blue-600 relative"
                  >
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      5
                    </span>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 focus:outline-none"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="hidden md:block">
                        {user.name || "User"}
                      </span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <Link
                          to={`/profile/${user.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2" />
                            My Profile
                          </div>
                        </Link>
                        <Link
                          to="/my-tickets"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <TicketIcon className="h-4 w-4 mr-2" />
                            My Tickets
                          </div>
                        </Link>
                        <Link
                          to="/my-events"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            My Events
                          </div>
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <Cog6ToothIcon className="h-4 w-4 mr-2" />
                            Settings
                          </div>
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={signOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                            Sign Out
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signin"
                    className="text-gray-900 hover:text-blue-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showScanner && <QRScanner onClose={() => setShowScanner(false)} />}
    </>
  );
};
