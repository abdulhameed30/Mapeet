import React from "react";
import useTodayExpense from "./useTodayExpense";
import ExpenseTable from "./ExpenseTable";
import ExpenseModal from "./ExpenseModal";
import Loader2 from "../../components/ui/Loader2";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

function TodayExpensesPage() {
  const {
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
  } = useTodayExpense();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          مصروفات اليوم
        </h1>
        <h1 className="md:text-xl text-2xl ">
           اجمالي المصروفات = {expensesTotal} ريال
        </h1>

       <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          <span>اضافة +</span>
        </button>
      </div>

      {expensesData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد مصروفات  </h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <ExpenseTable
            onEdit={onUpdate}
            expenses={expensesData}
            handleDelete={openDeleteModal}
            isDeleted={false}
          />
        </div>
      )}

      {showCreateModal && (
        <ExpenseModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          onSubmit={handleCreate}
          expense={expenseForm}
          errors={errors}
        />
      )}
      {showUpdateModal && (
        <ExpenseModal
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          onSubmit={handleUpdate}
          expense={expenseForm}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
         onClose={() => setShowDeleteModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onConfirm={handleDelete}
          text="هل انت متأكد انك تريد حذف هذا الصرف؟"
          />
      )}
    </div>
      )
  );
}

export default TodayExpensesPage;
