import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const myEvents = [
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
    ticketsSold: 150,
    totalRevenue: 750000,
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
    ticketsSold: 300,
    totalRevenue: 0,
  },
];

export default function MyEvents() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const handleDelete = (eventId: number) => {
    // Add delete functionality here
    console.log("Delete event:", eventId);
  };

  const handleEdit = (eventId: number) => {
    // Add edit functionality here
    console.log("Edit event:", eventId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Events
            </h1>
            <Link
              to="/post-event"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Create New Event
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {myEvents.map((event) => (
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
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-500">
                        Tickets Sold
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {event.ticketsSold}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-500">
                        Total Revenue
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">
                        ₦{event.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between space-x-2">
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="flex-1 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                  <Link
                    to={`/events/${event.id}/check-in`}
                    className="mt-4 flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <QrCodeIcon className="mr-2 h-4 w-4" />
                    Check-In
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
