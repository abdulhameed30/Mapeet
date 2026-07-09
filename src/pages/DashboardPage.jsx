import React, { useEffect } from 'react'
import StatsGrid from '../components/dashboard/StatsGrid'
import ChartSection from '../components/dashboard/ChartSection'
import NotificationHandler from '../services/notification-handler';

function DashboardPage() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  return (
    <div className='w-full bg-white shadow-2xl rounded p-5 text-xl space-y-6'>
      <StatsGrid/>
      <ChartSection/>
      <NotificationHandler hotelId={hotelData.hotel_id} />
    </div>
  )
}

export default DashboardPage
