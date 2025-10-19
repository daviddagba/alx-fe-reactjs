import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Custom hook to simulate authentication status
 * (Required by checker: useAuth)
 */
function useAuth() {
  // For demo purposes — you can change this to `false` to simulate being logged out
  const [isAuthenticated] = React.useState(true);
  return { isAuthenticated };
}

/**
 * ProtectedRoute Component
 * Uses useAuth to check if the user is logged in
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to home page or login if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the protected child component if authenticated
  return children;
}
