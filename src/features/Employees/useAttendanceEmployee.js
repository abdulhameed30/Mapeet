import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function useAttendanceEmployee() {
    const hotelData = JSON.parse(sessionStorage.getItem("data"));
    const [attendancesData, setAttendancesData] = useState([]);
  const [allDate, setAllDate] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [isLoading, setIsLoading] = useState(false)

  const getAttendancesData = async () => {
    
    let apiName = allDate ? `/get-former-attendance/${hotelData.hotel_id}/${date}` : `/get-attendance/${hotelData.hotel_id}`;
    try{
      const response = await axiosClient.get(apiName);
      console.log(response.data)
      setAttendancesData(response.data);
    } catch(err){
      console.error(err)
    } finally {
        setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    getAttendancesData();
    
  }, [hotelData.hotel_id,date, allDate]);

  const updateStatus = async (id, status) => {
    const formData = new FormData();
    formData.append("attendance_id", id);
    formData.append("attendance_status", status);

    const response = await axiosClient.post(`/update-attendance`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    getAttendancesData();
  };

  return {
    attendancesData,
    allDate,
    setAllDate,
    date,
    setDate,
    updateStatus,
    isLoading
  };
}