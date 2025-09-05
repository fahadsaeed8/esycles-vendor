"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Order = {
  id: string;
  customer: string;
  product: string;
  deliveryTimeline: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function ManageDeliveryPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      customer: "Ali Raza",
      product: "E-Bike Model X",
      deliveryTimeline: "3 days",
      status: "Pending",
    },
    {
      id: "ORD-1002",
      customer: "Fatima Khan",
      product: "E-Scooter Z",
      deliveryTimeline: "7 days",
      status: "Approved",
    },
    {
      id: "ORD-1003",
      customer: "Ahmed Malik",
      product: "E-Cycle Classic",
      deliveryTimeline: "5 days",
      status: "Rejected",
    },
  ]);

  const updateTimeline = (id: string, newTimeline: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, deliveryTimeline: newTimeline } : order
      )
    );
  };

  const updateStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Delivery Timelines & Bulk Order Requests
      </h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full ">
          <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <tr>
              <th className=" p-3 text-left">Order ID</th>
              <th className=" p-3 text-left">Customer</th>
              <th className=" p-3 text-left">Product</th>
              <th className=" p-3 text-left">Delivery Timeline</th>
              <th className=" p-3 text-left">Status</th>
              <th className=" p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 border-t border-gray-300">
                <td className=" p-3">{order.id}</td>
                <td className=" p-3">{order.customer}</td>
                <td className=" p-3">{order.product}</td>
                <td className=" p-3">
                  <select
                    value={order.deliveryTimeline}
                    onChange={(e) =>
                      updateTimeline(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="7 days">7 days</option>
                    <option value="10 days">10 days</option>
                  </select>
                </td>
                <td className=" p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      order.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className=" p-3 text-center space-x-2">
                  <button
                    onClick={() => updateStatus(order.id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DashboardLayout>
  );
}
