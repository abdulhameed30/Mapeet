import React from "react";
import logo from "../../assets/logo.png"

function Loader2() {
  return (
    <div className=" flex items-center justify-center w-96">
      <div className="h-96 "></div>
      {/* دائرة التحميل */}
      <div className=" absolute w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>

      {/* الشعار */}
      <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
      <div className="h-96"></div>
    </div>
  );
}

export default Loader2;
