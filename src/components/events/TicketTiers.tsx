import React, { useState } from "react";
import { usePayment } from "../../contexts/PaymentContext";
import { TicketTier as TicketTierType } from "../../types/payment";

interface TicketTiersProps {
  eventId: string;
}

export const TicketTiers: React.FC<TicketTiersProps> = ({ eventId }) => {
  const { ticketTiers, loading, error, createTicketTier, processPayment } =
    usePayment();

  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const eventTiers = ticketTiers.filter((tier) => tier.eventId === eventId);

  const handlePurchase = async () => {
    if (!selectedTier) return;

    const tier = eventTiers.find((t) => t.id === selectedTier);
    if (!tier) return;

    try {
      await processPayment({
        userId: "current-user-id", // TODO: Get from auth context
        eventId,
        ticketTierId: selectedTier,
        amount: tier.price * quantity,
        status: "pending",
        paymentMethod,
        transactionId: "", // Will be generated by payment gateway
      });
    } catch (err) {
      console.error("Failed to process payment:", err);
    }
  };

  if (loading) {
    return <div>Loading ticket tiers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Ticket Tiers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTiers.map((tier) => (
          <div
            key={tier.id}
            className={`p-6 rounded-lg border-2 ${
              selectedTier === tier.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
            <p className="text-gray-600 mb-4">{tier.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">
                ₦{tier.price.toLocaleString()}
              </span>
              <span className="text-gray-500"> / ticket</span>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {tier.availableQuantity} tickets remaining
              </span>
            </div>
            <ul className="mb-6 space-y-2">
              {tier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedTier(tier.id)}
              className={`w-full py-2 px-4 rounded-md ${
                selectedTier === tier.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      {selectedTier && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Complete Purchase</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>
            <div className="pt-4">
              <button
                onClick={handlePurchase}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
