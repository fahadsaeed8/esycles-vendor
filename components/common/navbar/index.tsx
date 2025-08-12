"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Bell,
  Mail,
  MessageSquareText,
  Save,
  Printer,
  Menu,
  X,
} from "lucide-react";
import MailPopUp from "../../popup/message-popup";
import NotificationPopUp from "../../popup/notification-popup";
import ProfilePopUp from "../../popup/profile-popup";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        {/* Left Section - Mobile Menu and Locations */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden mr-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Locations - Always visible */}
          <div className="flex items-center gap-1 cursor-pointer">
            <MapPin size={18} className="text-white" />
            <span className="font-semibold text-sm hidden sm:inline">
              Locations
            </span>
          </div>
        </div>

        {/* Center Section - Search (desktop) */}
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

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Button - Mobile */}
          <button onClick={() => setShowSearch(true)} className="lg:hidden p-1">
            <Search size={20} />
          </button>
          {/* Icons - Always visible but spaced differently */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            <MessageSquareText className="w-5 h-5 cursor-pointer" />
            <MailPopUp />
            <Save className="w-5 h-5 cursor-pointer" />
            <Printer className="w-5 h-5 cursor-pointer" />
            <NotificationPopUp />
          </div>
          {/* Compact Icons - Mobile */}
          {/* <div className="flex sm:hidden items-center gap-1">
            <div className="relative cursor-pointer p-1">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          </div> */}
          <div className="block sm:hidden">
            <NotificationPopUp />
          </div>
          <ProfilePopUp />{" "}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-12 left-0 w-full bg-[#283a52] shadow-lg z-50 lg:hidden py-2 px-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <MessageSquareText size={20} />
                <span className="text-xs mt-1">Messages</span>
              </div>
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <Mail size={20} />
                <span className="text-xs mt-1">Mail</span>
              </div>
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <Save size={20} />
                <span className="text-xs mt-1">Saved</span>
              </div>
              <div className="flex flex-col items-center p-2 cursor-pointer">
                <Printer size={20} />
                <span className="text-xs mt-1">Print</span>
              </div>
              <div className="flex flex-col items-center p-2 cursor-pointer relative">
                <Bell size={20} />
                <span className="text-xs mt-1">Alerts</span>
                <span className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
