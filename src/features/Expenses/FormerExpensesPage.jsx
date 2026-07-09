import React from "react";
import ExpenseTable from "./ExpenseTable";
import useFormerExpense from "./useFormerExpense";
import Loader2 from "../../components/ui/Loader2";

function FormerExpensesPage() {
  const { expensesData, getAll, setGetAll, date, setDate, isLoading } =
    useFormerExpense();

  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          المصروفات
        </h1>
      </div>

      <div className="p-4 mt-3 flex items-center space-x-4">
        <input
          type="checkbox"
          checked={getAll == true}
          onChange={() => setGetAll(!getAll)}
        />
        <label htmlFor="" className="text-xl">
          كل التواريخ
        </label>
        {!getAll && (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pr-10 pl-4 h-10 md:text-xl
                    py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
          />
        )}
      </div>

      {expensesData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد مصروفات </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <ExpenseTable expenses={expensesData} isDeleted={true} />
        </div>
      )}
    </div>
  );
}

export default FormerExpensesPage;
