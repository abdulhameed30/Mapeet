import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useDashboard from "../../hooks/useDashboard";



function SalesChart() {
  const { bookingChartsData } = useDashboard();
  const data = [
  { name: "الاستقبال", value: bookingChartsData.bookingCount, color: "#3b82f6" },
  { name: "تطبيق الحجز", value: bookingChartsData.orderCount, color: "#f59e0b" },
];
  return (
    <div
      className="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl p-5 border
    border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
         الحجوزات حسب المصدر
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          توزيع الحجوزات
        </p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey={"value"}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => {
          return (
            <div className="flex items-center justify-between">
              <div className="flex item-sce space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {item.name}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-white">
                {item.value}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesChart;
