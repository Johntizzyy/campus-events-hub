import { useState, useEffect } from 'react';
import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/outline";
import EventFilters from '../components/events/EventFilters';
import EventGrid from '../components/events/EventGrid';

const events = [
  {
    id: 1,
    title: "Annual Music Festival",
    date: "2024-04-15",
    location: "University Auditorium",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "₦5,000",
    category: "Music",
  },
  {
    id: 2,
    title: "Tech Career Fair",
    date: "2024-04-20",
    location: "Engineering Complex",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "Free",
    category: "Career",
  },
  {
    id: 3,
    title: "Sports Day",
    date: "2024-04-25",
    location: "University Stadium",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: "₦2,000",
    category: "Sports",
  },
  // Add more events as needed
];

const categories = [
  "All",
  "Music",
  "Sports",
  "Career",
  "Academic",
  "Party",
  "Art",
];

interface Filters {
  category: string;
  dateRange: { start: string; end: string };
  priceRange: { min: number; max: number };
  searchQuery: string;
}

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Upcoming", value: "upcoming" },
];

export default function EventListings() {
  const [filters, setFilters] = useState({
    category: 'All',
    dateRange: { start: '', end: '' },
    priceRange: { min: 0, max: 50000 },
    searchQuery: ''
  });

  const [events, setEvents] = useState([]); // Replace with actual API call

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Discover Events
      </h1>
      <EventFilters onFilterChange={handleFilterChange} />
      <EventGrid events={events} filters={filters} />
    </div>
  );
}
