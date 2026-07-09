import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useFormerExpense() {
    
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [expensesData, setExpensesData] = useState([]);
  const [getByDate, setGetByDate] = useState(false);
  const getToday = () => new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(getToday);

  const [isLoading, setIsLoading] = useState(false);

  const getExpensesData = async () => {
    setIsLoading(true);
    const apiName =
      getByDate == true
        ? `/get-all-expense/${hotelData.hotel_id}`
        : `/get-all-expense/${hotelData.hotel_id}/${date}`;
    try {
      const response = await axiosClient.get(apiName);
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
  }, [date, getByDate]);

  return {
    expensesData,
    getByDate,
    setGetByDate,
    date,
    setDate,
  };
}
