// src/app/vendor/customer-inquiries/page.tsx
"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Inquiry = {
  id: number;
  customer: string;
  question: string;
  status: "Pending" | "Answered";
  reply?: string;
};

export default function CustomerInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      customer: "Ali Raza",
      question: "Is bike available in red color?",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sara Khan",
      question: "Can you provide bulk discount for 10 units?",
      status: "Answered",
      reply: "Yes, we can provide 10% discount on 10 units.",
    },
    {
      id: 3,
      customer: "John Smith",
      question: "What’s the warranty on this cycle?",
      status: "Pending",
    },
  ]);

  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (id: number) => {
    if (!replyText.trim()) return;
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? { ...inq, reply: replyText, status: "Answered" }
          : inq
      )
    );
    setReplyText("");
    setActiveInquiry(null);
  };

  return (
    <DashboardLayout>
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Inquiries
      </h1>

      {/* Inquiry List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr
                key={inq.id}
                className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{inq.customer}</td>
                <td className="p-3">{inq.question}</td>
                <td
                  className={`p-3 font-medium ${
                    inq.status === "Pending"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {inq.status}
                </td>
                <td className="p-3 text-center">
                  {inq.status === "Pending" ? (
                    <button
                      onClick={() => setActiveInquiry(inq)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                    >
                      Reply
                    </button>
                  ) : (
                    <span className="text-gray-500">Replied</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Reply to {activeInquiry.customer}
            </h2>
            <p className="mb-2 text-gray-700">
              <strong>Question:</strong> {activeInquiry.question}
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Type your reply..."
              rows={4}
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setActiveInquiry(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReply(activeInquiry.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replied Inquiries */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Replied Inquiries
        </h2>
        <div className="space-y-4">
          {inquiries
            .filter((inq) => inq.reply)
            .map((inq) => (
              <div
                key={inq.id}
                className="bg-white p-4 rounded-lg shadow border border-gray-300"
              >
                <p className="text-gray-700">
                  <strong>{inq.customer} asked:</strong> {inq.question}
                </p>
                <p className="mt-2 text-gray-800">
                  <strong>Your Reply:</strong> {inq.reply}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
