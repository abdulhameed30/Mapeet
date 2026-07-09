import React from "react";
import useFormerEmployee from "./useFormerEmployee";
import EmployeeTable from "./EmployeeTable";
import Loader from "../../components/ui/Loader";
import Loader2 from "../../components/ui/Loader2";

function FormerEmployeesPage() {
  const { employeesData, isLoading } = useFormerEmployee();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif  font-extrabold">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          بيانات الموظفين السابقين
        </h1>
      </div>

      { employeesData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد موظفين</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <EmployeeTable employees={employeesData} isDeleted={true} />
        </div>
      )}
    </div>
      )
  );
}

export default FormerEmployeesPage;
