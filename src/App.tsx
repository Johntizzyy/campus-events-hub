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
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Success from "./pages/Success";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router basename="/campus-events-hub">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<EventListings />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tickets/:eventId"
                element={
                  <ProtectedRoute>
                    <TicketPurchase />
                  </ProtectedRoute>
                }
              />
              <Route
                path="post-event"
                element={
                  <ProtectedRoute>
                    <PostEvent />
                  </ProtectedRoute>
                }
              />
              <Route path="events/success" element={<Success />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="about" element={<About />} />
              <Route path="help" element={<Help />} />
              <Route path="terms" element={<Terms />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
