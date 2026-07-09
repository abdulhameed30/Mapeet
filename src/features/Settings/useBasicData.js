import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useBasicData() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [hotel, setHotel] = useState({
    hotel_id: "",
    hotel_name: "",
    hotel_code: "",
    hotel_email: "",
    hotel_phone: "",
    hotel_city_id: "",
    hotel_location: "",
    hotel_lat: "",
    hotel_lng: "",
    hotel_desc: "",
    hotel_floors_count: "",
  });
  const [cities, setCities] = useState([]);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getHotelData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-hotel/${hotelData.hotel_id}`,
      );
      setHotel(response.data.hotel);
      setDisplayImage(
        `http://192.168.195.2:8000/upload/hotels/${response.data.hotel.hotel_image}`,
      );
      setImage(
        `http://192.168.195.2:8000/upload/hotels/${response.data.hotel.hotel_image}`,
      );
      setCities(response.data.cities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHotelData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setDisplayImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleLocationSelect = (location) => {
    setHotel((prev) => ({
      ...prev,
      hotel_lat: location.lat,
      hotel_lng: location.lng,
    }));
  };

  const handleChange = (e) => {
    setHotel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log(hotel)
    // for (const key in hotel) formData.append(key, hotel[key]);
    formData.append("hotel_id", hotel.hotel_id)
    formData.append("hotel_code", hotel.hotel_code)
    formData.append("hotel_email", hotel.hotel_email)
    formData.append("hotel_phone", hotel.hotel_phone)
    formData.append("hotel_city_id", hotel.hotel_city_id)
    formData.append("hotel_location", hotel.hotel_location)
    formData.append("hotel_lat", hotel.hotel_lat)
    formData.append("hotel_lng", hotel.hotel_lng)
    formData.append("hotel_desc", hotel.hotel_desc)
    formData.append("hotel_floors_count", hotel.hotel_floors_count)
    if (image) {
      formData.append("file", image);
    }
    console.log(hotel)
    const response = await axiosClient.post("update-hotel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    toast.success(response.data.message);
  };

  return {
    hotel,
    handleChange,
    handleSubmit,
    cities,
    image,
    displayImage,
    handleImageChange,
    handleLocationSelect,
    isLoading,
    setIsLoading
  };
}
