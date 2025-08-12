"use client";

import React from "react";
import { EllipsisVertical, List, Lock, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import ReactPopUp from "../common/react-popup";

const SideProfilePopUp = () => {
  const notifications = [
    {
      id: 1,
      message: "Account Settings",
      avatar: <Settings size={16} className="text-white" />,
    },
    {
      id: 2,
      message: "Change Password",
      avatar: <Lock size={16} className="text-white" />,
    },
    {
      id: 3,
      message: "TO Do List",
      avatar: <List size={16} className="text-white" />,
    },
  ];

  const popupContent = (close: () => void) => (
    <div className="w-[240px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-4 overflow-hidden">
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
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <EllipsisVertical className="w-5 h-[25px] cursor-pointer text-gray-300" />
    </ReactPopUp>
  );
};

export default SideProfilePopUp;
