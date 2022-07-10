import getTodayDate from "../services/getTodayDate"
import convertDate from "../services/convertDate"
import InputTextTp from "../types/InputTextTp"

const InputText: React.FC<InputTextTp> = ({ size, label, change, value, name, type, placeholder, blur, maxLength }) => {

  return (
    <div className={`mb-3 px-1 ${size}`}>
      <label className="block outline-none text-gray-700 text-sm font-bold mb-2" htmlFor={name} >
        {label}
      </label>
      <input
        minLength={0}
        maxLength={maxLength}
        min="1900-01-01"
        max={convertDate(getTodayDate())}
        onBlur={blur}
        value={value}
        onChange={change}
        className={
          `bg-white
           text-gray-400
            outline-none
             shadow
               border
                rounded w-full
                 py-2 px-3
                  leading-tight
                   focus:outline-none
                    focus:shadow-outline
                    `}
        id={name} name={name} type={type} placeholder={placeholder} />
    </div>
  )
}
export default InputText