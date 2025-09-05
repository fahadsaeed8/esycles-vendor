"use client";

import { useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type Listing = {
  id: number;
  title: string;
  status: "Active" | "Paused" | "Expired";
};

export default function AvailabilityControlPage() {
  const [listings, setListings] = useState<Listing[]>([
    { id: 1, title: "Mountain Bike X1", status: "Active" },
    { id: 2, title: "Electric Scooter Pro", status: "Paused" },
    { id: 3, title: "Kids BMX Cycle", status: "Expired" },
  ]);

  const handleStatusChange = (
    id: number,
    newStatus: "Active" | "Paused" | "Expired"
  ) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status: newStatus } : listing
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className=" max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold p-3">
            Manage Listing Availability
          </h2>

          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]  text-white">
              <tr>
                <th className="p-3 text-left">Product Title</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-300">
                  <td className="p-3">{listing.title}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      listing.status === "Active"
                        ? "text-green-600"
                        : listing.status === "Paused"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {listing.status}
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={listing.status}
                      onChange={(e) =>
                        handleStatusChange(
                          listing.id,
                          e.target.value as "Active" | "Paused" | "Expired"
                        )
                      }
                      className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-400"
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Expired">Expired</option>
                    </select>
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
