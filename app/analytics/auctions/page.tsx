// app/vendor/auction-tracking/page.tsx
"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

/** Types */
type Bid = {
  id: string;
  bidder: string;
  amount: number;
  time: string; // iso or human string
};

type Auction = {
  id: string;
  title: string;
  startingBid: number;
  category: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  views: number;
  bids: Bid[];
};

/** Helpers */
const uid = (p = "") => p + Math.random().toString(36).slice(2, 9);
const nowTime = () => new Date().toLocaleString();
const todayDate = () => new Date().toISOString().slice(0, 10);

/** CSV helper accepting numbers/strings */
function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv =
    rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n") + "\n";
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

/** Sparkline component (small) */
function Sparkline({ values, width = 140, height = 36 }: { values: number[]; width?: number; height?: number }) {
  if (!values || values.length === 0) return <div style={{ width, height }} />;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * (width - 4) + 2;
      const y = height - 2 - ((v - min) / range) * (height - 4);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline points={path} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Mock generator */
function generateMockAuctions(): Auction[] {
  const cats = ["E-Bikes", "Mountain", "Accessories", "Scooters", "Kids"];
  const auctions: Auction[] = [];
  for (let i = 0; i < 8; i++) {
    const id = uid("auc_");
    const bids: Bid[] = [];
    const bidCount = Math.round(2 + Math.random() * 10);
    let top = 50000 + Math.round(Math.random() * 100000);
    for (let b = 0; b < bidCount; b++) {
      const amount = Math.round((top - Math.random() * 20000) + Math.random() * 10000);
      bids.push({
        id: uid("bid_"),
        bidder: `Buyer ${Math.ceil(Math.random() * 200)}`,
        amount: Math.max(1000, Math.round(amount)),
        time: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toLocaleString(),
      });
      if (amount > top) top = amount;
    }
    // ensure there's a top bid present
    bids.push({
      id: uid("bid_"),
      bidder: `Buyer ${Math.ceil(Math.random() * 200)}`,
      amount: Math.round(50000 + Math.random() * 200000),
      time: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toLocaleString(),
    });

    const views = Math.round(200 + Math.random() * 5000);
    auctions.push({
      id,
      title: `Auction ${i + 1} - ${cats[i % cats.length]} Special`,
      startingBid: 30000 + Math.round(Math.random() * 40000),
      category: cats[i % cats.length],
      startDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 14).toISOString(),
      endDate: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
      views,
      bids,
    });
  }
  return auctions;
}

