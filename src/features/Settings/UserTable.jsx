import {
  Check,
  CheckCircle,
  Edit,
  Trash,
  UserCheck,
  UserX,
} from "lucide-react";
import React from "react";

function UserTable({ onEdit, userData, handelDelete }) {
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5">
      <table className="w-full overflow-hidden rounded">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              الاسم 
            </th>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              اسم المستخدم
            </th>
            
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              الصلاحية
            </th>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              الحالة
            </th>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              تعديل
            </th>
            <th className="text-center p-1 md:text-xl font-extrabold text-white">
              حذف
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            return (
              <tr
                key={index}
                className="border-b bg-white border-slate-200 dark:border-slate-700/500
             transition-colors "
              >
                <td className=" text-center">
                  <span className="font-medium text-orange-500 ">
                    {index + 1}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-slate-800 dark:text-white ">
                    {user.user_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-slate-800 dark:text-white ">
                    {user.user_username}
                  </span>
                </td>
                
                <td className=" text-center">
                  <span className="text-slate-800 dark:text-white ">
                    {user.permission_type}
                  </span>
                </td>
                <td className=" text-center">
                  <button className=" p-3  rounded-xl text-center">
                    {user.user_status == 1 ? (
                      <UserCheck className="text-blue-400" size={20} />
                    ) : (
                      <UserX className="text-orange-500" size={20}  />
                    )}
                  </button>
                </td>
                <td className=" text-center">
                  <button
                    onClick={() => onEdit(user)}
                    className=" hover:bg-slate-100 cursor-pointer text-blue-500
                rounded-xl text-center transition-colors"
                  >
                    <Edit size={20}  />
                  </button>
                </td>
                <td className=" text-center">
                  {user.user_is_admin == 1 
                  ?<button
                    className="hover:bg-slate-100 cursor-pointer text-slate-500
                rounded-xl text-center transition-colors"
                  >
                    <Trash size={20}  />
                  </button>
                  : <button
                    onClick={() => handelDelete(user.user_id)}
                    className="hover:bg-slate-100 cursor-pointer text-red-500
                rounded-xl text-center transition-colors"
                  >
                    <Trash size={20}  />
                  </button>
                  
                }
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
