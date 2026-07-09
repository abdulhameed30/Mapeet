import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useAllBooking() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [bookingsData, setBookingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guestId, setGuestId] = useState(0);

  const getBookings = async () => {
    setIsLoading(true);
    try {
      if (guestId == 0) {
        const response = await axiosClient.get(
          `/get-bookings/${hotelData.hotel_id}`,
        );
        setBookingsData(response.data.bookings);
        console.log(response.data.bookings);
      } else {
        const response = await axiosClient.get(
          `/get-bookings-by-guest/${hotelData.hotel_id}/${guestId}`,
        );
        setBookingsData(response.data.bookings);
        console.log(response.data.bookings);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [hotelData.hotel_id, guestId]);

  return {
    bookingsData,
    isLoading,
    guestId,
    setGuestId,
  };
}
