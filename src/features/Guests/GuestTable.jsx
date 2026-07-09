import { Edit, FileText, Trash } from "lucide-react";
import React, { useState } from "react";
import GuestStatementModal from "./GuestStatementModal";

function GuestTable({
  onEdit,
  guests,
  handleDelete,
  isDeleted = false,
  onFilter,
}) {
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [guest , setGuest] = useState(null);
  return (
    <div className="md:w-full w-[800px] flex justify-center pt-5">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              اسم النزيل
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              رقم الهوية
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              الهاتف
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              العنوان
            </th>
            <th className="text-center p-2 text-xl font-extrabold text-white">
              الرصيد
            </th>

            <th className="text-center p-2 text-xl font-extrabold text-white">
              كشف حساب
            </th>
            {!isDeleted && (
              <th className="text-center p-2 text-xl font-extrabold text-white">
                تعديل
              </th>
            )}
            {!isDeleted && (
              <th className="text-center p-2 text-xl font-extrabold text-white">
                حذف
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => {
            return (
              <tr
                key={index}
                className="border-b border-slate-200 dark:border-slate-700/500
             transition-colors"
              >
                <td className=" text-center">
                  <span className="text-sm font-medium text-orange-500 ">
                    {index + 1}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {guest.guest_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {guest.guest_national}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {guest.guest_phone}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {guest.guest_address}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {guest.guest_balance}
                  </span>
                </td>

                <td className=" text-center">
                  <button
                    onClick={() => {
                      setGuest(guest)
                      setShowStatementModal(true);
                    }}
                    className="hover:bg-slate-100 cursor-pointer p-2  my-2 text-green-500  rounded-xl text-center transition-colors"
                  >
                    <FileText />
                  </button>
                </td>
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => onEdit(guest)}
                      className=" hover:bg-slate-100 cursor-pointer p-2  my-2 text-blue-500
                rounded-xl text-center transition-colors"
                    >
                      <Edit />
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center">
                    <button
                      onClick={() => handleDelete(guest.guest_id)}
                      className="hover:bg-slate-100 cursor-pointer p-2  my-2 text-red-500
                rounded-xl text-center transition-colors"
                    >
                      <Trash />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showStatementModal && (

      <GuestStatementModal
      onClose={() => setShowStatementModal(false)}
      onModalClick={(e) => e.stopPropagation()}
      guest={guest}
      />
      )}
    </div>
  );
}

export default GuestTable;
