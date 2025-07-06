"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LoginRequiredModal from "./LoginRequiredModal";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/auth"];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // If not loading, not authenticated, and trying to access protected route
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isAuthenticated, isLoading, isPublicRoute]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated or on public route, render children
  if (isAuthenticated || isPublicRoute) {
    return <>{children}</>;
  }

  // If not authenticated and on protected route, show modal and prevent rendering
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <LoginRequiredModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Access Restricted
        </h2>
        <p className="text-muted-foreground">
          Please log in to access this page.
        </p>
      </div>
    </div>
  );
};

export default ProtectedRoute;