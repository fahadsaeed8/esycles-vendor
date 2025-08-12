"use client";

import React from "react";
import { Mail } from "lucide-react";
import Image from "next/image";
import ReactPopUp from "../common/react-popup";

const MailPopUp = () => {
  const messages = [
    {
      id: 1,
      user: "Mark",
      message: "Mark send you a message",
      time: "1 Minutes ago",
      avatar: "/images/face1.jpg",
      isNew: true,
    },
    {
      id: 2,
      user: "John",
      message: "John send you a message",
      time: "15 Minutes ago",
      avatar: "/images/face2.jpg",
      isNew: false,
    },
    {
      id: 3,
      user: "Emma",
      message: "Mark send you a message",
      time: "18 Minutes ago",
      avatar: "/images/face3.jpg",
      isNew: false,
    },
  ];

  const popupContent = (close: () => void) => (
    <div className="w-[260px] rounded-[4px] shadow-lg bg-white border mt-3 border-gray-200 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Messages
      </div>
      <div>
        {messages.map((msg) => (
          <div
            onClick={close}
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-2 transition-colors duration-150 cursor-pointer border-b border-b-gray-300 hover:text-white hover:bg-gray-600`}
          >
            <Image
              src={msg.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col text-xs">
              {msg.message && (
                <span className="font-medium">{msg.message}</span>
              )}
              <span className={"text-gray-400"}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
        {messages.length} new messages
      </div>
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <Mail className="w-5 h-5 cursor-pointer" />
    </ReactPopUp>
  );
};

export default MailPopUp;
