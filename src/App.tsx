import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
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
import { SocialProvider } from "./contexts/SocialContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { Layout } from "./components/layout/Layout";
import { UserProfile } from "./components/user/UserProfile";
import { EventReviews } from "./components/events/EventReviews";
import { TicketTiers } from "./components/events/TicketTiers";
import { DirectMessages } from "./components/messaging/DirectMessages";
import { EventAnnouncements } from "./components/events/EventAnnouncements";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

// Get the basename from the current URL
const basename = window.location.pathname.includes("/campus-events-hub")
  ? "/campus-events-hub"
  : "";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

// Wrapper components to handle route parameters
const UserProfileWrapper = () => {
  const { id } = useParams();
  return <UserProfile userId={id!} />;
};

const EventReviewsWrapper = () => {
  const { id } = useParams();
  return <EventReviews eventId={id!} />;
};

const TicketTiersWrapper = () => {
  const { id } = useParams();
  return <TicketTiers eventId={id!} />;
};

const DirectMessagesWrapper = () => {
  const { userId } = useParams();
  return <DirectMessages recipientId={userId!} recipientName="User" />;
};

const EventAnnouncementsWrapper = () => {
  const { id } = useParams();
  return <EventAnnouncements eventId={id!} isOrganizer={false} />;
};

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <SocialProvider>
          <PaymentProvider>
            <QueryClientProvider client={queryClient}>
              <Router basename={basename}>
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
                    <Route
                      path="tickets/:eventId"
                      element={<TicketPurchase />}
                    />
                    <Route path="post-event" element={<PostEvent />} />
                    <Route path="events" element={<Events />} />
                    <Route path="events/success" element={<Success />} />
                    <Route path="events/:id" element={<EventDetails />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="my-events" element={<MyEvents />} />
                    <Route path="my-tickets" element={<MyTickets />} />
                    <Route path="earnings" element={<Earnings />} />
                    <Route path="promotions" element={<Promotions />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="check-in" element={<EventCheckIn />} />
                    <Route path="profile" element={<UserDashboard />} />
                    <Route path="messages" element={<Messages />} />
                  </Route>

                  <Route
                    path="/profile/:id"
                    element={
                      <PrivateRoute>
                        <UserProfileWrapper />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/events/:id/reviews"
                    element={<EventReviewsWrapper />}
                  />
                  <Route
                    path="/events/:id/tickets"
                    element={<TicketTiersWrapper />}
                  />
                  <Route
                    path="/messages/:userId"
                    element={
                      <PrivateRoute>
                        <DirectMessagesWrapper />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/events/:id/announcements"
                    element={<EventAnnouncementsWrapper />}
                  />
                </Routes>
                <Toaster position="top-right" />
              </Router>
            </QueryClientProvider>
          </PaymentProvider>
        </SocialProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
