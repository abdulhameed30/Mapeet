import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useFormerEmployee() {
    const hotelData = JSON.parse(sessionStorage.getItem("data"));
    const [employeesData, setEmployeesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getEmployeesData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-former-employees/${hotelData.hotel_id}`,
      );
      setEmployeesData(response.data.employees);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeesData();
  }, [hotelData.hotel_id]);


  return {
    employeesData,
    isLoading
  }
}