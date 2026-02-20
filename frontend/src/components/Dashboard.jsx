import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/store";
import { MessageSquare, Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

// Helper for status badge colors
const getStatusStyles = (status) => {
  switch (status.toLowerCase()) {
    case "resolved":
      return "bg-green-100 text-green-700 border-green-200";
    case "in progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

function Dashboard() {
  const { report, getReport, url, updateTime } = useContext(StoreContext);

  const { id, url: baseUrl, token } = useContext(StoreContext);

  const [expandedComments, setExpandedComments] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleToggleComments = (reportId) => {
    setExpandedComments(expandedComments === reportId ? null : reportId);
    setNewComment("");
  };

  const handleSendComment = async (reportId) => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${baseUrl}/comment`,
        { content: newComment, reportId },
        { headers: { token } },
      );
      if (res.data.success) {
        toast.success("Comment posted");
        setNewComment("");
        await getReport();
        setExpandedComments(reportId);
      } else {
        toast.error(res.data.msg || "Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error posting comment");
    }
  };

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
    <div className="min-h-screen w-full ml-0 sm:ml-64 bg-gray-50 p-6 md:p-10 font-sans">
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
      <div className="max-w-6xl mx-auto mb-8">
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
          filteredReports.map((rep, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Image */}
              <div
                className="relative h-56 w-full bg-gray-200 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(`${url}/uploads/${rep.image}`)}
              >
                {rep.image ? (
                  <>
                    <img
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={`${url}/uploads/${rep.image}`}
                      alt="Report"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity">
                        View Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No image available
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusStyles(
                      rep.status,
                    )}`}
                  >
                    {rep.status}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {updateTime(rep.updatedAt)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {rep.content}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-xs text-gray-400 justify-between">
                  <span>Posted: {updateTime(rep.createdAt)}</span>
                  <button
                    onClick={() => handleToggleComments(rep._id)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
                  >
                    <MessageSquare size={14} />
                    <span>{rep.comments?.length || 0}</span>
                  </button>
                </div>

                {/* Comments section for each card */}
                {expandedComments === rep._id && (
                  <div className="px-4 pb-4 mt-2">
                    <div className="space-y-3 max-h-44 overflow-y-auto mb-3">
                      {rep.comments && rep.comments.length > 0 ? (
                        rep.comments.map((comm, idx) => {
                          const commenterId = comm.userId?._id || comm.userId;
                          const isOwn = String(commenterId) === String(id);
                          return (
                            <div
                              key={idx}
                              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`p-3 rounded-lg text-sm max-w-[86%] ${isOwn ? "bg-blue-50 text-gray-800 border border-blue-100" : "bg-white border border-gray-200 text-gray-700"}`}
                              >
                                <div className="flex justify-between mb-1">
                                  <span className="text-[10px] text-gray-400">
                                    {updateTime(comm.createdAt)}
                                  </span>
                                </div>
                                <p>{comm.content}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No comments yet.
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="w-full pl-4 pr-12 py-2 bg-white border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendComment(rep._id)
                        }
                      />
                      <button
                        onClick={() => handleSendComment(rep._id)}
                        className="absolute right-2 top-1.5 p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
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
