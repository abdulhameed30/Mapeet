import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  Filter,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHandler from "../../services/notification-handler";

function Header({ toggleSidebar, isClosed }) {
  
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("status")
    navigate("/login");
  };
  useEffect(() => {
    
  }, []);
  

  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b
    border-slate-200/50 dark:border-slate-700/50 px-5 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex justify-center items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition text-orange-700 "
            >
              <ChevronsLeft
                className={`${isClosed ? "rotate-180" : ""} transition-all`}
              />
            </button>
            <p className="text-2xl font-extrabold">{hotelData.hotel_name}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3">
          {/* Quic Action */}

          {/* Toggle */}

          {/* Notification */}
          <button
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs
            rounded-full flex items-center justify-center"
            >
              3
            </span>
          </button>

          {/* settings */}
          <button
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div
            className="flex items-center space-x-3 pl-3 border-l border-slate-200
          dark:border-slate-700"
          >
            <User className="w-8 h-8 rounded-full ring-2 ring-blue-500" />
            <div className="hidden md:block">
              <p className="text-x font-extrabold dark:text-slate-400">
                {hotelData.user_name}
              </p>
              <p className="text-xs  dark:text-slate-400">
                <span className=""></span> |{" "}
                <span className="text-blue-500">
                  {hotelData.permission_type}
                </span>
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;
