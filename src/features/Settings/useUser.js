import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useUser() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [userForm, setUserForm] = useState({
    user_id: "",
    user_name: "",
    user_username: "",
    user_password: "",
    user_permission_id: "",
    user_status: 1,
    user_hotel_id: hotelData.hotel_id,
  });

  const [isLoading, setIsLoading] = useState(false);

  const getUsersData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-users/${hotelData.hotel_id}`,
      );
      setUsersData(response.data.users);
      console.log(response.data.users);
      setPermissionsData(response.data.permissions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [hotelData.hotel_id]);

  const onCreate = () => {
    setUserForm({
      user_id: "",
      user_name: "",
      user_username: "",
      user_password: "",
      user_permission_id: "",
      user_status: 1,
      user_hotel_id: hotelData.hotel_id,
    });
    setShowCreateModal(true);
  };

  const onUpdate = (user) => {
    setUserForm({ ...user, user_hotel_id: hotelData.hotel_id });
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (userForm.user_permission_id == "" || userForm.user_permission_id == "0")
      return toast.error("يجب تحديد صلاحية المستخدم");
    await submitUser("create-user");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (userForm.user_permission_id == "" || userForm.user_permission_id == "0")
      return toast.error("يجب تحديد صلاحية المستخدم");
    await submitUser("update-user");
  };

  const submitUser = async (apiName) => {
    const formData = new FormData();
    for (const key in userForm) formData.append(key, userForm[key]);
    const response = await axiosClient.post(`/${apiName}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowCreateModal(false);
    setShowUpdateModal(false);
    getUsersData();
    toast.success(response.data.message);
  };

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async (userid) => {
    try {
      const response = await axiosClient.get(`/delete-user/${deleteId}`);
      toast.success(response.data.message);
      getUsersData();
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return {
    usersData,
    permissionsData,
    userForm,
    setUserForm,
    getUsersData,
    handleChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    onCreate,
    onUpdate,
    showCreateModal,
    showUpdateModal,
    setShowCreateModal,
    setShowUpdateModal,
    isLoading,
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
  };
}
