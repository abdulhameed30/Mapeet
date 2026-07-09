import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useLoanAndDeductionEmployee() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [allDate, setAllDate] = useState(true);
  const [allEmployees, setAllEmployees] = useState(true);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const [employeesData, setEmployeesData] = useState([]);
  const [loanDeductionsData, setLoanDeductionsData] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loanDeductionForm, setLoanDeductionForm] = useState({
    loan_deduction_id: "",
    loan_deduction_employee_id: "",
    loan_deduction_type: "",
    loan_deduction_date: "",
    loan_deduction_amount: "",
    loan_deduction_user_id: "",
    loan_deduction_note: "-",
  });
  const [isLoading, setIsLoading] = useState(false);

 const getToday = () => {
  return new Date().toLocaleString("sv-SE").replace("T", " ");
};
  const getCurrentTime = () => new Date().toTimeString().split(" ")[0];

  const getEmployeesData = async () => {
    try {
      const response = await axiosClient.get(
        `/get-current-employees/${hotelData.hotel_id}`,
      );
      setEmployeesData(response.data.employees);
    } catch (err) {
      console.error(err);
    }
  };

  const getLoanAndDeductionsData = async () => {
    setIsLoading(true);
    let url;
    if (allDate == false && allEmployees == true) {
      url = `/get-loan-deduction-by-date/${hotelData.hotel_id}/${date}`;
    } else if (allDate == true && allEmployees == true) {
      url = `/get-loan-deduction/${hotelData.hotel_id}`;
    } else if (allDate == true && allEmployees == false) {
      url = `/get-loan-deduction-by-employee/${hotelData.hotel_id}/${employeeId}`;
    } else {
      url = `/get-loan-deduction-by-date-employee/${hotelData.hotel_id}/${date}/${employeeId}`;
    }
    try {
      const response = await axiosClient.get(url);
      setLoanDeductionsData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeesData();
    getLoanAndDeductionsData();
  }, [hotelData.hotel_id, date, employeeId, allDate, allEmployees]);

  const onCreate = () => {
    setLoanDeductionForm({
      loan_deduction_id: "",
      loan_deduction_employee_id: "0",
      loan_deduction_type: "0",
      loan_deduction_date: getToday(),
      loan_deduction_time: getCurrentTime(),
      loan_deduction_amount: "",
      loan_deduction_user_id: hotelData.user_id,
      loan_deduction_note: "-",
    });
    setShowCreateModal(true);
  };
  const onUpdate = (data) => {
    setLoanDeductionForm(data);
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    setLoanDeductionForm({
      ...loanDeductionForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitLoanAndDeduction("create-loan-deduction");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitLoanAndDeduction("update-loan-deduction");
  };

  const validateForm = () => {
    if (loanDeductionForm.loan_deduction_employee_id === "0") {
      toast.error("يرجى اختيار موظف");
      return false;
    }
    if (loanDeductionForm.loan_deduction_amount === "" || loanDeductionForm.loan_deduction_amount == "0" || isNaN(loanDeductionForm.loan_deduction_amount)) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return false;
    }
    return true;
  };

  const submitLoanAndDeduction = async (url) => {
    if (!validateForm()) return;
    const formData = new FormData();
    console.log(loanDeductionForm)
    for (const key in loanDeductionForm)
      formData.append(key, loanDeductionForm[key]);

    const response = await axiosClient.post(`${url}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowUpdateModal(false);
    setShowCreateModal(false);
    toast.success(response.data.message);
    getLoanAndDeductionsData();
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
      const response = await axiosClient.get(`delete-loan-deduction/${deleteId}`);
      toast.success(response.data.message);
    getLoanAndDeductionsData();
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  

  return {
    allDate,
    setAllDate,
    allEmployees,
    setAllEmployees,
    today,
    date,
    setDate,
    employeesData,
    setEmployeesData,
    loanDeductionsData,
    setLoanDeductionsData,
    employeeId,
    setEmployeeId,
    showCreateModal,
    setShowCreateModal,
    setShowUpdateModal,
    showUpdateModal,
    loanDeductionForm,
    setLoanDeductionForm,
    onCreate,
    onUpdate,
    handleChange,
    handleCreate,
    handleUpdate,
    submitLoanAndDeduction,
    handleDelete,
    isLoading,
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
  };
}
