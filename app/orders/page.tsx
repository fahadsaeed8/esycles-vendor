import React from "react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Button from "../../components/common/button";

function Orders() {
  const orders = [
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
    // New objects start here
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

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] font-[500] text-[#1f1c2e] ">Orders</h1>
          {/* <button className="w-[132px] h-[45px] flex items-center justify-center text-[14px] bg-[#f59359] rounded-md hover:bg-transparent">
          
        </button> */}
          <Button variant="primary">Add Orders</Button>
        </div>
        <div className=" overflow-auto  border border-gray-300 rounded-lg">
          <table className="text-sm text-left text-[#222]  min-w-[768px] w-full">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 text-center">
                  <input type="checkbox" />
                </th>
                <th className="py-3  text-center text-[12px] ">Order Code</th>
                <th className="py-3  text-center text-[12px] ">
                  Num. of Products
                </th>
                <th className="py-3  text-center text-[12px] ">Customer</th>
                <th className="py-3  text-center text-[12px] ">Seller</th>
                <th className="py-3  text-center text-[12px] ">Amount</th>
                <th className="py-3  text-center text-[12px] ">
                  Delivery Status
                </th>
                <th className="py-3  text-center text-[12px] ">
                  Payment method
                </th>
                <th className="py-3  text-center text-[12px] ">
                  Payment Status
                </th>
                <th className="py-3  text-center text-[12px] ">Refund</th>
                <th className="py-3  text-center text-[12px] ">Options</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-300 bg-white hover:bg-orange-50 transition duration-300"
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      className=" cursor-pointer text-center"
                    />
                  </td>
                  <td className="flex flex-col items-center p-2 text-center w-full">
                    <span className="text-[12px] font-[400] text-center">
                      {order.orderCode}
                    </span>
                    {order.new && (
                      <span className=" text-xs bg-purple-600 text-white py-0.5 rounded-sm text-center w-[50px]">
                        new
                      </span>
                    )}
                  </td>
                  <td className=" text-center text-[12px]">{order.products}</td>
                  <td className="p-2 text-center text-[12px]">
                    {order.customer}
                  </td>
                  <td className="p-2 text-center text-[12px]">
                    {order.seller}
                  </td>
                  <td className="p-2 text-center text-[12px]">
                    {order.amount}
                  </td>
                  <td className="p-2 text-center text-[12px]">
                    {order.deliveryStatus}
                  </td>
                  <td className="p-2 text-center text-[12px]">
                    {order.paymentMethod}
                  </td>
                  <td className="p-2 text-center text-[12px]">
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
                    <FaEye className="cursor-pointer text-gray-700" />
                    <FaDownload className="cursor-pointer text-gray-700" />
                    <FaTrash className="cursor-pointer text-gray-700" />
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

export default Orders;
