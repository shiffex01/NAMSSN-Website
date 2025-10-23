import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import SidebarItem from './SidebarItem'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Verifications from "./Verifications";
import Scoreboard from "./Scoreboard";
import Complaints from "./Complaints";
import Announcement from "./Announcement";

function App() {

  return (
    <Router>
      <div className="flex min-h-screen bg-[#041b04] text-white">
        <Sidebar />

        <main className="md:ml-64 md:mt-0 mt-16 p-4 min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="scoreboard" element={<Scoreboard/>} />
            <Route path="verify" element={<Verifications/>} />
            <Route path="complaints" element={<Complaints/>} />
            <Route path="announce" element={<Announcement/>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
