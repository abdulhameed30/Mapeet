import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import PreparationPage from "./features/Settings/PreparationPage";
import UsersPage from "./features/Settings/UsersPage";
import LoginPage from "./pages/LoginPage";
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
import PaymentsPage from "./features/Guests/PaymentsPage";
import NewOrdersPage from "./features/Orders/NewOrdersPage";
import CurrentOrdersPage from "./features/Orders/CurrentOrdersPage";
import ArchiveOrdersPage from "./features/Orders/ArchiveOrdersPage";
import DailyClosingPage from "./features/DailyClosing/DailyClosingPage";
import BookingReportsPage from "./features/Reports/BookingReportsPage";
import ExpensesReportsPage from "./features/Reports/ExpensesReportsPage";
import WaitingBookingsPage from "./features/Bookings/WaitingBookingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="home"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings/preparation"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <PreparationPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="settings/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="expenses/TodayExpenses"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <TodayExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="expenses/FormerExpenses"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <FormerExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/CurrentEmployees"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <CurrentEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/FormerEmployees"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <FormerEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/AttendanceEmployees"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <AttendanceEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/LoanAndDeductionEmployees"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <LoanAndDeductionEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employees/SettlementEmployees"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <SettlementEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="rooms"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <RoomsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="rooms/RoomImages"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <RoomImagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/CurrentBookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <CurrentBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/TodayBookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <TodayBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/WaitingBookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <WaitingBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/YesterdayBookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <YesterdayBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings/AllBookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <AllBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="guests/GuestsData"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <GuestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="guests/payments"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/NewOrders"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <NewOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/CurrentOrders"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <CurrentOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/ArchiveOrders"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <ArchiveOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="DailyClosing"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <DailyClosingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/BookingReports"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <BookingReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/ExpenseReports"
          element={
            <ProtectedRoute allowedRoles={["admin", "reception"]}>
              <ExpensesReportsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
