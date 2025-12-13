import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
  const { user } = useAuth(); // ✅ now it matches the requirement

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
