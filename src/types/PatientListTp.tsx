import { Form } from "./Form";
import ZipCode from "./ZipCode";

export default interface PatientListTp {
  currentItens: Form[] | null,
  helperToDelete: (idToDelete: string) => void,
  helperToEdit: (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => void
}
