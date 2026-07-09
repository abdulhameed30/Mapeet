import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  Eye,
  RailSymbol,
  ShoppingCart,
  User,
  Wallet,
  BedDouble,
  Bed
} from "lucide-react";
import React from "react";
import axiosClient from "../../api/axiosClient";
import useDashboard from "../../hooks/useDashboard";

function StatsGrid() {
  const { statsData, fetchData } = useDashboard();
  const stats = [
  {
    title: "إجمالي الإيرادات",
    value: `${statsData?.revenueTotal ?? 0} ريال`,
    change: "12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "إجمالي المصروفات",
    value: `${statsData?.expenseTotal ?? 0} ريال`,
    change: "-8.2%",
    trend: "down",
    icon: RailSymbol,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "الصافي",
    value: `${statsData?.netTotal ?? 0} ريال`,
    change: statsData?.netTotal >= 0 ? "+15.3%" : "-15.3%",
    trend: statsData?.netTotal >= 0 ? "up" : "down",
    icon: Wallet,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "الغرف الشاغرة",
    value: `${statsData?.vacantRooms ?? 0} غرفة`,
    change: "+2.1%",
    trend: "up",
    icon: BedDouble,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "الغرف المحجوزة",
    value: `${statsData?.occupiedRooms ?? 0} غرفة`,
    change: "-2.1%",
    trend: "down",
    icon: Bed,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];
   
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stats.map((stats, index) => {
        return (
          <div
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-3
      border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl
      hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300 group"
            key={index}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 ">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {stats.title}
                </p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">
                  {stats.value}
                </p>
                <div className="flex items-center space-x-2">
                  {stats.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      stats.trend == "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {stats.change}
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-full ${stats.bgColor} group-hover:scale-110 transition-all duration-300`}
              >
                {<stats.icon className={`w-6 h-6 ${stats.textColor}`} />}
              </div>
            </div>
            {/* progressbar */}
            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ">
              <div
                className={`h-full bg-linear-to-r ${stats.color} rounded-full transition-all duration-100`}
                style={{ width: stats.trend }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsGrid;
