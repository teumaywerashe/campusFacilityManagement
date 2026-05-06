import React, { useContext, useState } from "react";
import { StoreContext, Issue } from "../context/store";
import { MessageSquare, Send, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  rep: Issue;
  id: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

function DashboardDisplay({ rep, id, setSelectedImage }: Props) {
  const getStatusStyles = (status: string): string => {
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

  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const content = (rep as any).content as string ?? "";
  const isLong = content.length > 60;
  const displayContent = isLong && !expanded ? content.slice(0, 60) + "..." : content;
  const { url, getReport, updateTime, token, getImageUrl } = useContext(StoreContext);

  const handleSendComment = async (reportId: string): Promise<void> => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${url}/comment`,
        { content: newComment, reportId },
        { headers: { token } },
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success("Comment posted");
        setNewComment("");
        await getReport();
      } else {
        toast.error(res.data.msg || "Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error posting comment");
    }
  };

  return (
    <div className="bg-white relative w-full rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 flex flex-col group overflow-hidden">
      {/* Card Image */}
      <div
        className="relative h-56 w-full bg-gray-200 overflow-hidden cursor-pointer"
        onClick={() => setSelectedImage(getImageUrl(rep.image) || null)}
      >
        {rep.image ? (
          <>
            <img
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={getImageUrl(rep.image)}
              alt="Report"
            />
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

        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {displayContent}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-blue-500 hover:text-blue-700 font-medium text-xs"
            >
              {expanded ? "see less" : "see more"}
            </button>
          )}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-full h-full flex items-center text-xs text-gray-400 justify-between">
          <span>Posted: {updateTime(rep.createdAt)}</span>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
          >
            <MessageSquare size={14} />
            <span>{rep.comments?.length || 0}</span>
          </button>
        </div>

        {/* Comments section for each card */}
        {showComments && (
          <div className="absolute w-full top-0 left-0 bg-gray-100 rounded-xl shadow-lg z-10">
            <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50/60">
              <div className="max-w-full">
                <h4 className="text-xs justify-between font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  Comments
                  <button className="text-sm">
                    <X size={18} onClick={() => setShowComments(false)} />
                  </button>
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4 no-scrollbar">
                  {rep.comments && rep.comments.length > 0 ? (
                    rep.comments.map((comm, idx) => {
                      const commenterId = (comm as any).userId?._id || (comm as any).userId;
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
                            <p>{(comm as any).content}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      No comments yet for this report.
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardDisplay;
