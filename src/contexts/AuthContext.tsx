import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      // Add your login logic here
      // For now, we'll just simulate a successful login
      setUser({
        id: "1",
        name: "Test User",
        email: email,
      });
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Add your signup logic here
      // For now, we'll just simulate a successful signup
      setUser({
        id: "1",
        name: name,
        email: email,
      });
      setIsAuthenticated(true);
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
