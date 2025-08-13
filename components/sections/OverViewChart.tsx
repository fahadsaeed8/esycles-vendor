
'use client'

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', earnings: 9000 },
  { month: 'Feb', earnings: 11000 },
  { month: 'Mar', earnings: 7000 },
  { month: 'Apr', earnings: 13210 },
  { month: 'May', earnings: 9500 },
  { month: 'Jun', earnings: 12000 },
  { month: 'Jul', earnings: 8000 },
  { month: 'Aug', earnings: 14000 },
  { month: 'Sep', earnings: 10000 },
  { month: 'Oct', earnings: 12500 },
  { month: 'Nov', earnings: 11500 },
  { month: 'Dec', earnings: 9000 },
];

export default function OverviewChart() {
  const selectedMonth = 'Apr';
  const selectedData = data.find(d => d.month === selectedMonth);

  return (
    <div className="bg-gradient-to-r from-[#f8a649] via-[#f59e0b] to-[#d97706] drop-shadow-2xl drop-shadow-amber-200 text-white rounded-3xl p-6 shadow-2xl w-full max-w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Overview</h2>
        <select className="bg-orange-300 rounded-lg px-3 py-1 text-sm">
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis dataKey="month" axisLine={false} tickLine={false}  padding={{ left: 20, right: 20 }}/>
          <Tooltip
            contentStyle={{
              backgroundColor: '#059669',
              borderRadius: '10px',
              border: 'none',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#fff"
            strokeWidth={3}
            dot={{ r: 4, fill: '#fff' }}
            activeDot={{ r: 6, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Bottom stats */}
      <div className="mt-6 flex justify-between text-center">
        <div>
          <p className="text-sm opacity-80">Earnings</p>
          <p className="text-2xl font-bold">{selectedData?.earnings.toLocaleString()} TK</p>
          <p className="text-sm opacity-80">{selectedMonth}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Total Sales</p>
          <p className="text-2xl font-bold">15 pcs</p>
          <p className="text-sm opacity-80">{selectedMonth}</p>
        </div>
      </div>
    </div>
  );
}
