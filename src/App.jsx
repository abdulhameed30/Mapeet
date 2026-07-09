import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "./features/Settings/UsersPage";
import TodayExpensesPage from "./features/Expenses/TodayExpensesPage";
import FormerExpensesPage from "./features/Expenses/FormerExpensesPage";
import CurrentEmployeesPage from "./features/Employees/CurrentEmployeesPage";
import FormerEmployeesPage from "./features/Employees/FormerEmployeesPage";
import AttendanceEmployeesPage from "./features/Employees/AttendanceEmployeesPage";
import LoanAndDeductionEmployeesPage from "./features/Employees/LoanAndDeductionEmployeesPage";
import SettlementEmployeesPage from "./features/Employees/SettlementEmployeesPage";
import RoomsPage from "./features/Rooms/RoomsPage";
import RoomImagesPage from "./features/Rooms/RoomImagesPage";
import CurrentBookingsPage from "./features/Bookings/CurrentBookingsPage";
import TodayBookingsPage from "./features/Bookings/TodayBookingsPage";
import YesterdayBookingsPage from "./features/Bookings/YesterdayBookingsPage";
import AllBookingsPage from "./features/Bookings/AllBookingsPage";
import GuestsPage from "./features/Guests/GuestsPage";
import PreparationPage from "./features/Settings/PreparationPage";
import NewOrdersPage from "./features/Orders/NewOrdersPage";
import CurrentOrdersPage from "./features/Orders/CurrentOrdersPage";
import ArchiveOrdersPage from "./features/Orders/ArchiveOrdersPage";
import DailyClosingPage from "./features/DailyClosing/DailyClosingPage";
import PaymentsPage from "./features/Guests/PaymentsPage";
import AppRoutes from "./AppRoutes";
import { getMessaging, onMessage } from "firebase/messaging";
import { app, messaging } from "./services/firebase-config";
import toast from "react-hot-toast";

function AppLayout() {
  const [isClosed, setIsClosed] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500"
    >
      <div className="flex h-screen overflow-hidden">
        {/* إخفاء الـ Sidebar */}
        {!isLoginPage && (
          <Sidebar
            isClosed={isClosed}
            onToggleSubMenu={() => setIsClosed(false)}
            setIsClosed={() => setIsClosed(!isClosed)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* إخفاء الـ Header */}
          {!isLoginPage && (
            <Header
              toggleSidebar={() => setIsClosed(!isClosed)}
              isClosed={isClosed}
            />
          )}

          <main className="flex-1 overflow-y-auto bg-transparent p-6">
            <Routes>
              {/* اجعل صفحة تسجيل الدخول هي الأولى */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/preparation"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <PreparationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses/TodayExpenses"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <TodayExpensesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses/FormerExpenses"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <FormerExpensesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/CurrentEmployees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <CurrentEmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/FormerEmployees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <FormerEmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/AttendanceEmployees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <AttendanceEmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/LoanAndDeductionEmployees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <LoanAndDeductionEmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/SettlementEmployees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <SettlementEmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <RoomsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms/RoomImages"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <RoomImagesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings/CurrentBookings"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <CurrentBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings/TodayBookings"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <TodayBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings/YesterdayBookings"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <YesterdayBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings/AllBookings"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <AllBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/guests/GuestsData"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <GuestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/guests/payments"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <PaymentsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/NewOrders"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <NewOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/CurrentOrders"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <CurrentOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/ArchiveOrders"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <ArchiveOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/DailyClosing"
                element={
                  <ProtectedRoute allowedRoles={["admin", "reception"]}>
                    <DailyClosingPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // تسجيل Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }

    const messaging = getMessaging(app);
    const sound = new Audio("/sound.mp3");

    // 🔑 حل مشكلة منع الصوت
    const enableSound = () => {
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      });
    };

    window.addEventListener("click", enableSound, { once: true });

    // استقبال الإشعارات
    onMessage(messaging, (payload) => {
      const title = payload.notification?.title || payload.data?.title;
      const body = payload.notification?.body || payload.data?.body;

      // 🔊 تشغيل الصوت
      sound.play().catch(() => {});

      // 🔔 toast
      toast.custom(
        (t) => (
          <div
            onClick={() => toast.dismiss(t.id)} // 👈 يغلق عند الضغط
            className="bg-blue-500 text-white p-4 rounded-xl shadow-xl cursor-pointer"
          >
            <div className="font-extrabold text-2xl">{title}</div>
            <div className="text-sm">{body}</div>
            <div>
              <button
                className="mt-3 p-2 w-30 font-extrabold text-xl text-black border border-black bg-slate-50 rounded
         hover:bg-slate-100  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
              >
                عرض
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity, // 👈 مهم جدًا (ما يختفي)
        },
      );
    });
  }, []); // مهم جدًا

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
