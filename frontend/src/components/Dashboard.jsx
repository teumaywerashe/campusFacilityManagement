import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/store";
import { MessageSquare, Send, X } from "lucide-react";
import DashboardDisplay from "./DashboardDisplay";

function Dashboard() {
  const { report, getReport } = useContext(StoreContext);
  const { id } = useContext(StoreContext);

  // const [expandedComments, setExpandedComments] = useState(null);
  // const [newComment, setNewComment] = useState("");

  // State for filtering
  const [status, setStatus] = useState("All");

  // State for the Image Modal (Store the string URL or null)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getReport();
  }, []);

  // Filter Logic: Filter the array BEFORE mapping
  const filteredReports = report?.filter((rep) =>
    status === "All" ? true : rep.status.toLowerCase() === status.toLowerCase(),
  );

  return (
    <div className="min-h-screen w-full ml-0 relative sm:ml-64 bg-gray-50 p-6 md:p-10 font-sans">
      {/* --- Header Section --- */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Reported Issues
        </h2>
        <p className="text-gray-500 mt-2">
          Track the status of your submitted reports.
        </p>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-center mx-auto justify-between p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
          {["All", "Pending", "In Progress", "Resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`px-1 py-1 sm:px-3 sm:py-2.5 mx-1 text-sm font-medium rounded-lg transition-all duration-200 
                ${
                  status === tab
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- Reports Grid --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports && filteredReports.length > 0 ? (
          filteredReports.map((rep, i) => {
            return (
              <DashboardDisplay
                rep={rep}
                key={i}
                id={id}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            );
          })
        ) : (
          <div className=" w-full py-20 text-center">
            <div className="text-gray-300 text-6xl mb-4">📂</div>
            <p className="text-gray-500 text-lg">
              No reports found for "{status}"
            </p>
          </div>
        )}
      </div>

      {/* --- Image Modal --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors font-bold text-sm tracking-wide bg-white/10 px-4 py-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              CLOSE X
            </button>
            <img
              src={selectedImage}
              alt="Full Detail"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
