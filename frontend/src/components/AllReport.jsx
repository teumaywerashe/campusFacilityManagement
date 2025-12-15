import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/store";
import {
  Search,
  Filter,
  RefreshCcw,
  MoreHorizontal,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllReport() {
  const { getAllReports, markAsRead, allReports, url, updateTime } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllReports();
    // Fixed: Correct cleanup for setInterval
    const reportInterval = setInterval(() => {
      getAllReports();
    }, 5000); // Increased to 5 seconds to reduce server load
    return () => clearInterval(reportInterval);
  }, []);

  // Filter logic for the search bar
  const filteredReports = allReports?.filter(
    (item) =>
      item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper for Status Badge Styles
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
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
    <div className="min-h-screen ml-0  lg:ml-64 w-full bg-gray-50 p-6 md:p-10 font-sans text-gray-800">
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Report Archive
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage the complete history of submitted reports.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search reports..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none w-64 transition-all"
            />
          </div>
          <button
            onClick={() => getAllReports()}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors tooltip"
            title="Refresh Data"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">Evidence</div>
          <div className="col-span-4">Report Details</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Timestamps</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {filteredReports.length > 0 ? (
            filteredReports.map((report, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 cursor-pointer border border-black mb-2 sm:grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-gray-50 group
                  ${!report.isRead ? "bg-blue-50/30" : ""}`}
              >
                {/* 1. Image Thumbnail */}
                <div className="col-span-1">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative">
                    {report.image ? (
                      <img
                        src={`${url}/uploads/${report.image}`}
                        alt="Evidence"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-[10px]">N/A</span>
                      </div>
                    )}
                    {/* Unread Dot */}
                    {!report.isRead && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* 2. Content */}
                <div className="col-span-4 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      Report #{report.id}
                    </span>
                    {!report.isRead && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {report.content}
                  </p>
                </div>

                {/* 3. Status */}
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* 4. Dates */}
                <div className="col-span-3 text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-gray-400" />
                    <span>
                      Posted:{" "}
                      <span className="text-gray-700">
                        {updateTime(report.createdAt)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-gray-400" />
                    <span>
                      Updated:{" "}
                      <span className="text-gray-700">
                        {updateTime(report.updatedAt)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* 5. Actions */}
                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      markAsRead("issue", report.id);
                      navigate("/admin/dashboard");
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="bg-gray-50 p-4 rounded-full mb-3">
                <Filter className="text-gray-400" size={24} />
              </div>
              <h3 className="text-gray-900 font-medium">No reports found</h3>
              <p className="text-gray-500 text-sm">
                Your search did not return any results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllReport;
