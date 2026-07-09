import React from 'react'
import InputField from '../../components/ui/InputField';
import { Save } from 'lucide-react';

function LoanAndDeductionForm({ onChange, onSubmit, employees , loanDeduction=null, onCancel}) {
  return (
    <form className="p-5" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <label htmlFor="" className=" text-cyan-700 mt-4 text-2xl">
             الموظف:
          </label>
          <select
          name="loan_deduction_employee_id"
          onChange={onChange}
          value={loanDeduction.loan_deduction_employee_id}
            className="pr-10 pl-4 mt-3 h-10 w-full 
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="0">اختر موظف</option>
            {employees.map((row) => {
              return (
                <option
                  key={row.employee_id}
                  value={row.employee_id}
                >
                  {row.employee_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="" className=" text-cyan-700 text-2xl block">
            النوع:
          </label>
          <div
            className="pr-10 pl-4 mt-3 h-10 border border-slate-500 w-full py-2.5 bg-slate-50  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    flex justify-around"
          >
            <div className="space-x-2">
              <input type="radio" name="loan_deduction_type" checked={loanDeduction.loan_deduction_type == 0} value="0" onChange={onChange}/>
              <span>سلفة</span>
            </div>
            <div className="space-x-2">
              <input type="radio" checked={loanDeduction.loan_deduction_type == 1} name="loan_deduction_type" value="1" onChange={onChange}/>
              <span>خصم </span>
            </div>
          </div>
        </div>
       
        <InputField
          lableText="التأريخ:"
          type="datetime-local"
          name="loan_deduction_date"
          onChange={onChange}
          value={loanDeduction.loan_deduction_date}
        />
        <InputField
          lableText="المبلغ:"
          type="text"
          name="loan_deduction_amount"
          onChange={onChange}
          value={loanDeduction.loan_deduction_amount}
        />
        <InputField
          lableText="ملاحظة:"
          type="text"
          name="loan_deduction_note"
          onChange={onChange}
          value={loanDeduction.loan_deduction_note}
          isRequired ={false}
        />
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

export default LoanAndDeductionForm
