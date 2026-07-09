import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.195.2:8000/api/system/", 
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
