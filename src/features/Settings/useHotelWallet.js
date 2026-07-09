import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useHotelWallet() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [wallets, setWallets] = useState([]);
  const [isLoading , setIsLoading] = useState(false)

  const getHotelWallets = async () => {
    setIsLoading(true)
    try {
      const response = await axiosClient.get(
        `/get-hotel-wallets/${hotelData.hotel_id}`,
      );
      setWallets(response.data.wallets);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getHotelWallets();
  }, []);

  const handleChangeWallets = async (walletId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setWallets((prev) =>
      prev.map((s) =>
        s.wallet_id === walletId ? { ...s, wallet_status: newStatus } : s,
      ),
    );
  };
  const handleChange = (walletId, e) => {
  const value = e.target.value;

  setWallets((prev) =>
    prev.map((wallet) =>
      wallet.wallet_id === walletId
        ? { ...wallet, wallet_number: value }
        : wallet
    )
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("wallets", JSON.stringify(wallets));
    formData.append("hotel_id", hotelData.hotel_id);
    const response = await axiosClient.post("/update-hotel-wallets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(response.data.message);
  };

  return {
    wallets,
    setWallets,
    handleChangeWallets,
    handleSubmit,
    handleChange,
    isLoading
  };
}
