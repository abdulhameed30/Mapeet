import React from "react";
import useDailyClosing from "./useDailyClosing";
import Loader2 from "../../components/ui/Loader2";
import ClosingModal from "./ClosingModal";

function DailyClosingPage() {
  const {
    closingData,
    isLoading,
    onCreate,
    closingForm,
    showCreateModal,
    setShowCreateModal,
    handleChange,
    handleSubmit,
  } = useDailyClosing();
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          الاقفالات اليومية
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
        >
          <span>اقفال </span>
        </button>
      </div>

      {closingData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد بيانات </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <div className="md:w-full w-[800px] flex justify-center pt-5 font-normal">
            <table className="w-full overflow-hidden rounded ">
              <thead className="bg-blue-500">
                <tr>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    م
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    التأريخ
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    اجمالي الدخل
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    اجمالي المصروفات
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    الصافي
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    تأريخ الاقفال
                  </th>
                  <th className="text-center p-1 text-xl font-extrabold text-white">
                    المستخدم
                  </th>
                </tr>
              </thead>
              <tbody>
          {closingData.map((closing, index) => {
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
                    {closing.closing_from_date}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {closing.closing_total_bookings}  ريال
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {closing.closing_total_expences} ريال
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {closing.closing_net} ريال
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {closing.closing_created_at}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {closing.user_name}
                  </span>
                </td>
                </tr>
            )})}
                </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <ClosingModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          closingForm={closingForm}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default DailyClosingPage;
