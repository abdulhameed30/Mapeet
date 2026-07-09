import React from 'react'
import useCurrentEmployee from './useCurrentEmployee'
import EmployeeTable from './EmployeeTable';
import EmployeeModal from './EmployeeModal';
import Loader from "../../components/ui/Loader"
import Loader2 from '../../components/ui/Loader2';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

function CurrentEmployeesPage() {
    const {
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
    } = useCurrentEmployee();
  return (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          بيانات الموظفين الحاليين
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          <span>اضافة +</span>
        </button>
      </div>
       {isLoading ? (
        <div className="w-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) : (

      employeesData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد موظفين</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <EmployeeTable
            onEdit={onUpdate}
            employees={employeesData}
            handelDelete={openDeleteModal}
          />
        </div>
      )
    )}

      {showCreateModal && (
        <EmployeeModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة موظف جديد"
          onChange={handleChange}
          onSubmit={handleCreate}
          jobs={jobs}
          employee={employeeForm}
        />
      )}
      {showUpdateModal && (
        <EmployeeModal
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="تعديل بيانات الموظف "
          onChange={handleChange}
          onSubmit={handleUpdate}
          jobs={jobs}
          employee={employeeForm}
        />
      )}
      
      {showDeleteModal && (
        <ConfirmationModal
         onClose={() => setShowDeleteModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onConfirm={handleDelete}
          text="هل انت متأكد انك تريد حذف هذا الموظف"
          />
      )}
    </div>
  )
}

export default CurrentEmployeesPage
