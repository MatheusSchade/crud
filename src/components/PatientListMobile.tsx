import { Fragment } from "react"
import { Form } from "../types/Form"
import ZipCode from "../types/ZipCode"
import EachPatientListMobile from "./EachPatientListMobile"

const PatientListMobile: React.FC<{
  currentItens: Form[] | null,
  helperToDelete: (idToDelete: string) => void,
  helperToEdit: (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => void
}> = ({ currentItens, helperToDelete, helperToEdit }) => {

  const patientList = currentItens.map((item: Form, index: number) => {
    return (
      <EachPatientListMobile helperToDelete={helperToDelete} helperToEdit={helperToEdit} key={index} patient={item} />
    )
  })

  return (
    <Fragment>
      {patientList}
    </Fragment>
  )
}
export default PatientListMobile