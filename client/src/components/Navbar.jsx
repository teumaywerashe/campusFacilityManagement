import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Plus,
  User,
  LogIn as LogInIcon,
  Menu,
  X,
  CrossIcon,
  XSquareIcon,
  XIcon,
  FileXCornerIcon, // 1. Import Menu Icon
} from "lucide-react";
import { StoreContext } from "../context/store";

function Navbar() {
  // 2. Extract the toggle function from your Context
  // You need to add 'setShowSidebar' or 'toggleSidebar' to your StoreContext provider
  const { token, role,showSidebar, setShowSidebar } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- LEFT SIDE: MENU TOGGLE & LOGO --- */}
          <div className="flex relative items-center gap-2 sm:gap-4">
            {/* 3. SIDEBAR TOGGLE BUTTON (Visible only when logged in) */}
            {token && (
              <button
                onClick={() => setShowSidebar((prev) => !prev)}
                className="lg:hidden p-1 ml-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Sidebar"
              >
               {showSidebar?<XIcon/> : <Menu size={24} />}
              </button>
            )}

            {/* LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="hidden relative w-10 h-10 lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Wrench className="text-white w-5 h-5 absolute" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-sky-300 rounded-full opacity-80"></div>
              </div>

              {/* Hide text on very small screens if needed to save space */}
              <h1 className="sm:block text-2xl font-extrabold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                FACILIFIX
              </h1>
            </div>
          </div>

          {/* --- RIGHT SIDE: ACTIONS --- */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                {role === "user" && (
                  <button
                    onClick={() => navigate("user/newReport")}
                    className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-md shadow-indigo-200 transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                    <span>Report Issue</span>
                  </button>
                )}

                {role === "user" && (
                  <button
                    onClick={() => navigate("user/newReport")}
                    className="sm:hidden flex items-center justify-center bg-indigo-600 text-white w-9 h-9 rounded-full shadow-md active:scale-90"
                  >
                    <Plus size={18} />
                  </button>
                )}

                <div className="flex items-center gap-3 pl-2 border-l border-gray-200 ml-2">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all cursor-pointer">
                    <User size={20} />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <a href="#login">
                  <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-slate-300 hover:shadow-slate-400 transform hover:-translate-y-0.5">
                    <span>Get Started</span>
                    <LogInIcon size={16} />
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
