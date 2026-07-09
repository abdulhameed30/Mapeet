import React from 'react'
import useLoanAndDeductionEmployee from './useLoanAndDeductionEmployee'
import LoanAndDeductionTable from "./LoanAndDeductionTable"
import LoanAndDeductionModal from "./LoanAndDeductionModal"
import Loader2 from '../../components/ui/Loader2';
import ConfirmationModal from '../../components/ui/ConfirmationModal';

function LoanAndDeductionEmployeesPage() {
    const {
        allDate,
    setAllDate,
    allEmployees,
    setAllEmployees,
    date,
    setDate,
    employeesData,
    loanDeductionsData,
    employeeId,
    setEmployeeId,
    showCreateModal,
    setShowCreateModal,
    setShowUpdateModal,
    showUpdateModal,
    loanDeductionForm,
    onCreate,
    onUpdate,
    handleChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    isLoading,
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
    } = useLoanAndDeductionEmployee();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          سلف وخصومات الموظفين
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          اضافة
        </button>
      </div>

      {employeesData && (
        <div className="">
        <div className="space-x-3 py-3 w-xl">
          <input
            type="checkbox"
            checked={allDate === true}
            onChange={() => {
              setAllDate(!allDate);
            }}
          />
          <span>  اليوم</span>
          {!allDate && (
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="border p-2 rounded-xl w-60"
            />
          )}
        </div>

        <div className="space-x-3 py-3">
          <input
            type="checkbox"
            checked={allEmployees === true}
            value={allEmployees}
            onChange={() => {
              setAllEmployees(!allEmployees);
              setEmployeeId(employeesData[0].employee_id);
            }}
          />
          <span> كل الموظفين</span>
          {!allEmployees && (
            <select
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
              name=""
              className="border p-2 rounded-xl w-60"
            >
              {employeesData.map((employee) => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.employee_name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      )}

      <div className="w-full md:overflow-hidden overflow-scroll">
        {loanDeductionsData.length == 0 ? (
          <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
            <h1>لا يوجد بيانات </h1>
          </div>
        ) : (
          <LoanAndDeductionTable
            loanDeductionsData={loanDeductionsData}
            onEdit={onUpdate}
            handleDelete={openDeleteModal}
            isFormer={allDate}
          />
        )}
      </div>

      {showCreateModal && employeesData && (
        <LoanAndDeductionModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة موظف جديد"
          onChange={handleChange}
          onSubmit={handleCreate}
          employees={employeesData}
          loanDeduction={loanDeductionForm}
        />
      )}
      {showUpdateModal && (
        <LoanAndDeductionModal
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة موظف جديد"
          onChange={handleChange}
          onSubmit={handleUpdate}
          employees={employeesData}
          loanDeduction={loanDeductionForm}
        />
      )}
      {showDeleteModal && (
        <ConfirmationModal
         onClose={() => setShowDeleteModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onConfirm={handleDelete}
          text="هل انت متأكد انك تريد حذف هذا السجل؟"
          />
      )}
    </div>
      )
  )
}

export default LoanAndDeductionEmployeesPage
