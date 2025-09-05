"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ClipboardCheck } from "lucide-react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

interface ReturnRefund {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  complianceChecked: boolean;
  date: string;
}

export default function ReturnsRefundsPage() {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [search, setSearch] = useState("");

  const records: ReturnRefund[] = [
    { id: "R-101", orderId: "O-1001", customer: "Customer A", product: "Product X", reason: "Damaged item", status: "Pending", complianceChecked: false, date: "2025-09-01" },
    { id: "R-102", orderId: "O-1002", customer: "Customer B", product: "Product Y", reason: "Wrong size", status: "Approved", complianceChecked: true, date: "2025-08-28" },
    { id: "R-103", orderId: "O-1003", customer: "Customer C", product: "Product Z", reason: "Late delivery", status: "Rejected", complianceChecked: true, date: "2025-09-03" },
    { id: "R-104", orderId: "O-1004", customer: "Customer D", product: "Product X", reason: "Missing parts", status: "Pending", complianceChecked: false, date: "2025-09-04" },
  ];

  const filteredRecords = records.filter(
    (r) => r.status === activeTab && r.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (id: string, action: "Approve" | "Reject") => {
    alert(`Record ${id} marked as ${action}`);
    // You can implement state update here for frontend simulation
  };

  const handleComplianceCheck = (id: string) => {
    alert(`Compliance checked for ${id}`);
    // You can implement state update here for frontend simulation
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Returns, Refunds & Compliance</h1>

        {/* Tabs */}
        <div className="flex gap-4  mb-6">
          {["Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`pb-2 px-4 font-medium  cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr className=" text-sm text-left">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Product</th>
                <th className="p-3 border-b">Reason</th>
                <th className="p-3 border-b">Compliance</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="text-sm hover:bg-gray-50 border-b border-gray-300">
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.orderId}</td>
                    <td className="p-3">{r.customer}</td>
                    <td className="p-3">{r.product}</td>
                    <td className="p-3">{r.reason}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleComplianceCheck(r.id)}
                        className={`flex items-center gap-1 text-sm font-medium ${
                          r.complianceChecked ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        <ClipboardCheck size={16} />
                        {r.complianceChecked ? "Checked" : "Check"}
                      </button>
                    </td>
                    <td className="p-3">{r.date}</td>
                    <td className="p-3 text-right space-x-2">
                      {r.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAction(r.id, "Approve")}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleAction(r.id, "Reject")}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      {r.status !== "Pending" && (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No records found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
