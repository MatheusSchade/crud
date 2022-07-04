import { Fragment, useState } from 'react'
import styles from "../styles/EachPatientLi.module.css"
import { Patient } from '../types/Patient'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import convertDate from '../services/invertDate'
import axios from 'axios'
import { BASE_URL } from '../constants/urls'

const EachPatientLi: React.FC<{ patient: Patient}> = ({ patient}) => {


  const deletePatient = async () => {
    console.log(patient?.id)
    axios.delete(`${BASE_URL}/patient/${patient?.id}`)
      .then((response) => {
        console.log(response?.data)
      })
      .catch((error) => {
        console.log(error?.response?.data)
      })
  }

  




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
          <button className={`${styles.editBtn}`}>
            <PencilAltIcon className="h-5 w-5" />
          </button>
          <button className={`${styles.deleteBtn}`}>
            <TrashIcon onClick={deletePatient} className="h-5 w-5 text-blue-500" />
          </button>
        </td>
      </tr>

    </Fragment>
  )
}
export default EachPatientLi