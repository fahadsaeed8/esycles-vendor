// app/vendor/category-analytics/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardLayout from "../../../components/layout/dashboard-layout";

/** Types */
type Product = {
  id: string;
  name: string;
  category: string;
  sales: number;
  orders: number;
  views: number;
};

type CategoryStats = {
  category: string;
  totalSales: number;
  totalOrders: number;
  totalViews: number;
};

/** Helpers */
const uid = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().slice(0, 10);

function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv =
    rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Mock data generator */
function generateMockProducts(): Product[] {
  const categories = ["E-Bikes", "Mountain", "Scooters", "Accessories", "Kids"];
  const products: Product[] = [];
  for (let i = 0; i < 25; i++) {
    const cat = categories[i % categories.length];
    const sales = Math.round(50000 + Math.random() * 200000);
    const orders = Math.round(20 + Math.random() * 200);
    const views = Math.round(1000 + Math.random() * 10000);
    products.push({
      id: uid(),
      name: `${cat} Product ${i + 1}`,
      category: cat,
      sales,
      orders,
      views,
    });
  }
  return products;
}

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];

/** Component */
export default function CategoryAnalyticsPage() {
  const [products] = useState<Product[]>(() => generateMockProducts());
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  // Aggregate stats per category
  const categoryStats: CategoryStats[] = useMemo(() => {
    return categories.map((cat) => {
      const items = products.filter((p) => p.category === cat);
      return {
        category: cat,
        totalSales: items.reduce((s, p) => s + p.sales, 0),
        totalOrders: items.reduce((s, p) => s + p.orders, 0),
        totalViews: items.reduce((s, p) => s + p.views, 0),
      };
    });
  }, [products, categories]);

  // Filtered products
  const visibleProducts = useMemo(() => {
    let arr = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (filterCategory !== "All") arr = arr.filter((p) => p.category === filterCategory);
    return arr.sort((a, b) => b.sales - a.sales);
  }, [products, query, filterCategory]);

  // Top-selling products
  const topProducts = useMemo(() => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 8);
  }, [products]);

  // Export functions
  const exportCategoryStats = () => {
    const rows = [
      ["Category", "Total Sales", "Total Orders", "Total Views"],
      ...categoryStats.map((c) => [c.category, c.totalSales, c.totalOrders, c.totalViews]),
    ];
    downloadCSV(`category_stats_${today()}.csv`, rows);
  };

  const exportProducts = () => {
    const rows = [
      ["ID", "Name", "Category", "Sales", "Orders", "Views"],
      ...visibleProducts.map((p) => [p.id, p.name, p.category, p.sales, p.orders, p.views]),
    ];
    downloadCSV(`products_${today()}.csv`, rows);
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Category-wise Analytics</h1>
            <p className="text-sm text-gray-600">
              Identify high-demand categories and top-selling products.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCategoryStats}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              Export Categories CSV
            </button>
            <button
              onClick={exportProducts}
              className="px-3 py-2 bg-gray-700 text-white rounded"
            >
              Export Products CSV
            </button>
          </div>
        </div>

        {/* Category demand analytics */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Category Demand</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryStats} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#2563eb" name="Sales" />
              <Bar dataKey="totalOrders" fill="#16a34a" name="Orders" />
              <Bar dataKey="totalViews" fill="#f59e0b" name="Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart for sales share */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Sales Share by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                dataKey="totalSales"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryStats.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top products */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Top-Selling Products</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topProducts} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" name="Sales" />
              <Bar dataKey="orders" fill="#16a34a" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product table */}
        <div className="">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
            <h2 className="font-semibold text-xl">Products</h2>
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="px-3 py-2 border rounded border-gray-300 bg-white"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 bg-white rounded"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto rounded-md bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Sales</th>
                  <th className="p-3 text-center">Orders</th>
                  <th className="p-3 text-center">Views</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((p) => (
                  <tr key={p.id} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 text-center">PKR {p.sales.toLocaleString()}</td>
                    <td className="p-3 text-center">{p.orders}</td>
                    <td className="p-3 text-center">{p.views}</td>
                  </tr>
                ))}
                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="text-xs text-gray-500">
          Note: All data is mocked on the frontend. Connect with backend APIs for real analytics.
        </div> */}
      </div>
    </div>
    </DashboardLayout>
  );
}
