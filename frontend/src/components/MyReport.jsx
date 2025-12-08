import React, { useState, useEffect, useContext } from "react";
import { Trash2, Eye, X, AlertCircle } from "lucide-react";
import { StoreContext } from "../context/store";

// Helper for status colors
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

function MyReport() {
  const { url, getReport, deleteIssue, updateTime, report } = useContext(StoreContext);
  
  // State to hold the specific image URL to show, or null if closed
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-gray-50/50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your submitted issues and track their status.</p>
          </div>
          <div className="bg-white px-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
            Total: {report?.length || 0}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Table Header (Hidden on small mobile) */}
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50/50 px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Evidence</div>
            <div className="col-span-4">Content</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {report && report.length > 0 ? (
              report.map((item, i) => (
                <div key={item._id || i} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors duration-200 group">
                  
                  {/* Image Column */}
                  <div className="md:col-span-2 flex items-center gap-3">
                    <div 
                      className="relative h-16 w-24 rounded-lg overflow-hidden border border-gray-200 cursor-pointer bg-gray-100"
                      onClick={() => setSelectedImage(`${url}/uploads/${item.image}`)}
                    >
                      {item.image ? (
                        <>
                          <img 
                            src={`${url}/uploads/${item.image}`} 
                            alt="evidence" 
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                            <Eye className="text-white opacity-0 group-hover:opacity-100 w-5 h-5" />
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="md:col-span-4">
                    <p className="text-sm text-gray-700 font-medium line-clamp-2 leading-relaxed" title={item.content}>
                      {item.content}
                    </p>
                  </div>

                  {/* Status Column */}
                  <div className="md:col-span-2 flex md:justify-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Dates Column */}
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-12 font-semibold">Reported:</span>
                      <span>{updateTime(item.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-12 font-semibold">Updated:</span>
                      <span>{updateTime(item.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="md:col-span-1 flex md:justify-center justify-end">
                    <button
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this report?')) {
                            deleteIssue(item.id || item._id)
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                      title="Delete Report"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              ))
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No reports found</h3>
                <p className="text-gray-500 mt-1 max-w-sm">You haven't submitted any reports yet. Once you do, they will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Image Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-screen flex flex-col items-center">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            
            <img 
              src={selectedImage} 
              alt="Full Report Evidence" 
              className="w-auto h-auto max-h-[85vh] max-w-full rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReport;