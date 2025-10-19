import React from "react";
import { Navigate } from "react-router-dom";

// Simulated authentication check
const isAuthenticated = true; // change to false to test redirect

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
