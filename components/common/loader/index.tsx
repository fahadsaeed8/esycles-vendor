"use client";

import { FC } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-4",
  lg: "h-16 w-16 border-4",
};

const Loader: FC<LoaderProps> = ({ size = "md", fullScreen = false }) => {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-transparent border-primary ${sizeClasses[size]}`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {spinner}
    </div>
  );
};

export default Loader;
