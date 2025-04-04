import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Pricing from "./pages/Pricing";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import MyTickets from "./pages/MyTickets";
import Earnings from "./pages/Earnings";
import Promotions from "./pages/Promotions";
import Notifications from "./pages/Notifications";
import EventCheckIn from "./pages/EventCheckIn";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename="/campus-events-hub">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="about" element={<About />} />
                <Route path="help" element={<Help />} />
                <Route path="terms" element={<Terms />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="events" element={<EventListings />} />
                <Route path="events/:id" element={<EventDetails />} />
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
                <Route path="home" element={<AuthenticatedHome />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="tickets/:eventId" element={<TicketPurchase />} />
                <Route path="post-event" element={<PostEvent />} />
                <Route path="events/success" element={<Success />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="my-events" element={<MyEvents />} />
                <Route path="my-tickets" element={<MyTickets />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="promotions" element={<Promotions />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="check-in" element={<EventCheckIn />} />
                <Route path="profile" element={<UserDashboard />} />
              </Route>
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
