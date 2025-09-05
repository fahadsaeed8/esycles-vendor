"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

interface TransactionRecord {
  id: string;
  type: "Order" | "Refund" | "Dispute";
  reference: string;
  customer: string;
  product: string;
  amount: number;
  status: "Completed" | "Pending" | "Rejected";
  date: string;
}

export default function TransactionRecordsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Order" | "Refund" | "Dispute">("All");

  const records: TransactionRecord[] = [
    { id: "T-101", type: "Order", reference: "O-1001", customer: "Customer A", product: "Product X", amount: 120, status: "Completed", date: "2025-09-01" },
    { id: "T-102", type: "Refund", reference: "R-101", customer: "Customer B", product: "Product Y", amount: 50, status: "Pending", date: "2025-09-02" },
    { id: "T-103", type: "Dispute", reference: "D-301", customer: "Customer C", product: "Product Z", amount: 200, status: "Rejected", date: "2025-09-03" },
    { id: "T-104", type: "Order", reference: "O-1002", customer: "Customer D", product: "Product X", amount: 90, status: "Completed", date: "2025-09-04" },
  ];

  const filteredRecords = records.filter(
    (r) =>
      (filterType === "All" || r.type === filterType) &&
      (r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.product.toLowerCase().includes(search.toLowerCase()) ||
        r.reference.toLowerCase().includes(search.toLowerCase()))
  );

  const handleExportCSV = () => {
    const rows = [
      ["ID", "Type", "Reference", "Customer", "Product", "Amount", "Status", "Date"],
      ...filteredRecords.map((r) => [r.id, r.type, r.reference, r.customer, r.product, r.amount, r.status, r.date]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `esycles_transaction_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transaction Records for Audit & Appeals</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by customer, product, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 border-gray-300 bg-white flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            className="border border-gray-300 bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Order">Orders</option>
            <option value="Refund">Refunds</option>
            <option value="Dispute">Disputes</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr className=" text-left text-sm">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Type</th>
                <th className="p-3 border-b">Reference</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Product</th>
                <th className="p-3 border-b">Amount</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 text-sm border-b border-gray-300">
                    <td className="p-3 ">{r.id}</td>
                    <td className="p-3 ">{r.type}</td>
                    <td className="p-3 ">{r.reference}</td>
                    <td className="p-3 ">{r.customer}</td>
                    <td className="p-3 ">{r.product}</td>
                    <td className="p-3 ">${r.amount}</td>
                    <td className={`p-3  font-medium ${
                      r.status === "Completed" ? "text-green-600" :
                      r.status === "Pending" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>{r.status}</td>
                    <td className="p-3">{r.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No records found.
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
