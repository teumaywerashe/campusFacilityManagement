import React, { useContext, useState, useRef, useEffect } from "react";
import { CheckCircle, MoreVertical, Trash2 } from "lucide-react";
import { StoreContext } from '../context/store';
import { admin } from "../images/image";
import { useNavigate } from "react-router-dom";

function Notification({ noti }) {
  const navigate = useNavigate();
  const { updateTime, markAsRead, deleteNotification } = useContext(StoreContext);
  const [showMenu, setShowMenu] = useState(false);
  
  // Ref to handle clicking outside to close menu
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Handle Main Click (Navigate)
  const handleContentClick = () => {
    navigate("/user/dashboard");
  };

  // Toggle Menu (prevent navigation)
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div onClick={()=>markAsRead('notification',noti.id)}
      className={`relative flex w-full items-start gap-4 p-4 border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 
      ${!noti.isRead ? "bg-blue-50/60" : "bg-white"}`}
    >
      {/* Avatar Image */}
      <div className="hidden md:flex shrink-0">
        <img 
          src={admin} 
          alt="Admin" 
          className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm" 
        />
      </div>

      {/* Content Area */}
      <div 
        onClick={handleContentClick}
        className="flex-1 cursor-pointer min-w-0" // min-w-0 helps with text truncation
      >
        <p className={`text-sm leading-relaxed ${!noti.isRead ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
          {noti.content}
        </p>
        <span className="text-xs text-gray-400 mt-1 block">
          {updateTime(noti.createdAt)}
        </span>
      </div>

      {/* Options Button */}
      <div className="relative shrink-0" ref={menuRef}>
        <button 
          onClick={toggleMenu}
          className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 top-8 z-10 w-40 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {!noti.isRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead('notification', noti.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-xs font-medium text-gray-700 hover:bg-blue-50 flex items-center gap-2 transition-colors"
              >
                <CheckCircle size={14} className="text-blue-500" /> 
                Mark as read
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(noti.id);
                setShowMenu(false);
              }}
              className="w-full text-left px-4 py-3 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <Trash2 size={14} /> 
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;