import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useDailyClosing() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [closingData, setClosingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getClosingData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-closing-data/${hotelData.hotel_id}`,
      );
      console.log(response.data.closingData);
      setClosingData(response.data.closingData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getClosingData();
  }, [hotelData.hotel_id]);

  const getToday = () => new Date().toISOString().split("T")[0];
  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  };
  const [date , setDate] = useState(getYesterday());

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [closingForm, setClosingForm] = useState({
    closing_hotel_id: hotelData.hotel_id,
    closing_from_date: getYesterday(),
    closing_total_bookings: "",
    closing_total_expences: "",
    closing_net: "",
    closing_user_id: hotelData.user_id,
  });

  useEffect(() => {
  if (!closingForm.closing_from_date) return;

  const fetchDataByDate = async () => {
    try {
      const response = await axiosClient.get(
        `/get-daily-closing-data/${hotelData.hotel_id}/${closingForm.closing_from_date}`
      );
      console.log(response.data);

      setClosingForm((prev) => ({
        ...prev,
        closing_total_bookings: response.data.paymentTotal,
        closing_total_expences: response.data.expensetotal,
        closing_net:
          response.data.paymentTotal - response.data.expensetotal,
        employees: response.data.employees,
        expenses: response.data.expenses,
        bookings: response.data.bookingPayments,
        guests: response.data.guestPayments

      }));
    } catch (error) {
      console.error(error);
    }
  };

  fetchDataByDate();
}, [closingForm.closing_from_date]);


  const onCreate = async () => {
    setShowCreateModal(true);
  };

  const handleChange = async (e) => {
    setClosingForm({ ...closingForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // for (const key in closingForm) formData.append(key, closingForm[key]);
    console.log(closingForm);
    formData.append("closing_hotel_id", closingForm.closing_hotel_id);
    formData.append("closing_from_date", closingForm.closing_from_date);
    formData.append(
      "closing_total_bookings",
      closingForm.closing_total_bookings,
    );
    formData.append(
      "closing_total_expences",
      closingForm.closing_total_expences,
    );
    formData.append("closing_net", closingForm.closing_net);
    formData.append("closing_user_id", closingForm.closing_user_id);

    const response = await axiosClient.post("/create-daily-closing", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    getClosingData();
    setShowCreateModal(false);

    toast.success(response.data.message);
  };

  return {
    closingData,
    isLoading,
    onCreate,
    closingForm,
    showCreateModal,
    setShowCreateModal,
    handleChange,
    handleSubmit,
  };
}
