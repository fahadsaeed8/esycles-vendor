"use client";

import { useState } from "react";
import { Search, Eye, MessageSquare, CheckCircle } from "lucide-react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

interface Dispute {
  id: string;
  customer: string;
  issue: string;
  status: "Open" | "In-Progress" | "Resolved";
  date: string;
}

export default function DisputeResolutionPage() {
  const [activeTab, setActiveTab] = useState<"Open" | "In-Progress" | "Resolved">("Open");
  const [search, setSearch] = useState("");

  const disputes: Dispute[] = [
    { id: "D-1001", customer: "Customer A", issue: "Refund not received", status: "Open", date: "2025-09-01" },
    { id: "D-1002", customer: "Customer B", issue: "Damaged product", status: "In-Progress", date: "2025-09-02" },
    { id: "D-1003", customer: "Customer C", issue: "Late delivery", status: "Resolved", date: "2025-08-28" },
    { id: "D-1004", customer: "Customer D", issue: "Incorrect item", status: "Open", date: "2025-09-03" },
    { id: "D-1005", customer: "Customer E", issue: "Partial refund pending", status: "In-Progress", date: "2025-09-04" },
  ];

  const filteredDisputes = disputes.filter(
    (d) => d.status === activeTab && d.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dispute Resolution & Support Tickets</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["Open", "In-Progress", "Resolved"].map((tab) => (
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
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 bg-white rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr className=" text-sm text-left">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Issue</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.length > 0 ? (
                filteredDisputes.map((d) => (
                  <tr key={d.id} className="text-sm hover:bg-gray-50 border-b border-gray-300">
                    <td className="p-3 ">{d.id}</td>
                    <td className="p-3 ">{d.customer}</td>
                    <td className="p-3 ">{d.issue}</td>
                    <td className="p-3 ">{d.date}</td>
                    <td className="p-3 ">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          d.status === "Open"
                            ? "bg-red-100 text-red-600"
                            : d.status === "In-Progress"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <CheckCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No disputes found in this category.
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
