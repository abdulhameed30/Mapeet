import logo from "../../assets/logo.png";

function Loader() {
  return (
   <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-40"
     
    >

      <div className="relative flex items-center justify-center">

        {/* دائرة التحميل */}
        <div className="absolute w-28 h-28 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>

        {/* الشعار */}
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 object-contain"
        />

      </div>

    </div>
  );
}

export default Loader;