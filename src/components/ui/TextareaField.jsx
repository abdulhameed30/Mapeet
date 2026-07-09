import React from 'react'

function TextareaField({ lableText, type, isRequired = true, value, name, onChange, isDisabled= false, rowCount = 3 }) {
  return (
    <div>
      <label htmlFor="" className=" text-slate-600 mt-4 md:text-xl ">
       {lableText}
      </label>
      <textarea
        type={type}
        required={isRequired == true}
        value={value}
        name={name}
        onChange={onChange}
        rows={rowCount}
        className="pr-10 pl-4 mt-4 py-4  w-full md:text-xl
                     bg-slate-100  dark:bg-slate-800 border
                    dark:border-slate-700 rounded text-slate-800 dark:text-white
                    placeholder-slate-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      ></textarea>
    </div>
  )
}

export default TextareaField
