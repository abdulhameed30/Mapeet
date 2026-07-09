import React from "react";
import useAllBooking from "./useAllBooking";
import BookingsTable from "./BookingTable";
import Loader2 from "../../components/ui/Loader2";
import useGuest from "../Guests/useGuest";
import Select from "react-select";

function AllBookingsPage() {
  const {
    guestsData,
    showCreateModal,
    setShowCreateModal,
    guestForm,
    onCreate,
    handleCreate,
    handleChange,
  } = useGuest();

  const options = guestsData.map((guest) => ({
    value: guest.guest_id,
    label: guest.guest_name,
    balance: guest.guest_balance,
  }));

  const { bookingsData, isLoading, guestId, setGuestId } = useAllBooking();
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          كل الحجوزات
        </h1>
      </div>

      <div>
        <div className="flex  space-x-3">
          <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl ">
            النزيل:
          </label>
          <Select
            options={options}
            value={options.find((option) => option.value === guestId)}
            onChange={(selected) => {
              setGuestId(selected.value);
            }}
            placeholder="اختر النزيل..."
            isSearchable={true}
            name="booking_guest_id"
            className=" h-10 w-64  mt-3
                      ring ring-slate-500  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {bookingsData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد حجوزات </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <BookingsTable bookingsData={bookingsData} />
        </div>
      )}
    </div>
  );
}

export default AllBookingsPage;
