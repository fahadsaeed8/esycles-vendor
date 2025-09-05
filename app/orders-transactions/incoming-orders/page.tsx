"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type OrderType = "Buy It Now" | "Bulk Order" | "RFQ";

interface Order {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  type: OrderType;
  date: string;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
}

export default function IncomingOrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      customer: "Ali Khan",
      product: "Mountain Bike X1",
      quantity: 1,
      type: "Buy It Now",
      date: "2025-09-05",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Techno Traders",
      product: "Electric Scooters",
      quantity: 50,
      type: "Bulk Order",
      date: "2025-09-04",
      status: "Processing",
    },
    {
      id: 3,
      customer: "Hammad Traders",
      product: "BMX Cycles",
      quantity: 200,
      type: "RFQ",
      date: "2025-09-03",
      status: "Pending",
    },
  ]);

  const [filter, setFilter] = useState<OrderType | "All">("All");

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.type === filter);

  return (
    <DashboardLayout>
    <div className="">
      <div className=" max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Incoming Orders</h2>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          {["All", "Buy It Now", "Bulk Order", "RFQ"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as OrderType | "All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-300">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3 text-center">{order.quantity}</td>
                  <td className="p-3 text-center font-medium">{order.type}</td>
                  <td className="p-3 text-center">{order.date}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Processing"
                        ? "text-blue-600"
                        : order.status === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
