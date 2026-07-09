import React from "react";
import useSettlementEmployee from "./useSettlementEmployee";
import SettlementEmployeeModal from "./SettlementEmployeeModal";
import Loader2 from "../../components/ui/Loader2";

function SettlementEmployeesPage() {
  const {
    settlementData,
    showCreateModal,
    setShowCreateModal,
    getSettlementData,
    isLoading
  } = useSettlementEmployee();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
   <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          تسوية حسابات الموظفين
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          تسوية
        </button>
      </div>

      <div className="w-full md:overflow-hidden overflow-scroll mt-5 font-normal">
        <div className="md:w-full w-[800px] flex justify-center">
          <table className="w-full overflow-hidden rounded">
            <thead className="bg-blue-500">
              <tr>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  م
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  اسم الموظف
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  تأريخ التسوية
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  من تأريخ
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  الى تأريخ
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  عدد الغياب
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  اجمالي السلف
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  اجمالي الخصم
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  صافي الراتب
                </th>
                <th className="text-center p-2 text-xl font-extrabold text-white">
                  ملاحظة
                </th>
              </tr>
            </thead>
            <tbody>
              {settlementData.map((row, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-slate-200/50 dark:border-slate-700/500 transition-colors"
                  >
                    <td className="text-center">
                      <span className="font-medium text-orange-300">
                        {index + 1}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.employee_name}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_date}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_from_date}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_to_date}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_absence_days}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_loans}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_deductions}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_net_salary}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className="text-xm text-slate-800 dark:text-white">
                        {row.settlement_note}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <SettlementEmployeeModal
          onClose={() => {
            setShowCreateModal(false);
            getSettlementData();
          }}
          onModalClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
      )
  );
}

export default SettlementEmployeesPage;
