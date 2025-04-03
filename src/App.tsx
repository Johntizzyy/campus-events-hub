import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";

// Pages
import Home from "./pages/Home";
import AuthenticatedHome from "./pages/AuthenticatedHome";
import EventListings from "./pages/EventListings";
import EventDetails from "./pages/EventDetails";
import TicketPurchase from "./pages/TicketPurchase";
import PostEvent from "./pages/PostEvent";
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
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<EventListings />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="about" element={<About />} />
              <Route path="help" element={<Help />} />
              <Route path="terms" element={<Terms />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout>
                    <Outlet />
                  </AuthenticatedLayout>
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<AuthenticatedHome />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/tickets/:eventId" element={<TicketPurchase />} />
              <Route path="/post-event" element={<PostEvent />} />
              <Route path="/events/success" element={<Success />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
