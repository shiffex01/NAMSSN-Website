import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Example: check login status (you can store real login data in localStorage)
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the page
  return children;
};

export default ProtectedRoute;
