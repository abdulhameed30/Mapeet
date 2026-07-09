import { Save } from "lucide-react";
import React from "react";
import InputField from "../../components/ui/InputField";

function ExpenseModal({
  onClose,
  onModalClick,
  onChange,
  onSubmit,
  expense,
  errors,
}) {
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
          <h1>مصروفات</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <form className="p-5" onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <InputField
              lableText=" نوع المصروف:"
              type="text"
              name="expense_category"
              onChange={onChange}
              value={expense.expense_category}
            />
            <div>
              <InputField
                lableText="المبلغ:"
                type="text"
                name="expense_amount"
                onChange={onChange}
                value={expense.expense_amount}
                error={`${errors.expense_amount}`}
              />
              {errors.expense_amount && (
                <span className="text-red-500 text-sm">
                  * {errors.expense_amount}
                </span>
              )}
            </div>
            <InputField
              lableText=" التأريخ:"
              type="date"
              name="expense_date"
              onChange={onChange}
              value={expense.expense_date}
            />
            <InputField
              lableText=" الوقت:"
              type="time"
              name="expense_time"
              onChange={onChange}
              value={expense.expense_time}
            />
            <InputField
              lableText=" ملاحظة:"
              type="text"
              name="expense_note"
              onChange={onChange}
              value={expense.expense_note}
            />
          </div>

          <div className="py-5 flex space-x-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all w-40 text-xl"
            >
              <span>حفظ</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-all w-40 text-xl"
            >
              <span>الغاء</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;
