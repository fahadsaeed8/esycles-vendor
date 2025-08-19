"use client";
import Image from "next/image";
import DashboardLayout from "../../components/layout/dashboard-layout";

interface Vendor {
  id: number;
  name: string;
  avatar: string;
  score: number;
}

const vendors: Vendor[] = [
  { id: 1, name: "Ali Traders", avatar: "/icons/cyclewhite.png", score: 980 },
  {
    id: 2,
    name: "Raza Electronics",
    avatar: "/icons/cyclelogo2.png",
    score: 870,
  },
  { id: 3, name: "Tech Hub", avatar: "/icons/cyclelogo2.png", score: 820 },
  { id: 4, name: "City Mart", avatar: "/icons/cycle.png", score: 780 },
  { id: 5, name: "Smart Deals", avatar: "/icons/cycle.png", score: 750 },
  { id: 6, name: "MegaMart", avatar: "/icons/cycle.png", score: 720 },
];

export default function Leaderboard() {
  return (
    <DashboardLayout>
      <div>
        {/* Heading */}
        <div className="flex items-center gap-2 mb-8">
        <span className=" text-3xl">🏆</span>
        <h1 className="text-3xl font-bold  bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent flex items-center gap-2">
           Vendor Leaderboard
        </h1>
        </div>

        {/* Top 3 Vendors */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {vendors.slice(0, 3).map((vendor, index) => (
            <div
              key={vendor.id}
              className={`rounded-xl p-6 text-center shadow-lg transition-transform hover:scale-105 ${
                index === 0
                  ? "bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white"
                  : "bg-white border border-orange-200"
              }`}
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={vendor.avatar}
                  alt={vendor.name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white shadow-md"
                />
                {index === 0 && (
                  <span className="absolute -top-3 -right-3 text-3xl">👑</span>
                )}
              </div>
              <h2
                className={`font-semibold text-lg ${
                  index === 0 ? "text-white" : "text-orange-600"
                }`}
              >
                {vendor.name}
              </h2>
              <p className="text-sm opacity-80">Score: {vendor.score}</p>
              <p className="mt-2 font-bold text-lg">
                {index === 0 ? "🥇 1st" : index === 1 ? "🥈 2nd" : "🥉 3rd"}
              </p>
            </div>
          ))}
        </div>

        {/* Remaining Vendors List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Vendor</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {vendors.slice(3).map((vendor, index) => (
                <tr
                  key={vendor.id}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold">{index + 4}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <Image
                      src={vendor.avatar}
                      alt={vendor.name}
                      width={40}
                      height={40}
                      className=""
                    />
                    <span className="font-medium">{vendor.name}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-orange-600">
                    {vendor.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </DashboardLayout>
  );
}
