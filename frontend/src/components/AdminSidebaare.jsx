import React, { useContext, useEffect } from "react";
import { StoreContext } from '../context/store';
import { NavLink, useNavigate } from "react-router-dom";
import { admin } from "../images/image"; // Ensure this path is correct
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout, getAllReports, allReports } = useContext(StoreContext);

  // Calculate unread reports
  const unReadReports = allReports?.filter((report) => !report.isRead) || [];
  const numberOfUnReadReports = unReadReports.length;

  useEffect(() => {
    getAllReports();
  }, []);

  // Base classes for navigation links
  const baseLinkClass = "group flex items-center gap-3 px-3 py-2.5 mx-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out";
  
  // Active vs Inactive styles
  const activeLinkClass = "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200/50";
  const inactiveLinkClass = "text-gray-500 hover:bg-gray-100 hover:text-gray-900";

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 flex flex-col font-sans">
      
      {/* --- 1. BRAND HEADER --- */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-gray-50/30">
        <div className="flex items-center gap-2 text-blue-700">
          <ShieldCheck size={24} strokeWidth={2.5} />
          <span className="text-lg font-bold tracking-tight text-gray-800">Admin<span className="text-blue-600">Panel</span></span>
        </div>
      </div>

      {/* --- 2. NAVIGATION LINKS --- */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        
        <div className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Menu
        </div>

        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin/allReport" 
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
        >
          <FileText size={20} />
          <span className="flex-1">All Reports</span>
          
          {/* Unread Count Badge */}
          {numberOfUnReadReports > 0 && (
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
              {numberOfUnReadReports}
            </span>
          )}
        </NavLink>

        <NavLink 
          to="/admin/notification" 
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
        >
          <Bell size={20} />
          <span>Notifications</span>
        </NavLink>

        <div className="px-6 mt-8 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Preferences
        </div>

        <NavLink 
          to="/admin/setting" 
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* --- 3. PROFILE & LOGOUT FOOTER --- */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/50">
        <div 
          onClick={() => navigate("/admin/setting")}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-gray-200 transition-all cursor-pointer group"
        >
          {/* Avatar */}
          <img 
            src={admin} 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200 group-hover:border-blue-200"
          />
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Teumay</p>
            <p className="text-xs text-gray-500 truncate">Administrator</p>
          </div>

          {/* Chevron indication */}
          <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
        </div>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;