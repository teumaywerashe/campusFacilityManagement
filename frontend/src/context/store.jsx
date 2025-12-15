import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  //  http://localhost:3000
  const url = "http://localhost:3000";
  // import.meta.env.VITE_API_URL;
  const [report, setReport] = useState([]);
  const [allReports, setAllReports] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage;
    setReport([]);
    setNotifications([]);
    setId(null);
    setToken(null);
    setRole(null);
    setUserName(null);
    window.location.href = "/";
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const markAsRead = async (tobemarked, id) => {
    try {
     await axios.patch(
        `${url}/${tobemarked}/update/${id}`,
        { isRead: true },
        {
          headers: { token },
        }
      );
     
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  const updateTime = (time) => {
    const date = new Date(time);

    // Format date part
    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format time part (HH:MM)
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return `${datePart} at ${timePart}`;
  };

  const deleteIssue = async (id) => {
    try {
      const response = await axios.delete(`${url}/issue/remove/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        getReport();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReport = async () => {
    try {
      const response = await axios.get(`${url}/issue/get/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        setReport([...response.data.issues]);
      }
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  const getAllReports = async () => {
    try {
      const response = await axios.get(`${url}/issue/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setAllReports([...response.data.issues]);
      }
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  const getNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification/get/${id}`);
      if (response.data.success) {
        setNotifications(response.data.notifications);
      } else {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      const response = await axios.delete(`${url}/notification/delete/${id}`);
      if (response.data.success) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        url,
        token,
        role,
        updateTime,
        id,
        notifications,
        getNotification,
        getReport,
        deleteNotification,
        deleteIssue,
        getAllReports,
        markAsRead,
        report,
        allReports,
        logout,
        setToken,
        userName,
        setUserName,
        setId,
        setRole,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}{" "}
    </StoreContext.Provider>
  );
};
