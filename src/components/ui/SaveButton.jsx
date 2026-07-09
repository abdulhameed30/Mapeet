import { Save } from "lucide-react";
import React from "react";

function SaveButton() {
  return (
    <button
      type="submit"
      className="w-30 p-2 font-extrabold md:text-2xl text-xl bg-blue-500 text-white rounded
         hover:bg-blue-600  transition-all cursor-pointer hover:shadow-2xl flex justify-around"
    >
      <span>حفظ</span> <Save />
    </button>
  );
}

export default SaveButton;
