"use client";

import React from "react";
import DashboardLayout from "../components/layout/dashboard-layout";
import OverviewChart from "../components/sections/OverViewChart";
import { FiSearch } from "react-icons/fi";
import { BellIcon, MoreVertical } from "lucide-react";
import { FaBoxOpen, FaClipboardCheck } from "react-icons/fa";
import { MdOutlineViewModule } from "react-icons/md";
import Table from "../components/common/table/page";
import Image from "next/image";

const page = () => {
  const stats = [
    {
      icon: (
        <FaBoxOpen className="text-green-500 text-5xl drop-shadow-2xl drop-shadow-green-500" />
      ),
      value: 165,
      label: "All Product",
    },
    {
      icon: (
        <MdOutlineViewModule className="text-indigo-500 text-5xl drop-shadow-2xl drop-shadow-blue-500" />
      ),
      value: 15,
      label: "Sales Product",
    },
    {
      icon: (
        <FaClipboardCheck className="text-cyan-500 text-5xl drop-shadow-2xl drop-shadow-blue-500" />
      ),
      value: 16,
      label: "New Order",
    },
  ];

type Product = {
  product: string;
  category: string;
  amount: number;
  date: string;
  customer: string;
  status: string;
};

  const products: Product[] = [
    {
      product: "Body Parts",
      category: "Body Parts",
      amount: 900,
      date: "15/03/2022",
      customer: "Nur Alom",
      status: "Processing",
    },
    {
      product: "Auxillary Battery",
      category: "Body Parts",
      amount: 16600,
      date: "21/03/2022",
      customer: "S A Sams",
      status: "Shipped",
    },
    {
      product: "Car Interior",
      category: "Body Parts",
      amount: 800,
      date: "05/03/2022",
      customer: "Sadek Rahman",
      status: "Done",
    },
  ];

  const columns: { key: keyof Product; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Date" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
];

  const categories = [
    {
      name: "Oil Filter",
      count: 1308,
      bg: "bg-blue-100",
      text: "text-sky-500",
      icon: "/icons/cycle.png",
    },
    {
      name: "Car Care",
      count: 1019,
      bg: "bg-red-100",
      text: "text-yellow-500",
      icon: "/icons/cycle.png",
    },
    {
      name: "AC Filter",
      count: 807,
      bg: "bg-green-100",
      text: "text-green-500",
      icon: "/icons/cycle.png",
    },
    {
      name: "Car Care",
      count: 633,
      bg: "bg-pink-100",
      text: "text-pink-500",
      icon: "/icons/cycle.png",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col md:flex-row sm:items-center sm:justify-between md:px-4 py-2">
        {/* Left Heading */}
        <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
          Overview
        </h2>

        {/* Search Bar */}
        <div className="flex items-center gap-x-1 md:gap-x-3">
          <div className="flex items-center border border-[#f59e0b] rounded-full px-3 py-3 w-full sm:w-[300px] md:w-[350px] lg:w-[400px]">
            <FiSearch className="text-[#f59e0b] mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none border-none text-sm text-gray-700 placeholder-gray-400 bg-transparent h-full"
            />
          </div>
          <div>
            <BellIcon className="text-[#f59e0b] cursor-pointer" />
          </div>
          <div className="">
            <MoreVertical className="text-[#f59e0b] cursor-pointer" />
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row w-full gap-5 bg-gray-100 my-5">
        <div className=" w-full">
          <OverviewChart />
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 w-full  md:max-w-md text-center border border-gray-100 flex flex-col items-center justify-center">
          {/* Title */}
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
            Current Balance
          </h2>

          {/* Amount */}
          <p className="text-3xl sm:text-4xl font-bold text-[#f59e0b] mt-4">
            98,961.33{" "}
            <span className="text-lg font-medium text-[#f59e0b]">TK</span>
          </p>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-4 w-[60%] mx-auto"></div>

          {/* Update Info */}
          <p className="text-gray-500 text-sm">Updated approximately</p>
          <p className="text-gray-500 text-sm">every 10 minutes</p>

          {/* Button */}
          <button className=" cursor-pointer mt-7 bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white font-medium py-2 px-5 rounded-full transition-colors duration-300">
            Withdraw Now
          </button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-5 my-5">
  <div className="flex-1">
    {/* Stats */}
    <div className="w-full flex flex-wrap gap-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 bg-white rounded-4xl shadow-md px-5 py-8 w-full sm:w-[300px] md:w-[260px] lg:w-[240px]"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div>{item.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Table */}
    <div className="max-w-full lg:max-w-[750px] my-5 overflow-x-auto">
      <Table columns={columns} data={products} highlightKey="status" />
    </div>
  </div>

  {/* Top Categories */}
  <div className="w-full lg:w-auto">
    <div className="bg-white rounded-3xl shadow p-4 w-full sm:w-[300px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Top Categories
      </h2>
      <div className="flex flex-col gap-5">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between rounded-xl p-3 ${cat.bg}`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={cat.icon}
                alt={cat.name}
                width={30}
                height={30}
                className="object-contain"
              />
              <span className={`font-medium ${cat.text}`}>{cat.name}</span>
            </div>
            <span className={`font-semibold ${cat.text}`}>{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    </DashboardLayout>
  );
};

export default page;
