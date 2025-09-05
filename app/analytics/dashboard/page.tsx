// app/vendor/analytics/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

type DayPoint = {
  date: string;
  sales: number;
  orders: number;
  views: number;
  clicks: number;
};
type Ad = {
  id: number;
  title: string;
  views: number;
  clicks: number;
  orders: number;
  revenue: number;
  category: string;
};
type AuctionSummary = {
  auctionsRun: number;
  avgBidsPerAuction: number;
  highestBid: number;
};

const today = (d = new Date()) => d.toISOString().slice(0, 10);

// --- Mock data generator (client-side) ---
function generateMockDayPoints(days = 30): DayPoint[] {
  const arr: DayPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const views = Math.round(200 + Math.random() * 800);
    const clicks = Math.round(views * (0.02 + Math.random() * 0.06)); // 2-8%
    const orders = Math.round(clicks * (0.1 + Math.random() * 0.3)); // 10-40% convert from clicks->orders
    const avgPrice = 35000 + Math.round(Math.random() * 40000);
    const sales = orders * avgPrice;
    arr.push({
      date: date.toISOString().slice(0, 10),
      sales,
      orders,
      views,
      clicks,
    });
  }
  return arr;
}

function generateMockAds(count = 8): Ad[] {
  const cats = ["E-Bikes", "Accessories", "Mountain", "Kids", "Scooters"];
  return Array.from({ length: count }).map((_, i) => {
    const views = Math.round(500 + Math.random() * 4500);
    const clicks = Math.round(views * (0.02 + Math.random() * 0.07));
    const orders = Math.round(clicks * (0.05 + Math.random() * 0.4));
    const revenue = orders * (30000 + Math.round(Math.random() * 50000));
    const category = cats[Math.floor(Math.random() * cats.length)];
    return {
      id: i + 1,
      title: `Ad #${i + 1} — ${category}`,
      views,
      clicks,
      orders,
      revenue,
      category,
    };
  });
}

const SPARKLINE_HEIGHT = 40;

// --- Small SVG Sparkline component
function Sparkline({ points }: { points: number[] }) {
  if (!points.length) return null;
  const w = Math.max(120, points.length * 6);
  const h = SPARKLINE_HEIGHT;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coordinates = points
    .map((v, i) => {
      const x = (i / (points.length - 1 || 1)) * (w - 4) + 2;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return `${x},${y}`;
    })
    .join(" ");
  const pathD = `M ${coordinates.split(" ")[0]} ${coordinates
    .split(" ")
    .slice(1)
    .map((p) => `L ${p}`)
    .join(" ")}`;
  return (
    <svg width={w} height={h} className="block">
      <polyline
        points={coordinates}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke="#60a5fa"
        strokeWidth={1}
        opacity={0.3}
      />
    </svg>
  );
}

// --- Mini bar chart for day sales (simple)
function MiniBarChart({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-1 h-20">
      {values.map((v, idx) => (
        <div
          key={idx}
          style={{ height: `${(v / max) * 100}%` }}
          className="w-2 bg-blue-500 rounded-sm"
          title={`${v}`}
        />
      ))}
    </div>
  );
}

