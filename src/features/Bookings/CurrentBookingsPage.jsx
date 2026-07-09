import React from "react";
import useCurrentBooking from "./useCurrentBooking";
import { LogOut, Settings } from "lucide-react";
import BookingModal from "./BookingModal";
import Loader2 from "../../components/ui/Loader2";

function CurrentBookingsPage() {
  const {
    bookingForm,
    setBookingForm,
    onCreate,
    showCreateModal,
    setShowCreateModal,
    handleChange,
    handleCreate,
    handleUpdate,
    bookingsData,
    guestLeaving,
    roomWasCleaned,
    onUpdate,
    setShowUpdateModal,
    showUpdateModal,
    isLoading,
    roomStatus,
    currentStatus,
    setCurrentStatus,
    isButtonLoading
  } = useCurrentBooking();
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          التسكين
        </h1>
      </div>
      <div className="p-5 flex space-x-5">
        {roomStatus.map((status, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentStatus(status.id)}
              className={` px-4 py-2 rounded-full font-extrabold transition-all cursor-pointer
                 ${
                   status.id == currentStatus
                     ? "bg-purple-500 text-white"
                     : "bg-white text-black border hover:bg-slate-100"
                 }`}
            >
              {status.status}
            </button>
          );
        })}
      </div>

      <div className="w-full p-5 grid grid-cols-6 gap-4">
        {bookingsData.map((room, index) => {
          if (currentStatus == 0) {
            return room.room_status == 1 ? (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-blue-500"
              >
                <div className="flex justify-between">
                  <p></p>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-10">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-3 text-sm">
                  <p>{room.room_price} ريال/يوم</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => onCreate(room)}
                    className="bg-blue-500 rounded-xl w-30 py-1 text-white text-xl cursor-pointer transition hover:bg-blue-600"
                  >
                    حجز
                  </button>
                </div>
              </div>
            ) : room.room_status == 2 ? (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-green-500"
              >
                <div className="flex justify-between">
                  <button onClick={() => guestLeaving(room.booking_id)}>
                    <LogOut />
                  </button>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-4">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-4 text-sm">
                  <p>{room.guest_name}</p>
                </div>
                <div className="flex justify-center  text-sm text-red-700">
                  <p>
                    متبقي: {room.booking_remaining + room.guest_balance} ريال
                  </p>
                </div>

                <div></div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => onUpdate(room)}
                    className="bg-green-500 rounded-xl w-30 py-1 text-white text-xl cursor-pointer transition hover:bg-green-600"
                  >
                    ادارة الحجز
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-orange-700"
              >
                <div className="flex justify-between">
                  <p></p>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-10">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-3 text-sm">
                  <p>{room.room_price} ريال/يوم</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => roomWasCleaned(room.room_id)}
                    className="bg-orange-700 rounded-xl w-30 h-9 justify-center flex items-center py-1 text-white text-xl cursor-pointer transition hover:bg-orange-800"
                  >
                    {isButtonLoading ? (
                     <div className=" absolute w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) :" تم التجهيز"}
                   
                  </button>
                </div>
              </div>
            );
          } else if (currentStatus == 1) {
            return room.room_status == 1 ? (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-blue-500"
              >
                <div className="flex justify-between">
                  <p></p>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-10">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-3 text-sm">
                  <p>{room.room_price} ريال/يوم</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => onCreate(room)}
                    className="bg-blue-500 rounded-xl w-30 py-1 text-white text-xl cursor-pointer transition hover:bg-blue-600"
                  >
                    حجز
                  </button>
                </div>
              </div>
            ) : null;
          } else if (currentStatus == 2) {
            return room.room_status == 2 ? (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-green-500"
              >
                <div className="flex justify-between">
                  <button onClick={() => guestLeaving(room.booking_id)}>
                    <LogOut />
                  </button>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-4">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-4 text-sm">
                  <p>{room.guest_name}</p>
                </div>
                <div className="flex justify-center  text-sm text-red-700">
                  <p>
                    متبقي: {room.booking_remaining + room.guest_balance} ريال
                  </p>
                </div>

                <div></div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => onUpdate(room)}
                    className="bg-green-500 rounded-xl w-30 py-1 text-white text-xl cursor-pointer transition hover:bg-green-600"
                  >
                    ادارة الحجز
                  </button>
                </div>
              </div>
            ) : null;
          } else {
            return room.room_status == 3 && (
              <div
                key={index}
                className="border-3 h-50 p-3  rounded-2xl  border-orange-700"
              >
                <div className="flex justify-between">
                  <p></p>
                  <p className="text-center text-red-800"> {index + 1}</p>
                  <p>
                    <Settings />
                  </p>
                </div>

                <div className="text-xl font-extrabold flex space-x-2 justify-center mt-10">
                  <p className="text-blue-600">{room.room_number}</p>

                  <p>{room.type_name}</p>
                </div>
                <div className="flex justify-center mt-3 text-sm">
                  <p>{room.room_price} ريال/يوم</p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => roomWasCleaned(room.room_id)}
                    className="bg-orange-700 rounded-xl w-30 py-1 text-white text-xl cursor-pointer transition hover:bg-orange-800"
                  >
                    تم التجهيز
                  </button>
                </div>
              </div>
            )
          }
        })}
      </div>

      {showCreateModal && (
        <BookingModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          bookingForm={bookingForm}
          onChange={handleChange}
          handleSubmit={handleCreate}
        />
      )}
      {showUpdateModal && (
        <BookingModal
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          bookingForm={bookingForm}
          onChange={handleChange}
          handleSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default CurrentBookingsPage;
