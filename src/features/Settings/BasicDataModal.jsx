import React from "react";
import useBasicData from "./useBasicData";
import { Save } from "lucide-react";
import SaveButton from "../../components/ui/SaveButton";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import MapPicker from "../../components/maps/MapPicker";
import Loader2 from "../../components/ui/Loader2";

function BasicDataModal({ onClose, onModalClick }) {
  const {
    hotel,
    handleChange,
    handleSubmit,
    cities,
    displayImage,
    handleImageChange,
    handleLocationSelect,
    isLoading,
  } = useBasicData();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className=" overflow-hidden bg-white shadow-2xl rounded  dark:bg-gray-800  mx-18  relative 
                       transform transition-all duration-300 ease-out scale-85 opacity-0 
                       animate-modalIn"
        onClick={onModalClick}
      >
        {/* زر الإغلاق */}
        <div className="flex justify-between bg-blue-500 text-white p-2 text-xl">
          <h1>تهيئة البيانات الاساسية</h1>
          <button
            onClick={onClose}
            className="   hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {isLoading ? (
          <div className=" h-screen flex justify-center items-center ">
            <div className="w-96"></div>
            <div className="w-20"></div>
            <Loader2 />
            <div className="w-20"></div>
            <div className="w-96"></div>
        </div>
        ) : (
          <form
            className="w-full bg-white shadow-2xl rounded p-5 font-serif md:overflow-hidden overflow-y-scroll md:h-auto h-screen "
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <InputField
                lableText="اسم الفندق:"
                type="text"
                name="hotel_name"
                value={hotel.hotel_name}
                onChange={handleChange}
                isDisabled={true}
              />
              <InputField
                lableText="اسم المستخدم:"
                type="text"
                name="hotel_code"
                value={hotel.hotel_code}
                onChange={handleChange}
              />
              <InputField
                lableText="البريد الالكتروني:"
                type="email"
                name="hotel_email"
                value={hotel.hotel_email}
                onChange={handleChange}
              />
              <InputField
                lableText="رقم الهاتف:"
                type="text"
                name="hotel_phone"
                value={hotel.hotel_phone}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="" className=" text-cyan-700 mt-4 md:text-xl">
                  المدينة:
                </label>
                <select
                  name="hotel_city_id"
                  value={hotel.hotel_city_id}
                  onChange={handleChange}
                  className="pr-10 pl-4 mt-3 h-10 w-full md:text-xl
                   py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                lableText=" العنوان:"
                type="text"
                name="hotel_location"
                value={hotel.hotel_location}
                onChange={handleChange}
              />

              <InputField
                lableText="عدد الطوابق:"
                type="number"
                name="hotel_floors_count"
                value={hotel.hotel_floors_count}
                onChange={handleChange}
              />
            </div>

            {/* الصورة والموقع */}
            <div className="block md:flex space-x-3 mt-3">
              <div className="flex-1">
                <TextareaField
                  lableText="الوصف:"
                  type="text"
                  name="hotel_desc"
                  value={hotel.hotel_desc}
                  onChange={handleChange}
                  rowCount={13}
                />
              </div>

              <div className="flex-1">
                <label className="md:text-xl text-cyan-700">الصورة:</label>
                <label
                  htmlFor="imageUpload"
                  className=" md:h-100 md:w-full h-full w-full border-2 border-solid border-gray-400 flex mt-4
              flex-col items-center justify-center cursor-pointer rounded hover:border-cyan-500 transition-all duration-300"
                >
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-gray-500 mb-2">📷 رفع الصورة</span>
                      <span className="bg-blue-500 text-white px-4 py-2 rounded">
                        Choose File
                      </span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageChange}
                  accept="image/*"
                  name="hotel_image"
                  className="hidden"
                />
              </div>

              <div className="w-full flex-1">
                <label className="md:text-xl text-cyan-700">
                  حدد عنوان الفندق:
                </label>
                <div className="mt-4 h-100">
                  <MapPicker
                    location={{ lat: hotel.hotel_lat, lng: hotel.hotel_lng }}
                    onSelectLocation={handleLocationSelect}
                  />
                </div>
              </div>
            </div>

            <div className="py-5 flex space-x-3">
              <button
                type="submit"
                className="w-40 p-2 font-extrabold md:text-xl text-xl bg-purple-500 text-white rounded
         hover:bg-purple-600  transition-all cursor-pointer shadow-xl flex justify-center items-center space-x-3"
              >
                <span>حفظ</span>
              </button>
              <button
                type="button"
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

export default BasicDataModal;
