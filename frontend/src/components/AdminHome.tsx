import React from "react";
import AdminDashboard from "./AdminDashboard";
import NewReport from "./NewReport";
import Notifications from "./Notifications";
import AdminSidebaare from "./AdminSidebaare";
import { Routes, Route } from "react-router-dom";
import AllReport from "./AllReport";
import AdminSetting from "./AdminSetting";
import { style } from "../style";

const AdminHome: React.FC = () => {
  return (
    <>
      <div className={style.userHome}>
        <AdminSidebaare />
        <Routes>
          <Route path="" element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="allReport" element={<AllReport />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="setting" element={<AdminSetting />} />
          <Route path="newReport" element={<NewReport />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminHome;
