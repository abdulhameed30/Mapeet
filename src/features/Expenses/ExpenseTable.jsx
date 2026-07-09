import { Edit, Trash } from "lucide-react";
import React from "react";

function ExpenseTable({ onEdit, expenses, handleDelete, isDeleted = false }) {
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5 font-normal">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              نوع الصرف
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              التأريخ
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الملبغ
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              ملاحظة
            </th>

            <th className="text-center p-1 text-xl font-extrabold text-white">
              المستخدم
            </th>
            {!isDeleted && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                تعديل
              </th>
            )}
            {!isDeleted && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                حذف
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
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
                    {expense.expense_category}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {expense.expense_time} {expense.expense_date}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {expense.expense_amount} ريال
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {expense.expense_note}
                  </span>
                </td>
                <td className=" text-center p-2">
                  <span className="text-sm  text-slate-800 dark:text-white ">
                    {expense.user_name}
                  </span>
                </td>
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => onEdit(expense)}
                      className=" hover:bg-slate-100 cursor-pointer text-blue-500
                rounded-xl text-center transition-colors p-2"
                    >
                      <Edit size={20} />
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => handleDelete(expense.expense_id)}
                      className="hover:bg-slate-100 cursor-pointer text-red-500
                rounded-xl text-center transition-colors"
                    >
                      <Trash size={20} />
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

export default ExpenseTable;
