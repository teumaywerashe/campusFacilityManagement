import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext, Issue } from "../context/store";
import {
  Check,
  Send,
  MoreVertical,
  Trash2,
  ChevronDown,
  Clock,
  Calendar,
  Eye,
} from "lucide-react";
import axios from "axios";
import ShowImage from "./ShowImage";

interface Props {
  report: Issue;
}

function AllReportDisplay({ report }: Props) {
  const { url, role, markAsRead, token, deleteIssue, updateTime, getImageUrl } =
    useContext(StoreContext);

  const [showImage, setShowImage] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(report.status || "Pending");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      await axios.patch(
        `${url}/issue/update/${report._id}`,
        { status: newStatus },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(report.status);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (currentStatus: string): string => {
    switch (currentStatus.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <div
        className={`grid grid-cols-12 gap-4 cursor-pointer px-6 py-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 relative group
        ${!(report as any).isRead ? "bg-blue-50/40 hover:bg-blue-50/60" : ""}`}
      >
        {/* --- 1. IMAGE THUMBNAIL --- */}
        <div className="col-span-1">
          <div
            onClick={() => setShowImage(true)}
            className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 cursor-pointer group/img"
          >
            {report.image ? (
              <>
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                  src={getImageUrl(report.image)}
                  alt="Evidence"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye size={16} className="text-white drop-shadow-md" />
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                N/A
              </div>
            )}
          </div>
        </div>

        {/* --- 2. REPORT CONTENT --- */}
        <div className="col-span-4 pr-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
              Issue #{report._id?.slice(-4) || "---"}
            </h3>
            {!(report as any).isRead && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </div>
          <p
            className="text-sm text-gray-500 line-clamp-1 mt-0.5"
            title={(report as any).content}
          >
            {(report as any).content}
          </p>
        </div>

        {/* --- 3. STATUS SELECTOR --- */}
        <div className="col-span-2">
          <div className="relative inline-block w-full max-w-[140px]">
            <select
              value={status}
              onChange={updateStatus}
              disabled={isLoading}
              className={`
                w-full appearance-none pl-3 pr-8 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200 transition-all
                ${getStatusColor(status)}
              `}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-current opacity-70">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* --- 4. TIMESTAMPS --- */}
        <div className="col-span-3 text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar size={12} className="text-gray-400" />
            <span>{updateTime(report.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-gray-400" />
            <span className="text-gray-400">
              Upd: {updateTime(report.updatedAt)}
            </span>
          </div>
        </div>

        {/* --- 5. ACTION MENU --- */}
        <div className="col-span-2 flex justify-end relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 rounded-full transition-colors ${
              showMenu
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              {!(report as any).isRead && (
                <button
                  onClick={() => {
                    markAsRead("issue", report._id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition-colors border-b border-gray-50"
                >
                  <Check size={16} />
                  <span>Mark as Read</span>
                </button>
              )}

              {role === "admin" && (
                <button
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <Send size={16} className="text-green-600" />
                  <span>Send Notification</span>
                </button>
              )}

              <button
                onClick={() => {
                  deleteIssue(report._id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <Trash2 size={16} />
                <span>Delete Report</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showImage && (
        <ShowImage
          showImage={showImage}
          report={report}
          setShowImage={setShowImage}
        />
      )}
    </>
  );
}

export default AllReportDisplay;
