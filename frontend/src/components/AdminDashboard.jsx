import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/store';
import { 
  X, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  ImageIcon
} from 'lucide-react'; 

function AdminDashboard() {
  const { getAllReports, allReports,url, updateTime } = useContext(StoreContext);

  // State
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getAllReports();
  }, []);

  // Filter Logic
  const filteredReports = allReports?.filter((rep) => 
    statusFilter === "All" ? true : rep.status.toLowerCase() === statusFilter.toLowerCase()
  );

  // Clean, Professional Status Colors
  const getStatusConfig = (st) => {
    switch (st.toLowerCase()) {
      case 'resolved': 
        return { 
          style: 'bg-green-50 text-green-700 border-green-200 ring-green-600/20', 
          icon: <CheckCircle2 size={14} className="mr-1.5"/>,
          label: 'Resolved'
        };
      case 'in progress': 
        return { 
          style: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20', 
          icon: <Clock size={14} className="mr-1.5"/>, 
          label: 'In Progress'
        };
      case 'pending': 
        return { 
          style: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-600/20', 
          icon: <AlertCircle size={14} className="mr-1.5"/>, 
          label: 'Action Required'
        };
      default: 
        return { 
          style: 'bg-gray-50 text-gray-600 border-gray-200 ring-gray-500/20', 
          icon: <AlertCircle size={14} className="mr-1.5"/>, 
          label: st 
        };
    }
  };

  return (
    <div className="min-h-screen ml-64 w-full bg-[#F3F4F6] font-sans text-gray-800 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Issue Tracker</h1>
            <p className="text-gray-500 mt-1 text-sm">Overview of submitted user reports and evidence.</p>
          </div>
          
          {/* Simple Stat */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
             <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Reports</span>
             <span className="text-xl font-bold text-gray-900">{filteredReports?.length || 0}</span>
          </div>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2 border-b border-gray-200">
          {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`
                px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative top-[1px]
                ${statusFilter === tab 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports?.length > 0 ? (
            filteredReports.map((rep, i) => {
              const config = getStatusConfig(rep.status);
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3 flex justify-between items-start">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ring-1 ring-inset ${config.style}`}>
                        {config.icon}
                        {config.label}
                     </span>
                     <button className="text-gray-400 hover:text-gray-600 transition-colors">
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
                      onClick={() => rep.image && setSelectedImage(`${url}/uploads/${rep.image}`)}
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
                           <ImageIcon size={20} className="opacity-50"/>
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
                    <span>ID: #{rep._id?.slice(-4) || 'N/A'}</span>
                  </div>
                </div>
              );
            })
          ) : (
            // Empty State
            <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="p-4 bg-gray-50 rounded-full mb-3">
                <Filter className="text-gray-400" size={24} />
              </div>
              <h3 className="text-gray-900 font-medium">No reports found</h3>
              <p className="text-gray-500 text-sm mt-1">There are no {statusFilter.toLowerCase()} reports to display.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Image Modal --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-700">Evidence View</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {/* Modal Image */}
            <div className="p-2 bg-gray-100">
              <img 
                src={selectedImage} 
                alt="Full Report" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;