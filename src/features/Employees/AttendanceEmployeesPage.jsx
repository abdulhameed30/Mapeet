import React from "react";
import useAttendanceEmployee from "./useAttendanceEmployee";
import Loader from "../../components/ui/Loader";
import Loader2 from "../../components/ui/Loader2";

function AttendanceEmployeesPage() {
  const { attendancesData, allDate, setAllDate, date, setDate, updateStatus, isLoading } =
    useAttendanceEmployee();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif  font-extrabold">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          تحضير الموظفين
        </h1>
      </div>

      {/* الفلترة */}
      <div className="space-x-3 py-3">
        <button
          onClick={async () => {
            setAllDate(false);
          }}
          className={` px-6 py-1 my-2 font-extrabold rounded-4xl transition-all cursor-pointer hover:shadow-2xl ${
            allDate ? "bg-slate-200" : "bg-blue-500 text-white"
          }`}
        >
          اليوم
        </button>
        <button
          onClick={() => {
            setAllDate(true);
          }}
          className={` px-6 py-1 my-2 font-extrabold rounded-4xl transition-all cursor-pointer hover:shadow-2xl ${
            allDate ? "bg-blue-500 text-white" : "bg-slate-200"
          }`}
        >
          سابق
        </button>
        {allDate && (
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="border p-2 rounded-xl"
          />
        )}
      </div>

      {/* جدول الحضور */}

      {attendancesData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد موظفين </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll font-normal">
          <div className="md:w-full w-[800px] flex justify-center">
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
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendancesData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200/50 dark:border-slate-700/500 transition-colors"
                  >
                    <td className="text-center">
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
                        {row.attendance_date}
                      </span>
                    </td>
                    <td className="text-center">
                      {row.attendance_status == 1 ? (
                        <button
                          onClick={() => updateStatus(row.attendance_id, 0)}
                          className="px-6 py-1 my-2 font-extrabold bg-blue-500 text-white rounded-xl 
                        hover:bg-blue-600 transition-all cursor-pointer hover:shadow-2xl"
                        >
                          حاضر
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(row.attendance_id, 1)}
                          className="px-6 py-1 my-2 font-extrabold bg-orange-400 text-white rounded-xl 
                        hover:bg-orange-500 transition-all cursor-pointer hover:shadow-2xl"
                        >
                          غائب
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isLoading && (
        <Loader/>
      )}
    </div>
      )
  );
}

export default AttendanceEmployeesPage;
