import { useState } from "react";
import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const notifications = [
  {
    id: 1,
    type: "event_reminder",
    title: "Annual Music Festival",
    message: "Your event starts in 2 days!",
    date: "2024-04-13",
    time: "10:00",
    venue: "University Auditorium",
    read: false,
  },
  {
    id: 2,
    type: "ticket_purchase",
    title: "New Ticket Purchase",
    message: "John Doe purchased 2 tickets for Tech Career Fair",
    date: "2024-04-12",
    time: "15:30",
    read: true,
  },
  {
    id: 3,
    type: "event_update",
    title: "Art Exhibition Update",
    message: "The event time has been changed to 14:00",
    date: "2024-04-11",
    time: "09:15",
    read: false,
  },
  {
    id: 4,
    type: "promotion_ended",
    title: "Promotion Ended",
    message: "Your promotion for Annual Music Festival has ended",
    date: "2024-04-10",
    time: "18:00",
    read: true,
  },
];

export default function Notifications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter(
    (notification) => filter === "all" || !notification.read
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Notifications
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === "unread"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg p-6 shadow ${
                  !notification.read ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === "event_reminder" && (
                      <CalendarIcon className="h-6 w-6 text-blue-600" />
                    )}
                    {notification.type === "ticket_purchase" && (
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    )}
                    {notification.type === "event_update" && (
                      <ClockIcon className="h-6 w-6 text-yellow-600" />
                    )}
                    {notification.type === "promotion_ended" && (
                      <XCircleIcon className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {notification.date} at {notification.time}
                    </div>
                    {notification.venue && (
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPinIcon className="mr-1 h-4 w-4" />
                        {notification.venue}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
