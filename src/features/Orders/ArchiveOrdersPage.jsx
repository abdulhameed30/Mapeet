import React from 'react'
import useArchiveOrders from './useArchiveOrder'
import OrderTable from './OrderTable';

function ArchiveOrdersPage() {
    const {
        status,
    currentStatus,
    setCurrentStatus,
    bookingOrders,
    } = useArchiveOrders();
  return (
   <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          ارشيف طلبات الحجز 
        </h1>
      </div>

      <div className="p-5 flex space-x-5">
        {status.map((status, index) => {
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

      {bookingOrders.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد طلبات </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-x-scroll">
          <OrderTable
            orders={bookingOrders}
            isDeleted={true}
            paidWaiting={
              currentStatus === 1 || currentStatus === 2 ? true : false
            }
          />
        </div>
      )}
    </div>
  )
}

export default ArchiveOrdersPage
