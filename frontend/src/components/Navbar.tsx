import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Plus,
  User,
  LogIn as LogInIcon,
  Menu,
  XIcon,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { StoreContext } from "../context/store";
import type { ThemeMode } from "../context/store";

const themeOrder: ThemeMode[] = ["light", "dark", "system"];

const themeIcon: Record<ThemeMode, React.ReactNode> = {
  light:  <Sun  size={18} />,
  dark:   <Moon size={18} />,
  system: <Monitor size={18} />,
};

const themeLabel: Record<ThemeMode, string> = {
  light:  "Light",
  dark:   "Dark",
  system: "System",
};

const Navbar: React.FC = () => {
  const { token, showLogin, setShowLogin, role, showSidebar, setShowSidebar, theme, setTheme } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const cycleTheme = () => {
    const next = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    setTheme(next);
  };

  return (
    <nav className="sticky top-0  z-100 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- LEFT SIDE: MENU TOGGLE & LOGO --- */}
          <div className="flex relative items-center gap-2 sm:gap-4">
            {token && (
              <button
                onClick={() => setShowSidebar((prev) => !prev)}
                className="lg:hidden p-1 ml-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Sidebar"
              >
                {showSidebar ? <XIcon /> : <Menu size={24} />}
              </button>
            )}

            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="hidden relative w-10 h-10 lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Wrench className="text-white w-5 h-5 absolute" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-sky-300 rounded-full opacity-80"></div>
              </div>

              <h1 className="sm:block text-2xl font-extrabold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                FACILIFIX
              </h1>
            </div>
          </div>

          {/* --- RIGHT SIDE: ACTIONS --- */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle — cycles: Light → Dark → System */}
            <button
              onClick={cycleTheme}
              title={`Theme: ${themeLabel[theme]} (click to change)`}
              aria-label="Toggle theme"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-xs font-medium"
            >
              {themeIcon[theme]}
              <span className="hidden sm:inline">{themeLabel[theme]}</span>
            </button>
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
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-slate-900/30 transform hover:-translate-y-0.5"
                >
                  <span>Get Started</span>
                  <LogInIcon size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
