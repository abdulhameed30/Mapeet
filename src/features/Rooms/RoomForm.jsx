import React from "react";
import { Save } from "lucide-react";
import InputField from "../../components/ui/InputField";
import TextareaField from "../../components/ui/TextareaField";
import Select from "react-select/creatable";

function RoomForm({
  onChange,
  onSubmit,
  floors,
  roomTypes,
  room = null,
  image,
  displayImage,
  handleImageChange,
}) {
  const options = roomTypes.map((type) => ({
    value: type.type_id,
    label: type.type_name,
  }));
  return (
    <form className="p-5" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-3  grid-cols-1 gap-4 ">
        <div>
          <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
            الطابق:
          </label>
          <select
            name="room_floor_id"
            onChange={ (e) => onChange({
                  room_floor_id: e.target.value,
                })}
            value={room.room_floor_id}
            className="pr-10 pl-4 mt-3 h-10 w-full md:text-xl
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="0">اختر الطابق</option>
            {floors.map((floor) => {
              return (
                <option key={floor.floor_id} value={floor.floor_id}>
                  {floor.floor_name}
                </option>
              );
            })}
          </select>
        </div>
        <InputField
          lableText="رقم المكان:"
          type="number"
          name="room_number"
          onChange={ (e) => onChange({
                  room_number: e.target.value,
                })}
          value={room.room_number}
        />
        <div>
          <label htmlFor="" className=" text-cyan-700 mt-4 text-xl">
            النوع:
          </label>
          <Select
            options={options}
            value={options.find((option) => option.value === room.room_type_id)}
            onChange={(selected) => {
              if (selected.__isNew__) {
                onChange({
                  room_type_id: 0,
                  type_name: selected.label,
                });
              } else {
                onChange({
                  room_type_id: selected.value,
                  type_name: "",
                });
              }
            }}
            placeholder="اختر النوع..."
            isSearchable={true}
            name="booking_guest_id"
            className=" h-10 w-full  mt-3
                      ring ring-slate-500  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <InputField
          lableText="السعر:"
          type="number"
          name="room_price"
          onChange={ (e) => onChange({
                  room_price: e.target.value,
                })}
          value={room.room_price}
        />
        <div>
          <label htmlFor="" className=" text-cyan-700 mt-4 text-xl">
            الحالة:
          </label>
          <select
            name="room_status"
            onChange={ (e) => onChange({
                  room_status: e.target.value,
                })}
            value={room.room_status}
            className="pr-10 pl-4 mt-3 h-10 w-full
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="0">غير مفعل</option>
            <option value="1">شاغر</option>
            <option value="2">مؤجر</option>
            <option value="3"> تنظيف</option>
          </select>
        </div>
      </div>
      <p className="mt-5 text-xl font-extrabold">
        بيانات العرض على تطبيق الحجز:
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-3">
        <div>
          <div>
            <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl">
              حالة العرض في التطبيق:
            </label>
            <div
              className="pr-10 pl-4 mt-4 h-12 w-full border border-slate-400 py-2.5 bg-slate-100  dark:bg-slate-800
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    flex justify-around"
            >
              <div className="space-x-2">
                <input
                  type="radio"
                  name="room_show"
                  checked={room.room_show == 1}
                  value="1"
                  onChange={ (e) => onChange({
                    room_show: e.target.value,
                  })}
                />
                <span>مفعل</span>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={room.room_show == 0}
                  name="room_show"
                  value="0"
                  onChange={ (e) => onChange({
                    room_show: e.target.value,
                  })}
                />
                <span>غير مفعل</span>
              </div>
            </div>
          </div>
          
        </div>
        <TextareaField
          lableText="الوصف:"
          value={room.room_desc}
          name="room_desc"
          onChange={ (e) => onChange({
                  room_desc: e.target.value,
                })}
          rowCount={10}
          isRequired={false}
        />
        <div>
          <label className="md:text-xl text-cyan-700 m-4">اختر صورة:</label>
          <label
            htmlFor="imageUpload"
            className=" md:h-80 md:w-100 h-full w-full mt-4  border-2 border-solid border-gray-400 flex 
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

        {/* <div className="">
          <label htmlFor="" className="text-xl font-bold text-cyan-700 m-4">
            اختر صورة:
          </label>
          <label
            htmlFor="imageUpload"
            className={` w-full h-68 mt-4 border-2 border-dashed border-gray-400 flex flex-col items-center
           justify-center cursor-pointer rounded-lg hover:border-cyan-500 transition-all duration-300`}
          >
            {image ? (
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
            accept="image/*"
            className="hidden"
          />
        </div> */}
      </div>
      <div className="py-5 flex justify-end space-x-3">
        <button
          type="submit"
          className="p-2 w-30 font-extrabold text-xl border text-white bg-blue-500 rounded-xl
         hover:bg-blue-600  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
        >
          <span>حفظ</span> <Save />
        </button>
        <button
          className="p-2 w-30 font-extrabold text-xl text-red-500 border border-red-500 rounded-xl
         hover:bg-slate-100  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
        >
          <span>الغاء</span> ✕
        </button>
      </div>
    </form>
  );
}

export default RoomForm;
