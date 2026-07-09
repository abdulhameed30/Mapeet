import {
  Bed,
  BellRingIcon,
  BoxIcon,
  CalendarDays,
  ChevronDown,
  ChevronsDown,
  ChevronsLeft,
  FileText,
  GroupIcon,
  HomeIcon,
  Settings,
  ShoppingBagIcon,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar({ isClosed, onToggleSubMenu, setIsClosed }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName);
    if (isClosed) onToggleSubMenu();
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      type: "link",
      icon: HomeIcon,
      text: "لوحة التحكم",
      path: "/home",
      active: isActive("/home"),
    },
    {
      type: "dropdown",
      icon: Settings,
      text: "اعدادات النظام",
      name: "settings",
      open: openSubMenu === "settings",
      active: isActive("/settings"),
      items: [
        {
          text: "تهيئة النظام ",
          path: "/settings/preparation",
          active: isActive("/settings/preparation"),
        },
        {
          text: "المستخدمين",
          path: "/settings/users",
          active: isActive("/settings/users"),
        },
      ],
    },
    {
      type: "dropdown",
      icon: Settings,
      text: " المصروفات",
      name: "expenses",
      open: openSubMenu === "expenses",
      active: isActive("/expenses"),
      items: [
        {
          text: " مصروفات اليوم",
          path: "/expenses/TodayExpenses",
          active: isActive("/expenses/TodayExpenses"),
        },
        {
          text: "المصروفات السابقة",
          path: "/expenses/FormerExpenses",
          active: isActive("/expenses/FormerExpenses"),
        },
        
      ],
    },
    {
      type: "dropdown",
      icon: Users,
      text: "ادارة الموظفين",
      name: "employees",
      open: openSubMenu === "employees",
      active: isActive("/employees"),
      items: [
        {
          text: "الموظفين الحاليين",
          path: "/employees/CurrentEmployees",
          active: isActive("/employees/CurrentEmployees"),
        },
        {
          text: "الموظفين السابقين",
          path: "/employees/FormerEmployees",
          active: isActive("/employees/FormerEmployees"),
        },
        {
          text: "الحضور والغياب",
          path: "/employees/AttendanceEmployees",
          active: isActive("/employees/AttendanceEmployees"),
        },
        {
          text: "السلف والخصومات",
          path: "/employees/LoanAndDeductionEmployees",
          active: isActive("/employees/LoanAndDeductionEmployees"),
        },
        {
          text: "تسويات الحسابات",
          path: "/employees/SettlementEmployees",
          active: isActive("/employees/SettlementEmployees"),
        },
      ],
    },
    {
      type: "link",
      icon: Bed,
      text: "ادارة الاماكن",
      path: "/rooms",
      active: isActive("/rooms"),
    },
    {
      type: "dropdown",
      icon: CalendarDays,
      text: "ادارة الحجوزات ",
      name: "bookings",
      open: openSubMenu === "bookings",
      active: isActive("/bookings"),
      items: [
        {
          text: "تسكين",
          path: "/bookings/CurrentBookings",
          active: isActive("/bookings/CurrentBookings"),
        },
        {
          text: "حجوزات في الانتظار",
          path: "/bookings/WaitingBookings",
          active: isActive("/bookings/WaitingBookings"),
        },
        {
          text: "حجوزات اليوم",
          path: "/bookings/TodayBookings",
          active: isActive("/bookings/TodayBookings"),
        },
        {
          text: "حجوزات الأمس",
          path: "/bookings/YesterdayBookings",
          active: isActive("/bookings/YesterdayBookings"),
        },
        {
          text: " كل الحجوزات",
          path: "/bookings/AllBookings",
          active: isActive("/bookings/AllBookings"),
        },
      ],
    },
    {
      type: "dropdown",
      icon: Users,
      text: "ادراة النزلاء",
      name: "guests",
      open: openSubMenu === "guests",
      items: [
        {
          text: "بيانات النزلاء",
          path: "/guests/GuestsData",
          active: isActive("/guests/GuestsData")
        },
        {
          text: "المقبوضات",
          path: "/guests/payments",
          active: isActive("/guests/payments")
        },
      ],
    },
    {
      type: "dropdown",
      icon: ShoppingBagIcon,
      text: "طلبات الحجز",
      name: "orders",
      open: openSubMenu === "orders",
      items: [
        {
          text: "طلبات جديدة",
          path: "/orders/NewOrders",
          active: isActive("/orders/NewOrders"),
        },
        {
          text: "طلبات قيد الاقامة",
          path: "/orders/CurrentOrders",
          active: isActive("/orders/CurrentOrders"),
        },
        {
          text: "ارشيف الطلبات",
          path: "/orders/ArchiveOrders",
          active: isActive("/orders/ArchiveOrders"),
        },
      ],
    },
    {
      type: "link",
      icon: FileText,
      text: "الاقفال اليومي",
      path: "/DailyClosing",
      active: isActive("/DailyClosing"),
    },
    {
      type: "dropdown",
      icon: FileText,
      text: "التقارير",
      name: "reports",
      open: openSubMenu === "reports",
      items: [
        {
          text: " تقارير الحجوزات",
          path: "/reports/BookingReports",
          active: isActive("/reports/BookingReports"),
        },
        {
          text: " تقارير المصروفات",
          path: "/reports/ExpenseReports",
          active: isActive("/reports/ExpenseReports"),
        },
        
      ],
    },
  ];

  return (
    <div onClick={setIsClosed} className={`${!isClosed ? "z-2 md:w-auto w-full h-screen md:bg-transparent bg-black/40 md:mt-0 mt-18 md:relative fixed" : ""} transition-all`}>
      <nav onClick={(e) => e.stopPropagation()}
        className={`${
          isClosed ? "md:w-16 w-0 md:px-2 px-0 overflow-hidden" : "w-70 pr-4"
        } h-screen bg-white border-l border-gray-200 md:sticky fixed z-2 md:mt-0 mt-18 top-0 
      transition-all duration-300 font-serif text-xl`}
      >
        <div className="py-4 flex  w-full border-slate-200/50 dark:border-slate-700/50">
          <div className="flex w-full overflow-hidden  items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl
        flex items-center justify-center "
            >
              <img src={logo} alt="" />
            </div>
            {!isClosed && (
              <div>
                <h1 className="text-xl font-bold font-sans text-slate-800 dark:text-white">
                  MAPEET
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ALAWADHI SOFT
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center  border-b border-gray-100"></div>

        <div
          className={`h-[650px] ${!isClosed ? "overflow-y-scroll pl-2 pt-2" : ""}`}
        >
          <ul className="space-y-2 h-full">
            {/* Header */}

            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.type === "link" ? (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-all ${
                      item.active
                        ? "bg-blue-500 text-white "
                        : "text-gray-800 hover:text-blue-500"
                    }`}
                  >
                    <item.icon />
                    {!isClosed && <span>{item.text}</span>}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-gray-800 hover:text-blue-500 transition-all ${
                        item.active ? "bg-blue-400" : ""
                      }`}
                    >
                      <item.icon />
                      {!isClosed && (
                        <>
                          <span className="flex-1 text-right">{item.text}</span>
                          <span
                            className={`transform transition-transform ${
                              item.open ? "rotate-180" : ""
                            }`}
                          >
                            <ChevronDown />
                          </span>
                        </>
                      )}
                    </button>

                    {/* Submenu */}

                    <ul
                      className={`pr-15 overflow-hidden transition-all duration-300 ${
                        item.open && !isClosed ? "max-h-64" : "max-h-0"
                      }`}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                              subItem.active
                                ? "text-blue-500"
                                : "hover:text-blue-500"
                            }`}
                          >
                            {subItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

/* ========== Icons ========== */
const toggleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 -960 960 960"
    width="20"
    fill="currentColor"
  >
    <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
  </svg>
);

const homeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Z" />
  </svg>
);

const dashboardIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M520-640v-160q0-17 11.5-28.5T560-840h240v160H520Z" />
  </svg>
);

const createIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M480-480v40q0 17 11.5 28.5T520-400h40v40h40v-40h40v-40h-40v-40h-40v40h-40Z" />
  </svg>
);

const dropdownArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
  >
    <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556l28-28 184 184 184-184 28 28-184 184q-6 6-13 8.5t-15 2.5Z" />
  </svg>
);
