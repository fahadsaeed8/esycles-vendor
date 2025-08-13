import { div } from "framer-motion/client";
import React from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";

function AllProducts() {
  const products = [
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

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e] ">All Products</h1>
          <Button variant="primary">Add Product</Button>
        </div>
        <div className=" overflow-auto rounded-lg border border-gray-200">
          <table className="text-sm text-left text-[#222]  min-w-[768px] w-full">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-4 pl-3 text-center text-[14px] ">#</th>
                <th className="py-4 text-center text-[14px] ">Product Image</th>
                <th className="py-4 text-center text-[14px] ">Category</th>
                <th className="py-4 text-center text-[14px] ">Status</th>
                <th className="py-4 text-center text-[14px] ">Sales</th>
                <th className="py-4 text-center text-[14px] ">Stock</th>
                <th className="py-4 text-center text-[14px] ">Sku</th>
                <th className="py-4 text-center text-[14px] ">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 bg-white hover:bg-orange-50 transition duration-300"
                >
                  <td className=" text-center text-[14px] py-3">{order.id}</td>
                  <td className=" text-center text-[14px] py-3 w-fit">
                    <img
                      src={order.productImage}
                      alt=""
                      className=" h-[50px] text-center w-full object-contain"
                    />
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {order.category}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {order.status}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {order.sales}
                  </td>
                  <td className=" text-center text-[14px] py-3">
                    {order.stock}
                  </td>
                  <td className=" text-center text-[14px] py-3">{order.sku}</td>
                  <td className=" text-center text-[14px]">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AllProducts;
