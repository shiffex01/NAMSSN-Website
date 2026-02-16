import React from 'react';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, CheckCircle, CircleAlert, Settings, ChartNoAxesColumn, Bell, User, LogOut, Target, ContactRound, SquareMenu, X, SquarePen, Info, NotebookPen, CircleUser} from "lucide-react";
import SidebarAdmin from './SidebarAdmin';


function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen)

    // Close sidebar when a link is clicked (for mobile only)
    const handleNavClick = () => {
        if (window.innerWidth < 768) setIsOpen(false);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
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
            <div className="flex justify-end absolute top-10 right-0 text-[#122F2B] z-50 md:hidden p-2">
                {isOpen ? (
                <X
                    size={40}
                    onClick={toggleSidebar}
                    className="text-white cursor-pointer"
                />
                ) : (
                <SquareMenu
                    size={40}
                    onClick={toggleSidebar}
                    className="text-white cursor-pointer"
                />
                )}
            </div>


            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-[#122F2B] border-[#122F2B]/40 flex flex-col justify-between pt-4 text-white transition-transform duration-300 z-40 border-r border-r-white
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
            {/* Top Section */}
                <div>
                    <div className='text-white flex items-center justify-center flex-col pb-2 border-b border-b-white'>
                        <img src='/logoimg.png' alt="namssn logo" className='size-20'/>
                        <h1 className="text-lg font-bold text-center">(NAMSSN)</h1>
                    </div>
                    <nav className="space-y-2 p-4">
                    <SidebarAdmin to='/admin/admin_dashboard' icon={<Home size={18} />} handleNavClick={handleNavClick} label="Dashboard" />
                    <SidebarAdmin to='/admin/score_manage' icon={<ChartNoAxesColumn size={18} />} handleNavClick={handleNavClick} label="Score Management" />
                    <SidebarAdmin to='/admin/complaint_tickets' icon={<CircleAlert size={18} />} handleNavClick={handleNavClick} label="Complaint Tickets" />
                    <SidebarAdmin to='/admin/user_manage' icon={<User size={18} />} handleNavClick={handleNavClick} label="User Management" />
                    <SidebarAdmin to='/admin/admin_announce' icon={<Bell size={18} />} handleNavClick={handleNavClick} label="Announcements" />
                    <SidebarAdmin to='/admin/system_set' icon={<Settings size={18} />} handleNavClick={handleNavClick} label="System Settings" />
                    <SidebarAdmin to='/#' onClick={handleLogout } icon={<LogOut size={18} />} handleNavClick={handleNavClick} label="Logout" />
                    </nav>

                    <div className="mt-6 p-4 border-t border-t-white text-gray-100">
                    <p className="text-sm mb-2 font-semibold">OTHERS</p>
                    <SidebarAdmin icon={<ContactRound size={18} />} label="Contant Us" to='contact'/>
                    <SidebarAdmin icon={<Info size={18} />} label="About Us" to='about' />
                    </div>

                    <div className="mt-28 p-4 text-gray-100">
                    <SidebarAdmin icon={<CircleUser size={20} />} label="Mr Raj" to='profile' />
                    <p className="text-gray-200 ml-10 text-sm ">Administrator</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSidebar;