import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function useTodayExpense() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [expensesData, setExpensesData] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState(null);
  const [expenseForm, setExpenseForm] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const getToday = () => {
    return new Date().toLocaleDateString("en-CA");
  };
  const getCurrentTime = () => new Date().toTimeString().split(" ")[0];

  const [isLoading, setIsLoading] = useState(false);

  const getExpensesData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/get-today-expenses/${hotelData.hotel_id}`,
      );
      setExpensesData(response.data.expenses);
      setExpensesTotal(response.data.expenseTotal);
      console.log(response.data.expenseTotal);
    } catch {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExpensesData();
  }, [hotelData.hotel_id]);

  const handleChange = (e) => {
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });
  };

  const onCreate = () => {
    setErrors({});
    setExpenseForm({
      expense_hotel_id: hotelData.hotel_id,
      expense_category: "",
      expense_amount: 0,
      expense_date: getToday(),
      expense_time: getCurrentTime(),
      expense_user_id: hotelData.user_id,
      expense_note: "-",
    });
    setShowCreateModal(true);
  };

  const onUpdate = (expense) => {
    setErrors({});
    setExpenseForm({
      ...expense,
      expense_hotel_id: hotelData.user_hotel_id,
      expense_user_id: hotelData.user_id,
      expense_date: getToday(),
      expense_time: getCurrentTime(),
    });
    setShowUpdateModal(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await submitExpense("/create-expense");
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await submitExpense("/update-expense");
  };

  const [errors, setErrors] = useState({});

  const validateExpense = () => {
    let newErrors = {};

    if (!expenseForm.expense_amount || expenseForm.expense_amount <= 0 || isNaN(expenseForm.expense_amount)) {
      newErrors.expense_amount = "قم بإدخال مبلغ صحيح";
    }

    setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
  };

  const submitExpense = async (apiName) => {
    if (!validateExpense()) {
      return;
    }
    
    const formData = new FormData();
    for (const key in expenseForm) formData.append(key, expenseForm[key]);
    const response = await axiosClient.post(apiName, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowUpdateModal(false);
    setShowCreateModal(false);
    toast.success(response.data.message);
    getExpensesData();
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

  const handleDelete = async (expenseId) => {
    try {
      const response = await axiosClient.get(`/delete-expense/${deleteId}`);
      toast.success(response.data.message);
      getExpensesData();
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return {
    expensesData,
    expenseForm,
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    handleChange,
    onCreate,
    onUpdate,
    handleCreate,
    handleUpdate,
    handleDelete,
    isLoading,
    expensesTotal,
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
    errors,
  };
}
