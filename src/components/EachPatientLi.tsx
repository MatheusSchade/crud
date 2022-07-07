import { Fragment, useEffect, useState } from 'react'
import styles from "../styles/EachPatientLi.module.css"
import { Patient } from '../types/Patient'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import convertDate from '../services/invertDate'
import axios from 'axios'
import { BASE_URL } from '../constants/urls'
import Modal from './Modal'
import { deletePatient } from '../services/deletePatient'

const EachPatientLi: React.FC<{ patient: Patient, manageCallback: any }> = ({ patient, manageCallback }) => {
  const [eachPatientHelper, setEachPatientHelper] = useState(null)

  const onClickDelete = async () => {
    await deletePatient(patient?.id)
    await manageCallback(patient?.id)
  }

  const eachPatientCallBack = (childData) => {
    setEachPatientHelper(childData)
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
          <button className={`${styles.deleteBtn}`}>
            <TrashIcon onClick={onClickDelete} className="h-5 w-5 text-blue-500" />
          </button>
        </td>
      </tr>

    </Fragment>
  )
}
export default EachPatientLi