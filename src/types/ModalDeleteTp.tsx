import { Dispatch, SetStateAction } from "react";
import { Patient } from "./Patient";
import Size from "./Size";

export default interface ModalDeleteTp {
  patient: Patient,
  helperToDelete?: (idToDelete: string) => void
  setIsAccordionOpen?: Dispatch<SetStateAction<boolean>>
  size?: Size
}