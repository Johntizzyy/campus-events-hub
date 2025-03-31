import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import EventListings from "./pages/EventListings";
import EventDetails from "./pages/EventDetails";
import TicketPurchase from "./pages/TicketPurchase";
import PostEvent from "./pages/PostEvent";
import Promotions from "./pages/Promotions";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
// import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Success from "./pages/Success";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<EventListings />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="tickets/:eventId" element={<TicketPurchase />} />
            <Route path="post-event" element={<PostEvent />} />
            <Route path="events/success" element={<Success />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="about" element={<About />} />
            {/* <Route path="help" element={<Help />} /> */}
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
