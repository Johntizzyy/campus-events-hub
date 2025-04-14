import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  userType: "attendee" | "organizer";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string,
    userType: "attendee" | "organizer"
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const login = async (email: string, password: string) => {
    try {
      // Add your login logic here
      // For now, we'll just simulate a successful login
      const newUser = {
        id: "1",
        name: "Test User",
        email: email,
        photoUrl: "https://ui-avatars.com/api/?name=Test+User",
        userType: "attendee", // Default to attendee for now
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    userType: "attendee" | "organizer"
  ) => {
    try {
      // Add your signup logic here
      // For now, we'll just simulate a successful signup
      const newUser = {
        id: "1",
        name: name,
        email: email,
        photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}`,
        userType: userType,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}
