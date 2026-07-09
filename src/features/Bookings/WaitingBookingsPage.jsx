import React from "react";
import useTodayBooking from "./useTodayBooking";
import BookingsTable from "./BookingTable";
import Loader2 from "../../components/ui/Loader2";
import useWaitingBooking from "./useWaitingBooking";

function WaitingBookingsPage() {
  const { bookingsData, isLoading } = useWaitingBooking();
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          حجوزات اليوم
        </h1>
      </div>

      {bookingsData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد حجوزات </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <BookingsTable bookingsData={bookingsData} isWaiting={true} />
        </div>
      )}
    </div>
  );
}

export default WaitingBookingsPage;
