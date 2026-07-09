import { Edit, Trash } from 'lucide-react'
import React from 'react'

function LoanAndDeductionTable({loanDeductionsData, onEdit, handleDelete, isFormer}) {
  return (
    <div className="md:w-full w-[800px] flex justify-center font-normal">
          <table className="w-full overflow-hidden rounded">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  م
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  اسم الموظف
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  التأريخ
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  المبلغ
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  النوع
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  المستخدم
                </th>
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  ملاحظة
                </th>
                {isFormer && (

                <th className="text-center p-1 text-xl font-extrabold text-white">
                  تعديل
                </th>
                )}
                {isFormer && (
                <th className="text-center p-1 text-xl font-extrabold text-white">
                  حذف
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loanDeductionsData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-200/50 dark:border-slate-700/500 transition-colors"
                >
                  <td className="text-center p-2">
                    <span className="font-medium text-orange-300">
                      {index + 1}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xm text-slate-800 dark:text-white">
                      {row.employee_name}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xm text-slate-800 dark:text-white">
                      {row.loan_deduction_date}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xm text-slate-800 dark:text-white">
                      {row.loan_deduction_amount}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xm text-slate-800 dark:text-white">
                      {row.loan_deduction_type == 0 ? "سلفة" : "خصم"}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-xm text-slate-800 dark:text-white">
                       {row.user_name }
                    </span>
                  </td>
                  <td className="text-center ">
                    <span className="text-xm text-slate-800 dark:text-white">
                      {row.loan_deduction_note}
                    </span>
                  </td>
                  {isFormer && (
                  <td className=" text-center">
                    <button onClick={()=> onEdit(row)}
                      className=" hover:bg-slate-100 cursor-pointer  text-blue-500
                        rounded-xl text-center transition-colors"
                    >
                      <Edit size={20}/>
                    </button>
                  </td>
                  )}
                  {isFormer && (
                  <td className=" text-center">
                    <button onClick={()=> handleDelete(row.loan_deduction_id)}
                      className="hover:bg-slate-100 cursor-pointer  text-red-500
                        rounded-xl text-center transition-colors"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default LoanAndDeductionTable
