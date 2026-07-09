import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useSettlementEmployee() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [settlementData, setSettlementData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false)


  

  const getSettlementData = async () => {
    setIsLoading(true)
    try{
        const response = await axiosClient.get(
      `/get-employee-settlement/${hotelData.user_hotel_id}`,
    );
    setSettlementData(response.data.data);
    console.log(response.data.data);
    } catch(error) {
        console.error(error)
    } finally{
        setIsLoading(false)
    }
    
  };

  useEffect(() => {
    getSettlementData();
  }, [hotelData.user_hotel_id]);

  return {
    settlementData,
    showCreateModal,
    setShowCreateModal,
    getSettlementData,
    isLoading
  }
}
