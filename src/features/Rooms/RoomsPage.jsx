import React from 'react'
import useRoom from './useRoom'
import RoomTable from './RoomTable';
import RoomModal from './RoomModal';
import Loader2 from '../../components/ui/Loader2';

function RoomsPage() {
  const {
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
    roomsData,
    floors,
    roomTypes,
    roomForm,
    onCreate,
    onUpdate,
    handleChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    isLoading,
    image,
    displayImage,
    handleImageChange
  } = useRoom();
  return (
    isLoading ? (
        <div className="w-full h-full flex justify-center items-center">

          <Loader2/>
        </div>
      ) :
      (
   <div className="w-full bg-white shadow-2xl rounded p-5 font-serif text-xl">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          بيانات الاماكن
        </h1>
        <button
          onClick={onCreate}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          <span>اضافة +</span>
        </button>
      </div>

      {roomsData.length == 0 ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد اماكن حتى الان</h1>
        </div>
      ) : (
        <div className="w-full md:overflow-hidden overflow-scroll">
          <RoomTable
            onEdit={onUpdate}
            rooms={roomsData}
            handelDelete={handleDelete}
          />
        </div>
      )}

      {showCreateModal && (
        <RoomModal
          title="اضافة مكان"
          onClose={() => setShowCreateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          onSubmit={handleCreate}
          floors={floors}
          roomTypes={roomTypes}
          room={roomForm}
          image={image}
          displayImage={displayImage}
          handleImageChange = {handleImageChange}
        />
      )}
      {showUpdateModal && (
        <RoomModal
          title="اضافة مكان"
          onClose={() => setShowUpdateModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          onSubmit={handleUpdate}
          floors={floors}
          roomTypes={roomTypes}
          room={roomForm}
          image={image}
          displayImage={displayImage}
          handleImageChange = {handleImageChange}
        />
      )}
    </div>
      )
  )
}

export default RoomsPage
