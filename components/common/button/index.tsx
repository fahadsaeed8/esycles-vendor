"use client";

import { ReactNode, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyle =
    "px-6 py-2 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out focus:outline-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white hover:from-[#f59e0b] hover:via-[#d97706] hover:to-[#b45309]",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