// --- CSV export helper
function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csvContent = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// --- Main Page
export default function VendorAnalyticsPage() {
  const [rangeDays, setRangeDays] = useState<number>(30);
  const dayPoints = useMemo(
    () => generateMockDayPoints(rangeDays),
    [rangeDays]
  );
  const ads = useMemo(() => generateMockAds(12), []);
  const auctionSummary: AuctionSummary = useMemo(
    () => ({
      auctionsRun: 14,
      avgBidsPerAuction: 6.2,
      highestBid: 185000,
    }),
    []
  );

  // metrics
  const totalSales = useMemo(
    () => dayPoints.reduce((s, d) => s + d.sales, 0),
    [dayPoints]
  );
  const totalOrders = useMemo(
    () => dayPoints.reduce((s, d) => s + d.orders, 0),
    [dayPoints]
  );
  const totalViews = useMemo(
    () => dayPoints.reduce((s, d) => s + d.views, 0),
    [dayPoints]
  );
  const totalClicks = useMemo(
    () => dayPoints.reduce((s, d) => s + d.clicks, 0),
    [dayPoints]
  );
  const conversionRate = useMemo(() => {
    if (totalClicks === 0) return 0;
    return (totalOrders / totalClicks) * 100;
  }, [totalOrders, totalClicks]);
  const avgOrderValue = useMemo(
    () => (totalOrders ? Math.round(totalSales / totalOrders) : 0),
    [totalSales, totalOrders]
  );

  // top viewed ads
  const topAds = useMemo(
    () => [...ads].sort((a, b) => b.views - a.views).slice(0, 6),
    [ads]
  );

  // sales series for sparkline
  const salesSeries = dayPoints.map((d) => Math.round(d.sales / 1000)); // scaled to thousands for sparkline

  // handle CSV export for top ads
  const handleExportTopAds = () => {
  const rows: string[][] = [
    ["ID", "Title", "Views", "Clicks", "Orders", "Revenue", "Category"],
    ...topAds.map((a) => [
      String(a.id),
      a.title,
      String(a.views),
      String(a.clicks),
      String(a.orders),
      String(a.revenue),
      a.category,
    ]),
  ];
  downloadCSV(`esycles_top_ads_${today()}.csv`, rows);
};


  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Performance & Analytics</h1>
            <p className="text-sm text-gray-600">
              Overview of sales volume, ad performance and conversion trends.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Date range:</label>
            <div className="inline-flex bg-white border border-gray-300 rounded-lg p-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setRangeDays(d)}
                  className={`px-3 py-1 text-sm ${
                    rangeDays === d
                      ? "bg-blue-600 text-white rounded-md"
                      : "text-gray-700 hover:bg-gray-100 rounded-md"
                  }`}
                >
                  Last {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Sales</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-semibold">
                  PKR {totalSales.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  in last {rangeDays} days
                </div>
              </div>
              <div>
                {/* <Sparkline points={salesSeries} /> */}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Orders</div>
            <div className="text-2xl font-semibold">{totalOrders}</div>
            <div className="text-xs text-gray-500 mt-1">
              Avg order value PKR {avgOrderValue.toLocaleString()}
            </div>
            <div className="mt-3">
              <MiniBarChart values={dayPoints.map((d) => d.orders)} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Conversion Rate</div>
            <div className="text-2xl font-semibold">
              {conversionRate.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {totalClicks.toLocaleString()} clicks →{" "}
              {totalOrders.toLocaleString()} orders
            </div>
            <div className="mt-3">
              <MiniBarChart values={dayPoints.map((d) => d.clicks)} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Most Viewed Ads (top)</div>
            <div className="mt-2 space-y-2">
              {topAds.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.category}</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {a.views.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button
                onClick={handleExportTopAds}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                Export top ads CSV
              </button>
            </div>
          </div>
        </div>

        {/* charts and top ads table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Sales over time</h3>
              <div className="text-xs text-gray-500">
                {rangeDays} days • {dayPoints.length} points
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="w-full flex items-center gap-4">
                <div className="flex-1">
                  <Sparkline points={salesSeries} />
                </div>
                <div className="w-48">
                  <MiniBarChart
                    values={dayPoints.map((d) => Math.round(d.sales / 1000))}
                  />
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <div>
                  Avg daily sales: PKR{" "}
                  {Math.round(
                    totalSales / Math.max(1, dayPoints.length)
                  ).toLocaleString()}
                </div>
                <div>
                  Peak day:{" "}
                  {
                    dayPoints.reduce(
                      (p, c) => (c.sales > p.sales ? c : p),
                      dayPoints[0]
                    ).date
                  }
                </div>
              </div>
            </div>
          </div> */}

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Auction & Bidding Summary</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div>
                Auctions run:{" "}
                <span className="font-medium">
                  {auctionSummary.auctionsRun}
                </span>
              </div>
              <div>
                Avg bids / auction:{" "}
                <span className="font-medium">
                  {auctionSummary.avgBidsPerAuction}
                </span>
              </div>
              <div>
                Highest bid received:{" "}
                <span className="font-medium">
                  PKR {auctionSummary.highestBid.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Ads table */}
        <div className="">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Top Viewed Ads (detailed)</h3>
            <div className="text-xs text-gray-500">Sorted by views</div>
          </div>

          <div className="overflow-x-auto rounded-md bg-white">
            <table className="w-full rounded-md">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="p-3 text-left">Ad</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Views</th>
                  <th className="p-3 text-center">Clicks</th>
                  <th className="p-3 text-center">Orders</th>
                  <th className="p-3 text-center">Revenue</th>
                  <th className="p-3 text-center">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topAds.map((a) => {
                  const conv = a.clicks ? (a.orders / a.clicks) * 100 : 0;
                  return (
                    <tr key={a.id} className="border-t border-gray-300 hover:bg-gray-50">
                      <td className="p-3">{a.title}</td>
                      <td className="p-3">{a.category}</td>
                      <td className="p-3 text-center">
                        {a.views.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">
                        {a.clicks.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">{a.orders}</td>
                      <td className="p-3 text-center">
                        PKR {a.revenue.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">{conv.toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Top Category</h4>
            <div className="text-sm text-gray-700">
              {(() => {
                const byCat = topAds.reduce<Record<string, number>>(
                  (acc, a) => {
                    acc[a.category] = (acc[a.category] || 0) + a.revenue;
                    return acc;
                  },
                  {}
                );
                const top = Object.entries(byCat).sort(
                  (a, b) => b[1] - a[1]
                )[0];
                return top
                  ? `${top[0]} (PKR ${top[1].toLocaleString()})`
                  : "No data";
              })()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Most Viewed Ad</h4>
            <div className="text-sm text-gray-700">
              {topAds[0]
                ? `${
                    topAds[0].title
                  } — ${topAds[0].views.toLocaleString()} views`
                : "No data"}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Action</h4>
            <button
              onClick={() => {
                // quick export of dayPoints as CSV
                const rows = [
                  ["date", "sales", "orders", "views", "clicks"],
                  ...dayPoints.map((d) => [
                    d.date,
                    d.sales,
                    d.orders,
                    d.views,
                    d.clicks,
                  ]),
                ];
                downloadCSV(`esycles_sales_${today()}.csv`, rows);
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              Export sales CSV
            </button>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
