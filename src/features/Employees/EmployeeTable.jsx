import { Edit, FileText, Trash } from "lucide-react";
import React from "react";

function EmployeeTable({
  onEdit,
  employees,
  handelDelete,
  isDeleted = false,
  
}) {
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5 font-normal">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              اسم الموظف
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              رقم الهوية
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الوظيفة
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الراتب
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              السكن
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الهاتف
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              ت/الاضافة
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
          {employees.map((employee, index) => {
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
                    {employee.employee_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.employee_national}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.job_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.employee_salary}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.employee_location}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.employee_phone}
                  </span>
                </td>
                <td className=" text-center py-1">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {employee.employee_date}
                  </span>
                </td>
                
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => onEdit(employee)}
                      className=" hover:bg-slate-100 cursor-pointer py-2 text-blue-500
                rounded-xl text-center transition-colors"
                    >
                      <Edit size={20}/>
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => handelDelete(employee.employee_id)}
                      className="hover:bg-slate-100 cursor-pointer py-2 text-red-500
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

export default EmployeeTable;
