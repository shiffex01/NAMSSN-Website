import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Verifications from "./Verifications";
import Scoreboard from "./Scoreboard";
import Complaints from "./Complaints";
import Announcement from "./Announcement";
import Profile from "./Profile";
import Login from "./Login"; 
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";

function Layout() {
  const location = useLocation();

  // Hide sidebar on login and home pages
  const hideSidebar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="flex min-h-screen bg-[#041b04] text-white">
      {!hideSidebar && <Sidebar />}

      <main className={`${!hideSidebar ? "md:ml-64 md:mt-0 mt-16" : ""} p-4 min-h-screen w-full`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scoreboard"
            element={
              <ProtectedRoute>
                <Scoreboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announce"
            element={
              <ProtectedRoute>
                <Announcement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Default redirect for unknown routes */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
