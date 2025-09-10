"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Image from "next/image";
import { returnOrderAPI } from "../../services/api";
import { SingleReturnOrderModal } from "../../components/common/modals/single-return-order-modal";

const tabs = ["requested", "approved", "rejected", "completed"];

function ReturnOrders() {
  const [activeTab, setActiveTab] = useState("requested");
  const [showSingleReturn, setShowSingleReturn] = useState(false);
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<any>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["returnOrders", activeTab],
    queryFn: () => returnOrderAPI(activeTab),
  });

  const returnOrders = data?.returnOrders || [];

  console.log("returnOrders", returnOrders);

  return (
    <DashboardLayout>
      <div>
        {/* 🔹 Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e]">
            Return Orders
          </h1>
        </div>

        {/* 🔹 Status Tabs */}
        <div className="flex gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 text-sm rounded-full font-medium transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* 🔹 Table */}
        <div className="overflow-auto border border-gray-300 rounded-lg">
          {/* ✅ Loading State */}
          {isLoading && (
            <div className="p-6 text-center text-gray-500">
              Loading return orders...
            </div>
          )}

          {/* ✅ Error State */}
          {isError && (
            <div className="p-6 text-center text-red-500">
              Failed to load return orders.
            </div>
          )}

          {/* ✅ No Data State */}
          {!isLoading && !isError && returnOrders.length === 0 && (
            <div className="p-6 text-center text-gray-500">No data found</div>
          )}

          {/* ✅ Data Table */}
          {returnOrders.length > 0 && (
            <table className="text-sm text-left text-[#222] min-w-[768px] w-full">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="py-3 px-2 text-center text-[12px]">
                    Order ID
                  </th>
                  <th className="py-3 px-2 text-center text-[12px]">
                    Customer
                  </th>
                  <th className="py-3 px-2 text-center text-[12px]">Product</th>
                  <th className="py-3 px-2 text-center text-[12px]">Reason</th>
                  <th className="py-3 px-2 text-center text-[12px]">Images</th>
                  <th className="py-3 px-2 text-center text-[12px]">Status</th>
                  <th className="py-3 px-2 text-center text-[12px]">Options</th>
                </tr>
              </thead>
              <tbody>
                {returnOrders.map((ro: any, idx: number) => (
                  <tr
                    key={ro._id || idx}
                    className="border-t border-gray-300 bg-white hover:bg-orange-50 transition duration-300"
                  >
                    {/* Order ID */}
                    <td className="p-3 text-center text-[12px]">
                      {ro.order?.invoice_number || ro.order?._id}
                    </td>

                    {/* Customer */}
                    <td className="p-3 text-center text-[12px]">
                      {ro.user?.email}
                    </td>

                    {/* Product */}
                    <td className="p-3 text-center text-[12px] font-medium">
                      {ro.order?.products?.[0]?.title || "N/A"}
                    </td>

                    {/* Reason */}
                    <td className="p-3 text-center text-[12px] text-gray-600">
                      {ro.return_reason}
                    </td>

                    {/* Return Images */}
                    <td className="p-3 text-center">
                      {ro.return_images?.length > 0 ? (
                        <div className="flex justify-center gap-2">
                          <Image
                            src={`${ro?.return_images[0] ?? ""}`}
                            alt="return"
                            width={40}
                            height={40}
                            className="rounded border"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs text-white ${
                          ro.status === "requested"
                            ? "bg-yellow-500"
                            : ro.status === "approved"
                            ? "bg-green-500"
                            : ro.status === "rejected"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {ro.status.charAt(0).toUpperCase() + ro.status.slice(1)}
                      </span>
                    </td>

                    {/* Options */}
                    <td className="p-3 text-center">
                      <FaEye
                        onClick={() => {
                          setSelectedReturnOrder(ro);
                          setShowSingleReturn(true);
                        }}
                        className="cursor-pointer text-gray-700 hover:text-orange-600"
                      />{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <SingleReturnOrderModal
        isOpen={showSingleReturn}
        onClose={() => setShowSingleReturn(false)}
        returnOrder={selectedReturnOrder}
      />
    </DashboardLayout>
  );
}

export default ReturnOrders;
