import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useCurrentEmployee() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({
    employee_id: "",
    employee_name: "",
    employee_national: "",
    employee_job_id: 0,
    employee_salary: "",
    employee_hotel_id: hotelData.hotel_id,
    employee_location: "",
    employee_phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const getEmployeesData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-current-employees/${hotelData.hotel_id}`,
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

  const getJobs = async () => {
    try {
      const response = await axiosClient.get(`/get-jobs`);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  const onCreate = () => {
    getJobs();
    setEmployeeForm({
      employee_id: "",
      employee_name: "",
      employee_national: "",
      employee_job_id: "0",
      employee_salary: "",
      employee_hotel_id: hotelData.hotel_id,
      employee_location: "",
      employee_phone: "",
    });
    setShowCreateModal(true);
  };

  const onUpdate = (employee) => {
    setEmployeeForm({ ...employee, employee_hotel_id: hotelData.hotel_id });
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    setEmployeeForm({ ...employeeForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    await submitEmployee("create-employee");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitEmployee("update-employee");
  };

  const validateForm = () => {
    if (
      employeeForm.employee_national == "" ||
      employeeForm.employee_national == "0" ||
      isNaN(employeeForm.employee_national)
    ) {
      toast.error("رقم الهوية غير صالح");
      return false;
    }
    if (
      employeeForm.employee_job_id == "" ||
      employeeForm.employee_job_id == "0"
    ) {
      toast.error("يجب تحديد وظيفة الموظف");
      return false;
    }
    if (
      employeeForm.employee_salary == "" ||
      employeeForm.employee_salary == 0 ||
      isNaN(employeeForm.employee_salary)
    ) {
      toast.error("الراتب غير صالح");
      return false;
    }
    return true;
  };

  const submitEmployee = async (apiName) => {
    if (!validateForm()) return;
    const formData = new FormData();
    for (const key in employeeForm) formData.append(key, employeeForm[key]);

    const response = await axiosClient.post(`/${apiName}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowUpdateModal(false);
    setShowCreateModal(false);
    toast.success(response.data.message);
    getEmployeesData();
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
      const response = await axiosClient.get(`/delete-employee/${deleteId}`);
      toast.success(response.data.message);
      getEmployeesData();
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return {
    employeesData,
    jobs,
    employeeForm,
    setEmployeeForm,
    getEmployeesData,
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
    setIsLoading,
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
  };
}
