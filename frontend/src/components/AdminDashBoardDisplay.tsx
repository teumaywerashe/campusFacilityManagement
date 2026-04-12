import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext, Issue } from "../context/store";
import {
  Calendar,
  Edit2,
  ImageIcon,
  MoreHorizontal,
  Trash2,
  X,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface StatusConfig {
  style: string;
  icon: React.ReactElement;
  label: string;
}

interface Props {
  rep: Issue;
  i: number;
  config: StatusConfig;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

function AdminDashBoardDisplay({ rep, i, config, setSelectedImage }: Props) {
  const { url, updateTime, token, deleteIssue, getAllReports, id } =
    useContext(StoreContext);

  const [updatedStatus, setUpdatedStatus] = useState<string>(rep.status);
  const [seeOpition, setSeeOption] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const optionRef = useRef<HTMLDivElement>(null);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUpdatedStatus(e.target.value);
  };

  useEffect(() => {
    // token available in context for authenticated requests
  }, [token]);

  const submitStatusChange = async (id: string, status: string): Promise<void> => {
    try {
      const response = await axios.patch(
        `${url}/issue/update/${id}`,
        { status },
        {
          headers: {
            "content-type": "application/json",
            token,
          },
        },
      );
      const { data } = response;
      console.log(data);

      if (data.success) {
        toast.success("Status updated successfully");

        try {
          await axios.post(`${url}/notification/create`, {
            receiverId: response.data.updatedIssue.userId,
            content: `hello there your report: "${response.data.updatedIssue.content.substring(
              0,
              20,
            )}... status is updated to ${updatedStatus}". if the issue is still not fixed don't histate to reach us.`,
            reportId: response.data.updatedIssue._id,
          });
        } catch (e) {
          console.log("notification error", e);
        }

        await getAllReports();
        setUpdate(false);
      } else {
        toast.error(data.msg || "Failed to update status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    const mouseChange = (e: MouseEvent): void => {
      if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
        setSeeOption(false);
      }
    };

    document.addEventListener("mousedown", mouseChange);

    return () => {
      document.removeEventListener("mousedown", mouseChange);
    };
  }, []);

  const handleToggleComments = () => {
    setShowComments((s) => !s);
    setNewComment("");
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `${url}/comment`,
        { content: newComment, reportId: rep._id },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success("Comment posted");
        setNewComment("");
        await getAllReports();
        setShowComments(true);
      } else {
        toast.error(response.data.msg || "Failed to post comment");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error posting comment");
    }
  };

  return (
    <div
      key={i}
      className="bg-white relative w-full rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 flex flex-col group overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-5 pb-3 flex justify-between items-start">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${config.style}`}
        >
          {config.icon}
          {config.label}
        </span>
        <button
          onClick={() => {
            setSeeOption(!seeOpition);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Card Content */}
      <div className="px-5 flex-1">
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {(rep as any).content}
        </p>

        {/* Image Attachment Thumbnail */}
        <div
          className="relative w-full h-40 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 cursor-zoom-in group-hover:border-blue-200 transition-colors"
          onClick={() =>
            rep.image && setSelectedImage(`${url}/uploads/${rep.image}`)
          }
        >
          {rep.image ? (
            <>
              <img
                src={`${url}/uploads/${rep.image}`}
                alt="Evidence"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <ImageIcon size={20} className="opacity-50" />
              <span className="text-xs">No image attached</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-4 mt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} />
          <span>{updateTime(rep.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleComments}
            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-1"
            title="View Comments"
          >
            <MessageSquare size={14} />
            {rep.comments && rep.comments.length > 0 && (
              <span className="text-[11px] text-gray-600">
                {rep.comments.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="absolute bg-gray-400 w-full no-scrollbar rounded-xl shadow-lg z-10">
          <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50/60">
            <div className="max-w-full">
              <h4 className="text-xs justify-between font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                <MessageSquare size={14} /> Comments
                <button onClick={() => setShowComments(!showComments)} className="text-sm">
                  <X size={18} />
                </button>
              </h4>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
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
                  onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
                />
                <button
                  onClick={handleSendComment}
                  className="absolute right-2 top-1.5 p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {seeOpition && (
        <div
          ref={optionRef}
          className="flex flex-col absolute gap-3 right-20 p-4 z-10 rounded-3xl bg-gray-400 border-amber-300"
        >
          <button
            onClick={() => deleteIssue(rep._id)}
            className="flex gap-2 bg-white text-[red] p-3 rounded-2xl"
          >
            <Trash2 /> <span>Delete</span>
          </button>
          <button
            onClick={() => setUpdate(!update)}
            className="flex gap-2 bg-white text-black p-3 rounded-2xl"
          >
            <Edit2 /> <span>Update Status</span>
          </button>
        </div>
      )}

      {update && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h1 className="font-bold text-xl text-gray-800">Update Status</h1>
              <button
                onClick={() => setUpdate(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Wrapper */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Image Section */}
                <div className="w-full md:w-1/2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Evidence Preview
                  </label>
                  <div
                    className="relative aspect-video md:aspect-square w-full bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 cursor-zoom-in group hover:border-blue-400 transition-all"
                    onClick={() =>
                      rep.image &&
                      setSelectedImage(`${url}/uploads/${rep.image}`)
                    }
                  >
                    {rep.image ? (
                      <>
                        <img
                          src={`${url}/uploads/${rep.image}`}
                          alt="Evidence"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                            View Full Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                        <ImageIcon size={32} className="opacity-30" />
                        <span className="text-xs font-medium">
                          No image attached
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Details Section */}
                <div className="flex flex-col w-full md:w-1/2 justify-between">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Report Content
                    </label>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                      "{(rep as any).content}"
                    </p>

                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Set New Status
                    </label>
                    <select
                      onChange={(e) => handleStatusChange(e)}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1em",
                      }}
                      name="status"
                      value={updatedStatus}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="in progress">⚙️ In Progress</option>
                      <option value="resolved">✅ Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => setUpdate(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => submitStatusChange(rep._id, updatedStatus)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoardDisplay;
