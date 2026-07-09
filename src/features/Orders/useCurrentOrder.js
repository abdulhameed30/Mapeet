import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useCurrentOrder() {
    const hotelData = JSON.parse(sessionStorage.getItem("data"));
    const [bookingOrders, setBookingOrders] = useState([]);

     const getBookingOrdersData = async () => {
    try {
      const response = await axiosClient.get(
        `/get-booking-orders/${hotelData.hotel_id}/3`,
      );
      setBookingOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingOrdersData();
  },[])

  return {
    bookingOrders
  }
}