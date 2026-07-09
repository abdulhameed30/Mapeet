import { Save } from "lucide-react";
import React from "react";
import InputField from "../../components/ui/InputField"

function EmployeeForm({ onChange, onSubmit, jobs, employee = null, onCancel }) {
  return (
    <form className="p-5" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <InputField
          lableText="اسم الموظف:"
          type="text"
          name="employee_name"
          onChange={onChange}
          value={employee.employee_name}
        />
        <InputField
          lableText="رقم الهوية:"
          type="text"
          name="employee_national"
          onChange={onChange}
          value={employee.employee_national}
        />
        <div>
          <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
            الوظيفة:
          </label>
          <select
            name="employee_job_id"
            onChange={onChange}
            value={employee.employee_job_id}
            className="pr-10 pl-4 mt-3 h-10 w-full md:text-x
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="0">اختر الوظيفة</option>
            {jobs.map((job) => {
              return (
                <option key={job.job_id} value={job.job_id}>
                  {job.job_name}
                </option>
              );
            })}
          </select>
        </div>
        <InputField
          lableText="الراتب:"
          type="text"
          name="employee_salary"
          onChange={onChange}
          value={employee.employee_salary}
        />
        <InputField
          lableText="السكن:"
          type="text"
          name="employee_location"
          onChange={onChange}
          value={employee.employee_location}
        />
        <InputField
          lableText="الهاتف:"
          type="text"
          name="employee_phone"
          onChange={onChange}
          value={employee.employee_phone}
        />
      </div>

      <div className="py-5 flex space-x-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all w-40 text-xl"
              >
              حفظ
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-40 bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-all text-xl"
              >
                الغاء
              </button>
            </div>
    </form>
  );
}

export default EmployeeForm;
