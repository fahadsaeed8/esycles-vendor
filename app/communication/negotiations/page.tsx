// src/app/vendor/negotiations/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Negotiation = {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  price: number;
  delivery: string;
  status: "Pending" | "Accepted" | "Rejected" | "Countered";
  history: string[];
};

export default function NegotiationsPage() {
  const [negotiations, setNegotiations] = useState<Negotiation[]>([
    {
      id: 1,
      customer: "Ali Raza",
      product: "Electric Cycle",
      quantity: 5,
      price: 350,
      delivery: "7 days",
      status: "Rejected",
      history: ["Customer requested lower price of $320."],
    },
    {
      id: 2,
      customer: "Sara Khan",
      product: "Mountain Bike",
      quantity: 10,
      price: 200,
      delivery: "5 days",
      status: "Pending",
      history: ["Initial offer sent at $200 per unit."],
    },
  ]);

  const [activeNegotiation, setActiveNegotiation] = useState<Negotiation | null>(
    null
  );
  const [counterQuantity, setCounterQuantity] = useState<number>(0);
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [counterDelivery, setCounterDelivery] = useState<string>("");

  const handleCounterOffer = (id: number) => {
    if (!counterQuantity || !counterPrice || !counterDelivery.trim()) return;

    setNegotiations((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              quantity: counterQuantity,
              price: counterPrice,
              delivery: counterDelivery,
              status: "Countered",
              history: [
                ...n.history,
                `Counter-offer: ${counterQuantity} units at $${counterPrice}/unit, delivery in ${counterDelivery}`,
              ],
            }
          : n
      )
    );

    setActiveNegotiation(null);
    setCounterQuantity(0);
    setCounterPrice(0);
    setCounterDelivery("");
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Negotiations & Counter-Offers
      </h1>

      {/* Negotiations Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price/Unit</th>
              <th className="p-3 text-left">Delivery</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {negotiations.map((n) => (
              <tr
                key={n.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{n.customer}</td>
                <td className="p-3">{n.product}</td>
                <td className="p-3">{n.quantity}</td>
                <td className="p-3">${n.price}</td>
                <td className="p-3">{n.delivery}</td>
                <td
                  className={`p-3 font-medium ${
                    n.status === "Rejected"
                      ? "text-red-500"
                      : n.status === "Accepted"
                      ? "text-green-600"
                      : n.status === "Countered"
                      ? "text-blue-500"
                      : "text-yellow-600"
                  }`}
                >
                  {n.status}
                </td>
                <td className="p-3 text-center">
                  {n.status === "Rejected" || n.status === "Pending" ? (
                    <button
                      onClick={() => {
                        setActiveNegotiation(n);
                        setCounterQuantity(n.quantity);
                        setCounterPrice(n.price);
                        setCounterDelivery(n.delivery);
                      }}
                      className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Counter-Offer
                    </button>
                  ) : (
                    <span className="text-gray-500">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Counter-Offer Modal */}
      {activeNegotiation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Counter-Offer to {activeNegotiation.customer}
            </h2>

            <div className="mb-3">
              <label className="block font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={counterQuantity}
                onChange={(e) => setCounterQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-gray-700">
                Delivery Terms
              </label>
              <input
                type="text"
                value={counterDelivery}
                onChange={(e) => setCounterDelivery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
                placeholder="e.g., 5 days, 1 week"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setActiveNegotiation(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCounterOffer(activeNegotiation.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Send Counter-Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Negotiation History
        </h2>
        <div className="space-y-4">
          {negotiations.map((n) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-300"
            >
              <p className="text-gray-700">
                <strong>{n.customer}</strong> - {n.product}
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                {n.history.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
