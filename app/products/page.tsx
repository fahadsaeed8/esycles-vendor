"use client";

import React, { useState } from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";

function AllProducts() {
  const initialProducts = [
    {
      id: 1,
      productImage: "/icons/cycle.png",
      category: "Bicycles",
      status: "Active",
      sales: 120,
      stock: 30,
      sku: "BIC-001",
      price: 299.99,
    },
    {
      id: 2,
      productImage: "/icons/cycle.png",
      category: "E-Scooters",
      status: "Inactive",
      sales: 85,
      stock: 12,
      sku: "SCO-045",
      price: 499.0,
    },
    {
      id: 3,
      productImage: "/icons/cycle.png",
      category: "Accessories",
      status: "Active",
      sales: 230,
      stock: 150,
      sku: "ACC-123",
      price: 19.95,
    },
    {
      id: 4,
      productImage: "/icons/cycle.png",
      category: "Apparel",
      status: "Active",
      sales: 60,
      stock: 80,
      sku: "APP-337",
      price: 39.99,
    },
    {
      id: 5,
      productImage: "/icons/cycle.png",
      category: "E-Bikes",
      status: "Pending",
      sales: 0,
      stock: 10,
      sku: "EBK-778",
      price: 1099.0,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<
    keyof (typeof initialProducts)[0] | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const pageSize = 5;

  // --- Search ---
  const filteredProducts = products.filter(
    (p) =>
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase())
  );

  // --- Sorting ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // --- Pagination ---
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // --- Selection ---
  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(paginatedProducts.map((p) => p.id));
    } else {
      setSelected([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // --- Actions ---
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSort = (field: keyof (typeof initialProducts)[0]) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e] ">
            All Products
          </h1>
          <Button variant="primary">Add Product</Button>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-[250px] text-sm"
          />
        </div>

        <div className=" overflow-auto rounded-lg border border-gray-200">
          <table className="text-sm text-left text-[#222]  min-w-[768px] w-full">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-4 pl-3 text-center text-[14px] ">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === paginatedProducts.length &&
                      paginatedProducts.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="py-4 text-center text-[14px] ">Product Image</th>
                <th
                  className="py-4 text-center text-[14px] cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  Category{" "}
                  {sortField === "category" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="py-4 text-center text-[14px] cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="py-4 text-center text-[14px] cursor-pointer"
                  onClick={() => handleSort("sales")}
                >
                  Sales{" "}
                  {sortField === "sales" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="py-4 text-center text-[14px] cursor-pointer"
                  onClick={() => handleSort("stock")}
                >
                  Stock{" "}
                  {sortField === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="py-4 text-center text-[14px] ">Sku</th>
                <th
                  className="py-4 text-center text-[14px] cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Price{" "}
                  {sortField === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="py-4 text-center text-[14px] ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 bg-white hover:bg-orange-50 transition duration-300"
                >
                  <td className=" text-center text-[14px] py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
                  <td className=" text-center text-[14px] py-3 w-fit">
                    <img
                      src={product.productImage}
                      alt=""
                      className=" h-[50px] text-center w-full object-contain"
                    />
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {product.category}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {product.status}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {product.sales}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {product.stock}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {product.sku}
                  </td>
                  <td className=" text-center text-[14px]">{product.price}</td>
                  <td className=" text-center text-[14px]">
                    <button
                      onClick={() => alert(`Viewing product ${product.sku}`)}
                      className="px-2 text-blue-500"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-2 text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 text-sm">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded text-white disabled:opacity-50 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded text-white disabled:opacity-50 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AllProducts;
