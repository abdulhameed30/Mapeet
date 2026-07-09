import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useArchiveOrders() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const status = [
    { id: 4, status: "منتهي" },
    { id: 5, status: "ملغي" },
    { id: 6, status: "مرفوض" },
  ];
  const [currentStatus, setCurrentStatus] = useState(4);
  const [bookingOrders, setBookingOrders] = useState([]);

  const getBookingOrdersData = async () => {
    try {
      const response = await axiosClient.get(
        `/get-booking-orders/${hotelData.hotel_id}/${currentStatus}`,
      );
      console.log(`/get-booking-orders/${hotelData.hotel_id}/${currentStatus}`);
      setBookingOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getBookingOrdersData();
  }, [currentStatus, hotelData.hotel_id]);


   


  return {
    status,
    currentStatus,
    setCurrentStatus,
    bookingOrders,
  };
}
