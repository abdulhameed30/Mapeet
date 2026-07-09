import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export function useRoomImage(room_id) {
  const [imageData, setImageData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [imageId, setImageId] = useState(null);

  const [isLoading, setIsLoading] = useState(false)

  const getImages = async () => {
    setIsLoading(true)
    try{
        const response = await axiosClient.get(`/get-room-images/${room_id}`)
    setImageData(response.data.images);
    } catch(error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
    
  };

  useEffect(() => {
    
    getImages();
  }, [room_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setDisplayImage(URL.createObjectURL(file));
    setImage(file);
  };

  const onAdd = () => {
    setDisplayImage(null);
    setImage(null);
    setShowAddModal(true);
  };

  const onEdit = (image) => {
    setDisplayImage(`http://192.168.195.2:8000/upload/rooms/${image.image_name}`);
    setImageId(image.room_image_id)
    setShowEditModal(true);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image_name", image);
      formData.append("room_id", room_id);
    }
    handleSubmit("create-room-image", formData);
    setShowAddModal(false)
  };

  const handleEditImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image_name", image);
      formData.append("room_image_id", imageId);
    }
    handleSubmit("update-room-image", formData);
    setShowEditModal(false)
  };

  const handleSubmit = async (url, formData) => {
    console.log(formData)
    const response = await axiosClient.post(`/${url}`,formData,{
      headers: { "Content-Type": "multipart/form-data" },
    })

    getImages();
    toast.success(response.data.message);
    console.log(response.data);

   
  };

  const handleDelete = async (roomImageId) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذه الصورة")) return;

    const response = await axiosClient.get(`/delete-room-image/${roomImageId}`);
    alert(response.data.message)
    getImages();
  };

  return {
    image,
    displayImage,
    handleImageChange,
    imageData,
    handleAddImage,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    onAdd,
    onEdit,
    handleEditImage,
    handleDelete
  };
}
