import React, { useContext, useEffect, useState } from "react";
import { Bell, CheckCheck, BellOff } from "lucide-react";
import Notification from "./Notification";
import { StoreContext } from "../context/store";

const Notifications: React.FC = () => {
  const { notifications, getNotification } = useContext(StoreContext);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    getNotification();
  }, []);

  const filteredNotifications = notifications.filter((n) =>
    filter === "unread" ? !n.isRead : true
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    console.log("Marking all as read...");
  };

  return (
    <div className="min-h-screen w-full sm:ml-64 ml-0 bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-full mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {unreadCount} new
                </span>
              )}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Stay updated with your latest activities.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`pb-3 text-sm font-medium transition-all ${
              filter === "all"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`pb-3 text-sm font-medium transition-all ${
              filter === "unread"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((noti, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0">
                <Notification noti={noti} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-6">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <BellOff className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
              <p className="text-gray-500 max-w-sm mt-1">
                {filter === "unread"
                  ? "You're all caught up! No new unread messages."
                  : "You have no notifications yet."}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Notifications;
