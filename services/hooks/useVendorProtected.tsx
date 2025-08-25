// hooks/useVendorProtected.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VendorAccessModal from "../../components/common/modals/VendorAccessModal";
import { getProfileAPI } from "../api";

export const useVendorProtected = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
    enabled: !!token, // sirf tab chale jab token ho
    retry: false,
  });

  console.log("getprofiledata", data);

  useEffect(() => {
    if (!token) {
      setShowModal(true); // Token hi nahi → show modal
      return;
    }

    if (isError) {
      setShowModal(true); // API fail → show modal
    }

    if (data && data.user?.role !== "vendor") {
      setShowModal(true); // Not vendor → show modal
    }
  }, [token, data, isError]);

  return {
    isLoading,
    isVendor: data?.user?.role === "vendor",
    AccessModal: showModal ? (
      <VendorAccessModal
        onClose={() => router.replace("http://localhost:3000/login")}
      />
    ) : null,
  };
};
