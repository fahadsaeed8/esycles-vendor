"use client";

import React, { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../button";
import { uploadBulkProductAPI } from "../../../services/api";

const BulkUploadOrders = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showModal) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 95) return prev + 1;
          return prev;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [showModal]);

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      setShowModal(true);

      return uploadBulkProductAPI(formData);
    },
    onSuccess: (data) => {
      setProgress(100);
      setTimeout(() => {
        setShowModal(false);
        setProgress(0);
      }, 500);

      toast.success(data?.message || "Orders uploaded successfully ");
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
    onError: (error: any) => {
      console.log("file upload error", error);
      setProgress(0);
      setShowModal(false);

      toast.error(
        error?.response?.data?.error?.error?.message
          ? error?.response?.data?.error?.error?.message
          : error?.response?.data?.message || "Failed to upload orders ❌"
      );
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutate(file);
    }
  };

  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="primary"
        className="!mb-0"
      >
        Upload Product File
      </Button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0_,0_,0_,0.5)]">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Uploading Orders...
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-200 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm font-medium text-gray-700">{progress}%</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkUploadOrders;
