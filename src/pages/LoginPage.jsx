import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Loader from "../components/ui/Loader";
import useAuth from "../hooks/useAuth";

function LoginPage() {
  const {
    navigate,
    userForm,
    setUserForm,
    isLoading,
    setIsLoading,
    handleChange,
    handleLogin,
  } = useAuth();

  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
          <label className="block mb-3">
            <span>كود الفندق</span>
            <input
              type="text"
              name="hotelCode"
              className="w-full mt-1 p-2 border rounded"
              required
              value={userForm.hotelCode}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-3">
            <span>اسم المستخدم</span>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-2 border rounded"
              required
              value={userForm.username}
              onChange={handleChange}
            />
          </label>

          <label className="block mb-3">
            <span>كلمة المرور</span>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 border rounded"
              required
              value={userForm.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            دخول
          </button>
        </form>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}

export default LoginPage;
