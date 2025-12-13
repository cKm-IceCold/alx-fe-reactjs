import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // Redirect unauthenticated users to the login page
    // The 'replace' prop ensures the unauthorized page isn't added to the history stack
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;