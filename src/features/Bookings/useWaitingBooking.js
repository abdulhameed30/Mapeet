import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useWaitingBooking() {
    const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [bookingsData, setBookingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBookings = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(`/get-waiting-bookings/${hotelData.hotel_id}`);
            setBookingsData(response.data.bookings);
            console.log(response.data.bookings);
        } catch(error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBookings();
    },[hotelData.hotel_id])

    return {
        bookingsData,
        isLoading
    }

}