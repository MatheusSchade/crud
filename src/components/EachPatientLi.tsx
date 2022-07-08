import { Fragment, useContext, useEffect, useState } from 'react'
import styles from "../styles/EachPatientLi.module.css"
import { Patient } from '../types/Patient'
import convertDate from '../services/convertDate'
import Modal from './Modal'
import { deletePatient } from '../services/deletePatient'
import ModalDelete from './ModalDelete'
import { GlobalStateContext } from '../global/GlobalStateContext'

const EachPatientLi: React.FC<{ patient: Patient, manageCallback: any }> = ({ patient, manageCallback }) => {
  const { toaster } = useContext(GlobalStateContext)
  const [eachPatientHelper, setEachPatientHelper] = useState(null)

  const onClickDelete = async () => {
    await deletePatient(patient?.id)
    await manageCallback(patient?.id)
    toaster("Paciente removido com sucesso!", 3000, "success")
  }

  const eachPatientCallBack = (data) => {
    setEachPatientHelper(data)
  }

  useEffect(() => {
    manageCallback(patient?.id)
    setEachPatientHelper(null)
  }, [eachPatientHelper])

  return (
    <Fragment>
      <tr className={`grid grid-cols-12 text-center ${styles.fontList}`}>
        <td className={`col-span-1  ${styles.eachData}`}>
          <span>{patient?.id}</span>
        </td>
        <td className={`col-span-3  ${styles.eachData}`}>
          <span>{patient?.name}</span>
        </td>
        <td className={`col-span-1 ${styles.eachData}`}>
          <span>{convertDate(patient?.birthdate)}</span>
        </td>
        <td className={`col-span-3  ${styles.eachData}`}>
          <span>{patient?.email}</span>
        </td>
        <td className={`col-span-3 ${styles.eachData}`}>
          <span>{patient?.address}, {patient?.numberAddress} - {patient?.city}/{patient?.state} - {patient?.zipCode}</span>
        </td>
        <td className={`col-span-1 flex items-center justify-evenly`}>
          <Modal eachPatientCallback={eachPatientCallBack} patient={patient} />
          <ModalDelete patient={patient} onClickDelete={onClickDelete} />
        </td>
      </tr>

    </Fragment>
  )
}
export default EachPatientLi