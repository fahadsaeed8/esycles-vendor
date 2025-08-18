"use client";


import { useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiTrash2,
  FiSearch,
  FiPackage,
  FiMessageSquare,
  FiAlertCircle,
  FiTag,
  FiX,
} from "react-icons/fi";
import DashboardLayout from "../../components/layout/dashboard-layout";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  category: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your bicycle order #4521 has been shipped.",
      time: "2 hours ago",
      category: "Orders",
      read: false,
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from Seller John.",
      time: "Yesterday",
      category: "Messages",
      read: false,
    },
    {
      id: 3,
      title: "Special Offer",
      message: "Get 15% off on mountain bikes this week!",
      time: "2 days ago",
      category: "Offers",
      read: true,
    },
    {
      id: 4,
      title: "Payment Received",
      message: "You received $250 from your last sale.",
      time: "3 days ago",
      category: "System",
      read: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      (filter === "All" || n.category === filter) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-2 lg:px-6 pt-6">
            <div className="flex items-center gap-3">
              <FiBell className="text-2xl text-[#f59e0b]" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Notifications
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={markAllAsRead}
                className="cursor-pointer bg-green-500 text-white px-3 sm:px-4 py-2 rounded hover:opacity-90 transition text-sm sm:text-base"
              >
                Mark All Read
              </button>
              <button
                onClick={deleteAll}
                className="cursor-pointer bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:opacity-90 transition text-sm sm:text-base"
              >
                Delete All
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex justify-between flex-col md:flex-row gap-3 mb-6 p-2 lg:px-6">
            <div className="flex gap-2 flex-wrap">
              {["All", "Orders", "Messages", "Offers", "System"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition text-sm sm:text-base ${
                    filter === cat
                      ? "bg-[#f59e0b] text-white border-[#f59e0b]"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-gray-100 rounded px-3 w-full md:w-1/3  transition-all duration-300 ease-in-out
               focus-within:shadow-[0_0_8px_rgba(0,0,0,0.1)] focus-within:shadow-green-700 
               focus-within:border-[1px] focus-within:border-green-500 border-none focus-within:bg-white">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none h-full text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-x-auto">
            {filteredNotifications.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-sm sm:text-base">
                No notifications found
              </p>
            ) : (
              <div className="divide-y divide-gray-400">
                {filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNotification(n)}
                    className={`p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition cursor-pointer ${
                      !n.read ? "bg-yellow-50" : "bg-white"
                    } hover:bg-gray-50`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      {n.category === "Orders" && (
                        <FiPackage className="text-[#f59e0b] text-xl" />
                      )}
                      {n.category === "Messages" && (
                        <FiMessageSquare className="text-[#f59e0b] text-xl" />
                      )}
                      {n.category === "Offers" && (
                        <FiTag className="text-[#f59e0b] text-xl" />
                      )}
                      {n.category === "System" && (
                        <FiAlertCircle className="text-[#f59e0b] text-xl" />
                      )}
                      <div>
                        <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                          {n.title}
                        </h2>
                        <p className="text-gray-600 text-xs sm:text-sm truncate max-w-xs">
                          {n.message}
                        </p>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                    </div>
                    <div
                      className="flex flex-wrap gap-2"
                      onClick={(e) => e.stopPropagation()} // Prevent modal opening when clicking buttons
                    >
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="cursor-pointer flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-xs sm:text-sm"
                        >
                          <FiCheckCircle /> Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="cursor-pointer flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs sm:text-sm"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Notification Details */}
      {selectedNotification && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    onClick={() => setSelectedNotification(null)} // close on outside click
  >
    <div
      className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
      onClick={(e) => e.stopPropagation()} // prevent closing on inside click
    >
      <button
        onClick={() => setSelectedNotification(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <FiX size={20} />
      </button>
      <div className="flex items-center gap-2 mb-3">
        {selectedNotification.category === "Orders" && (
          <FiPackage className="text-[#f59e0b] text-xl" />
        )}
        {selectedNotification.category === "Messages" && (
          <FiMessageSquare className="text-[#f59e0b] text-xl" />
        )}
        {selectedNotification.category === "Offers" && (
          <FiTag className="text-[#f59e0b] text-xl" />
        )}
        {selectedNotification.category === "System" && (
          <FiAlertCircle className="text-[#f59e0b] text-xl" />
        )}
        <h2 className="text-lg font-bold">{selectedNotification.title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{selectedNotification.message}</p>
      <div className="text-sm text-gray-500">
        <p>Category: {selectedNotification.category}</p>
        <p>Time: {selectedNotification.time}</p>
      </div>
    </div>
  </div>
)}

    </DashboardLayout>
  );
}
