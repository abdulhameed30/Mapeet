import React from "react";
import { Settings } from "lucide-react";
import useHotelWallet from "./useHotelWallet";
import Loader2 from "../../components/ui/Loader2";

function HotelWalletsModal({ onClose, onModalClick }) {
  const {
    wallets,
    setWallets,
    handleChangeWallets,
    handleSubmit,
    handleChange,
    isLoading
  } = useHotelWallet();
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
          <h1>تهيئة المحافظ</h1>
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
            {wallets.map((wallet) => (
              <div
                key={wallet.wallet_id}
                className="bg-slate-100 h-14 w-90  rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-5">
                  <img
                    src={`http://192.168.124.2:8000/upload/wallets/${wallet.wallet_image}`}
                    alt=""
                    className="w-10 h-10 rounded"
                  />
                  <label> {wallet.wallet_name}</label>
                </div>
                <div className="space-x-2">
                  <input
                    type="text"
                    value={wallet.wallet_number || ""}
                    onChange={(e) => handleChange(wallet.wallet_id, e)}
                    className="h-8 pr-3 w-40 md:text-xl
                        py-2.5 bg-white dark:bg-slate-800 border
                        dark:border-slate-700 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="checkbox"
                    checked={wallet.wallet_status === 1}
                    onChange={() =>
                      handleChangeWallets(
                        wallet.wallet_id,
                        wallet.wallet_status,
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-8  pb-5 flex space-x-3">
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

export default HotelWalletsModal;
