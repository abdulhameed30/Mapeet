import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function usePayment() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [paymentData, setPaymentData] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    payment_id: "",
    payment_guest_id: "",
    payment_date: "",
    payment_method: "",
    payment_amount: "",
    payment_user_id: hotelData.user_id,
    payment_note: "",
    payment_hotel_id: hotelData.hotel_id,
  });
  const [searchInput, setSearchInput] = useState("");

  const getPaymentsData = async () => {
    try {
      if (searchInput == "") {
        setIsLoading(true);
        const response = await axiosClient.get(
          `/get-guest-payments/${hotelData.hotel_id}`,
        );
        setPaymentData(response.data.payments);
        console.log(response.data.payments);
      } else {
        const response = await axiosClient.get(
          `/get-guest-payments-by-guest/${hotelData.hotel_id}/${searchInput}`,
        );
        setPaymentData(response.data.payments);
        console.log(response.data.payments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaymentsData();
  }, [hotelData.hotel_id, searchInput]);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const getToday = () =>
    new Date().toISOString().slice(0, 19).replace("T", " ");

  const onCreate = () => {
    setPaymentForm({
      payment_id: "",
      payment_guest_id: "",
      payment_date: getToday(),
      payment_method: 0,
      payment_amount: 0,
      payment_user_id: hotelData.user_id,
      payment_note: "-",
      payment_hotel_id: hotelData.hotel_id,
    });
    setShowCreateModal(true);
  };

  const onUpdate = (payment) => {
    setPaymentForm({
      ...payment,
      payment_hotel_id: hotelData.hotel_id,
      payment_user_id: hotelData.user_id,
    });
    setShowUpdateModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitPayment("/create-guest-payment");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitPayment("/update-guest-payment");
  };

  const submitPayment = async (apiName) => {
    const formData = new FormData();
    for (const key in paymentForm) formData.append(key, paymentForm[key]);

    const response = await axiosClient.post(apiName, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowCreateModal(false);
    setShowUpdateModal(false);
    getPaymentsData();
    toast.success(response.data.message);
  };

  const handleDelete = async (payment_id) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا السند")) return;
    const response = await axiosClient.get(
      `/delete-guest-payment/${payment_id}`,
    );
    toast.success(response.data.message);
    getPaymentsData();
  };

  return {
    paymentData,
    onUpdate,
    handleDelete,
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    paymentForm,
    onCreate,
    handleCreate,
    handleChange,
    submitPayment,
    handleUpdate,
    isLoading,
    searchInput,
    setSearchInput,
  };
}
