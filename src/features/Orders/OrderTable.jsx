import { Check, Edit, File, Trash } from "lucide-react";
import React, { useState } from "react";
import ImagePaidModal from "./ImagePaidModal";
import axiosClient from "../../api/axiosClient";

function OrderTable({
  orders,
  isDeleted = false,
  paidWaiting = false,
  handleAgree,
  handleDisagree,
}) {
  const hotelData = JSON.parse(sessionStorage.getItem("data"));
  const [showImagePaidModal, setShowImagePaidModal] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [paidAmount, setPaidAmount] = useState(0);
  const [showPaidAmountModal, setShowPaidAmountModal] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [orderStatus, setOrderStatus] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [rooms, setRooms] = useState([]);
  
  const getRoomsData = async (typeId, orderFromDate, orderToDate) => {
    try {
      const response = await axiosClient.get(
        `/get-available-rooms/${hotelData.hotel_id}/${typeId}/${orderFromDate}/${orderToDate}`,
      );
      setRooms(response.data.rooms);
      console.log(response.data.rooms);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="md:w-full w-[800px] flex justify-center font-normal pt-5">
      <table className="w-full overflow-hidden rounded ">
        <thead className="bg-blue-500">
          <tr>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              م
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              اسم المستخدم
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              رقم الهاتف
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              نوع الغرفة
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              من تأريخ
            </th>
            <th className="text-center p-1 text-xl font-extrabold text-white">
              الى تأريخ
            </th>

            <th className="text-center p-1 text-xl font-extrabold text-white">
              عدد الاشخاص
            </th>
            {paidWaiting && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                سند الدفع
              </th>
            )}
            {!isDeleted && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                موافقة
              </th>
            )}
            {!isDeleted && (
              <th className="text-center p-1 text-xl font-extrabold text-white">
                رفض
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr
                key={index}
                className="border-b border-slate-200 dark:border-slate-700/500
             transition-colors"
              >
                <td className=" text-center">
                  <span className="text-sm font-medium text-orange-500 ">
                    {order.order_id}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {order.user_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {order.user_phone}
                  </span>
                </td>
                <td className=" text-center p-2">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {order.type_name}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {new Date(order.order_from_date).toLocaleDateString()}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {new Date(order.order_to_date).toLocaleDateString()}
                  </span>
                </td>
                <td className=" text-center">
                  <span className="text-sm text-slate-800 dark:text-white ">
                    {order.order_guests_number}
                  </span>
                </td>
                {paidWaiting && (
                  <td className=" text-center">
                    <button
                      onClick={() => {
                        setImageLink(order.order_paid_image);
                        setShowImagePaidModal(true);
                      }}
                      className=" hover:bg-slate-100 cursor-pointer text-blue-500
                rounded-xl text-center transition-colors p-2"
                    >
                      <File size={20} />
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center p-2">
                    <button
                      onClick={() => {
                        if (order.order_status == 1) {
                          setShowPaidAmountModal(true);
                          setOrderId(order.order_id);
                          setOrderStatus(order.order_status);
                          getRoomsData(
                            order.type_id,
                            order.order_from_date,
                            order.order_to_date,
                          );
                        } else {
                          handleAgree(
                            order.order_id,
                            order.order_paid,
                            order.order_status,
                          );
                        }
                      }}
                      className=" hover:bg-purple-600 cursor-pointer text-white bg-purple-500
                                rounded-xl text-center transition-colors p-2"
                    >
                      <Check size={20} />
                    </button>
                  </td>
                )}
                {!isDeleted && (
                  <td className=" text-center p-2">
                    <button
                      onClick={() => handleDisagree(order.order_id)}
                      className="hover:bg-red-600 cursor-pointer text-white bg-red-500
                rounded-xl text-center transition-colors  h-9 w-9"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showImagePaidModal && (
        <ImagePaidModal
          onClose={() => setShowImagePaidModal(false)}
          onModalClick={(e) => e.stopPropagation()}
          imageLink={imageLink}
        />
      )}
      {showPaidAmountModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">المبلغ المدفوع</h2>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
            />
            <select
              name="roomId"
              id="roomId"
              value={roomId}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="">اختر الغرفة</option>
              {rooms.map((room) => (
                <option key={room.room_id} value={room.room_id}>
                  {room.room_number}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPaidAmountModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                {" "}
                إلغاء
              </button>
              <button
                onClick={() => {
                  setShowPaidAmountModal(false);
                  handleAgree(orderId, paidAmount, orderStatus, roomId);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {" "}
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTable;
