import React from "react";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import Loader2 from "../../components/ui/Loader2";
import useUser from "./useUser";
import logo from "../../assets/logo.png";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

function UsersPage() {
  const {
    usersData,
    permissionsData,
    userForm,
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
    showDeleteModal,
    setShowDeleteModal,
    openDeleteModal,
  } = useUser();
  return (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif ">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          بيانات المستخدمين
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
        >
          <span>اضافة</span>
        </button>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) : usersData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد مستخدمين حتى الان</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <UserTable
            onEdit={onUpdate}
            userData={usersData}
            handelDelete={openDeleteModal}
          />
        </div>
      )}

      {showCreateModal && (
        <UserModal
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة مستخدم جديد"
          onChange={handleChange}
          onSubmit={handleCreate}
          permissions={permissionsData}
          user={userForm}
        />
      )}
      {showUpdateModal && (
        <UserModal
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="تعديل بيانات المستخدم"
          onChange={handleChange}
          onSubmit={handleUpdate}
          permissions={permissionsData}
          user={userForm}
          isRequired={false}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
         onClose={() => setShowDeleteModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onConfirm={handleDelete}
          text="هل انت متأكد انك تريد حذف هذا المستخدم؟"
          />
      )}

      {/* {isLoading && <Loader />} */}
    </div>
  );
}

export default UsersPage;
