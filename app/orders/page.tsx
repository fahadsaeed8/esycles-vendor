"use client";
import React from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";
import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/api";

function Orders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vendorOrders"],
    queryFn: getVendorOrders,
  });

  const orders = data?.orders || [];

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e]">Orders</h1>
          <Button variant="primary">Add Orders</Button>
        </div>

        <div className="overflow-auto border border-gray-300 rounded-lg">
          {/* ✅ Loading State */}
          {isLoading && (
            <div className="p-6 text-center text-gray-500">
              Loading orders...
            </div>
          )}

          {/* ✅ Error State */}
          {isError && (
            <div className="p-6 text-center text-red-500">
              Failed to load orders.
            </div>
          )}

          {/* ✅ No Data State */}
          {!isLoading && !isError && orders.length === 0 && (
            <div className="p-6 text-center text-gray-500">No data found</div>
          )}

          {/* ✅ Table when data is available */}
          {orders.length > 0 && (
            <table className="text-sm text-left text-[#222] min-w-[768px] w-full">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="py-3 text-center">
                    <input type="checkbox" />
                  </th>
                  <th className="py-3 text-center text-[12px]">Order Code</th>
                  <th className="py-3 text-center text-[12px]">
                    Num. of Products
                  </th>
                  <th className="py-3 text-center text-[12px]">Customer</th>
                  <th className="py-3 text-center text-[12px]">Seller</th>
                  <th className="py-3 text-center text-[12px]">Amount</th>
                  <th className="py-3 text-center text-[12px]">
                    Delivery Status
                  </th>
                  <th className="py-3 text-center text-[12px]">
                    Payment method
                  </th>
                  <th className="py-3 text-center text-[12px]">
                    Payment Status
                  </th>
                  <th className="py-3 text-center text-[12px]">Refund</th>
                  <th className="py-3 text-center text-[12px]">Options</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, idx: number) => (
                  <tr
                    key={order._id || idx}
                    className="border-t border-gray-300 bg-white hover:bg-orange-50 transition duration-300"
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer text-center"
                      />
                    </td>

                    {/* Order Code -> API doesn’t provide, so showing _id */}
                    <td className="flex flex-col items-center p-2 text-center w-full">
                      <span className="text-[12px] font-[400] text-center">
                        {order._id}
                      </span>
                      {/* 🔴 Ask backend: provide proper orderCode */}
                    </td>

                    {/* Number of Products */}
                    <td className="text-center text-[12px]">
                      {order.items?.length || 0}
                    </td>

                    {/* Customer Name */}
                    <td className="p-2 text-center text-[12px]">
                      {order.user?.email || "Unknown"}
                      {/* 🔴 Ask backend: add customer full name */}
                    </td>

                    {/* Seller Name */}
                    <td className="p-2 text-center text-[12px]">
                      {order.items?.[0]?.product?.seller?.company_info
                        ?.company_name || "Inhouse Order"}
                      {/* 🔴 Ask backend: confirm seller field */}
                    </td>

                    {/* Amount */}
                    <td className="p-2 text-center text-[12px]">
                      ${order.total_price}
                    </td>

                    {/* Delivery Status */}
                    <td className="p-2 text-center text-[12px]">
                      {order.order_status}
                    </td>

                    {/* Payment Method -> not in API, keeping static */}
                    <td className="p-2 text-center text-[12px]">
                      Cash On Delivery
                      {/* 🔴 Ask backend: return payment method */}
                    </td>

                    {/* Payment Status */}
                    <td className="p-2 text-center text-[12px]">
                      <span
                        className={`px-2 py-1 text-white text-xs rounded ${
                          order.payment_status === "paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>

                    {/* Refund -> not in API, keeping static */}
                    <td className="p-1 text-center">No Refund</td>

                    {/* Options */}
                    <td className="p-1 flex gap-x-2 items-center justify-center text-center">
                      <FaEye className="cursor-pointer text-gray-700" />
                      <FaDownload className="cursor-pointer text-gray-700" />
                      <FaTrash className="cursor-pointer text-gray-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Orders;
