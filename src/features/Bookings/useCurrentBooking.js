import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useCurrentBooking() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const getToday = () => new Date().toISOString().split("T")[0];
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };
  const getCurrentTime = () => new Date().toTimeString().split(" ")[0];
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    booking_id: "",
    booking_guest_id: "",
    booking_user_id: hotelData.use_id,
    booking_check_in_date: getToday(),
    booking_check_out_date: getTomorrow(),
    booking_check_in_time: "12:00",
    booking_check_out_time: "12:00",
    booking_guests_number: 1,
    booking_night_number: 1,
    booking_room_id: "",
    booking_payment_method: "0",
    booking_total: 0,
    booking_discount: 0,
    booking_paid: 0,
    booking_remaining: 0,
    booking_status: "0",
    booking_note: "",
    booking_hotel_id: hotelData.hotel_id,
    room_price: 0,
  });
  const roomStatus = [
    { id: 0, status: "الكل" },
    { id: 1, status: "شاغرة" },
    { id: 2, status: "قيد الاقامة" },
    { id: 3, status: "قيد التنظيف" },
  ];
  const [currentStatus, setCurrentStatus] = useState(0);

  const [bookingsData, setBookingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const getBookingsData = async () => {
    
    try {
      const response = await axiosClient.get(
        `/get-rooms-with-current-bookings/${hotelData.hotel_id}`,
      );
      setBookingsData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    setIsLoading(true);
    getBookingsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...bookingForm, [name]: value };

    // حساب عدد الليالي
    if (updated.booking_check_in_date && updated.booking_check_out_date) {
      const inDate = new Date(updated.booking_check_in_date);
      const outDate = new Date(updated.booking_check_out_date);

      const diff =
        (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24);

      updated.booking_night_number = diff > 0 ? diff : 0;
    }
    updated.booking_total =
      bookingForm.room_price * Number(updated.booking_night_number);

    // حساب المتبقي
    updated.booking_remaining =
      updated.booking_total -
      Number(updated.booking_paid || 0) -
      Number(updated.booking_discount || 0);

    setBookingForm(updated);
  };

  const onCreate = (room) => {
    setBookingForm({
      booking_id: "",
      booking_guest_id: "",
      booking_user_id: hotelData.user_id,
      booking_check_in_date: getToday(),
      booking_check_out_date: getTomorrow(),
      booking_check_in_time: "12:00",
      booking_check_out_time: "12:00",
      booking_guests_number: 1,
      booking_night_number: 1,
      booking_room_id: room.room_id,
      room_number: room.room_number,
      room_price: room.room_price,
      booking_payment_method: "0",
      booking_total: room.room_price,
      booking_discount: 0,
      booking_paid: 0,
      booking_remaining: 0,
      booking_status: "1",
      booking_note: "-",
      booking_hotel_id: hotelData.hotel_id,
      guest_balance: 0,
    });

    setShowCreateModal(true);
  };

  const onUpdate = async (room) => {
    const response = await axiosClient.get(
      `/get-booking-by-booking-id/${room.booking_id}`,
    );
    console.log(response.data.booking_id);
    setBookingForm({
      ...response.data.booking,
      booking_user_id: hotelData.user_id,
      room_number: room.room_number,
      room_price: room.room_price,
      guest_balance: response.data.balance
    });

    setShowUpdateModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitBooking("/create-booking")
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitBooking("/update-booking")
  };

  const submitBooking = async (apiName) => {
    if (bookingForm.booking_note === "") setBookingForm({ booking_note: "-" });
    const formData = new FormData();
    for (const key in bookingForm) formData.append(key, bookingForm[key]);
    console.log(bookingForm)

    const response = await axiosClient.post(apiName, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    getBookingsData();
    setShowCreateModal(false);
    setShowUpdateModal(false);

    toast.success(response.data.message);
    console.log(response.data.booking)
  }

  const guestLeaving = async (bookingId) => {
    console.log(bookingId);
    const response = await axiosClient.get(`/guest-leaving/${bookingId}`);
    getBookingsData();
    console.log(response.data.message);
  };

  const roomWasCleaned = async (roomId) => {
    setIsButtonLoading(true);
    const response = await axiosClient.get(`/room-was-cleaned/${roomId}`);
    getBookingsData();
    setIsButtonLoading(false);
    console.log(response.data.message);
  };

  return {
    bookingForm,
    setBookingForm,
    onCreate,
    showCreateModal,
    setShowCreateModal,
    handleChange,
    handleCreate,
    handleUpdate,
    bookingsData,
    guestLeaving,
    roomWasCleaned,
    onUpdate,
    setShowUpdateModal,
    showUpdateModal,
    isLoading,
    roomStatus,
    currentStatus,
    setCurrentStatus,
    isButtonLoading,
  };
}
