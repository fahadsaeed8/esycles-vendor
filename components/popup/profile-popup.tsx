"use client";

import React from "react";
import {
  Bell,
  Calendar,
  ChevronDown,
  Link,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import ReactPopUp from "../common/react-popup";

const ProfilePopUp = () => {
  const notifications = [
    {
      id: 1,
      message: "Settings",
      avatar: <Settings size={16} className="text-white" />,
    },
    {
      id: 2,
      message: "Log out",
      avatar: <LogOut size={16} className="text-white" />,
    },
  ];

  const popupContent = (close: () => void) => (
    <div className="w-[200px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-1 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Profile
      </div>
      <div>
        {notifications.map((msg) => (
          <div
            onClick={close}
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-2 transition-colors duration-150 cursor-pointer border-b border-b-gray-300 hover:bg-gray-300`}
          >
            <div className="min-w-10 max-w-10 min-h-10 max-h-10 bg-gray-600 rounded-full flex justify-center items-center">
              {msg.avatar}
            </div>
            <div className="flex flex-col text-xs">
              {msg.message && (
                <span className="font-medium">{msg.message}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
        Advanced Settings
      </div>
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <div className="flex items-center gap-1 sm:gap-2 cursor-pointer ml-1 sm:ml-0">
        <Image
          src="/icons/profile-avatar.jpg"
          alt="User"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium text-sm hidden md:inline">John Doe</span>
        <ChevronDown size={16} className="text-gray-200 hidden md:inline" />
      </div>
    </ReactPopUp>
  );
};

export default ProfilePopUp;
