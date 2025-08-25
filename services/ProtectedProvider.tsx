"use client";

import { ReactNode } from "react";
import { useVendorProtected } from "./hooks/useVendorProtected";

interface ProtectedProviderProps {
  children: ReactNode;
}

const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
  const { isVendor, AccessModal, isLoading } = useVendorProtected();

  if (isLoading) {
    return <p className="p-10">Loading...</p>;
  }

  if (!isVendor) {
    return AccessModal;
  }

  return <>{children}</>;
};

export default ProtectedProvider;
