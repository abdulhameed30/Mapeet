import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";

export default function useAuth() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    hotelCode: "",
  });

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", userForm.username);
    formData.append("password", userForm.password);
    formData.append("hotelCode", userForm.hotelCode);
    try {
      const response = await axiosClient.post("login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status == "success") {
        sessionStorage.setItem("status", "success");
        sessionStorage.setItem("data", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return {
    navigate,
    userForm,
    setUserForm,
    isLoading,
    setIsLoading,
    handleChange,
    handleLogin,
  };
}
