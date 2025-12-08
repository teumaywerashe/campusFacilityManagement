import React, { useContext, useEffect } from "react";
import { StoreContext } from '../context/store';

import { NavLink, useNavigate } from "react-router-dom";
import { admin } from "../images/image";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { style } from "../style";

function AdminSidebaare() {
  const navigate = useNavigate();
  const { logout, getAllReports, allReports } = useContext(StoreContext);
  const unReadReports = allReports.filter((report) => !report.isRead);
  const numberOfUnReadReports = unReadReports.length;
  useEffect(() => {
    getAllReports();
    // console.log(numberOfUnReadReports);
  }, []);

  return (
    <div className={style.sideBar}>
      <div className={style.sideBarProfile}>
        <div className={style.sideBarProfileDetail}>
          <div className={style.sidebareDetail}>
            <img className={style.profileImage}
              onClick={() => navigate("/admin/setting")}
              src={admin}
              alt=""
            />
            <button onClick={logout} className={style.logOut}>
              <LogOut className="logout-icon" size={14} color="red" />{" "}
              <span className={style.logoutText}>Logout</span>
            </button>
          </div>

          <p>
            <span className={style.sidebareSpan}>teumay-</span>
            <span className={style.sidebareSpan}>student</span>
          </p>
        </div>
      </div>
      <div className={style.sidebareLists}>
        <NavLink to="/admin/dashboard" className={({isActive})=>(
          isActive?style.activeSidebarList:style.sidebareList
        )}>
          <LayoutDashboard size={20} />
          <span className={style.sidebareListText}>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/allReport" className={({isActive})=>(
          isActive?style.activeSidebarList:style.sidebareList
        )}>
          <FileText size={20} /> <span className={style.sidebareListText}>All Reports</span>
          <p
            className={`${
              numberOfUnReadReports > 0
                ? style.reportCount
                :style.noCount
            }`}
          >
            {numberOfUnReadReports}
          </p>
        </NavLink>
        <NavLink to="/admin/notification" className={({isActive})=>(
          isActive?style.activeSidebarList:style.sidebareList
        )}>
          <Bell size={20} /> <span className={style.sidebareListText}>New Report</span>{" "}
        </NavLink>
        <NavLink to="/admin/setting" className={({isActive})=>(
          isActive?style.activeSidebarList:style.sidebareList
        )}>
          <Settings size={20} /> <span className={style.sidebareListText}>Setting</span>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminSidebaare;
