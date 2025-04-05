import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  Review,
  EventDiscussion,
  EventAnnouncement,
  DirectMessage,
} from "../types/social";

interface SocialContextType {
  userProfile: UserProfile | null;
  reviews: Review[];
  discussions: EventDiscussion[];
  announcements: EventAnnouncement[];
  messages: DirectMessage[];
  loading: boolean;
  error: string | null;
  fetchUserProfile: (userId: string) => Promise<void>;
  addReview: (
    review: Omit<Review, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  addDiscussion: (
    discussion: Omit<EventDiscussion, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  addAnnouncement: (
    announcement: Omit<EventAnnouncement, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  sendMessage: (
    message: Omit<DirectMessage, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [discussions, setDiscussions] = useState<EventDiscussion[]>([]);
  const [announcements, setAnnouncements] = useState<EventAnnouncement[]>([]);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      // TODO: Implement API call to fetch user profile
      // const response = await api.get(`/users/${userId}`);
      // setUserProfile(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (
    review: Omit<Review, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to add review
      // const response = await api.post('/reviews', review);
      // setReviews(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const addDiscussion = async (
    discussion: Omit<EventDiscussion, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to add discussion
      // const response = await api.post('/discussions', discussion);
      // setDiscussions(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add discussion");
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (
    announcement: Omit<EventAnnouncement, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to add announcement
      // const response = await api.post('/announcements', announcement);
      // setAnnouncements(prev => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add announcement"
      );
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (
    message: Omit<DirectMessage, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      // TODO: Implement API call to send message
      // const response = await api.post('/messages', message);
      // setMessages(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      setLoading(true);
      // TODO: Implement API call to mark message as read
      // await api.put(`/messages/${messageId}/read`);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to mark message as read"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SocialContext.Provider
      value={{
        userProfile,
        reviews,
        discussions,
        announcements,
        messages,
        loading,
        error,
        fetchUserProfile,
        addReview,
        addDiscussion,
        addAnnouncement,
        sendMessage,
        markMessageAsRead,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
};
