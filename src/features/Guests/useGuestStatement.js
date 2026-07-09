import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useGuestStatement(guestId) {
    const [ bookingsData, setBookingsData ] = useState([]);
    const [ paymentsData, setPaymentsData ] = useState([]);

    const getData = async () => {
        try {
            const response = await axiosClient.get(`/get-guest-statement/${guestId}`);
            console.log(response.data)
            setBookingsData(response.data.bookings)
            setPaymentsData(response.data.payments)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [guestId])

    return {
        bookingsData,
        paymentsData
    }
}