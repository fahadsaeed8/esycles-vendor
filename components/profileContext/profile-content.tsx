"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type UserContextType = {
  profileImage: string | null;
  setProfileImage: (img: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImageState(savedImage);
  }, []);

  // Wrapper to save in both state & localStorage
  const setProfileImage = (img: string | null) => {
    if (img) {
      localStorage.setItem("profileImage", img);
    } else {
      localStorage.removeItem("profileImage");
    }
    setProfileImageState(img);
  };

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
