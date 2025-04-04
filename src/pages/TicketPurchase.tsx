import { useState } from "react";
// import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCardIcon, QrCodeIcon } from "@heroicons/react/24/outline";

// Mock data - replace with API call
const event = {
  id: 1,
  title: "Annual Music Festival",
  date: "2024-04-15",
  time: "6:00 PM",
  location: "University Auditorium",
  image:
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ticketType: "VIP",
  price: "₦10,000",
  quantity: 2,
};

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    icon: CreditCardIcon,
    description: "Pay with your credit or debit card",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: CreditCardIcon,
    description: "Transfer directly from your bank account",
  },
];

export default function TicketPurchase() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    // For now, just navigate to success page
    navigate("tickets/success");
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Event Details */}
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Ticket Type
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {event.ticketType}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Quantity
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {event.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Price per ticket
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {event.price}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ₦
                    {parseInt(event.price.replace(/[^0-9]/g, "")) *
                      event.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Details
              </h2>

              {/* Payment Methods */}
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPayment.id === method.id
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-500"
                    }`}
                    onClick={() => setSelectedPayment(method)}
                  >
                    <div className="flex items-center">
                      <method.icon className="h-6 w-6 text-gray-400 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                  />
                </div>

                {selectedPayment.id === "card" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border-0 py-2 px-4 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
