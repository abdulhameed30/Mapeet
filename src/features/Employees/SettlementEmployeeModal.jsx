import React from 'react'
import useSettlementModal from './useSettlementModal'
import InputField from '../../components/ui/InputField';
import { Printer } from 'lucide-react';

function SettlementEmployeeModal({onClose,
  onModalClick}) {
    const {
        printReport,
    fetchData,
    data,
    setData,
    employee,
    setEmployee,
    toDate,
    setToDate,
    fromDate,
    setFromDate,
    today,
    filterData,
    setFilterData,
    saveSettlement,
    settlementNote,
    setSettlementNote,
    employeesData
    } = useSettlementModal();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800    relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>تسوية حساب موظف</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <div>
          <div  className="md:flex">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                    الموظف:
                  </label>
                  <select   
                    name=""
                    onChange={(e) => setEmployee(e.target.value)}
                    value={employee}
                    className="pr-10 pl-4 mt-3 h-10 w-full 
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="0">
                          اختر موظف
                        </option>
                    {employeesData.map((row) => {
                      return (
                        <option key={row.employee_id} value={row.employee_id}>
                          {row.employee_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <InputField
                  lableText=" من تأريخ:"
                  type="date"
                  name="from_date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <InputField
                  lableText=" الى تأريخ:"
                  type="date"
                  name="to_date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                
                <div>
                  <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                    اجمالي الغياب:
                  </label>
                  <p
                    className="pr-10 pl-4 mt-3 h-12 w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded-4xl text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    {data.absent_days} يوم
                  </p>
                </div>
                <div>
                  <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                    اجمالي السلف
                  </label>
                  <p
                    className="pr-10 pl-4 mt-3 h-12 w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded-4xl text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    {data.loans_amount} ريال
                  </p>
                </div>
                <div>
                  <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                    اجمالي الخصومات:
                  </label>
                  <p
                    className="pr-10 pl-4 mt-3 h-12 w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded-4xl text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    {data.deductions_amount} ريال
                  </p>
                </div>
                <div>
                  <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                    صافي الراتب:
                  </label>
                  <p
                    className="pr-10 pl-4 mt-3 h-12 w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded-4xl text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    {data.salary_total} ريال
                  </p>
                </div>
              </div>
              <div className="px-4">

              <InputField
                  lableText="ملاحظة"
                  type="text"
                  name="settlement_note"
                  value={settlementNote}
                  onChange={(e) => setSettlementNote(e.target.value)}
                />
              </div>
            </div>
            <div id="printArea" className="p-4 ">
              <div className="h-full overflow-y-scroll">
                <table className="w-full overflow-hidden rounded ">
                  <thead className="bg-blue-500">
                    <tr>
                      <th className="text-center px-2 py-1 text-sm font-extrabold text-white">
                        م
                      </th>
                      <th className="text-center px-2 py-1 text-sm font-extrabold text-white">
                        التأريخ
                      </th>
                      <th className="text-center px-2 py-1 text-sm font-extrabold text-white">
                        الحالة
                      </th>
                      <th className="text-center px-2 py-1 text-sm font-extrabold text-white">
                        سلفة
                      </th>
                      <th className="text-center px-2 py-1 text-sm font-extrabold text-white">
                        خصم
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map((row, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-slate-200/50 dark:border-slate-700/500
                        transition-colors"
                        >
                          <td className=" text-center px-5">
                            <span className="text-sm font-medium text-orange-500 ">
                              {index + 1}
                            </span>
                          </td>
                          <td className=" text-center px-5">
                            <span className="text-sm text-slate-800 dark:text-white ">
                              {row.date}
                            </span>
                          </td>
                          <td className=" text-center px-5">
                            <span className="text-sm text-slate-800 dark:text-white ">
                              {row.attendance_status == 0 ? "غائب" : "حاضر"}
                            </span>
                          </td>
                          <td className=" text-center px-5">
                            <span className="text-sm text-slate-800 dark:text-white ">
                              {row.loan_amount}
                            </span>
                          </td>
                          <td className=" text-center px-5">
                            <span className="text-sm text-slate-800 dark:text-white ">
                              {row.deduction_amount}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-5 flex w-full justify-end space-x-3">
            <button
              onClick={() => {
                if(saveSettlement())
                    onClose()
            }}
              className="p-2 w-30 font-extrabold text-xl border text-white bg-green-500 rounded
    hover:bg-green-600 transition-all cursor-pointer hover:shadow-2xl"
            >
              حفظ التصفية
            </button>

            <button
              onClick={printReport}
              className="p-2 w-30 font-extrabold text-xl border text-white bg-orange-500 rounded
    hover:bg-orange-600 transition-all cursor-pointer hover:shadow-2xl flex justify-around"
            >
              <span>طباعة</span> <Printer />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettlementEmployeeModal
