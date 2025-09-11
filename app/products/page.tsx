"use client";
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";
import AddProductModal from "../../components/common/modals/add-product-modal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllProductsAPI, deleteProductsAPI } from "../../services/api";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import EditProductModal from "../../components/common/modals/edit-porduct-modal";
import BulkOrderUploadModal from "../../components/common/modals/bulk-order-upload-modal";

function AllProducts() {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("selectedProduct", selectedProduct);

  const {
    data: allProducts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProductsAPI,
  });

  // ✅ Delete mutation
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteProductsAPI(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    },
  });

  const handleEditModal = (item) => {
    setSelectedProduct(item);
    setOpenEditProductModal(true);
  };

  return (
    <DashboardLayout>
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e] ">
            All Products
          </h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setOpenAddProductModal(true)}
              variant="primary"
            >
              Add Product
            </Button>
            <BulkOrderUploadModal />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-200">
          {isLoading ? (
            <div className="py-6 text-center text-gray-500 text-[15px]">
              Loading products...
            </div>
          ) : isError ? (
            <div className="py-6 text-center text-red-500 text-[15px]">
              Failed to load products.{" "}
              <button
                onClick={() => refetch()}
                className="underline text-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : !allProducts?.data || allProducts?.data?.length === 0 ? (
            <div className="py-6 text-center text-gray-500 text-[15px]">
              No products found
            </div>
          ) : (
            <table className="text-sm text-left text-[#222] min-w-[768px] w-full">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="py-4 pl-3 text-center text-[14px]">#</th>
                  <th className="py-4 text-center text-[14px]">
                    Product Image
                  </th>
                  <th className="py-4 text-center text-[14px]">Category</th>
                  <th className="py-4 text-center text-[14px]">Brand</th>
                  <th className="py-4 text-center text-[14px]">Color</th>
                  <th className="py-4 text-center text-[14px]">Stock</th>
                  <th className="py-4 text-center text-[14px]">Sku</th>
                  <th className="py-4 text-center text-[14px]">Price</th>
                  <th className="py-4 text-center text-[14px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.data?.map((order: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 bg-white hover:bg-orange-50 transition duration-300"
                  >
                    <td className="text-center text-[14px] py-3">{idx + 1}</td>
                    <td className="text-center text-[14px] py-3 w-fit">
                      {order?.images?.length > 0 ? (
                        <img
                          src={order.images[0]}
                          alt=""
                          className="h-[50px] text-center w-full object-contain"
                        />
                      ) : (
                        <img
                          src={`/images/not-avaiable.jpg`}
                          alt="Not available"
                          className="h-[50px] text-center w-full object-contain"
                        />
                      )}
                    </td>
                    <td className="text-center text-[14px] py-3">
                      {order?.type || "-"}
                    </td>
                    <td className="text-center text-[14px] py-3">
                      {order?.brand?.name || "-"}
                    </td>
                    <td className="text-center text-[14px] py-3">
                      {order?.color?.name || "-"}
                    </td>
                    <td className="text-center text-[14px] py-3">
                      {order?.stock ?? "-"}
                    </td>
                    <td className="text-center text-[14px] py-3">
                      {order?.sku || "-"}
                    </td>
                    <td className="text-center text-[14px]">
                      {order?.price ?? "-"}
                    </td>

                    {/* Actions Column */}
                    <td className="text-center text-[14px] py-3 flex items-center justify-center gap-3">
                      <button
                        title="Edit"
                        onClick={() => handleEditModal(order)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        title="Delete"
                        disabled={isDeleting}
                        onClick={() => deleteProduct(order?._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        openAddProductModal={openAddProductModal}
        setOpenAddProductModal={setOpenAddProductModal}
      />
      <EditProductModal
        openEditProductModal={openEditProductModal}
        setOpenEditProductModal={setOpenEditProductModal}
        productId={selectedProduct?._id}
        productData={selectedProduct}
      />
    </DashboardLayout>
  );
}

export default AllProducts;
