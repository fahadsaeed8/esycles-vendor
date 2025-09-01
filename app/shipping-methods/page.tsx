"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllShippingMethodAPI,
  createShippingMethodAPI,
  updateShippingMethodAPI,
  deleteShippingMethodAPI,
} from "../../services/api";

import { Pencil, Trash2, Plus } from "lucide-react";
import { AddShippingMethodModal } from "../../components/common/modals/add-shipping-modal";
import { EditShippingMethodModal } from "../../components/common/modals/edit-shipping-modal";
import PaginationTable from "../../components/common/pagination";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";

type ShippingMethodRow = {
  id: number;
  name: string;
  description: string;
  cost: number;
  estimated_days: number;
};

export default function ShippingMethodsPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState<ShippingMethodRow | null>(null);

  console.log("editRow", editRow);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["shippingMethods"],
    queryFn: getAllShippingMethodAPI,
  });

  console.log("data==>>", data);

  // ✅ Delete shipping method
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteShippingMethodAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingMethods"] });
    },
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(
    (data?.shippingMethods?.length || 0) / itemsPerPage
  );
  const paginatedData = data?.shippingMethods?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e]">
            Shipping Methods
          </h1>

          <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
            Add Shipping Method
          </Button>
        </div>

        {/* ✅ Loading State */}
        {isLoading && (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        )}

        {/* ✅ No Data Found */}
        {!isLoading && data?.shippingMethods?.length === 0 && (
          <div className="text-center p-5 shadow-md text-gray-500">
            No data found
          </div>
        )}

        {/* ✅ Table + Pagination (Only if Data Exists) */}
        {!isLoading && data?.shippingMethods?.length > 0 && (
          <>
            {/* Custom Table */}
            <div className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden border border-gray-200 shadow-md rounded-lg">
                  <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white text-base sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider">
                            Estimated Days
                          </th>
                          <th className="px-4 py-3 sm:px-6 sm:py-3 text-left whitespace-nowrap text-xs md:text-sm font-medium uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedData?.map(
                          (row: ShippingMethodRow, index: number) => (
                            <tr
                              key={index}
                              className="hover:bg-orange-50 transition duration-300"
                            >
                              <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-700">
                                {row.name}
                              </td>
                              <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-700">
                                {row.description}
                              </td>
                              <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-700">
                                ${row.cost}
                              </td>
                              <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-700">
                                {row.estimated_days} days
                              </td>
                              <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm text-gray-700">
                                <div className="flex justify-start gap-2">
                                  {/* ✏️ Edit */}
                                  <button
                                    onClick={() => {
                                      setEditRow(row);
                                      setShowEditModal(true);
                                    }}
                                    className="p-2 rounded-lg cursor-pointer bg-yellow-100 hover:bg-yellow-200"
                                  >
                                    <Pencil size={16} />
                                  </button>

                                  {/* 🗑 Delete */}
                                  <button
                                    onClick={() =>
                                      deleteMutation.mutate(row._id)
                                    }
                                    className="p-2 rounded-lg cursor-pointer bg-red-100 hover:bg-red-200"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Pagination */}
            {data.shippingMethods.length > itemsPerPage && (
              <PaginationTable
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}

        <AddShippingMethodModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        {/* ✅ Edit Modal */}
        <EditShippingMethodModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          editRow={editRow}
        />
      </div>
    </DashboardLayout>
  );
}
