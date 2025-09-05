// src/app/vendor/rfqs-bids/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type RFQ = {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  details: string;
  status: "Pending" | "Responded";
  bid?: string;
};

export default function RFQsBidsPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>([
    {
      id: 1,
      customer: "Ali Raza",
      product: "Mountain Bike",
      quantity: 10,
      details: "Need 10 bikes for bulk order. What’s your best price?",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sara Khan",
      product: "Electric Cycle",
      quantity: 5,
      details: "Looking for wholesale price for electric cycles.",
      status: "Responded",
      bid: "We can offer each at $350 with warranty.",
    },
    {
      id: 3,
      customer: "John Smith",
      product: "Kids Cycle",
      quantity: 20,
      details: "Need 20 units. Delivery in 7 days required.",
      status: "Pending",
    },
  ]);

  const [activeRFQ, setActiveRFQ] = useState<RFQ | null>(null);
  const [bidText, setBidText] = useState("");

  const handleBid = (id: number) => {
    if (!bidText.trim()) return;
    setRfqs((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, bid: bidText, status: "Responded" } : r
      )
    );
    setBidText("");
    setActiveRFQ(null);
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">RFQs & Bids</h1>

      {/* RFQs Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rfqs.map((rfq) => (
              <tr
                key={rfq.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{rfq.customer}</td>
                <td className="p-3">{rfq.product}</td>
                <td className="p-3">{rfq.quantity}</td>
                <td className="p-3">{rfq.details}</td>
                <td
                  className={`p-3 font-medium ${
                    rfq.status === "Pending"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {rfq.status}
                </td>
                <td className="p-3 text-center">
                  {rfq.status === "Pending" ? (
                    <button
                      onClick={() => setActiveRFQ(rfq)}
                      className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Reply / Bid
                    </button>
                  ) : (
                    <span className="text-gray-500">Responded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bid Modal */}
      {activeRFQ && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Respond to {activeRFQ.customer}
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>Product:</strong> {activeRFQ.product}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Quantity:</strong> {activeRFQ.quantity}
            </p>
            <p className="mb-4 text-gray-700">
              <strong>Details:</strong> {activeRFQ.details}
            </p>

            <textarea
              value={bidText}
              onChange={(e) => setBidText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Type your quotation or bid..."
              rows={4}
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setActiveRFQ(null)}
                className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBid(activeRFQ.id)}
                className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Send Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responded RFQs */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Responded RFQs
        </h2>
        <div className="space-y-4">
          {rfqs
            .filter((rfq) => rfq.bid)
            .map((rfq) => (
              <div
                key={rfq.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-300"
              >
                <p className="text-gray-700">
                  <strong>{rfq.customer} asked:</strong> {rfq.details}
                </p>
                <p className="mt-2 text-gray-800">
                  <strong>Your Bid:</strong> {rfq.bid}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
