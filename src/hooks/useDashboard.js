import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function useDashboard() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [statsData, setStatsData] = useState({
    revenueTotal: 0,
    expenseTotal: 0,
    netTotal: 0,
  });
  const [bookingChartsData, setBookingChartsData] = useState({
    bookingCount: 0,
    orderCount: 0,
  });
  const fetchData = async () => {
    try {
      var response = await axiosClient.get(
        `/get-stats-grid-data/${hotelData.hotel_id}`,
      );
      setStatsData(response.data);
      setBookingChartsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);   

  return { statsData, fetchData, bookingChartsData };
}
