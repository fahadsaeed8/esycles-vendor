"use client";

import React, { useState } from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";

function Orders() {
  const initialOrders = [
    {
      orderCode: "20220912-10085522",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "Inhouse Order",
      amount: "$999.000",
      deliveryStatus: "Delivered",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    {
      orderCode: "20220906-10185640",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "Inhouse Order",
      amount: "$48.450",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20220906-10155759",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "Adidas",
      amount: "$76.000",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20220829-07250551",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "LOUIS VUITTON",
      amount: "$120.000",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20220828-13023343",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "Inhouse Order",
      amount: "$514.000",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20220828-12334652",
      products: 1,
      customer: "Paul K. Jensen",
      seller: "Inhouse Order",
      amount: "$190.000",
      deliveryStatus: "Delivered",
      paymentMethod: "Wallet",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    // New objects
    {
      orderCode: "20220930-99887766",
      products: 2,
      customer: "Sarah M. Blake",
      seller: "PUMA",
      amount: "$340.000",
      deliveryStatus: "Delivered",
      paymentMethod: "Wallet",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    {
      orderCode: "20221001-88776655",
      products: 1,
      customer: "James L. Ford",
      seller: "NIKE",
      amount: "$89.900",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20221002-77665544",
      products: 3,
      customer: "Linda G. Carter",
      seller: "Inhouse Order",
      amount: "$150.250",
      deliveryStatus: "Delivered",
      paymentMethod: "Wallet",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    {
      orderCode: "20221003-66554433",
      products: 1,
      customer: "John D. Miles",
      seller: "Adidas",
      amount: "$99.000",
      deliveryStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20221004-55443322",
      products: 2,
      customer: "Alice T. Nguyen",
      seller: "Under Armour",
      amount: "$210.000",
      deliveryStatus: "Delivered",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    {
      orderCode: "20221005-44332211",
      products: 1,
      customer: "George F. Henry",
      seller: "Inhouse Order",
      amount: "$135.000",
      deliveryStatus: "Pending",
      paymentMethod: "Wallet",
      paymentStatus: "Unpaid",
      refund: "No Refund",
    },
    {
      orderCode: "20221006-33221100",
      products: 2,
      customer: "Cynthia B. Moore",
      seller: "PUMA",
      amount: "$240.750",
      deliveryStatus: "Delivered",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
    {
      orderCode: "20221007-22110099",
      products: 1,
      customer: "Daniel E. Frost",
      seller: "Inhouse Order",
      amount: "$58.900",
      deliveryStatus: "Pending",
      paymentMethod: "Wallet",
      paymentStatus: "Unpaid",
      refund: "No Refund",
      new: true,
    },
    {
      orderCode: "20221008-11009988",
      products: 1,
      customer: "Emma L. Woods",
      seller: "LOUIS VUITTON",
      amount: "$499.000",
      deliveryStatus: "Delivered",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Paid",
      refund: "No Refund",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Search filter
  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.seller.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Select All
  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(paginatedOrders.map((o) => o.orderCode));
    } else {
      setSelected([]);
    }
  };

  // Single select
  const toggleSelect = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]
    );
  };

  // Actions
  const handleDelete = (code: string) => {
    setOrders((prev) => prev.filter((o) => o.orderCode !== code));
  };

  const handleDownload = (code: string) => {
    alert(`Downloading invoice for ${code}`);
  };

  const handleView = (code: string) => {
    alert(`Viewing details of ${code}`);
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e] ">Orders</h1>
          <Button variant="primary">Add Orders</Button>
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-[250px] text-sm"
          />
        </div>

        <div className=" overflow-auto  border border-gray-300 rounded-lg">
          <table className="text-sm text-left text-[#222]  min-w-[1068px] w-full h-screen max-h-[70vh]">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="py-3  text-center text-[13px] ">Order Code</th>
                <th className="py-3  text-center text-[13px] ">
                  Num. of Products
                </th>
                <th className="py-3  text-center text-[13px] ">Customer</th>
                <th className="py-3  text-center text-[13px] ">Seller</th>
                <th className="py-3  text-center text-[13px] ">Amount</th>
                <th className="py-3  text-center text-[13px] ">
                  Delivery Status
                </th>
                <th className="py-3  text-center text-[13px] ">
                  Payment method
                </th>
                <th className="py-3  text-center text-[13px] ">
                  Payment Status
                </th>
                <th className="py-3  text-center text-[13px] ">Refund</th>
                <th className="py-3  text-center text-[13px] ">Options</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-300 bg-white hover:bg-orange-50 transition duration-300"
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(order.orderCode)}
                      onChange={() => toggleSelect(order.orderCode)}
                      className=" cursor-pointer text-center"
                    />
                  </td>
                  <td className="flex flex-col items-center justify-center h-full text-center w-full">
                    <span className="text-[13px] font-[400] text-center">
                      {order.orderCode}
                    </span>
                    {order.new && (
                      <span className=" text-sm bg-purple-600 text-white py-0.5 rounded-sm text-center w-[50px]">
                        new
                      </span>
                    )}
                  </td>
                  <td className=" text-center text-[14px]">{order.products}</td>
                  <td className="p-2 text-center text-[14px]">
                    {order.customer}
                  </td>
                  <td className="p-2 text-center text-[14px]">
                    {order.seller}
                  </td>
                  <td className="p-2 text-center text-[14px]">
                    {order.amount}
                  </td>
                  <td className="p-2 text-center text-[14px]">
                    {order.deliveryStatus}
                  </td>
                  <td className="p-2 text-center text-[14px]">
                    {order.paymentMethod}
                  </td>
                  <td className="p-2 text-center text-[14px]">
                    <span
                      className={`px-2 py-1 text-white text-xs rounded ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-1 text-center">{order.refund}</td>
                  <td className="p-1 flex gap-x-2 items-center justify-center text-center">
                    <FaEye
                      className="cursor-pointer text-gray-700"
                      onClick={() => handleView(order.orderCode)}
                    />
                    <FaDownload
                      className="cursor-pointer text-gray-700"
                      onClick={() => handleDownload(order.orderCode)}
                    />
                    <FaTrash
                      className="cursor-pointer text-gray-700"
                      onClick={() => handleDelete(order.orderCode)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4 text-sm">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded text-white disabled:opacity-50 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706]"
            >
              Prev
            </button>

            {/* Page Numbers */}
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

export default Orders;
