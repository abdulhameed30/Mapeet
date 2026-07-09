import { Check, Edit, Image, Trash, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function RoomTable({ onEdit, rooms, handelDelete }) {
  const navigate = useNavigate();
  const goToRoomImagesPage = (room) => {};
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5 font-normal">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الطابق
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              رقم المكان
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              النوع
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              السعر
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الحالة
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الوصف
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              العرض
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              الصور
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              تعديل
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              حذف
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            return (
              <tr
                key={index}
                className="border-b border-slate-200/50 dark:border-slate-700/500
             transition-colors"
              >
                <td className=" text-center">
                  <span className="text-sm font-medium text-orange-500 ">
                    {index + 1}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {room.floor_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {room.room_number}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {room.type_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {room.room_price}
                  </span>
                </td>
                <td className=" text-center">
                  <span
                    className={`text-s rounded dark:text-white p-1 px-2 text-white ${
                      room.room_status == 0
                        ? "bg-red-500"
                        : room.room_status == 1
                          ? "bg-green-500"
                          : room.room_status == 2
                            ? "bg-blue-500"
                            : "bg-orange-500"
                    }`}
                  >
                    {room.room_status == 0
                      ? "غير مفعل"
                      : room.room_status == 1
                        ? "شاغر"
                        : room.room_status == 2
                          ? "مؤجر"
                          : "تنظيف"}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {room.room_desc}
                  </span>
                </td>
                <td className=" text-center">
                  <button className="hover:bg-slate-100 cursor-pointer p-2  my-2 text-blue-500
                                     rounded-xl text-center transition-colors">
                                  {room.room_show == 1 ? (
                                    <Check size={20} />
                                  ) : (
                                    <X size={20} />
                                  )}    
                  </button>
                </td>
                <td className=" text-center">
                  <button
                    onClick={() => {
                      console.log(room);
                      navigate(`/rooms/RoomImages`, {
                        state: {
                          room_number: room.room_number,
                          room_id: room.room_id,
                        },
                      });
                    }}
                    className=" hover:bg-slate-100 cursor-pointer p-2  my-2 text-blue-500
                                     rounded-xl text-center transition-colors"
                  >
                    <Image />
                  </button>
                </td>
                <td className=" text-center">
                  <button
                    onClick={() => onEdit(room)}
                    className=" hover:bg-slate-100 cursor-pointer p-3 text-blue-500
                     rounded-xl text-center transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                </td>
                <td className=" text-center">
                  <button
                    onClick={() => handelDelete(room.room_id)}
                    className="hover:bg-slate-100 cursor-pointer p-3 text-red-500
                     rounded-xl text-center transition-colors"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RoomTable;
