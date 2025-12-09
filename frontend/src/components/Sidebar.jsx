import React, { useContext, useEffect } from "react";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";
import { user } from "../images/image";

function Sidebar() {
  const navigate = useNavigate();
  const {
    notifications,
    showSidebar,
    setShowSidebar,
    logout,
    getNotification,
  } = useContext(StoreContext);

  // Filter unread notifications

  const handleLogout = () => {
    logout();
  };
  const unReadNotification = notifications.filter((n) => !n.isRead);
  const count = unReadNotification.length;

  useEffect(() => {
    getNotification();
    const interval = setInterval(() => {
      getNotification();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Helper for link classes
  const linkClasses = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all duration-200 rounded-xl mx-2
    ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <>
      <div
        className={`
          fixed left-0 top-16 
          h-[calc(100vh-64px)] w-64 
          bg-gray-900 border-r border-gray-800
          flex flex-col 
          transition-transform duration-300 ease-in-out z-40
          ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* 1. Header / Brand (Optional - can be removed if Navbar covers branding) */}
        <div className="h-20 shrink-0 flex items-center px-6 border-b border-gray-800 mb-2">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span>
              Student <span className="text-blue-600">Panel</span>
            </span>
          </div>
        </div>

        {/* 2. Navigation List (Scrollable) */}
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto py-2 custom-scrollbar">
          <NavLink
            onClick={() => setShowSidebar(false)}
            to="/user/dashboard"
            className={linkClasses}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            onClick={() => setShowSidebar(false)}
            to="/user/myReport"
            className={linkClasses}
          >
            <FileText size={20} />
            <span>My Reports</span>
          </NavLink>

          <NavLink
            onClick={() => setShowSidebar(false)}
            to="/user/notification"
            className={linkClasses}
          >
            <div className="relative">
              <Bell size={20} />
              {/* Notification Dot Animation */}
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>
            <span className="flex-1">Notification</span>

            {/* Number Badge */}
            {count > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </NavLink>

          <NavLink
            onClick={() => setShowSidebar(false)}
            to="/user/setting"
            className={linkClasses}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* 3. Bottom User Profile Section (Fixed at bottom) */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 shrik-0">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-800 transition-colors group cursor-pointer">
            {/* Avatar */}
            <img
              onClick={() => navigate("/user/setting")}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-700 group-hover:border-gray-500 transition-colors"
              src={user}
              alt="User"
            />

            {/* User Info */}
            <div
              className="flex-1 min-w-0"
              onClick={() => navigate("/user/setting")}
            >
              <p className="text-sm font-semibold capitalize text-white truncate">
                Teumay
              </p>
              <p className="text-xs text-gray-500 truncate">user Account</p>
            </div>

            {/* Logout Button */}
            <button
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              // title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
          <button
            onClick={handleLogout} type='button'
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-[red]">Sign Out</span>
          </button>
        </div>
      </div>

     
    </>
  );
}

export default Sidebar;
