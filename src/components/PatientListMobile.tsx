import { Fragment } from "react"
import { Form } from "../types/Form"
import PatientListMobileTp from "../types/PatientListMobileTp"
import EachPatientListMobile from "./EachPatientListMobile"
import NoResults from "./NoResults"

const PatientListMobile: React.FC<PatientListMobileTp> = ({ currentItens, helperToDelete, helperToEdit, filteredPatients }) => {
  const patientList = currentItens.map((item: Form, index: number) => {
    return (
      <EachPatientListMobile helperToDelete={helperToDelete} helperToEdit={helperToEdit} key={index} patient={item} />
    )
  })

  return (
    <Fragment>
      {filteredPatients?.length > 0 ? patientList : <NoResults />}
    </Fragment>
  )
}
export default PatientListMobile