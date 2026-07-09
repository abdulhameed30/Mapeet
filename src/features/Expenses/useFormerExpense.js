import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useFormerExpense() {
    
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [expensesData, setExpensesData] = useState([]);
  const [getAll, setGetAll] = useState(true);
  const getToday = () => new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(getToday);

  const [isLoading, setIsLoading] = useState(false);

  const getExpensesData = async () => {
    setIsLoading(true);
    
      
    try {
      const response = await axiosClient.get(getAll == true
        ? `/get-all-expenses/${hotelData.hotel_id}`
        : `/get-expenses-by-date/${hotelData.hotel_id}/${date}`);
      console.log(response.data.expenses);
      setExpensesData(response.data.expenses);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExpensesData();
  }, [date, getAll]);

  return {
    expensesData,
    getAll, setGetAll,
    date,
    setDate,
    isLoading
  };
}
