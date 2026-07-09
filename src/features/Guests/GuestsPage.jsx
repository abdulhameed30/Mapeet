import React from "react";
import GuestsTable from "./GuestTable";
import useGuest  from "./useGuest";
import GuestModal from "./GuestModal";
import Loader2 from "../../components/ui/Loader2"
import InputField from "../../components/ui/InputField";

function GuestsPage() {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const {
    guestsData,
    onUpdate,
    handleDelete,
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    guestForm,
    onCreate,
    handleCreate,
    handleChange,
    handleUpdate,
    isLoading,
    searchInput,
    setSearchInput
  } = useGuest(hotelData.user_hotel_id);
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
          النزلاء{" "}
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
        onChange={(e) => setSearchInput(e.target.value)}
        className="pr-10 pl-4 mt-3 h-10 w text-xl
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />

      <div className="w-full md:overflow-hidden overflow-scroll">
        <GuestsTable
          onEdit={onUpdate}
          guests={guestsData}
          handleDelete={handleDelete}
        />
      </div>

      {showCreateModal && (
        <GuestModal 
        onClose={() => setShowCreateModal(false)}
        onModalClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        onSubmit={handleCreate}
        guest={guestForm}
        />
      )}

      {showUpdateModal && (
        <GuestModal
        onClose={() => setShowUpdateModal(false)}
        onModalClick={(e) => e.stopPropagation()}
        onChange={handleChange}
        onSubmit={handleUpdate}
        guest={guestForm}
        />
      )}
    </div>
      )
  );
}

export default GuestsPage;
