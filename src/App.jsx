import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Scoreboard from "./Scoreboard";
import Complaints from "./Complaints";
import Announcement from "./Announcement";
import Profile from "./Profile";
import StudentLogin from "./StudentLogin"; 
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";
import AdminLogin from "./AdminLogin";
import StudentSignup from "./StudentSignUp";
import AdminSignup from "./AdminSignup";
import AdminDashboard from "./AdminDashboard"
import ScoreManagement from "./ScoreManagement";
import AdminPage from "./AdminPage";
import AdminLayout from "./AdminLayout";
import EditProfile from "./EditProfile";
import AdminComplaints from "./AdminComplaints";
import UserManagement from "./UserManagement";
import PerStudentsInfo from "./PerstudentsInfo";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminSystemSettings from "./AdminSystemSettings";

function Layout() {
  const location = useLocation();

  // Hide sidebar on login and home pages
  const hideSidebar = location.pathname === "/" || location.pathname === "/student_login" || location.pathname === "/admin_login" || location.pathname === "/student_signup" || location.pathname === "/admin_signup" || location.pathname === "/edit_profile"
  return (
    <div className="flex min-h-screen bg-[#041b04] text-white">
      {!hideSidebar && <Sidebar />}

      <main className={`${!hideSidebar ? "md:ml-64 md:mt-0 mt-16" : ""} p-4 min-h-screen w-full`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/student_login" element={<StudentLogin />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/student_signup" element={<StudentSignup />} />
          <Route path="/admin_signup" element={<AdminSignup />} />
          <Route path="/edit_profile" element={<EditProfile />} />

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
        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="admin_dashboard" element={<AdminDashboard />} />
          <Route path="score_manage" element={<ScoreManagement />} />
          <Route path="complaint_tickets" element={<AdminComplaints/>}/>
          <Route path="user_manage" element={<UserManagement/>}/>
          <Route path="student_info/:reg_number" element={<PerStudentsInfo/>}/>
          <Route path="admin_announce" element={<AdminAnnouncements/>}/>
          <Route path="system_set" element={<AdminSystemSettings/>}/>

        </Route>

        {/* Student / User Layout */}
        <Route path="/*" element={<Layout />} />

      </Routes>
    </Router>
  );
}

export default App;
