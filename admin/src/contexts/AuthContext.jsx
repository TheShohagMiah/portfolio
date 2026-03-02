import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

// Create an axios instance with withCredentials enabled for cookies
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Auth Status on Load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check-auth");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 2. Login Function
  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Welcome back!");
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
      return { success: false, msg };
    }
  };

  // 3. Logout Function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
