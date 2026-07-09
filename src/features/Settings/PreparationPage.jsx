import { Settings } from "lucide-react";
import React, { useState } from "react";
import BasicDataModal from "./BasicDataModal";
import HotelServicesModal from "./HotelServicesModal";
import HotelWalletsModal from "./HotelWalletsModal";

function PreparationPage() {
    const [showBasicDataModal, setShowBasicDataModal] = useState(false);
    const [showHotelServicesModal, setShowHotelServicesModal] = useState(false);
    const [showHotelWalletsModal, setShowHotelWalletsModal] = useState(false);
  return (
    <div className="w-full bg-white shadow-2xl rounded p-5 font-serif h-full">
      {/* Page Header */}
      <div className="flex justify-between items-center p-2   rounded bg-blue-50">
        <h1 className="md:text-2xl text-2xl font-extrabold text-blue-600">
          بيانات الفندق
        </h1>
      </div>

      <div className="py-5 grid grid-cols-5 gap-4">
        <button onClick={() => setShowBasicDataModal(true)}
          className=" p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
        >
          <span>تهيئة البيانات الاساسية </span>
          <Settings/>
        </button>
        <button onClick={() => setShowHotelServicesModal(true)}
          className=" p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
        >
          <span>تهيئة الخدمات </span>
          <Settings/>
        </button>
        <button onClick={() => setShowHotelWalletsModal(true)}
          className=" p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
        >
          <span>تهيئة المحافظ الالكترونية </span>
          <Settings/>
        </button>
      </div>

      {showBasicDataModal && (
        <BasicDataModal
        onClose={() => setShowBasicDataModal(false)}
        onModalClick={(e) => e.stopPropagation()}/>
      )}
      {showHotelServicesModal && (
        <HotelServicesModal
        onClose={() => setShowHotelServicesModal(false)}
        onModalClick={(e) => e.stopPropagation()}/>
      )}
      {showHotelWalletsModal && (
        <HotelWalletsModal
        onClose={() => setShowHotelWalletsModal(false)}
        onModalClick={(e) => e.stopPropagation()}/>
      )}
    </div>
  );
}

export default PreparationPage;
