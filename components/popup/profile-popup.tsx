"use client";

import React from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // ✅ Import Link
import ReactPopUp from "../common/react-popup";
import { useUser } from "../profileContext/profile-content";
import { useQuery } from "@tanstack/react-query";
import { getProfileAPI } from "../../services/api";

const ProfilePopUp = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

  const notifications = [
    {
      id: 1,
      message: "Settings",
      avatar: <Settings size={16} className="text-white" />,
      link: "/settings", // ✅ navigate here
    },
    {
      id: 2,
      message: "Log out",
      avatar: <LogOut size={16} className="text-white" />,
      link: "/logout", // ✅ or call API logout later
    },
  ];

  const { profileImage } = useUser();

  const popupContent = (close: () => void) => (
    <div className="w-[200px] rounded-[4px] shadow-lg bg-white border border-gray-200 mt-1 overflow-hidden">
      <div className="px-4 py-2 border-b border-b-gray-300 font-semibold text-sm">
        Profile
      </div>
      <div>
        {notifications.map((msg) => (
          <Link key={msg.id} href={msg.link} onClick={close}>
            <div
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
          </Link>
        ))}
      </div>
      {/* <div className="px-4 py-2 cursor-pointer text-center text-sm text-gray-700">
        Advanced Settings
      </div> */}
    </div>
  );

  return (
    <ReactPopUp popupContent={popupContent}>
      <div className="flex items-center gap-1 sm:gap-2 cursor-pointer ml-1 sm:ml-0">
        {data?.user?.image ? (
          <Image
            src={`${data?.user?.image && data?.user?.image}`}
            width={35}
            height={35}
            alt="Logo"
            className="w-[35px] h-[35px] rounded-full cursor-pointer object-cover"
          />
        ) : (
          <div className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-blue-500 text-center font-semibold uppercase text-white">
            {data?.user?.first_name[0]}
          </div>
        )}
        <span className="font-medium text-sm hidden md:inline">
          {" "}
          {data?.user?.first_name} {data?.user?.last_name}
        </span>
        <ChevronDown size={16} className="text-gray-200 hidden md:inline" />
      </div>
    </ReactPopUp>
  );
};

export default ProfilePopUp;
