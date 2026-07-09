import React from "react";

function RoomImageModal({
  onClose,
  onModalClick,
  title,
  image,
  displayImage,
  handleImageChange,
  handleSubmit,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded-xl  dark:bg-gray-800  relative 
                       transform transition-all duration-300 ease-out scale-85 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>{title}</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <form action="" onSubmit={handleSubmit} className="p-6">
          <div className="">
            <label htmlFor="" className="text-xl font-bold text-cyan-700 m-4">
              اختر صورة:
            </label>
            <label
              htmlFor="imageUpload"
              className={` w-90 h-90 mt-4 p-6 border-2 border-dashed border-gray-400 flex flex-col items-center
           justify-center cursor-pointer rounded-lg hover:border-cyan-500 transition-all duration-300`}
            >
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <span className="text-gray-500 mb-2">📷 رفع الصورة</span>
                  <span className="bg-cyan-500 text-white px-4 py-2 rounded">
                    Choose File
                  </span>
                </>
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              required
              name="files"
              accept="image/*"
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            اضافة
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomImageModal;
