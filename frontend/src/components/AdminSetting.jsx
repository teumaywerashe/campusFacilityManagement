import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ChevronRight, 
  Camera, 
  Mail, 
  Shield, 
  Moon,
  Save
} from 'lucide-react';
import { admin } from "../images/image"; // Assuming you have this image

function AdminSetting() {
  // Mock states to show interactivity
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen ml-0 sm:ml-64 w-full bg-gray-50 p-6 md:p-10 font-sans text-gray-800">
      
      {/* --- Page Header --- */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account preferences and system configurations.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* --- SECTION 1: PROFILE SETTINGS --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User size={20} className="text-blue-600"/>
                Public Profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">This will be displayed on your profile.</p>
            </div>
          </div>
          
          <div className="p-8">
            {/* Avatar Upload */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group cursor-pointer">
                <img 
                  src={admin} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 group-hover:border-blue-50 transition-all"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <div>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  Change Avatar
                </button>
                <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size 800K</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Teumay" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Student" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50/50 focus:bg-white resize-none"
                  defaultValue="Admin managing the student report system."
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: ACCOUNT SECURITY --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield size={20} className="text-blue-600"/>
              Security & Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage your password and authentication methods.</p>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Row 1 */}
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Address</p>
                  <p className="text-sm text-gray-500">teumay@university.edu</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Row 2 */}
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:border-gray-300 transition-all">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: PREFERENCES --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell size={20} className="text-blue-600"/>
              App Preferences
            </h2>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Toggle Item */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                 <div className="mt-1"><Bell size={18} className="text-gray-400"/></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                   <p className="text-xs text-gray-500">Receive emails about new reports.</p>
                 </div>
              </div>
              {/* Custom Toggle Switch */}
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notifications ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>

             {/* Toggle Item */}
             <div className="flex items-center justify-between">
              <div className="flex gap-3">
                 <div className="mt-1"><Moon size={18} className="text-gray-400"/></div>
                 <div>
                   <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                   <p className="text-xs text-gray-500">Switch between light and dark themes.</p>
                 </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminSetting;