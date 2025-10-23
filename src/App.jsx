import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Verifications from "./Verifications";
import Scoreboard from "./Scoreboard";
import Complaints from "./Complaints";
import Announcement from "./Announcement";
import Profile from "./Profile";
import Login from "./Login"; // ✅ make sure this matches your file name

function Layout() {
  const location = useLocation();

  // Hide sidebar on login page
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="flex min-h-screen bg-[#041b04] text-white">
      {!hideSidebar && <Sidebar />}

      <main className={`${!hideSidebar ? "md:ml-64 md:mt-0 mt-16" : ""} p-4 min-h-screen w-full`}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected / Dashboard Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/verify" element={<Verifications />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/announce" element={<Announcement />} />
          <Route path="/profile" element={<Profile />} />

          {/* Default redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
