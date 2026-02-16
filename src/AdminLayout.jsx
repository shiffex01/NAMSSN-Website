import AdminDashboard from "./AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ScoreManagement from "./ScoreManagement";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; 


export default function AdminLayout() {

  // Page Title Assigning
  const pageTitles = {
    '/admin/admin_dashboard': 'ADMIN DASHBOARD',
    '/admin/score_manage': "SCORE MANAGEMENT",
    '/admin/complaint_tickets': "COMPLAINT TICKETS",
    '/admin/user_manage': "USER MANAGEMENT",
    '/admin/admin_announce': "MANAGE ANNOUNCEMENTS",
    '/admin/system_set': "SYSTEM SETTINGS"
  }
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "";
 // hide admin sidebar on student info page
  const hideAdminSidebar = location.pathname.startsWith("/admin/student_info/");

  return (
    <div className="min-h-screen overflow-y-auto w-full fixed bg-[#122F2B] text-white p-4 md:pl-4">
      {!hideAdminSidebar && <AdminSidebar />}
        <h1 className='relative md:left-64 top-12 font-extrabold text-3xl'> {currentTitle} </h1>
        <AdminSidebar/>
        <div className='bg-white md:ml-60 relative top-24 h-screen'>
            <Routes>
              <Route path="/admin/admin_dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                    <ScoreManagement/>
                  </ProtectedRoute>
                } />
            </Routes>
          <Outlet /> 
        </div>
    </div>
  );
}
