"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import NotificationPopUp from "../../popup/notification-popup";
import ProfilePopUp from "../../popup/profile-popup";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="absolute top-3 left-4 right-4 bg-white shadow-2xl p-2 rounded flex"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="What are you looking for"
              className="flex-1 px-3 py-2 text-sm text-black outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-[#febd69] px-3 flex items-center justify-center cursor-pointer"
              onClick={() => setShowSearch(false)}
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-[#283a52] shadow-md px-4 py-2 flex items-center justify-between text-white relative">
        {/* Left Section - Mobile Search Button */}
        <div className="flex items-center gap-2">
          <h3 className="text-base lg:text-lg font-medium text-white">
            Dashboard
          </h3>
          <button onClick={() => setShowSearch(true)} className="lg:hidden p-1">
            <Search size={20} />
          </button>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-6">
          <div className="flex border border-[#febd69] overflow-hidden bg-white w-full">
            <input
              type="text"
              placeholder="What are you looking for"
              className="flex-1 px-3 py-1.5 text-sm text-black outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#febd69] px-3 flex items-center justify-center cursor-pointer">
              <Search size={16} className="text-black" />
            </button>
          </div>
        </div>

        {/* Right Section - Notification + Profile */}
        <div className="flex items-center gap-4">
          <NotificationPopUp />
          <ProfilePopUp />
        </div>
      </div>
    </>
  );
}
