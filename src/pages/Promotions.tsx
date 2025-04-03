import { useState } from "react";
import {
  MegaphoneIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const promotions = [
  {
    id: 1,
    eventTitle: "Annual Music Festival",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    budget: 50000,
    status: "active",
    impressions: 15000,
    clicks: 1200,
    conversions: 45,
  },
  {
    id: 2,
    eventTitle: "Tech Career Fair",
    startDate: "2024-03-20",
    endDate: "2024-04-20",
    budget: 30000,
    status: "active",
    impressions: 8000,
    clicks: 600,
    conversions: 30,
  },
  {
    id: 3,
    eventTitle: "Art Exhibition",
    startDate: "2024-02-10",
    endDate: "2024-03-10",
    budget: 20000,
    status: "completed",
    impressions: 10000,
    clicks: 800,
    conversions: 40,
  },
];

const promotionTypes = [
  {
    id: 1,
    name: "Basic",
    price: 5000,
    duration: "7 days",
    features: [
      "Featured in category listings",
      "Basic analytics",
      "Email notifications",
    ],
  },
  {
    id: 2,
    name: "Premium",
    price: 15000,
    duration: "14 days",
    features: [
      "Featured on homepage",
      "Advanced analytics",
      "Priority email notifications",
      "Social media promotion",
    ],
  },
  {
    id: 3,
    name: "Elite",
    price: 30000,
    duration: "30 days",
    features: [
      "Featured on homepage",
      "Premium analytics",
      "Priority email notifications",
      "Social media promotion",
      "Push notifications",
      "Custom promotion period",
    ],
  },
];

export default function Promotions() {
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(
    null
  );
  const [showPromotionTypes, setShowPromotionTypes] = useState(false);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6 py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Promotions
            </h1>
            <button
              onClick={() => setShowPromotionTypes(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <MegaphoneIcon className="mr-2 h-4 w-4" />
              Create Promotion
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Budget
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        ₦
                        {promotions
                          .reduce((sum, p) => sum + p.budget, 0)
                          .toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Impressions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {promotions
                          .reduce((sum, p) => sum + p.impressions, 0)
                          .toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Clicks
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {promotions
                          .reduce((sum, p) => sum + p.clicks, 0)
                          .toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Conversions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {promotions
                          .reduce((sum, p) => sum + p.conversions, 0)
                          .toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">
              Active Promotions
            </h2>
            <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {promotions.map((promotion) => (
                    <tr key={promotion.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {promotion.eventTitle}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {promotion.startDate} to {promotion.endDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ₦{promotion.budget.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            promotion.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {promotion.status === "active"
                            ? "Active"
                            : "Completed"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>
                            Impressions:{" "}
                            {promotion.impressions.toLocaleString()}
                          </span>
                          <span>
                            Clicks: {promotion.clicks.toLocaleString()}
                          </span>
                          <span>
                            Conversions:{" "}
                            {promotion.conversions.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showPromotionTypes && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">
                Promotion Types
              </h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {promotionTypes.map((type) => (
                  <div
                    key={type.id}
                    className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {type.name}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {type.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ₦{type.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {type.duration}
                      </span>
                    </div>
                    <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      Select
                    </button>
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
