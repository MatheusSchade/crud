import { Patient } from "./Patient";

export default interface ModalDeleteTp {
  patient: Patient,
  helperToDelete?: (idToDelete: string) => void
}