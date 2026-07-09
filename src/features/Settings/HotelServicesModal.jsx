import React from "react";
import useHotelService from "./useHotelService";
import { Settings } from "lucide-react";
import Loader2 from "../../components/ui/Loader2";

function HotelServicesModal({onClose, onModalClick }) {
  const { services, setServices, handleChangeServices, handleSubmit, isLoading } =
    useHotelService();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 font-extrabold"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800    relative 
                       transform transition-all duration-300 ease-out scale-85 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2">
          <h1>تهيئة الخدمات</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div>
            <Loader2/>
          </div>
        ): (

        
        
        <form onSubmit={handleSubmit}>
            <div className="p-8 grid md:grid-cols-2 grid-cols-1 gap-6">
              {services.map((service) => (
                <div
                  key={service.service_id}
                  className="bg-slate-100 h-12 w-70 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex space-x-5">
                    <Settings/>
                    <label> {service.service_name}</label>
                  </div>
                  <input
                    type="checkbox"
                    checked={service.hotel_service_status === 1}
                    onChange={() =>
                      handleChangeServices(
                        service.service_id,
                        service.hotel_service_status,
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className="px-8  pb-5 flex space-x-3">
            <button type="submit" 
            
              className="w-40 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
              <span>حفظ</span>
            </button>
            <button type="button"
            onClick={onClose}
              className="w-40 p-2 font-extrabold md:text-xl text-xl border border-black text-black rounded
         hover:bg-gray-100  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
            >
              <span>الغاء</span>
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default HotelServicesModal;
