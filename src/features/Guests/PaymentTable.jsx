  import { Edit, FileText, Trash } from "lucide-react";
import React, { useState } from "react";

function PaymentTable({
  onEdit,
  payments,
  handleDelete,
  isDeleted = false,
}) {
  

  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              اسم النزيل
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
            التأريخ 
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              طريقة الدفع
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              المبلغ
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              المستخدم
            </th>
            
            <th className="text-center p-2 text-xl font-extrabold text-white">
              ملاحظة
            </th>
            {!isDeleted && (
              <th className="text-center p-2 text-xl font-extrabold text-white">
                تعديل
              </th>
            )}
            {!isDeleted && (
              <th className="text-center p-2 text-xl font-extrabold text-white">
                حذف
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr
                key={index}
                className="border-b border-slate-200 dark:border-slate-700/500
             transition-colors"
              >
                <td className=" text-center">
                  <span className="text-sm font-medium text-orange-500 ">
                    {index + 1}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.guest_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.payment_date}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.payment_method == 0 ? "نقد" : "تحويل"}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.payment_amount} ريال
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.user_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {payment.payment_note}
                  </span>
                </td>
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => onEdit(payment)}
                      className=" hover:bg-slate-100 cursor-pointer p-2  my-2 text-blue-500
                rounded-xl text-center transition-colors"
                    >
                      <Edit />
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => handleDelete(payment.payment_id)}
                      className="hover:bg-slate-100 cursor-pointer p-2  my-2 text-red-500
                rounded-xl text-center transition-colors"
                    >
                      <Trash />
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

export default PaymentTable;
