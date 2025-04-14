import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  CalendarIcon,
  TicketIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const attendeeNavigation = [
  { name: "Home", href: "/attendee", icon: HomeIcon },
  { name: "Events", href: "/attendee/events", icon: CalendarIcon },
  { name: "My Tickets", href: "/attendee/my-tickets", icon: TicketIcon },
  { name: "Profile", href: "/attendee/profile", icon: UserCircleIcon },
];

export default function AttendeeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-primary-600">
            EventHub
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {attendeeNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <item.icon
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-200"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center space-x-3 p-2 rounded-md bg-gray-50 dark:bg-gray-700">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.photoUrl}
                alt=""
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-200 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Mobile menu button */}
        {!isSidebarOpen && (
          <div className="fixed top-0 left-0 z-40 p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
