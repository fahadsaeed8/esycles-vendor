"use client";
import React, { useState } from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import PaginationTable from "../../components/common/pagination";
import Table from "../../components/common/table/page";

const SellerProductSale = () => {
  type SellerRow = {
    id: number;
    sellerName: string;
    orderAmount: string;
    shopName: string;
    productSale: number;
  };

  const columns: { key: keyof SellerRow; label: string }[] = [
    { key: "sellerName", label: "Seller Name" },
    { key: "orderAmount", label: "Order Amount" },
  ];

  const data: SellerRow[] = [
    {
      id: 1,
      sellerName: "LOUIS VUITTON",
      orderAmount: "$556.000",
      shopName: "--",
      productSale: 5,
    },
    {
      id: 2,
      sellerName: "adidas",
      orderAmount: "$329.000",
      shopName: "adidas Store",
      productSale: 3,
    },
    {
      id: 3,
      sellerName: "Philipps",
      orderAmount: "$0.000",
      shopName: "Philipps Store",
      productSale: 0,
    },
    {
      id: 4,
      sellerName: "Zara",
      orderAmount: "$210.000",
      shopName: "Zara Outlet",
      productSale: 2,
    },
    {
      id: 5,
      sellerName: "Nike",
      orderAmount: "$600.000",
      shopName: "Nike Store",
      productSale: 6,
    },
    {
      id: 6,
      sellerName: "H&M",
      orderAmount: "$100.000",
      shopName: "H&M Mall Branch",
      productSale: 1,
    },
    {
      id: 7,
      sellerName: "Gucci",
      orderAmount: "$990.000",
      shopName: "Gucci Fashion House",
      productSale: 4,
    },
    {
      id: 8,
      sellerName: "Apple",
      orderAmount: "$1200.000",
      shopName: "Apple Store",
      productSale: 10,
    },
    {
      id: 9,
      sellerName: "Samsung",
      orderAmount: "$980.000",
      shopName: "Samsung Hub",
      productSale: 7,
    },
    {
      id: 10,
      sellerName: "Sony",
      orderAmount: "$700.000",
      shopName: "Sony Center",
      productSale: 3,
    },
    {
      id: 11,
      sellerName: "LG",
      orderAmount: "$330.000",
      shopName: "LG Electronics",
      productSale: 2,
    },
    {
      id: 12,
      sellerName: "Microsoft",
      orderAmount: "$860.000",
      shopName: "Microsoft Store",
      productSale: 5,
    },
  ];

  // 4️⃣ Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <DashboardLayout>
      <div className="">
        <h2 className="text-lg md:text-2xl font-medium mb-6 text-black">
          Sales Report
        </h2>

        <div>
          <Table<SellerRow>
            columns={columns}
            data={paginatedData}
            accordion={(row) => (
              <div className="space-y-1">
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-medium">Shop Name:</p>{" "}
                  {row.shopName}
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm font-medium">Number of Product Sale:</p>{" "}
                  {row.productSale}
                </div>
              </div>
            )}
          />
          {data.length > itemsPerPage && (
            <div className="mt-4">
              <PaginationTable
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerProductSale;
