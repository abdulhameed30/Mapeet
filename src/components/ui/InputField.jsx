import React from "react";

function InputField({ lableText, type, isRequired = true, value, name, onChange, isDisabled= false , error = null }) {
  return (
    <div>
      <label htmlFor="" className=" text-slate-600 mt-4 text-xl">
        <span>{lableText} </span> 
      </label>
      <input
        type={type}
        required={isRequired == true}
        value={value}
        name={name}
        onChange={onChange}
        disabled = {isDisabled == true}
        className="pr-10 pl-4 mt-3 h-10 w-full text-xl
                     py-2.5 bg-slate-50 dark:bg-slate-800 border
                        border-slate-500 rounded text-slate-800 dark:text-white
                       placeholder-slate-500 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      
    </div>
  );
}

export default InputField;
