import React, { useState, useRef } from "react";
import { Camera, Eye, EyeOff, Save, User, Lock, Mail } from "lucide-react";
import { admin } from "../images/image"; 
import { useContext } from "react";
import { StoreContext } from "../context/store";
import { useEffect } from "react";

function Setting() {
  const fileInputRef = useRef(null);
  const existingImage = admin;
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {user,getUser} = useContext(StoreContext);
  


  useEffect(() => {
    getUser();
  }, []);

  // Simulating initial data - in real app, fetch this from Context
  const [data, setData] = useState({ 
    name: "Admin User", 
    email: "admin@example.com", // Added email field for completeness
    password: "" 
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving data:", data, selectedImage);
    // Add logic to update context/backend here
  };

  return (
    <div className="min-h-screen ml-0 sm:ml-64 w-full bg-gray-50/50 p-6 flex justify-center items-start md:items-center font-sans">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">Profile Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Update your photo and personal details</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Image Upload Section */}
            <div className="flex flex-col items-center gap-4 -mt-16">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                  <img
                    src={selectedImage || existingImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay Button */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full shadow-md transition-all duration-200 border-2 border-white group-hover:scale-110"
                  title="Change Photo"
                >
                  <Camera size={18} />
                </button>
                {/* Hidden Input */}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </div>
              <p className="text-xs text-gray-500 font-medium">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
            </div>

            {/* Inputs Section */}
            <div className="space-y-5 mt-4">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

               {/* Email Field (Optional addition) */}
               <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Leave blank to keep current"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-gray-900/20 flex justify-center items-center gap-2 transition-transform active:scale-[0.98]"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Setting;
