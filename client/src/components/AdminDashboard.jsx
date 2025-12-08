import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/store';
// I will include a simple internal Modal to ensure this works immediately, 
// but you can swap it back to your './ShowImage' import.
import { X } from 'lucide-react'; // Optional: if you have lucide-react, else use text "X"

function AdminDashboard() {
  const { getAllReports, allReports, updateTime } = useContext(StoreContext);

  // State
  const [status, setStatus] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); // Stores URL or null

  useEffect(() => {
    getAllReports();
  }, []);

  // Filter Logic
  const filteredReports = allReports?.filter((rep) => 
    status === "All" ? true : rep.status.toLowerCase() === status.toLowerCase()
  );

  // Helper for Status Colors
  const getStatusColor = (st) => {
    switch (st.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Report Issues</h2>
          <p className="text-gray-500 mt-2">Manage and track user submitted reports.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                ${status === tab 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports?.length > 0 ? (
            filteredReports.map((rep, i) => (
              <div 
                key={i} 
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden cursor-pointer" 
                     onClick={() => setSelectedImage(`http://localhost:3000/uploads/${rep.image}`)}>
                  {rep.image ? (
                    <img
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={`http://localhost:3000/uploads/${rep.image}`}
                      alt="Report evidence"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image Provided
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Status Badge */}
                  <div className="mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(rep.status)}`}>
                      {rep.status}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {rep.content}
                  </p>

                  {/* Footer (Timestamps) */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end text-xs text-gray-500">
                    <div>
                      <span className="block font-medium text-gray-400 uppercase tracking-wider text-[10px]">Posted</span>
                      {updateTime(rep.createdAt)}
                    </div>
                    <div className="text-right">
                       <span className="block font-medium text-gray-400 uppercase tracking-wider text-[10px]">Updated</span>
                       {updateTime(rep.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p>No reports found for "{status}".</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal (Lightweight Version) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-screen">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              {/* If you don't have lucide-react, replace <X /> with <span className="text-2xl font-bold">Close</span> */}
               <span className="text-lg font-bold bg-white/20 px-3 py-1 rounded-full">Close</span>
            </button>
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;