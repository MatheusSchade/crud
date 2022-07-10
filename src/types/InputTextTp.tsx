import { ChangeEventHandler, FocusEvent } from "react";

export default interface InputTextTp {
  size: string,
  label?: string,
  change?: ChangeEventHandler<HTMLInputElement> | null,
  value: string,
  name?: string,
  type: string,
  placeholder: string,
  inputMode?: string,
  blur?: any
  maxLength?: number
}
