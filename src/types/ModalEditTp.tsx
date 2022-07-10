import { Form } from "./Form";
import { Patient } from "./Patient";
import ZipCode from "./ZipCode";

export default interface ModalEditTp {
  patient: Patient,
  helperToEdit?: (form: Form, id: string, zipCodeData: ZipCode) => void
}