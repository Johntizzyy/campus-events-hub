import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'organizer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null); 