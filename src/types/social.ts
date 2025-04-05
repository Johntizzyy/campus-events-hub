export interface Review {
  id: string;
  userId: string;
  eventId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  eventHistory: string[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventDiscussion {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  replies: EventDiscussion[];
}

export interface EventAnnouncement {
  id: string;
  eventId: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
