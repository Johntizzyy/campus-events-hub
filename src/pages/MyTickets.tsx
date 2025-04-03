import { useState } from "react";
import {
  QrCodeIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const tickets = [
  {
    id: 1,
    eventTitle: "Annual Music Festival",
    date: "2024-04-15",
    time: "18:00",
    venue: "University Auditorium",
    ticketNumber: "TICKET-001",
    price: 5000,
    status: "valid",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-001",
  },
  {
    id: 2,
    eventTitle: "Tech Career Fair",
    date: "2024-04-20",
    time: "10:00",
    venue: "Engineering Complex",
    ticketNumber: "TICKET-002",
    price: 0,
    status: "valid",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-002",
  },
  {
    id: 3,
    eventTitle: "Art Exhibition",
    date: "2024-03-10",
    time: "14:00",
    venue: "Art Gallery",
    ticketNumber: "TICKET-003",
    price: 2500,
    status: "used",
    qrCode:
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKET-003",
  },
];

export default function MyTickets() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Tickets
            </h1>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ticket.eventTitle}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ticket.status === "valid"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.status === "valid" ? "Valid" : "Used"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {ticket.date} at {ticket.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      {ticket.venue}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Ticket #{ticket.ticketNumber}
                      </span>
                      <span className="font-medium text-gray-900">
                        {ticket.price === 0
                          ? "Free"
                          : `₦${ticket.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <img
                      src={ticket.qrCode}
                      alt={`QR Code for ${ticket.eventTitle}`}
                      className="h-32 w-32"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedTicket(ticket.id)}
                      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <QrCodeIcon className="mr-2 h-4 w-4" />
                      Show QR Code
                    </button>
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
