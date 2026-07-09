import React from 'react'
import { useRoomImage } from './useRoomImage'
import { useLocation } from 'react-router-dom';
import { Edit, Trash } from "lucide-react";
import RoomImageModal from './RoomImageModal';

function RoomImagesPage() {
    const location = useLocation();
  const data = location.state;
    const {
        image,
    displayImage,
    handleImageChange,
    imageData,
    handleAddImage,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    onAdd,
    onEdit,
    handleEditImage,
    handleDelete
    } = useRoomImage(data.room_id)
  return (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif  font-extrabold">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2  rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          صور المكان رقم {data.room_number}
        </h1>
       <button
          onClick={onAdd}
          className="w-30 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600 transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
          <span>اضافة +</span>
        </button>
      </div>
      {!imageData ? (
        <div className="h-[300px] w-full flex justify-center items-center text-3xl font-extrabold">
          <h1>لا يوجد صور حتى الان</h1>
        </div>
      ) : (
        <div className=" grid md:grid-cols-4 grid-cols-1 gap-4 p-4">
          {imageData.map((image, index) => {
            return (
              <div className="relative w-70 h-70" key={index}>
                <img
                  src={`http://192.168.124.2:8000/upload/rooms/${image.image_name}`}
                  alt="image"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className=" absolute top-0 left-0 space-x-3 p-2">
                  <button
                      onClick={() => onEdit(image)}
                    className=" transition-colors bg-cyan-400 hover:bg-cyan-500 cursor-pointer p-2  my-2 text-white rounded-xl text-center"
                  >
                    <Edit />
                  </button>
                  <button onClick={() => handleDelete(image.room_image_id)} className=" transition-colors bg-red-400 hover:bg-red-500 cursor-pointer p-2  my-2 text-white rounded-xl text-center">
                    <Trash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddModal && (
        <RoomImageModal
          onClose={() => setShowAddModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة صورة"
          image={image}
          displayImage={displayImage}
          handleImageChange={handleImageChange}
          handleSubmit={handleAddImage}
        />
      )}

      {showEditModal && (
        <RoomImageModal
          onClose={() => setShowEditModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          title="اضافة صورة"
          image={image}
          displayImage={displayImage}
          handleImageChange={handleImageChange}
          handleSubmit={handleEditImage}
        />
      )}
    </div>
  )
}

export default RoomImagesPage
