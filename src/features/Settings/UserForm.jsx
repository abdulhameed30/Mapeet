import React from "react";
import InputField from "../../components/ui/InputField";
import { Save } from "lucide-react";

function UserForm({
  onChange,
  onSubmit,
  permissions,
  user = null,
  onCancel,
  isRequired,
}) {
  return (
    <form className="p-5" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <InputField
          lableText="الاسم:"
          type="text"
          name="user_name"
          onChange={onChange}
          value={user.user_name}
        />
        <InputField
          lableText="اسم المستخدم:"
          type="text"
          name="user_username"
          onChange={onChange}
          value={user.user_username}
        />
        <InputField
          isRequired={isRequired}
          lableText="كلمة السر:"
          type="text"
          name="user_password"
          onChange={onChange}
          value={user.user_password}
        />
        <div>
          <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
           الصلاحية:
          </label>
          <select
            name="user_permission_id"
            onChange={onChange}
            value={user.user_permission_id}
            className="pr-10 pl-4 mt-3 h-10 w-full md:text-xl
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">أختر صلاحية المستخدم</option>
            {permissions.map((permission) => {
              return (
                <option
                  key={permission.permission_id}
                  value={permission.permission_id}
                >
                  {permission.permission_type}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
            الحالة:
          </label>
          <div
            className="pr-10 pl-4 mt-3 h-10 border w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    border-slate-500 rounded text-slate-800 dark:text-white
                    flex justify-around"
          >
            <div className="space-x-2">
              <input
                type="radio"
                name="user_status"
                checked={user.user_status == 1}
                value="1"
                onChange={onChange}
              />
              <span>مفعل</span>
            </div>
            <div className="space-x-2">
              <input
                type="radio"
                checked={user.user_status == 0}
                name="user_status"
                value="0"
                onChange={onChange}
              />
              <span>غير مفعل</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 flex space-x-3">
              <button
                type="submit"
                className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all text-xl"
              >
                <span>حفظ</span>
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-40 bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-all text-xl"
              >
                <span>الغاء</span>
              </button>
            </div>
    </form>
  );
}

export default UserForm;
