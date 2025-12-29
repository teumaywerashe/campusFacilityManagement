import React, { useContext, useState, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";
import {
  Upload,
  Image as ImageIcon,
  Send,
  X,
  AlertCircle,
  MapPin,
} from "lucide-react";

function NewReport() {
  const { url, id, token } = useContext(StoreContext);
  const navigate = useNavigate();

  // State
  const [selectedImage, setSelectedImage] = useState(null); // Preview URL
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // Actual File
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation
      if (file.size > 5 * 1024 * 1024) {
        return toast.error("File is too large (Max 5MB)");
      }
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Clear Image
  const removeImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit Logic
  const submitReport = async (e) => {
    e.preventDefault();

    if (!content.trim()) return toast.error("Please describe the issue.");
    if (!imageFile) return toast.error("Please provide visual evidence.");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", id);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(`${url}/issue/report`, formData, {
        headers: { "Content-Type": "multipart/form-data", token },
      });

      if (response.data.success) {
        toast.success("Report submitted successfully!");

        // Notification Logic
        await axios.post(`${url}/notification/create`, {
          receiverId: response.data.issue.userId,
          content: `We have received your report: "${response.data.issue.content.substring(
            0,
            20
          )}...". Thank you.`,
          reportId: response.data.issue._id,
        });

        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* --- LEFT SIDE: Form & Inputs --- */}
        <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Submit Report
            </h1>
            <p className="text-gray-500 text-sm">
              Found an issue? Please describe it below and attach a photo so we
              can resolve it quickly.
            </p>
          </div>

          <form onSubmit={submitReport} className="flex-1 flex flex-col gap-6">
            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-blue-500" />
                Issue Description
              </label>
              <textarea
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="w-full h-40 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
                placeholder="Describe the maintenance issue, damage, or incident in detail..."
              ></textarea>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Mobile-only Upload Button (visible only on small screens) */}

            <div className="w-full md:w-2/5 bg-gray-50 p-8 border-l border-gray-100 flex sm:hidden flex-col justify-center items-center relative">
              <div className="absolute top-6 right-6 text-gray-300">
                <MapPin size={100} className="opacity-10 rotate-12" />
              </div>

              <label className="text-sm font-semibold text-gray-700 mb-4 w-full text-left md:text-center">
                Evidence Photo
              </label>

              <div
                onClick={() => fileInputRef.current.click()}
                className={`
              relative w-full aspect-[3/4] md:aspect-auto md:h-96 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center group
              ${
                selectedImage
                  ? "border-blue-500 bg-white shadow-md"
                  : "border-gray-300 hover:border-blue-400 hover:bg-white"
              }
            `}
              >
                {selectedImage ? (
                  <>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for changing image */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                      Click to Change
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-colors border border-white/30"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">
                        Click to Upload
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        SVG, PNG, JPG (Max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
                  ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/40"
                  }
                `}
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* --- RIGHT SIDE: Image Upload Area --- */}
        <div className="w-full md:w-2/5 bg-gray-50 p-8 border-l border-gray-100 hidden sm:flex flex-col justify-center items-center relative">
          <div className="absolute top-6 right-6 text-gray-300">
            <MapPin size={100} className="opacity-10 rotate-12" />
          </div>

          <label className="text-sm font-semibold text-gray-700 mb-4 w-full text-left md:text-center">
            Evidence Photo
          </label>

          <div
            onClick={() => fileInputRef.current.click()}
            className={`
              relative w-full aspect-[3/4] md:aspect-auto md:h-96 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center group
              ${
                selectedImage
                  ? "border-blue-500 bg-white shadow-md"
                  : "border-gray-300 hover:border-blue-400 hover:bg-white"
              }
            `}
          >
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {/* Overlay for changing image */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                  Click to Change
                </div>
                {/* Remove Button */}
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-colors border border-white/30"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">Click to Upload</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    SVG, PNG, JPG (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReport;
