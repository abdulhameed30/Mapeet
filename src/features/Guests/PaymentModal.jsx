import React from "react";
import InputField from "../../components/ui/InputField";
import { Save } from "lucide-react";
import useGuest from "./useGuest";
import Select from "react-select";

function PaymentModal({
  onClose,
  onModalClick,
  onChange,
  onSubmit,
  payment = null,
}) {
  const { guestsData } = useGuest();

  const options = guestsData.map((guest) => ({
    value: guest.guest_id,
    label: guest.guest_name,
  }));
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800  w-3xl  relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>سند قبض</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <form className="p-5" onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl ">
                النزيل:
              </label>
              <Select
                options={options}
                value={options.find(
                  (option) => option.value === payment.payment_guest_id,
                )}
                onChange={(selected) =>
                  onChange({
                    target: {
                      name: "payment_guest_id",
                      value: selected.value,
                    },
                  })
                }
                placeholder="اختر النزيل..."
                isSearchable={true}
                name="booking_guest_id"
                className=" h-10 w-full  mt-3
                      ring ring-slate-500  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <InputField
              lableText="التأريخ:"
              type="datetime-local"
              name="payment_date"
              onChange={onChange}
              value={payment.payment_date}
              
            />
            <div>
              <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
                طريقة الدفع:
              </label>
              <div
                className="pr-10 pl-4 mt-3 h-10 border w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    border-slate-500 rounded text-slate-800 dark:text-white
                    flex justify-around"
              >
                <div className="space-x-2">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={payment.payment_method == 0}
                    value="0"
                    onChange={onChange}
                  />
                  <span>نقد</span>
                </div>
                <div className="space-x-2">
                  <input
                    type="radio"
                    checked={payment.payment_method == 1}
                    name="payment_method"
                    value="1"
                    onChange={onChange}
                  />
                  <span> تحويل</span>
                </div>
              </div>
            </div>
            <InputField
              lableText="المبلغ:"
              type="text"
              name="payment_amount"
              onChange={onChange}
              value={payment.payment_amount}
            />
            <InputField
              lableText="ملاحظة:"
              type="text"
              name="payment_note"
              onChange={onChange}
              value={payment.payment_note}
              isRequired={false}
            />
          </div>

          <div className="py-5 flex justify-end space-x-3">
            <button
              type="submit"
              className="p-2 w-30 font-extrabold text-xl border text-white bg-blue-500 rounded
         hover:bg-blue-600  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
            >
              <span>حفظ</span> <Save />
            </button>
            <button
              className="p-2 w-30 font-extrabold text-xl text-red-500 border border-red-500 rounded
         hover:bg-slate-100  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
            >
              <span>الغاء</span> ✕
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
