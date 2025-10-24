import { Home, FileText, CheckCircle, Bell, User, LogOut, Target, ContactRound, SquareMenu, X, SquarePen, Info, NotebookPen } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import HomePage from "./HomePage";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

  const [isOpen, setisOpen] = useState(false);

  const toggleSidebar = () => setisOpen(!isOpen)

   // Close sidebar when a link is clicked (for mobile only)
  const handleNavClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // or your token key
    navigate("/"); // go to Home page
  };


  return (
    <>
    {/* Overlay (dark background when open on mobile) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
        ></div>
      )}

      {/* Mobile Menu Icon */}
      <div className="flex bg-white justify-end w-full absolute top-0 right-0 text-[#0b3b0b] z-50 md:hidden p-2">
        {isOpen ? (
          <X
            size={30}
            onClick={toggleSidebar}
            className="text-[#0b3b0b] cursor-pointer"
          />
        ) : (
          <SquareMenu
            size={30}
            onClick={toggleSidebar}
            className="text-[#0b3b0b] cursor-pointer"
          />
        )}
      </div>


    {/* Sidebar */}
    <div className={`fixed top-0 left-0 h-screen w-64 bg-[#054205] border-r border-green-800 flex flex-col justify-between p-4 text-white transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
      {/* Top Section */}
      <div>
        <h1 className="text-blue-300 text-lg font-bold mb-6 text-center">(NAMSSN)</h1>
        <nav className="space-y-2">
          <SidebarItem to='/home' icon={<Home size={18} />} handleNavClick={handleNavClick} label="Dashboard" />
          <SidebarItem to='/scoreboard' icon={<FileText size={18} />} handleNavClick={handleNavClick} label="Score Board" />
          <SidebarItem to='/complaints' icon={<SquarePen size={18} />} handleNavClick={handleNavClick} label="Complaints" />
          <SidebarItem to='/announce' icon={<Bell size={18} />} handleNavClick={handleNavClick} label="Announcements" />
          <SidebarItem to='/profile' icon={<User size={18} />} handleNavClick={handleNavClick} label="Profile" />
          <SidebarItem to='/#' onClick={handleLogout } icon={<LogOut size={18} />} handleNavClick={handleNavClick} label="Logout" />
        </nav>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2 font-semibold">OTHERS</p>
          <SidebarItem icon={<ContactRound size={18} />} label="Contant Us" to='contact'/>
          <SidebarItem icon={<Info size={18} />} label="About Us" to='about' />
          <SidebarItem icon={<NotebookPen size={18} />} label="My Notes" to='my_notes' />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src="./me.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">Shiffy Anny</p>
          <p className="text-xs text-gray-400">Student</p>
        </div>
      </div>
    </div>
    </>
  );
}
