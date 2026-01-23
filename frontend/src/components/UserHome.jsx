import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import MyReport from "./MyReport";
import Notification from "./Notifications";
import Setting from "./Setting";
import NewReport from "./NewReport";
import { style } from "../style";

function UserHome() {
  return (
    <div className={`${style.homePage} min-h-screen bg-gray-50`}>
    
      <Sidebar />

    
      <main className="min-h-screen transition-all duration-300">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="myReport" element={<MyReport />} />
            <Route path="notification" element={<Notification />} />
            <Route path="setting" element={<Setting />} />
            <Route path="newReport" element={<NewReport />} />
          </Routes>
        </div>
        
      </main>
    </div>
  );
}

export default UserHome;