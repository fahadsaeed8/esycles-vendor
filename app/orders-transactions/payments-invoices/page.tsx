"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type PaymentStatus = "Paid" | "Pending" | "Failed";

interface Payment {
  id: number;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  invoiceUrl?: string;
}

interface Settlement {
  id: number;
  period: string;
  totalAmount: number;
  releasedAmount: number;
  pendingAmount: number;
}

export default function PaymentsInvoicesSettlementsPage() {
  const [payments] = useState<Payment[]>([
    {
      id: 1,
      orderId: "ORD-1001",
      amount: 25000,
      status: "Paid",
      date: "2025-09-01",
      invoiceUrl: "/invoices/invoice-1001.pdf",
    },
    {
      id: 2,
      orderId: "ORD-1002",
      amount: 12000,
      status: "Pending",
      date: "2025-09-03",
    },
    {
      id: 3,
      orderId: "ORD-1003",
      amount: 8000,
      status: "Failed",
      date: "2025-09-04",
    },
  ]);

  const [settlements] = useState<Settlement[]>([
    {
      id: 1,
      period: "August 2025",
      totalAmount: 50000,
      releasedAmount: 40000,
      pendingAmount: 10000,
    },
    {
      id: 2,
      period: "September 2025",
      totalAmount: 37000,
      releasedAmount: 25000,
      pendingAmount: 12000,
    },
  ]);

  return (
    <DashboardLayout>
    <div className="">
      <div className="space-y-10 max-w-6xl mx-auto">
        {/* Payments Section */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6">Payments Tracking</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-center">Amount (PKR)</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-gray-300">
                    <td className="p-3">{p.orderId}</td>
                    <td className="p-3 text-center">{p.amount.toLocaleString()}</td>
                    <td
                      className={`p-3 text-center font-semibold ${
                        p.status === "Paid"
                          ? "text-green-600"
                          : p.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="p-3 text-center">{p.date}</td>
                    <td className="p-3 text-center">
                      {p.invoiceUrl ? (
                        <a
                          href={p.invoiceUrl}
                          className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                        >
                          View Invoice
                        </a>
                      ) : (
                        <span className="text-gray-500">Not Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Settlement Reports Section */}
        <div className="">
          <h2 className="text-2xl font-semibold mb-6">Settlement Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="p-3 text-left">Period</th>
                  <th className="p-3 text-center">Total Amount (PKR)</th>
                  <th className="p-3 text-center">Released (PKR)</th>
                  <th className="p-3 text-center">Pending (PKR)</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((s) => (
                  <tr key={s.id} className="border-t border-gray-300">
                    <td className="p-3">{s.period}</td>
                    <td className="p-3 text-center">{s.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-center text-green-600 font-semibold">
                      {s.releasedAmount.toLocaleString()}
                    </td>
                    <td className="p-3 text-center text-yellow-600 font-semibold">
                      {s.pendingAmount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
