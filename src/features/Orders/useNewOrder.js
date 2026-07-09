import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useNewOrder() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const status = [
    { id: 0, status: "انتظار التأكيد" },
    { id: 1, status: "انتظار الدفع" },
    { id: 2, status: "تم التأكيد" },
  ];
  const [currentStatus, setCurrentStatus] = useState(0);
  const [bookingOrders, setBookingOrders] = useState([]);

  const [disagreeMessage, setDisagreeMessage] = useState("-");

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

  const [bookingForm, setBookingForm] = useState({});

  const handleOrderAgree = async (orderId, orderPaid, orderStatus, roomId) => {
    try {
      const response = await axiosClient.get(
        `/booking-order-agree/${orderId}/${orderPaid}`,
      );
      toast.success(response.data.message);
      getBookingOrdersData();
      if (orderStatus == 1) {
        setBookingForm({
          order_id: orderId,
          booking_user_id: hotelData.user_id,
          booking_paid: orderPaid,
          booking_room_id: roomId,
        });
        console.log(bookingForm);
        createBooking(orderId, hotelData.user_id, orderPaid, roomId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createBooking = async (orderId, bookingUserId,bookingPaid, bookingRoomId) => {
    const fromData = new FormData();
    fromData.append("order_id", orderId);
    fromData.append("booking_user_id", bookingUserId);
    fromData.append("booking_paid", bookingPaid);
    fromData.append("booking_room_id", bookingRoomId);
    try {
      const response = await axiosClient.post(
        `/create-booking-from-order`,
        fromData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrderDisagree = async (orderId) => {
    try {
      const response = await axiosClient.get(
        `/booking-order-disagree/${orderId}/${disagreeMessage}`,
      );
      toast.success(response.data.message);
      getBookingOrdersData();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    status,
    currentStatus,
    setCurrentStatus,
    bookingOrders,
    handleOrderAgree,
    handleOrderDisagree,
  };
}
