import React from "react";
import InputField from "../../components/ui/InputField";
function ClosingModal({
  onClose,
  onModalClick,
  onChange,
  onSubmit,
  closingForm = null,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40  z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800 w-96   relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>اقفال يومي</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4">
          <InputField
            lableText=" التأريخ:"
            type="date"
            name="closing_from_date"
            onChange={onChange}
            value={closingForm.closing_from_date}
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              lableText="  مسحوبات الموظفين:"
              type="text"
              name="employees"
              onChange={onChange}
              value={closingForm.employees}
              isDisabled={true}
            />
            <InputField
              lableText="  حجوزات:"
              type="text"
              name="bookings"
              onChange={onChange}
              value={closingForm.bookings}
              isDisabled={true}
            />
            
            <InputField
              lableText=" المصروفات اليومية:"
              type="text"
              name="expenses"
              onChange={onChange}
              value={closingForm.expenses}
              isDisabled={true}
            />
            <InputField
              lableText="  مدفوعات النزلاء:"
              type="text"
              name="guests"
              onChange={onChange}
              value={closingForm.guests}
              isDisabled={true}
            />
            <InputField
              lableText="   اجمالي الصرف:"
              type="text"
              name="closing_total_expences"
              onChange={onChange}
              value={closingForm.closing_total_expences}
              isDisabled={true}
            />
            <InputField
              lableText=" اجمالي الدخل:"
              type="text"
              name="closing_total_bookings"
              onChange={onChange}
              value={closingForm.closing_total_bookings}
              isDisabled={true}
            />
          </div>

          <InputField
            lableText=" الصافي:"
            type="text"
            name="closing_net"
            onChange={onChange}
            value={closingForm.closing_net}
            isDisabled={true}
          />
          <button
            type="submit"
            className="w-full p-2 mt-5 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
          >
            <span>اقفال </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClosingModal;
