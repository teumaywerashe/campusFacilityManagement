import React from "react";
import AdminDashboard from "./AdminDashboard";
import NewReport from "./NewReport";
import Notifications from "./Notifications";
import AdminSidebaare from "./AdminSidebaare";
import { Routes, Route } from "react-router-dom";
import AllReport from "./AllReport";
import AdminSetting from "./AdminSetting";
import { style } from "../style";

function AdminHome() {
  return (
    <>
      <div className={style.userHome}>
        <AdminSidebaare />
        <Routes>
          <Route path="" element={<AdminDashboard />}></Route>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="allReport" element={<AllReport />}></Route>
          <Route path="notification" element={<Notifications />}></Route>
          <Route path="setting" element={<AdminSetting />}></Route>
          <Route path="newReport" element={<NewReport />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default AdminHome;
