import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useTodayBooking() {
    const hotelData = JSON.parse(sessionStorage.getItem("data"));
    const [ bookingsData, setBookingsData ] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    const getBookings = async () => {
        setIsLoading(true)
        try{
             const response = await axiosClient.get(`/get-current-bookings/${hotelData.hotel_id}`);
        setBookingsData(response.data.bookings);
        console.log(response.data.bookings);
        console.log(hotelData)
        } catch(error) {
            console.error(error)
        } finally {
            setIsLoading(false)
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