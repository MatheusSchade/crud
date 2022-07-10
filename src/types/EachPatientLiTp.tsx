import { Form } from "./Form"
import { Patient } from "./Patient"
import ZipCode from "./ZipCode"

export default interface EachPatientLiTp {
  helperToEdit?: (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => void
  helperToDelete?: (idToDelete: string) => void
  patient: Patient
}

