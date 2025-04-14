import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AttendeeLayout from "./layouts/AttendeeLayout";
import OrganizerLayout from "./layouts/OrganizerLayout";

// Pages and Components
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import MyEvents from "./pages/MyEvents";
import MyTickets from "./pages/MyTickets";
import Earnings from "./pages/Earnings";
import Promotions from "./pages/Promotions";
import Messages from "./pages/Messages";

// Contexts
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Check if user exists and has the correct type for the route
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate
                to={
                  user?.userType === "organizer"
                    ? "/organizer-dashboard"
                    : "/attendee-dashboard"
                }
                replace
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Attendee Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AttendeeLayout>
              <Outlet />
            </AttendeeLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-tickets" element={<MyTickets />} />
      </Route>

      {/* Organizer Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <OrganizerLayout>
              <Outlet />
            </OrganizerLayout>
          </ProtectedRoute>
        }
      >
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/promotions" element={<Promotions />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppRoutes />
            <Toaster position="top-right" />
          </Router>
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
