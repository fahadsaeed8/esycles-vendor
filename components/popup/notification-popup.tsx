"use client";

import React from "react";
import { Bell, Calendar, Link as LinkIcon, Settings } from "lucide-react";
import ReactPopUp from "../common/react-popup";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNotificationAPI } from "../../services/api";

const NotificationPopUp = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationAPI,
  });

  console.log("notificationdata", data);

  const notifications = data?.data || [];

  const popupContent = (close: () => void) => (
    <div className="w-[240px] sm:w-[260px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-3 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Notifications
      </div>

      {/* Loading & Error State */}
      {isLoading && (
        <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
      )}
      {isError && (
        <div className="px-4 py-2 text-sm text-red-500">
          Failed to load notifications
        </div>
      )}

      <div>
        {notifications.length > 0
          ? notifications?.slice(0, 5)?.map((msg: any) => (
              <Link
                key={msg._id}
                href={"/notifications"} // 🔴 API response mein "link" missing hai → static rakha hai
                onClick={close}
                className={`flex items-center gap-3 px-4 py-2 transition-colors duration-150 cursor-pointer border-b border-b-gray-300 hover:bg-gray-300`}
              >
                {/* 🔴 API response mein "avatar" missing hai → static default rakha */}
                <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-gray-600 rounded-full flex justify-center items-center">
                  <Bell size={16} className="text-white" />
                </div>

                <div className="flex flex-col text-xs">
                  {/* 🔴 Tumhari API mein "message" field nahi hai → uske liye "title" use kiya */}
                  {msg.title && (
                    <span className="font-medium">{msg.title}</span>
                  )}
                  <span className="text-gray-500 font-normal">
                    {msg.description}
                  </span>
                </div>
              </Link>
            ))
          : !isLoading && (
              <div className="px-4 py-2 text-sm text-center text-gray-500">
                No notifications found
              </div>
            )}
      </div>

      {notifications?.length > 0 && (
        <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
          <Link href={"/notifications"}>See all notifications</Link>
        </div>
      )}
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <div className="relative cursor-pointer">
        <Bell size={20} className="text-white" />
        {/* 🔴 API mein "unread count" missing hai → abhi ke liye static red dot rakha */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </div>
    </ReactPopUp>
  );
};

export default NotificationPopUp;
