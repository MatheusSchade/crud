import { Fragment } from 'react'
import styles from "../styles/EachPatientLi.module.css"
import convertDate from '../services/convertDate'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import EachPatientLiTp from '../types/EachPatientLiTp'
import EachAccordionInfo from './EachAccordionInfo'

const EachPatientLi: React.FC<EachPatientLiTp> = ({ patient, helperToEdit, helperToDelete }) => {
  return (
    <Fragment>
      <tr className={`grid grid-cols-12 text-center ${styles.fontDefault}`}>
        <EachAccordionInfo style='col-span-1 mx-1' info={patient?.id} />
        <EachAccordionInfo style='col-span-2 mx-1' info={patient?.name} />
        <EachAccordionInfo style='col-span-2 mx-1' info={convertDate(patient?.birthdate)} />
        <EachAccordionInfo style='col-span-3 mx-1' info={patient?.email} />
        <td className={`col-span-3 mx-1 ${styles.eachData}`}>
          <span data-bs-toggle="tooltip" title={`${patient?.address}, ${patient?.numberAddress} - ${patient?.city}/${patient?.state} - ${patient?.zipCode}`}>
            {patient?.address}, {patient?.numberAddress} - {patient?.city}/{patient?.state} - {patient?.zipCode}</span>
        </td>
        <td className={`col-span-1 flex items-center justify-evenly`}>
          <ModalEdit helperToEdit={helperToEdit} patient={patient} />
          <ModalDelete helperToDelete={helperToDelete} patient={patient} />
        </td>
      </tr>
    </Fragment>
  )
}
export default EachPatientLi