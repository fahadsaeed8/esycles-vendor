"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactModal from "../react-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatereturnOrderStatusAPI } from "../../../services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  returnOrder: any;
};

export const SingleReturnOrderModal = ({
  isOpen,
  onClose,
  returnOrder,
}: Props) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(returnOrder?.status || "");

  const updateStatusMutation = useMutation({
    mutationFn: (data: { returnOrderId: string; status: string }) =>
      updatereturnOrderStatusAPI(data),
    onSuccess: () => {
      toast.success("Return order status updated successfully ");
      queryClient.invalidateQueries({ queryKey: ["returnOrders"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update status ❌"
      );
    },
  });

  if (!returnOrder) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    updateStatusMutation.mutate({
      returnOrderId: returnOrder._id, // ya jo bhi id field hai
      status: newStatus,
    });
  };

  return (
    <ReactModal modalIsOpen={isOpen} setIsOpen={onClose}>
      <div className="w-full min-w-[500px] max-w-[700px] p-6 space-y-5">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Return Order Details
        </h2>

        {/* Order & Customer Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Order ID:</p>
            <p className="text-gray-600">{returnOrder.order?._id}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Invoice:</p>
            <p className="text-gray-600">
              {returnOrder.order?.invoice_number || "N/A"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Customer:</p>
            <p className="text-gray-600">{returnOrder.user?.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Current Status:</p>
            <span
              className={`px-3 py-1 rounded-full text-xs text-white ${
                returnOrder.status === "requested"
                  ? "bg-yellow-500"
                  : returnOrder.status === "approved"
                  ? "bg-green-500"
                  : returnOrder.status === "rejected"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            >
              {returnOrder.status}
            </span>
          </div>
        </div>

        {/* Status Update Dropdown */}
        <div>
          <p className="font-semibold text-gray-700 mb-1">Update Status:</p>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updateStatusMutation.isPending}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="requested">Requested</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Products */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Products:</p>
          {returnOrder.order?.products?.map((prod: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-3 border rounded-lg p-2 mb-2 bg-gray-50"
            >
              <Image
                src={prod.images?.[0] || "/no-img.png"}
                alt={prod.title}
                width={60}
                height={60}
                className="rounded border"
              />
              <div>
                <p className="font-medium text-gray-800">{prod.title}</p>
                <p className="text-xs text-gray-500">SKU: {prod.sku_code}</p>
                <p className="text-xs text-gray-500">
                  Price: ${prod.price} | Stock: {prod.stock}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Return Reason */}
        <div>
          <p className="font-semibold text-gray-700">Return Reason:</p>
          <p className="text-gray-600">{returnOrder.return_reason}</p>
        </div>

        {/* Return Images */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Return Images:</p>
          {returnOrder.return_images?.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {returnOrder.return_images.map((img: string, i: number) => (
                <Image
                  key={i}
                  src={img.startsWith("http") ? img : `/${img}`}
                  alt="return"
                  width={100}
                  height={100}
                  className="rounded border"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No return images</p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
