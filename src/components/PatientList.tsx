import { Fragment } from "react"
import styles from "../styles/PatientList.module.css"
import { Form } from "../types/Form"
import ZipCode from "../types/ZipCode"
import EachPatientLi from "./EachPatientLi"

const PatientList: React.FC<{
  currentItens: Form[] | null,
  helperToDelete: (idToDelete: string) => void,
  helperToEdit: (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => void
}> = ({ currentItens, helperToDelete, helperToEdit }) => {

  const returnPatient = currentItens?.map((item: Form, index: number) => {
    return (
      <EachPatientLi
        helperToDelete={helperToDelete}
        helperToEdit={helperToEdit}
        key={index} patient={item}
      />
    )
  })

  return (
    <Fragment>
      <table className={`${styles.tableArea}`}>
        <tbody>
          <tr className={`mt-2 grid grid-cols-12 text-center ${styles.headTable}`}>
            <th className={`col-span-1 my-auto`}>ID</th>
            <th className={`col-span-2 my-auto`}>Nome</th>
            <th className={`col-span-2 my-auto`}>Data de nascimento</th>
            <th className={`col-span-3 my-auto`}>E-mail</th>
            <th className={`col-span-3 my-auto`}>Endereço</th>
            <th className={`col-span-1 my-auto`}></th>
          </tr>
          {returnPatient}
        </tbody>
      </table>
    </Fragment>
  )
}
export default PatientList