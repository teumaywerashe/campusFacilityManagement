import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/store";
import {
  Calendar,
  Edit2,
  ImageIcon,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

function AdminDashBoardDisplay({ rep, i, config, setSelectedImage }) {
  const { url, updateTime, token, deleteIssue } = useContext(StoreContext);

  const [updatedStatus, setUpdatedStatus] = useState(rep.status);

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  const submitStatusChange = async (id, status) => {
    try {
      const response = await axios.patch(
        `${url}/issue/update/${id}`,
        { status },
        {
          headers: {
            "content-type": "application/json",
            token,
          },
        }
      );
      const { data } = response;

      if (data.success) {
        toast.success("Status updated successfully");
        setUpdate(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [seeOpition, setSeeOption] = useState(false);
  const optionRef = useRef(null);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const mouseChange = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setSeeOption(false);
      }
    };

    document.addEventListener("mousedown", mouseChange);

    return () => {
      document.removeEventListener("mousedown", mouseChange);
    };
  }, []);

  return (
    <div
      key={i}
      className="bg-white relative rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 flex flex-col group overflow-hidden"
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
          {rep.content}
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
        <span>ID: #{rep.id || "N/A"}</span>
      </div>

      {seeOpition && (
        <div
          ref={optionRef}
          className=" flex flex-col absolute gap-3 right-20 p-4  z-10 rounded-3xl bg-gray-400 border-amber-300"
        >
          <button
            onClick={() => deleteIssue(rep.id)}
            className="flex gap-2 bg-white text-[red] p-3  rounded-2xl"
          >
            <Trash2 /> <span>Delete</span>
          </button>
          <button
            onClick={() => setUpdate(!update)}
            className="flex gap-2 bg-white text-black p-3 rounded-2xl"
          >
            {" "}
            <Edit2 /> <span>Update Status</span>
          </button>
          {/* <button>Send notification</button> */}
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
            onClick={() => rep.image && setSelectedImage(`${url}/uploads/${rep.image}`)}
          >
            {rep.image ? (
              <>
                <img
                  src={`${url}/uploads/${rep.image}`}
                  alt="Evidence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">View Full Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                <ImageIcon size={32} className="opacity-30" />
                <span className="text-xs font-medium">No image attached</span>
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
              "{rep.content}"
            </p>

            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Set New Status
            </label>
            <select
              onChange={(e) => handleStatusChange(e)}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
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
          onClick={() => submitStatusChange(rep.id, updatedStatus)}
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
