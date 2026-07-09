import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useGuest() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [guestsData, setGuestsData] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [guestForm, setGuestForm] = useState({
    guest_id: "",
    guest_name: "",
    guest_national: "",
    guest_phone: "",
    guest_address: "",
    guest_balance: 0,
    guest_hotel_id: hotelData.hotel_id,
  });
  const [searchInput, setSearchInput] = useState("");

  const getGuestsData = async () => {
    
    try {
      if (searchInput == "") {
        setIsLoading(true);
        const response = await axiosClient.get(
          `/get-guests/${hotelData.hotel_id}`,
        );
        setGuestsData(response.data.guests);
      } else {
        const response = await axiosClient.get(
          `/get-guests-by-name/${hotelData.hotel_id}/${searchInput}`,
        );
        setGuestsData(response.data.guests);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(searchInput)
    getGuestsData();
  }, [hotelData.hotel_id, searchInput]);
  


  const handleChange = (e) => {
    setGuestForm({ ...guestForm, [e.target.name]: e.target.value });
  };

  const onCreate = () => {
    setGuestForm({
      guest_id: "",
      guest_name: "",
      guest_national: "",
      guest_phone: "",
      guest_address: "",
      guest_balance: 0,
      guest_hotel_id: hotelData.hotel_id,
    });
    setShowCreateModal(true);
  };

  const onUpdate = (guest) => {
    setGuestForm({ ...guest, guest_hotel_id: hotelData.hotel_id });
    setShowUpdateModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitGuest("/create-guest");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitGuest("/update-guest");
  };

  const submitGuest = async (apiName) => {
    const formData = new FormData();
    for (const key in guestForm) formData.append(key, guestForm[key]);

    const response = await axiosClient.post(apiName, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowCreateModal(false);
    setShowUpdateModal(false);
    getGuestsData();
    toast.success(response.data.message);
  };

  const handleDelete = async (guestId) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا النزيل")) return;
    const response = await axiosClient.get(`/delete-guest/${guestId}`);
    toast.success(response.data.message);
    getGuestsData();
  };

  return {
    guestsData,
    onUpdate,
    handleDelete,
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    guestForm,
    onCreate,
    handleCreate,
    handleChange,
    submitGuest,
    handleUpdate,
    isLoading,
    searchInput,
    setSearchInput
  };
}
