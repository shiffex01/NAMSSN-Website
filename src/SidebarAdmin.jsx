import React from 'react';
import { NavLink } from "react-router-dom"

function SidebarAdmin({ icon, label, to, handleNavClick, active }) {
    return (
     <NavLink
      to={to}
      onClick= {handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
          isActive || active ? "bg-[#AED7D2] font-bold text-[#122F2B]" : "hover:bg-[#122F2B] text-white"
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

export default SidebarAdmin;
