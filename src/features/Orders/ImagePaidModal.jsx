import React from "react";

function ImagePaidModal({onClose, onModalClick, imageLink}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-40"
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
          <h1>اشعار الدفع</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
            <label
                htmlFor="imageUpload"
                className=" md:h-100 md:w-86 h-full w-full border-2 border-solid border-gray-400 flex mt-4
              flex-col items-center justify-center cursor-pointer rounded hover:border-cyan-500 transition-all duration-300"
              >
                {imageLink != null ? (
                  <img
                    src={`http://192.168.195.2:8000/upload/orders/${imageLink}`}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className=" text-black px-4 py-2 rounded">
                      لم يتم ارفاق صورة سند الدفع بعد.. 
                    </span>
                  </>
                )}
              </label>
        </div>

        
      </div>
    </div>
  );
}

export default ImagePaidModal;
