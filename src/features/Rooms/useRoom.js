import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useRoom() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [roomsData, setRoomsData] = useState([]);
  const [floors, setFloors] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomForm, setRoomForm] = useState({
    room_id: "",
    room_floor_id: "",
    room_number: "",
    room_type_id: "",
    room_type: "",
    room_price: "",
    room_status: 0,
    room_desc: "",
    room_desc_en: "",
    room_hotel_id: hotelData.hotel_id,
    room_show: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const getRoomsData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-rooms/${hotelData.hotel_id}`,
      );
      setRoomsData(response.data.rooms);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getFloorsAndRoomTypesData = async () => {
    try {
      const response = await axiosClient.get(`/get-floors-and-room-types`);
      setFloors(response.data.floors);
      setRoomTypes(response.data.types);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomsData();
  }, [hotelData.hotel_id]);

  const onCreate = () => {
    getFloorsAndRoomTypesData();
    setDisplayImage(null);
    setImage(null)
    setRoomForm({
      room_floor_id: 0,
      room_number: "",
      room_type_id: "",
      room_type: "",
      room_price: "",
      room_status: 0,
      room_desc: "",
      room_hotel_id: hotelData.hotel_id,
      room_show: 0,
      type_name: ""
    });
    setShowCreateModal(true);
  };

  const onUpdate = (room) => {
    getFloorsAndRoomTypesData();
    setRoomForm({ ...room, room_hotel_id: hotelData.hotel_id });
    console.log(room.room_image);
    setDisplayImage(
      `http://192.168.195.2:8000/upload/rooms/${room.room_image}`,
    );
    setShowUpdateModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setDisplayImage(URL.createObjectURL(file));
    setImage(file);
  };

  const handleChange = (data) => {
  setRoomForm((prev) => ({
    ...prev,
    ...data,
  }));
};

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitRoom("create-room");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitRoom("update-room");
  };

  const submitRoom = async (url) => {
    console.log(roomForm)
    console.log(image)
    const formData = new FormData();
    for (const key in roomForm) formData.append(key, roomForm[key]);
    if (image) {
      formData.append("image", image);
    }

    const response = await axiosClient.post(`/${url}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowUpdateModal(false);
    setShowCreateModal(false);
    toast.success(response.data.message);
    getRoomsData();
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المكان")) return;

    const response = await axiosClient.get(`/delete-room/${roomId}`);
    toast.success(response.data.message);
    getRoomsData();
  };
  return {
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    roomsData,
    setRoomsData,
    floors,
    roomTypes,
    setFloors,
    roomForm,
    setRoomForm,
    onCreate,
    onUpdate,
    handleChange,
    handleCreate,
    handleUpdate,
    submitRoom,
    handleDelete,
    isLoading,
    image,
    displayImage,
    handleImageChange,
  };
}
