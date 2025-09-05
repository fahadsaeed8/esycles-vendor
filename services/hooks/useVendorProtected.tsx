"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VendorAccessModal from "../../components/common/modals/VendorAccessModal";
import { getProfileAPI } from "../api";
import { parseCookies } from "nookies";

export const useVendorProtected = () => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  console.log("token", token);

  // client side pe hi token le
  useEffect(() => {
    const cookies = parseCookies();
    setToken(cookies.token || null);
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (!token) {
      setShowModal(true);
      return;
    }

    if (isError) {
      setShowModal(true);
    }

    if (data && data.user?.role !== "vendor") {
      setShowModal(true);
    }
  }, [token, data, isError]);

  return {
    isLoading,
    isVendor: data?.user?.role === "vendor",
    AccessModal: showModal ? (
      <VendorAccessModal
        onClose={() =>
          window.location.replace("https://user.esycles.com/login")
        }
      />
    ) : null,
  };
};
