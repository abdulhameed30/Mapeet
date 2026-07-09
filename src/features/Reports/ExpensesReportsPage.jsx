import React from "react";
import InputField from "../../components/ui/InputField";
import axiosClient from "../../api/axiosClient";

function ExpenseReportsPage() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [reportData, setReportData] = React.useState([]);
  const getReporst = async () => {
    console.log(fromDate, toDate);
    setReportData([]);
    const response = await axiosClient.get(
      `/expense-reports/${hotelData.hotel_id}/${fromDate}/${toDate}`
    );
    console.log(response.data);
    setReportData(response.data.expenses);
  };
  return (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          تقارير المصروفات
        </h1>
      </div>
      <div className="p-5 flex items-end space-x-5">
        <InputField
          lableText="من تأريخ"
          type="date"
          name="fromDate"
          onChange={(e) => setFromDate(e.target.value)}
          value={fromDate}
        />
        <InputField
          lableText="إلى تأريخ"
          type="date"
          name="toDate"
          onChange={(e) => setToDate(e.target.value)}
          value={toDate}
        />
        <button
          onClick={getReporst}
          className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all text-xl"
        >
          عرض التقرير
        </button>
        <button className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all text-xl">
          طباعة التقرير
        </button>
      </div>

      {reportData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد بيانات في هذا التأريخ</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-x-scroll p-5">
          <table className="w-full overflow-hidden rounded">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                  م
                </th>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                 نوع المصروف
                </th>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                 التأريخ
                </th>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                   المبلغ
                </th>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                  ملاحظة 
                </th>
                <th className="text-center p-1 md:text-xl font-extrabold text-white">
                 المستخدم
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((expense, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b bg-white border-slate-200 dark:border-slate-700/500 transition-colors "
                  >
                    <td className=" text-center">
                      <span className="font-medium text-orange-500 ">
                        {index + 1}
                      </span>
                    </td>
                    <td className=" text-center">
                      <span className="text-slate-800 dark:text-white ">
                        {expense.expense_category}
                      </span>
                    </td>
                    <td className=" text-center">
                      <span className="text-slate-800 dark:text-white ">
                        {expense.expense_date}
                      </span>
                    </td>
                    <td className=" text-center">
                      <span className="text-slate-800 dark:text-white ">
                        {expense.expense_amount}
                      </span>
                    </td>
                    <td className=" text-center">
                      <span className="text-slate-800 dark:text-white ">
                        {expense.expense_note}
                      </span>
                    </td>
                    <td className=" text-center">
                      <span className="text-slate-800 dark:text-white ">
                        {expense.user_name}
                      </span>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseReportsPage;
