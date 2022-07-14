import { Form } from "./Form";
import { Patient } from "./Patient";
import ZipCode from "./ZipCode";

export default interface PatientListMobileTp {
  currentItens: Form[] | null,
  helperToDelete: (idToDelete: string) => void,
  helperToEdit: (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => void
  filteredPatients: Patient[]
}