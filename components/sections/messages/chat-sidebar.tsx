import React, { useState } from "react";
import {
  FaHeart,
  FaFolder,
  FaInbox,
  FaPaperPlane,
  FaRegFileAlt,
} from "react-icons/fa";

const ChatSidebar: React.FC = () => {
  const [active, setActive] = useState("Inbox");

  const menuItems = [
    { name: "Inbox", icon: <FaInbox />, count: 10 },
    { name: "Sent", icon: <FaPaperPlane />, count: 10 },
    { name: "Drafts", icon: <FaRegFileAlt />, count: 3 },
    { name: "Create Folder", icon: <FaFolder /> },
    { name: "Contact", icon: <FaHeart /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-2 lg:p-4 flex flex-col shadow-xl w-12 lg:w-64 transition-all duration-300">
      {/* Header */}
      <h2 className="hidden lg:block text-2xl font-extrabold mb-8 text-white tracking-wide">
        Compose
      </h2>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`relative flex items-center justify-center lg:justify-start w-full px-1 lg:px-4 py-1 lg:py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out group
              ${
                active === item.name
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }
            `}
          >
            {/* Icon */}
            <span
              className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                active === item.name ? "text-blue-500" : ""
              }`}
            >
              {item.icon}
            </span>

            {/* Text - only on lg and up */}
            <span className="hidden lg:block flex-1 text-left ml-3">
              {item.name}
            </span>

            {/* Count badge - only on lg and up */}
            {item.count && (
              <span
                className={`hidden lg:inline-block rounded-full px-2 py-0.5 text-xs font-bold shadow-sm ${
                  active === item.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ChatSidebar;
