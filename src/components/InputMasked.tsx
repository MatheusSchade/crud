
import InputMask from "react-input-mask";

import { ChangeEventHandler } from "react"

const InputMasked: React.FC<{
  mask?: string | Array<RegExp>,
  size: string,
  label: string,
  change: ChangeEventHandler<HTMLInputElement> | null,
  value: string,
  name: string,
  type: string,
  placeholder: string,
  inputMode?: string,
  blur?: any
}> = ({
  size, label, change, value, name, type, placeholder, mask, blur
}) => {
    return (
      <div className={`mb-3 px-1 ${size}`}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name} >
          {label}
        </label>
        <InputMask mask={mask}
          value={value} onChange={change}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id={name} name={name} type={type} placeholder={placeholder}
        />
      </div>
    )
  }
export default InputMasked