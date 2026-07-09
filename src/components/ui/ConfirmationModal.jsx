import { Info, Trash } from "lucide-react";
import React from "react";

function ConfirmationModal({ onClose, onModalClick, onConfirm, text = "" }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800 w-90   relative 
                       transform transition-all duration-300 ease-out scale-95 opacity-0 
                       animate-modalIn p-5"
        onClick={onModalClick}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <Info className="text-red-500" size={50} />
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            تأكيد الحذف
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{text}</p>
          <div className="flex space-x-4 w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-all w-full text-xl"
              onClick={onConfirm}
            >
              نعم
            </button>
            <button
              className="bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-all w-full text-xl"
              onClick={onClose}
            >
              لا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
