"use client";

import React, { useState } from "react";

type HoverModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  position?: "left" | "right";
};

const HoverModal: React.FC<HoverModalProps> = ({
  trigger,
  children,
  className = "",
  position = "left", // Default to left
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses =
    position === "left" ? "left-0" : position === "right" ? "right-0" : "";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {trigger}
      {isHovered && (
        <div
          className={`absolute top-full mt-2 z-20 min-w-[200px] max-w-[260px] p-4 rounded-lg shadow-lg bg-white text-gray-800 border ${positionClasses} ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default HoverModal;
