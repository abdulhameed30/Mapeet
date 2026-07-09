import React from "react";
import EmployeeForm from "./EmployeeForm";

function EmployeeModal({
  onClose,
  onModalClick,
  onChange,
  onSubmit,
  jobs,
  employee = null,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800    relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>موظف</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <EmployeeForm
          className="p-6"
          onChange={onChange}
          onSubmit={onSubmit}
          jobs={jobs}
          employee={employee}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default EmployeeModal;
