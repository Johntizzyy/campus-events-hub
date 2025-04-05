export interface BuddyPreferences {
  interests: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: "any" | "male" | "female" | "non-binary";
  languagesSpoken?: string[];
}

export interface BuddyRequest {
  userId: string;
  eventId: string;
  status: "pending" | "matched" | "cancelled";
  preferences: BuddyPreferences;
  createdAt: Date;
}

export interface BuddyMatch {
  id: string;
  requesterId: string;
  matchedUserId: string;
  eventId: string;
  matchScore: number;
  status: "pending" | "accepted" | "declined" | "cancelled";
  createdAt: Date;
}

export interface BuddyProfile {
  userId: string;
  name: string;
  interests: string[];
  bio?: string;
  profileImage?: string;
  rating?: number;
  eventsAttended: number;
  languages: string[];
  matchScore?: number;
  contactPreference: "email" | "phone";
  email?: string;
  phone?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}
