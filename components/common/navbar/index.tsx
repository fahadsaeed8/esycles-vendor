"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import NotificationPopUp from "../../popup/notification-popup";
import ProfilePopUp from "../../popup/profile-popup";
import Link from "next/link";
import { useUser } from "../../profileContext/profile-content";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Mock Data (you can replace with API later)
  const mockData = [
    "Mountain Bike",
    "Road Bike",
    "Electric Scooter",
    "Helmet",
    "Cycling Gloves",
    "Bike Lights",
    "Water Bottle",
    "Cycling Shoes",
    "Repair Kit",
    "Smart Lock",
  ];

  const filteredResults = search
    ? mockData.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    : [];
    const {profileImage} = useUser()
  return (
    <>
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="absolute top-3 left-4 right-4 bg-white shadow-2xl p-2 rounded flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex">
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

            {/* Search Results */}
            {filteredResults.length > 0 && (
              <ul className="mt-2 bg-white shadow rounded border border-gray-200 max-h-60 overflow-y-auto">
                {filteredResults.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearch(item);
                      setShowSearch(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="w-full bg-[#283a52] shadow-md px-4 py-2 flex items-center justify-between text-white relative">
        {/* Left Section - Mobile Search Button */}
        <div className="flex items-center gap-2">
          <Link href={'/'}>
          <h3 className=" cursor-pointer text-base lg:text-lg font-medium text-white">
            Dashboard
          </h3>
          </Link>
          <button onClick={() => setShowSearch(true)} className="lg:hidden p-1">
            <Search size={20} />
          </button>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-6 relative">
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

          {/* Search Results Dropdown */}
          {filteredResults.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white shadow rounded border border-gray-200 mt-1 max-h-60 overflow-y-auto z-50">
              {filteredResults.map((item, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearch(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
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
