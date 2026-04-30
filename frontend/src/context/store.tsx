import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";
import React from "react";
import { toast } from "sonner";

export interface Comment {
  _id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  userId: string;
  image?: string;
  location?: { lat: number; lng: number };
  comments?: Comment[];
}

export interface NotificationItem {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

interface StoreContextValue {
  url: string;
  token: string | null;
  role: string | null;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  updateTime: (time: string) => string;
  id: string | null;
  notifications: NotificationItem[];
  getNotification: () => Promise<void>;
  getReport: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
  getAllReports: () => Promise<void>;
  markAsRead: (tobemarked: string, id: string) => Promise<void>;
  report: Issue[];
  allReports: Issue[];
  getUser: () => Promise<void>;
  user: Partial<UserProfile>;
  logout: () => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  /** The user's chosen preference: light | dark | system */
  theme: ThemeMode;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  /** The resolved (actual) theme being applied */
  resolvedTheme: 'light' | 'dark';
}

export const StoreContext = createContext<StoreContextValue>({} as StoreContextValue);

export const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const url = import.meta.env.VITE_API_URL;

  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || 'system'
  );

  // Resolve system preference
  const getSystemTheme = (): 'light' | 'dark' =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    () => theme === 'system' ? getSystemTheme() : theme
  );

  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.classList.toggle('light', resolved === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for OS-level preference changes when in system mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        document.documentElement.classList.toggle('dark', resolved === 'dark');
        document.documentElement.classList.toggle('light', resolved === 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const [report, setReport] = useState<Issue[]>([]);
  const [allReports, setAllReports] = useState<Issue[]>([]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [id, setId] = useState<string | null>(localStorage.getItem('userId'));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  const [user, setUser] = useState<Partial<UserProfile>>({});

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    setReport([]);
    setNotifications([]);
    setId(null);
    setToken(null);
    setRole(null);
    setUserName(null);
    window.location.href = '/';
  };

  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const markAsRead = async (tobemarked: string, id: string): Promise<void> => {
    try {
      await axios.patch(
        `${url}/${tobemarked}/update/${id}`,
        { isRead: true },
        {
          headers: { token },
        }
      );
    } catch (error) {
      toast.error('error');
      console.log(error);
    }
  };

  const updateTime = (time: string): string => {
    const date = new Date(time);

    // Format date part
    const datePart = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format time part (HH:MM)
    const timePart = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    });

    return `${datePart} at ${timePart}`;
  };

  const deleteIssue = async (id: string): Promise<void> => {
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

  const getUser = async (): Promise<void> => {
    try {
      const response = await axios.get(`${url}/user/get/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReport = async (): Promise<void> => {
    try {
      const response = await axios.get(`${url}/issue/get/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        setReport([...response.data.issues]);
      }
    } catch (error) {
      toast.error('error');
      console.log(error);
    }
  };

  const getAllReports = async (): Promise<void> => {
    try {
      const response = await axios.get(`${url}/issue/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setAllReports([...response.data.issues]);
      }
    } catch (error) {
      toast.error('error');
      console.log(error);
    }
  };

  const getNotification = async (): Promise<void> => {
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

  const deleteNotification = async (id: string): Promise<void> => {
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
        showLogin,
        setShowLogin,
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
        getUser,
        user,
        logout,
        setToken,
        userName,
        setUserName,
        setId,
        setRole,
        showSidebar,
        setShowSidebar,
        theme,
        setTheme,
        resolvedTheme,
      }}
    >
      {children}{" "}
    </StoreContext.Provider>
  );
};
