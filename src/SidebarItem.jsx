import React from 'react';
import { NavLink } from "react-router-dom"

function SidebarItem({ icon, label, to, handleNavClick, active }) {
    return (
     <NavLink
      to={to}
      onClick= {handleNavClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${
          isActive || active ? "bg-green-700/60 text-white" : "hover:bg-green-800/40 text-gray-300"
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

export default SidebarItem;
