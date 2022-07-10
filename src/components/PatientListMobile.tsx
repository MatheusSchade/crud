import { Fragment } from "react"
import { Form } from "../types/Form"
import PatientListMobileTp from "../types/PatientListMobileTp"
import EachPatientListMobile from "./EachPatientListMobile"

const PatientListMobile: React.FC<PatientListMobileTp> = ({ currentItens, helperToDelete, helperToEdit }) => {
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