import React from "react";

function BookingsTable({ bookingsData, isWaiting = false }) {
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              اسم النزيل
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              ت الدخول
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              ت المغادرة
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              المكان
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الحالة
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الاجمالي
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الخصم
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              المدفوع
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              المتبقي
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              المستخدم
            </th>
            {isWaiting && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                الغاء
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {bookingsData.map((booking, index) => {
            return (
              <tr
                key={index}
                className="border-b border-slate-200 dark:border-slate-700/500
                    transition-colors"
              >
                <td className=" text-center">
                  <span className="text-sm font-medium text-orange-500 ">
                    {booking.booking_id}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.guest_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_check_in_date}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_check_out_date}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.type_name}
                    {booking.room_number}
                  </span>
                </td>
                <td className=" text-center">
                  {booking.booking_status == 0 ? (
                    <button className="text-sm my-2 rounded dark:text-white bg-blue-500 text-white py-1 px-2">
                      في الانتظار
                    </button>
                  ) : booking.booking_status == 1 ? (
                    <button className="text-sm my-2 rounded dark:text-white bg-green-500 text-white py-1 px-2">
                      قيد الاقامة
                    </button>
                  ) : booking.booking_status == 2 ? (
                    <button className="text-sm my-2 rounded dark:text-white bg-red-500 text-white py-1 px-2">
                      غادر
                    </button>
                  ) : (
                    <button className="text-sm my-2 rounded dark:text-white bg-red-500 text-white py-1 px-2">
                      ملغي
                    </button>
                  )}
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_total}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_discount}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_paid}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.booking_remaining}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {booking.user_name}
                  </span>
                </td>
                {isWaiting && (
                  <td className="text-center">

                  <button className="text-sm my-2 rounded dark:text-white bg-red-500 text-white py-1 px-2">
                      الغاء
                    </button>
                  </td>
            
            )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BookingsTable;
