"use client";

import React from "react";
import { Bell, Calendar, Link as LinkIcon, Settings } from "lucide-react";
import ReactPopUp from "../common/react-popup";
import Link from "next/link";

const NotificationPopUp = () => {
  const notifications = [
    {
      id: 1,
      message: "Event today",
      description: " Just a reminder that you have an event today ",
      avatar: <Calendar size={16} className="text-white" />,
      link: "/todo-list",
    },
    {
      id: 2,
      message: "Setting",
      description: " Update Dashboard",
      avatar: <Settings size={16} className="text-white" />,
      link: "/settings",
    },
    {
      id: 3,
      message: "Launch Admin",
      description: "  New admin wow! ",
      avatar: <LinkIcon size={16} className="text-white" />,
      link: "/",
    },
  ];

  const popupContent = (close: () => void) => (
    <div className="w-[240px] sm:w-[260px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-3 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Notifications
      </div>
      <div>
        {notifications.map((msg) => (
          <Link
            key={msg.id}
            href={msg.link}
            onClick={close}
            className={`flex items-center gap-3 px-4 py-2 transition-colors duration-150 cursor-pointer border-b border-b-gray-300 hover:bg-gray-300`}
          >
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-gray-600 rounded-full flex justify-center items-center">
              {msg.avatar}
            </div>
            <div className="flex flex-col text-xs">
              {msg.message && (
                <span className="font-medium">{msg.message}</span>
              )}
              <span className={"text-gray-500 font-normal"}>
                {msg.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
        See all notifications
      </div>
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <div className="relative cursor-pointer">
        <Bell size={20} className="text-white" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </div>{" "}
    </ReactPopUp>
  );
};

export default NotificationPopUp;
