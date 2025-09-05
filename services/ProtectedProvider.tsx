"use client";

import { ReactNode } from "react";
import { useVendorProtected } from "./hooks/useVendorProtected";
import Loader from "../components/common/loader";

interface ProtectedProviderProps {
  children: ReactNode;
}

const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
  const { isVendor, AccessModal, isLoading } = useVendorProtected();

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (!isVendor) {
    return AccessModal;
  }

  return <>{children}</>;
};

export default ProtectedProvider;
