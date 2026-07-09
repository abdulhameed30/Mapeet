import React from "react";
import InputField from "../../components/ui/InputField";
import { Save } from "lucide-react";

function GuestModal({
  onClose,
  onModalClick,
  onChange,
  onSubmit,
  guest = null,
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
          <h1>نزيل</h1>
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
              lableText="اسم النزيل:"
              type="text"
              placeholder="اسم النزيل"
              name="guest_name"
              onChange={onChange}
              value={guest.guest_name}
            />
            <InputField
              lableText="رقم الهوية:"
              type="text"
              placeholder="رقم الهوية"
              name="guest_national"
              onChange={onChange}
              value={guest.guest_national}
            />
            <InputField
              lableText="رقم الهاتف:"
              type="text"
              placeholder="رقم الهاتف"
              name="guest_phone"
              onChange={onChange}
              value={guest.guest_phone}
            />
            <InputField
              lableText=" العنوان:"
              type="text"
              placeholder="العنوان "
              name="guest_address"
              onChange={onChange}
              value={guest.guest_address}
            />
            <InputField
              lableText=" الرصيد:"
              type="text"
              placeholder="الرصيد "
              name="guest_balance"
              onChange={onChange}
              value={guest.guest_balance}
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

export default GuestModal;
