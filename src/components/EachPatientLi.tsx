import { Fragment } from 'react'
import styles from "../styles/EachPatientLi.module.css"
import { Patient } from '../types/Patient'
import convertDate from '../services/convertDate'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'

const EachPatientLi: React.FC<{
  patient: Patient,
  helperToEdit?: any,
  helperToDelete?: (idToDelete: string) => void,
}> = ({ patient, helperToEdit, helperToDelete, }) => {

  return (
    <Fragment>
      <tr className={`grid grid-cols-12 text-center ${styles.fontDefault}`}>
        <td className={`col-span-1 mx-1  ${styles.eachData}`}>
          <span>{patient?.id}</span>
        </td>
        <td className={`col-span-2 mx-1 ${styles.eachData}`}>
          <span data-bs-toggle="tooltip" title={patient?.name}>{patient?.name}</span>
        </td>
        <td className={`col-span-2 mx-1 ${styles.eachData}`}>
          <span data-bs-toggle="tooltip" title={convertDate(patient?.birthdate)}>{convertDate(patient?.birthdate)}</span>
        </td>
        <td className={`col-span-3 mx-1 ${styles.eachData}`}>
          <span data-bs-toggle="tooltip" title={patient?.email}>{patient?.email}</span>
        </td>
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