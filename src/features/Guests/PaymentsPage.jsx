import React from "react";
import usePayment from "./usePayment";
import PaymentTable from "./PaymentTable";
import Loader2 from "../../components/ui/Loader2";
import PaymentModal from "./PaymentModal";

function PaymentsPage() {
  const {
    paymentData,
    onUpdate,
    handleDelete,
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    paymentForm,
    onCreate,
    handleCreate,
    handleChange,
    submitPayment,
    handleUpdate,
    isLoading,
    searchInput,
    setSearchInput
  } = usePayment();
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
         مقبوضات النزلاء
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          <span>اضافة +</span>
        </button>
      </div>

      <input
        type="text"
        value={searchInput}
        name=""
        placeholder="ابحث عن نزيل.."
        autoFocus
        onChange={(e) => setSearchInput(e.target.value)}
        className="pr-10 pl-4 mt-3 h-10 w text-xl
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />

      <div className="w-full md:overflow-hidden overflow-scroll">
        <PaymentTable
          onEdit={onUpdate}
          payments={paymentData}
          handleDelete={handleDelete}
        />
      </div>

      {showCreateModal && (
        <PaymentModal 
        onClose={() => setShowCreateModal(false)}
        onModalClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        onSubmit={handleCreate}
        payment={paymentForm}
        />
      )}

      {showUpdateModal && (
        <PaymentModal 
        onClose={() => setShowUpdateModal(false)}
        onModalClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        onSubmit={handleUpdate}
        payment={paymentForm}
        />
      )}
    </div>
      )
  );
}

export default PaymentsPage;
