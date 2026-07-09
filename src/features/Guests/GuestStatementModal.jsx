import React from "react";
import useGuestStatement from "./useGuestStatement";
import { Printer } from "lucide-react";

function GuestStatementModal({ onClose, onModalClick, guest }) {
  const { bookingsData, paymentsData } = useGuestStatement(guest.guest_id);
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800  w-3xl  relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>كشف حساب </h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <h1 className="flex w-full justify-center">بيانات النزيل</h1>
        <div className="md:w-full w-[800px] flex justify-center px-5 py-1">
          <table className="w-full overflow-hidden rounded border ">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center   font-extrabold text-white">
                  اسم النزيل
                </th>
                <th className="text-center   font-extrabold text-white">
                  رقم الهوية
                </th>
                <th className="text-center   font-extrabold text-white">
                  الهاتف
                </th>
                <th className="text-center   font-extrabold text-white">
                  الرصيد
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center   p-1">{guest.guest_name}</td>
                <td className="text-center   p-1">{guest.guest_national}</td>
                <td className="text-center   p-1">{guest.guest_phone}</td>
                <td className="text-center   p-1">{guest.guest_balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="flex w-full justify-center mt-5"> حجوزات النزيل</h1>
        <div className="md:w-full w-[800px] flex justify-center px-5 py-1 max-h-44 overflow-y-scroll">
          <table className="w-full overflow-hidden rounded border ">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center   font-extrabold text-white">
                  ت/الدخول
                </th>
                <th className="text-center   font-extrabold text-white">
                  ت/الخروج
                </th>
                <th className="text-center   font-extrabold text-white">
                  الغرفة
                </th>
                <th className="text-center   font-extrabold text-white">
                  الاجمالي
                </th>
                <th className="text-center   font-extrabold text-white">
                  الخصم
                </th>
                <th className="text-center   font-extrabold text-white">
                  المدفوع
                </th>
                <th className="text-center   font-extrabold text-white">
                  المتبقي
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking, index) => {
                return (
                  <tr>
                    <td className="text-center   p-1">
                      {booking.booking_check_in_date}
                    </td>
                    <td className="text-center   p-1">
                      {booking.booking_check_out_date}
                    </td>
                    <td className="text-center   p-1">{booking.room_number}</td>
                    <td className="text-center   p-1">
                      {booking.booking_total}
                    </td>
                    <td className="text-center   p-1">
                      {booking.booking_discount}
                    </td>
                    <td className="text-center   p-1">
                      {booking.booking_paid}
                    </td>
                    <td className="text-center   p-1">
                      {booking.booking_remaining}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h1 className="flex w-full justify-center mt-5"> مدفوعات النزيل</h1>
        <div className="md:w-full w-[800px] flex justify-center px-5 py-1 max-h-44 overflow-y-scroll">
          <table className="w-full overflow-hidden rounded border ">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center   font-extrabold text-white">
                  التأريخ
                </th>
                <th className="text-center   font-extrabold text-white">
                  طريقة الدفع
                </th>
                <th className="text-center   font-extrabold text-white">
                  المبلغ
                </th>
                <th className="text-center   font-extrabold text-white">
                  المستخدم
                </th>
                <th className="text-center   font-extrabold text-white">
                  ملاحظة
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.map((payment, index) => {
                return (
                  <tr>
                    <td className="text-center   p-1">
                      {payment.payment_date}
                    </td>
                    <td className="text-center   p-1">
                      {payment.payment_method == 0 ? "نقد" : "تحويل"}
                    </td>
                    <td className="text-center   p-1">
                      {payment.payment_amount}
                    </td>
                    <td className="text-center   p-1">{payment.user_name}</td>
                    <td className="text-center   p-1">
                      {payment.payment_note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-5">
          <button
            type="submit"
            className="p-2 w-30 font-extrabold text-xl border text-white bg-blue-500 rounded
         hover:bg-blue-600  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
          >
            <span>طباعة</span> <Printer />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestStatementModal;