/** Page component */
export default function AuctionTrackingPage() {
  const [auctions, setAuctions] = useState<Auction[]>(() => generateMockAuctions());
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "views" | "bids" | "highest">("recent");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [activeAuction, setActiveAuction] = useState<Auction | null>(null);
  const [newBidAmount, setNewBidAmount] = useState<number | "">("");
  const [newBidderName, setNewBidderName] = useState<string>("");
  const categories = useMemo(() => ["All", ...Array.from(new Set(auctions.map((a) => a.category)))], [auctions]);

  // Derived global metrics
  const summary = useMemo(() => {
    const totalAuctions = auctions.length;
    const allBids = auctions.flatMap((a) => a.bids);
    const avgBids = allBids.length ? +(allBids.length / totalAuctions).toFixed(2) : 0;
    const highestBid = allBids.length ? Math.max(...allBids.map((b) => b.amount)) : 0;
    const totalViews = auctions.reduce((s, a) => s + a.views, 0);
    const avgEngagement = auctions.length ? +(allBids.length / totalViews).toFixed(3) : 0;
    return { totalAuctions, avgBids, highestBid, totalViews, avgEngagement };
  }, [auctions]);

  // Filtered + sorted auctions
  const visibleAuctions = useMemo(() => {
    let arr = auctions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));
    if (filterCategory !== "All") arr = arr.filter((a) => a.category === filterCategory);
    if (sortBy === "recent") arr = arr.sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));
    if (sortBy === "views") arr = arr.sort((a, b) => b.views - a.views);
    if (sortBy === "bids") arr = arr.sort((a, b) => b.bids.length - a.bids.length);
    if (sortBy === "highest") arr = arr.sort((a, b) => Math.max(...b.bids.map((x) => x.amount)) - Math.max(...a.bids.map((x) => x.amount)));
    return arr;
  }, [auctions, query, sortBy, filterCategory]);

  // Open auction modal
  const openAuction = (a: Auction) => {
    setActiveAuction(a);
    setNewBidAmount("");
    setNewBidderName("");
  };

  // Add / simulate bid for active auction
  const addBidToActive = () => {
    if (!activeAuction) return;
    if (!newBidderName.trim()) {
      alert("Enter bidder name.");
      return;
    }
    const amountNum = typeof newBidAmount === "number" ? newBidAmount : parseFloat(String(newBidAmount));
    if (!amountNum || isNaN(amountNum) || amountNum <= 0) {
      alert("Enter a valid bid amount.");
      return;
    }
    const newBid: Bid = { id: uid("bid_"), bidder: newBidderName.trim(), amount: Math.round(amountNum), time: nowTime() };

    setAuctions((prev) =>
      prev.map((p) => (p.id === activeAuction.id ? { ...p, bids: [...p.bids, newBid] } : p))
    );

    // Update activeAuction reference
    setActiveAuction((prev) => (prev ? { ...prev, bids: [...prev.bids, newBid] } : prev));
    setNewBidAmount("");
    setNewBidderName("");
  };

  // Export bids CSV for an auction
  const exportAuctionBids = (a: Auction) => {
    const header = ["Bid ID", "Bidder", "Amount", "Time", "Auction ID", "Auction Title"];
    const rows = [header, ...a.bids.map((b) => [b.id, b.bidder, b.amount, b.time, a.id, a.title])];
    downloadCSV(`auction_bids_${a.id}_${todayDate()}.csv`, rows);
  };

  // Delete a bid (frontend only)
  const deleteBid = (auctionId: string, bidId: string) => {
    if (!confirm("Delete this bid? This is frontend-only action.")) return;
    setAuctions((prev) => prev.map((a) => (a.id === auctionId ? { ...a, bids: a.bids.filter((b) => b.id !== bidId) } : a)));
    // keep modal in sync
    setActiveAuction((prev) => (prev ? { ...prev, bids: prev.bids.filter((b) => b.id !== bidId) } : prev));
  };

  // Compute per-auction metrics helpers
  const auctionMetrics = (a: Auction) => {
    const highest = a.bids.length ? Math.max(...a.bids.map((b) => b.amount)) : a.startingBid;
    const avg = a.bids.length ? Math.round(a.bids.reduce((s, b) => s + b.amount, 0) / a.bids.length) : 0;
    const conversion = a.views ? ((a.bids.length / a.views) * 100).toFixed(2) : "0.00";
    return { highest, avg, conversion };
  };

  // small function to build sparkline data (bids count over time)
  const bidsCountSeries = (a: Auction) => {
    // create simple last-N buckets over bids time (here, buckets = up to 8)
    const buckets = 8;
    const counts = Array.from({ length: buckets }, () => 0);
    a.bids.forEach((b, i) => {
      counts[i % buckets]++;
    });
    return counts;
  };

  return (
    <DashboardLayout>
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* header & controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Auction Performance & Tracking</h1>
            <p className="text-sm text-gray-600">Monitor bidding trends, top auctions, and customer engagement.</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search auctions..."
              className="px-3 py-2 border border-gray-300 bg-white rounded-md"
            />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 border border-gray-300 bg-white rounded-md">
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 border border-gray-300 bg-white rounded-md">
              <option value="recent">Most recent</option>
              <option value="views">Most views</option>
              <option value="bids">Most bids</option>
              <option value="highest">Highest bid</option>
            </select>
          </div>
        </div>

        {/* summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Auctions</div>
            <div className="text-2xl font-semibold">{summary.totalAuctions}</div>
            <div className="text-xs text-gray-500 mt-1">Total auctions run</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Avg Bids</div>
            <div className="text-2xl font-semibold">{summary.avgBids}</div>
            <div className="text-xs text-gray-500 mt-1">Avg bids per auction</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Highest Bid</div>
            <div className="text-2xl font-semibold">PKR {summary.highestBid.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Highest bid received</div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="text-2xl font-semibold">{summary.totalViews.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Across all auctions</div>
          </div>
        </div>

        {/* auctions list */}
        <div className="">
          <h2 className="font-bold text-xl mb-3">Your Auctions</h2>
          <div className="overflow-x-auto bg-white rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
                <tr>
                  <th className="p-3 text-left">Auction</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-center">Views</th>
                  <th className="p-3 text-center">Bids</th>
                  <th className="p-3 text-center">Highest</th>
                  <th className="p-3 text-center">Conversion (bids/views)</th>
                  <th className="p-3 text-center">Trend</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleAuctions.map((a) => {
                  const { highest, avg, conversion } = auctionMetrics(a);
                  const bidsSeries = bidsCountSeries(a);
                  return (
                    <tr key={a.id} className="border-t border-gray-300 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-gray-500">Start: {new Date(a.startDate).toLocaleDateString()}</div>
                      </td>
                      <td className="p-3">{a.category}</td>
                      <td className="p-3 text-center">{a.views.toLocaleString()}</td>
                      <td className="p-3 text-center">{a.bids.length}</td>
                      <td className="p-3 text-center">PKR {highest.toLocaleString()}</td>
                      <td className="p-3 text-center">{conversion}%</td>
                      <td className="p-3 text-center">
                        <Sparkline values={bidsSeries} />
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openAuction(a)}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded"
                          >
                            View
                          </button>
                          <button
                            onClick={() => exportAuctionBids(a)}
                            className="px-3 py-1 bg-gray-700 text-white text-xs rounded"
                          >
                            Export Bids
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visibleAuctions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      No auctions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* modal: active auction details + bids */}
        {activeAuction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-3xl rounded shadow-lg overflow-hidden">
              <div className="flex items-start justify-between p-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{activeAuction.title}</h3>
                  <div className="text-xs text-gray-500">Category: {activeAuction.category}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // quick simulate new view
                      setAuctions((prev) => prev.map((p) => (p.id === activeAuction.id ? { ...p, views: p.views + 1 } : p)));
                      setActiveAuction((prev) => (prev ? { ...prev, views: prev.views + 1 } : prev));
                    }}
                    className="text-sm px-3 py-1 bg-yellow-500 rounded text-white"
                  >
                    +View
                  </button>
                  <button onClick={() => setActiveAuction(null)} className="text-sm px-3 py-1 bg-gray-200 rounded">
                    Close
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Starting Bid</div>
                    <div className="font-semibold">PKR {activeAuction.startingBid.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Views</div>
                    <div className="font-semibold">{activeAuction.views.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Bids</div>
                    <div className="font-semibold">{activeAuction.bids.length}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Add / Simulate Bid</h4>
                  <div className="flex gap-2">
                    <input
                      value={newBidderName}
                      onChange={(e) => setNewBidderName(e.target.value)}
                      placeholder="Bidder name"
                      className="px-3 py-2 border rounded flex-1"
                    />
                    <input
                      value={String(newBidAmount)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setNewBidAmount(v === "" ? "" : Number(v));
                      }}
                      placeholder="Amount"
                      type="number"
                      className="px-3 py-2 border rounded w-40"
                    />
                    <button onClick={addBidToActive} className="px-4 py-2 bg-green-600 text-white rounded">
                      Add Bid
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Bid History ({activeAuction.bids.length})</h4>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => exportAuctionBids(activeAuction)}
                        className="px-3 py-1 bg-gray-800 text-white rounded text-sm"
                      >
                        Export
                      </button>
                      <button
                        onClick={() =>
                          setAuctions((prev) => prev.map((p) => (p.id === activeAuction.id ? { ...p, bids: [] } : p)))
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Clear Bids
                      </button>
                    </div>
                  </div>

                  <div className="max-h-64 overflow-auto space-y-2 border rounded p-2 bg-gray-50">
                    {activeAuction.bids
                      .slice()
                      .sort((x, y) => Number(new Date(y.time)) - Number(new Date(x.time)))
                      .map((b) => (
                        <div key={`${activeAuction.id}-${b.id}`} className="flex items-center justify-between bg-white p-2 rounded shadow-sm">
                          <div>
                            <div className="font-medium">{b.bidder}</div>
                            <div className="text-xs text-gray-500">{b.time}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">PKR {b.amount.toLocaleString()}</div>
                            <div>
                              <button
                                onClick={() => deleteBid(activeAuction.id, b.id)}
                                className="text-xs text-red-600 hover:underline mt-1"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {activeAuction.bids.length === 0 && <div className="text-sm text-gray-500 p-2">No bids yet.</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Bidding Trends</h4>
            <p className="text-sm text-gray-600 mb-3">Quick view of bids distribution across auctions.</p>
            <div className="flex gap-3 flex-wrap">
              {auctions.map((a) => (
                <div key={`trend-${a.id}`} className="p-2 bg-gray-50 rounded w-48">
                  <div className="text-xs text-gray-500">{a.title}</div>
                  <div className="text-sm font-medium">{a.bids.length} bids</div>
                  <div className="mt-2">
                    <Sparkline values={bidsCountSeries(a)} width={120} height={28} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold mb-2">Customer Engagement</h4>
            <div className="text-sm text-gray-600 mb-3">Views → Bids conversion, quick actions</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-xs text-gray-500">Total Views</div>
                <div className="font-medium">{summary.totalViews.toLocaleString()}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs text-gray-500">Total Bids</div>
                <div className="font-medium">{auctions.flatMap((a) => a.bids).length}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs text-gray-500">Avg engagement (bids/views)</div>
                <div className="font-medium">{summary.avgEngagement}</div>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    // quick simulate engagement: add a random bid to random auction and increment views
                    const idx = Math.floor(Math.random() * auctions.length);
                    const target = auctions[idx];
                    const newBid: Bid = { id: uid("bid_"), bidder: `AutoBuyer${Math.floor(Math.random() * 999)}`, amount: Math.round(20000 + Math.random() * 120000), time: nowTime() };
                    setAuctions((prev) => prev.map((a, i) => (i === idx ? { ...a, bids: [...a.bids, newBid], views: a.views + Math.round(5 + Math.random() * 20) } : a)));
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                  Simulate engagement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-xs text-gray-500 mt-4">Note: All data here is frontend mock data (no backend). Integrate to your backend for persistent analytics.</div> */}
      </div>
    </div>
    </DashboardLayout>
  );
}
