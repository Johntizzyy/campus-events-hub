import { useState } from "react";
import {
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const checkIns = [
  {
    id: 1,
    ticketNumber: "TICKET-001",
    attendeeName: "John Doe",
    checkInTime: "2024-04-15 17:45",
    status: "checked_in",
  },
  {
    id: 2,
    ticketNumber: "TICKET-002",
    attendeeName: "Jane Smith",
    checkInTime: "2024-04-15 17:50",
    status: "checked_in",
  },
  {
    id: 3,
    ticketNumber: "TICKET-003",
    attendeeName: "Bob Johnson",
    checkInTime: null,
    status: "pending",
  },
];

export default function EventCheckIn() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleCheckIn = () => {
    // Simulate ticket validation
    const ticket = checkIns.find((t) => t.ticketNumber === ticketNumber);
    if (ticket) {
      if (ticket.status === "checked_in") {
        setScanResult({
          success: false,
          message: "Ticket already checked in",
        });
      } else {
        setScanResult({
          success: true,
          message: "Check-in successful",
        });
        // Update ticket status in a real application
      }
    } else {
      setScanResult({
        success: false,
        message: "Invalid ticket number",
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Event Check-In
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-900">Scan Ticket</h2>
              <div className="mt-4">
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                  <QrCodeIcon className="h-24 w-24 text-gray-400" />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="ticket-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Or enter ticket number
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="ticket-number"
                      id="ticket-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter ticket number"
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={handleCheckIn}
                    >
                      Check In
                    </button>
                  </div>
                </div>
                {scanResult && (
                  <div
                    className={`mt-4 rounded-md p-4 ${
                      scanResult.success ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {scanResult.success ? (
                          <CheckCircleIcon
                            className="h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="ml-3">
                        <p
                          className={`text-sm font-medium ${
                            scanResult.success
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {scanResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Check-Ins
              </h2>
              <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ticket #
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Attendee
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Check-In Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {checkIns.map((checkIn) => (
                      <tr key={checkIn.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {checkIn.ticketNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {checkIn.attendeeName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {checkIn.checkInTime || "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              checkIn.status === "checked_in"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {checkIn.status === "checked_in"
                              ? "Checked In"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
