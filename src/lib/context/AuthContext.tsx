"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setUser } from "@/lib/feature/userSlice";
import { setToken } from "@/lib/feature/tokenSlice";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);

  const isAuthenticated = !!(user.email && token.value);

  useEffect(() => {
    // Check if user data exists in localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    console.log("🔍 AuthProvider - Checking stored auth data:");
    console.log("📦 Stored user:", storedUser);
    console.log("🔑 Stored token:", storedToken ? "***exists***" : "***missing***");
    console.log("🔍 Current Redux user:", user);
    console.log("🔍 Current Redux token:", token);
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("📥 Loading user from localStorage:", parsedUser);
        
        // Restore user data to Redux if not already there
        if (!user.email) {
          dispatch(setUser(parsedUser));
        }
        if (!token.value) {
          dispatch(setToken({ value: storedToken }));
        }
      } catch (error) {
        console.error("❌ Error parsing stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    
    setIsLoading(false);
  }, [dispatch, user.email, token.value]);

  useEffect(() => {
    console.log("🔍 Auth state changed:");
    console.log("✅ Is authenticated:", isAuthenticated);
    console.log("⏳ Is loading:", isLoading);
  }, [isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};