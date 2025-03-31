import { useState } from "react";
import { motion } from "framer-motion";
import {
  FunnelIcon,
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}

const categories = [
  "All",
  "Music",
  "Sports",
  "Career",
  "Academic",
  "Party",
  "Art",
  "Other",
];

export default function EventFilters({ onFilterChange }: FilterProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    dateRange: {
      start: "",
      end: "",
    },
    priceRange: {
      min: 0,
      max: 50000,
    },
    searchQuery: "",
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search events..."
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FunnelIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange({ category })}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filters.category === category
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {isFiltersOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-4"
        >
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) =>
                    handleFilterChange({
                      dateRange: {
                        ...filters.dateRange,
                        start: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) =>
                    handleFilterChange({
                      dateRange: { ...filters.dateRange, end: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price Range (₦)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) =>
                  handleFilterChange({
                    priceRange: {
                      ...filters.priceRange,
                      min: Number(e.target.value),
                    },
                  })
                }
                placeholder="Min"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) =>
                  handleFilterChange({
                    priceRange: {
                      ...filters.priceRange,
                      max: Number(e.target.value),
                    },
                  })
                }
                placeholder="Max"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Reset Filters */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setFilters({
                  category: "All",
                  dateRange: { start: "", end: "" },
                  priceRange: { min: 0, max: 50000 },
                  searchQuery: "",
                });
                setIsFiltersOpen(false);
              }}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
