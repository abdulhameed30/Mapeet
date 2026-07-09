import React from 'react'
import OrderTable from './OrderTable'
import useCurrentOrder from './useCurrentOrder'

function CurrentOrdersPage() {
  const {bookingOrders} = useCurrentOrder();
  return (
   <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          طلبات الحجز القائمة
        </h1>
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
          />
        </div>
      )}
    </div>
  )
}

export default CurrentOrdersPage
