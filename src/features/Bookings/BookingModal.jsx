import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import Select from "react-select";
import useGuest from "../Guests/useGuest";
import InputField from "../../components/ui/InputField";
import GuestModal from "../Guests/GuestModal";
import axiosClient from "../../api/axiosClient";
import useCurrentBooking from "./useCurrentBooking";

function BookingModal({
  onClose,
  onModalClick,
  bookingForm,
  onChange,
  handleSubmit,
}) {
  const {
    guestsData,
    showCreateModal,
    setShowCreateModal,
    guestForm,
    onCreate,
    handleCreate,
    handleChange,
  } = useGuest();
  const [balance, setBalance] = useState(0);

  const options = guestsData.map((guest) => ({
    value: guest.guest_id,
    label: `${guest.guest_name} - ${guest.guest_national}`,
    balance: guest.guest_balance,
  }));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-40"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800    relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn mx-28"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>تسكين</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex space-x-3 p-4">
            <div className="border border-slate-600  p-5 rounded relative mt-3  ">
              <h1 className="text-2xl font-extrabold absolute top-[-15px] px-2 bg-white text-amber-600">
                بيانات الحجز
              </h1>
              <div className="grid grid-cols-2 gap-3 py-3">
                <div>
                  <label
                    htmlFor=""
                    className=" text-slate-600 mt-4 md:text-xl "
                  >
                    النزيل:
                  </label>
                  <div className="flex justify-center items-center space-x-3">
                    <Select
                      options={options}
                      value={options.find(
                        (option) =>
                          option.value === bookingForm.booking_guest_id,
                      )}
                      onChange={(selected) => {
                        onChange({
                          target: {
                            name: "booking_guest_id",
                            value: selected.value,
                          },
                        });
                        setBalance(selected.balance);
                      }}
                      placeholder="اختر النزيل..."
                      isSearchable={true}
                      name="booking_guest_id"
                      className=" h-10 w-full  mt-3
                      ring ring-slate-500  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={onCreate}
                      className="text-3xl bg-purple-500 rounded  px-3  mt-3 h-10 text-white hover:bg-purple-600 cursor-pointer transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <InputField
                  lableText="رصيد سابق:"
                  type="text"
                  enable={false}
                  placeholder=""
                  name="guest_balance"
                  onChange={onChange}
                  value={balance}
                />
                <InputField
                  lableText="الغرفة:"
                  type="text"
                  enable={false}
                  placeholder=""
                  name="booking_room_number"
                  onChange={onChange}
                  value={bookingForm.room_number}
                  isDisabled={true}
                />
                <div className="flex  items-end space-x-2">
                  <div className="flex-2">
                    <p htmlFor="" className=" text-slate-600 ">
                      <span>تأريخ الدخول:</span>
                    </p>
                    <InputField
                      type="date"
                      placeholder=""
                      name="booking_check_in_date"
                      onChange={onChange}
                      value={bookingForm.booking_check_in_date}
                    />
                  </div>
                  <input
                    lableText="وقت الدخول:"
                    type="time"
                    placeholder=""
                    name="booking_check_in_time"
                    onChange={onChange}
                    value={bookingForm.booking_check_in_time}
                    className="flex- pl-4 mt-3 h-10 
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <InputField
                  lableText="عدد النزلاء:"
                  type="number"
                  placeholder=""
                  name="booking_guests_number"
                  onChange={onChange}
                  value={bookingForm.booking_guests_number}
                />
                <div className="flex  items-end space-x-2">
                  <div className="flex-2">
                    <p htmlFor="" className=" text-slate-600  ">
                      <span>تأريخ المغادرة:</span>
                    </p>
                    <InputField
                       type="date"
                  placeholder=""
                  name="booking_check_out_date"
                  onChange={onChange}
                  value={bookingForm.booking_check_out_date}
                    />
                  </div>
                  <input
                    lableText="وقت الدخول:"
                    type="time"
                  placeholder=""
                  name="booking_check_out_time"
                  onChange={onChange}
                  value={bookingForm.booking_check_out_time}
                    className="flex- pl-4 mt-3 h-10 
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                

                <InputField
                  lableText="عدد الأيام:"
                  type="number"
                  placeholder=""
                  name="booking_night_number"
                  onChange={onChange}
                  value={bookingForm.booking_night_number}
                />
                <div>
                  <label
                    htmlFor=""
                    className=" text-slate-600 mt-4 md:text-xl "
                  >
                    الحالة:
                  </label>
                  <select
                    name="booking_status"
                    onChange={onChange}
                    value={bookingForm.booking_status}
                    className="pr-10 pl-4 mt-3 h-10 w-full py-2.5 bg-slate-50 border border-slate-400  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="0">تم الحجز</option>
                    <option value="1"> قيد الاقامة</option>
                    <option value="2"> غادر</option>
                    <option value="3"> ملغي</option>
                  </select>
                </div>
                <InputField
                  lableText=" ملاحظة:"
                  type="text"
                  placeholder=""
                  name="booking_note"
                  onChange={onChange}
                  value={bookingForm.booking_note}
                />
              </div>
            </div>

            <div className="border border-slate-600  p-5 rounded relative mt-3 ">
              <h1 className="text-2xl font-extrabold absolute top-[-15px] bg-white text-amber-600">
                بيانات الدفع
              </h1>
              <div className="grid grid-cols-1 py-3 gap-3">
                <div>
                  <label
                    htmlFor=""
                    className=" text-slate-600 mt-4 md:text-xl "
                  >
                    طريقة الدفع:
                  </label>
                  <select
                    name="booking_payment_method"
                    onChange={onChange}
                    value={bookingForm.booking_payment_method}
                    className="pr-10 pl-4 mt-3 h-10 w-full py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:rinf-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="0">نقد</option>
                    <option value="1"> تحويل</option>
                    <option value="2"> اجل</option>
                  </select>
                </div>

                <InputField
                  lableText="الاجمالي:"
                  type="text"
                  enable={false}
                  placeholder=""
                  name="booking_room_id"
                  onChange={onChange}
                  value={bookingForm.booking_total}
                />
                <InputField
                  lableText=" الخصم:"
                  type="text"
                  placeholder=""
                  name="booking_discount"
                  onChange={onChange}
                  value={bookingForm.booking_discount}
                />
                <InputField
                  lableText=" المدفوع:"
                  type="text"
                  placeholder=""
                  name="booking_paid"
                  onChange={onChange}
                  value={bookingForm.booking_paid}
                />
                <InputField
                  lableText=" المتبقي:"
                  type="text"
                  placeholder=""
                  name="booking_remaining"
                  onChange={onChange}
                  value={bookingForm.booking_remaining}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-4 flex justify-end space-x-3">
            <button
              type="submit"
              className="p-2 w-40 font-extrabold text-xl border text-white bg-blue-500 rounded
         hover:bg-blue-600  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
            >
              <span>حفظ</span> <Save />
            </button>
            <button
              className="p-2 w-40 font-extrabold text-xl text-red-500 border border-red-500 rounded
         hover:bg-slate-100  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
            >
              <span>الغاء</span> ✕
            </button>
          </div>
        </form>

        {showCreateModal && (
          <GuestModal
            onClose={() => setShowCreateModal(false)}
            onModalClick={(e) => e.stopPropagation()}
            onChange={handleChange}
            onSubmit={handleCreate}
            guest={guestForm}
          />
        )}
      </div>
    </div>
  );
}

export default BookingModal;
