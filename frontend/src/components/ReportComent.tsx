import axios from "axios";
import React, { useContext, useState } from "react";
import { StoreContext, Comment } from "../context/store";
import { toast } from "sonner";
import { MessageSquare, Send } from "lucide-react";

interface Props {
  _id: string;
  content?: string;
  createdAt: string;
  comments?: Comment[];
}

function ReportComent(rep: Props) {
  const {
    id,
    getReport,
    url: baseUrl,
    updateTime,
    token,
  } = useContext(StoreContext);

  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  const handleToggleComments = (reportId: string): void => {
    setExpandedComments(expandedComments === reportId ? null : reportId);
    setNewComment("");
  };

  const handleSendComment = async (reportId: string): Promise<void> => {
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

  return (
    <div className="absolute">
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
      <div className="">
        {expandedComments === rep._id && (
          <div className="px-4 pb-4 mt-2">
            <div className="space-y-3 max-h-44 overflow-y-auto mb-3">
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
                <p className="text-xs text-gray-400 italic">No comments yet.</p>
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
  );
}

export default ReportComent;
