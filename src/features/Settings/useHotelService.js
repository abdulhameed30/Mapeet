import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useHotelService() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getHotelServices = async () => {
    setIsLoading(true)
    try {
      const response = await axiosClient.get(
        `/get-hotel-services/${hotelData.hotel_id}`,
      );
      setServices(response.data.hotelservices);
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getHotelServices();
  },[])

  const handleChangeServices = async (serviceId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setServices((prev) =>
      prev.map((s) =>
        s.service_id === serviceId
          ? { ...s, hotel_service_status: newStatus }
          : s,
      ),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("services", JSON.stringify(services));
    formData.append("hotel_id", hotelData.hotel_id);
    const response = await axiosClient.post("/update-hotel-services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(response.data.message);
  }

  return {
    services,
    setServices,
    handleChangeServices,
    handleSubmit,
    isLoading
  }
}
