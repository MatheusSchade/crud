import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";
import { Patient } from "./Patient";
import Size from "./Size";
import ZipCode from "./ZipCode";

export default interface ModalEditTp {
  patient: Patient,
  helperToEdit?: (form: Form, id: string, zipCodeData: ZipCode) => void
  setIsAccordionOpen?: Dispatch<SetStateAction<boolean>>
  size?: Size
}