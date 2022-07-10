import { useState } from "react"
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import styles from "../styles/EachPatientListMobile.module.css"
import convertDate from "../services/convertDate"
import ModalEdit from "./ModalEdit"
import ModalDelete from "./ModalDelete"
import EachPatientLiTp from "../types/EachPatientLiTp"

const EachPatientListMobile: React.FC<EachPatientLiTp> = ({ helperToDelete, helperToEdit, patient }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const invertAccordion = () => {
    isAccordionOpen ? setIsAccordionOpen(false) : setIsAccordionOpen(true)
  }

  return (
    <li className={`list-none ${styles.eachItemCard}`}>
      <button className={`${styles.accordionButton} grid grid-cols-12`} onClick={invertAccordion}>
        <div className={`${styles.titleAccordion} col-span-10`}>{patient?.id} - {patient?.name}</div>
        <div className="col-span-2">
          {isAccordionOpen ? <MinusSmIcon className="h-5 w-5" /> : <PlusSmIcon className="h-5 w-5" />}
        </div>
      </button>
      <div className={`${styles.isOpenArea} relative`}>
        <div className={isAccordionOpen ? `${styles.fadeIn}` : `${styles.fadeOut}`}>
          <hr />
          <div className={isAccordionOpen ? `${styles.show}` : `${styles.dontShow}`}>
            <span><strong>E-mail:</strong> {patient?.email}</span>
            <p><strong>Data de nascimento:</strong> {convertDate(patient?.birthdate)}</p>
            <p><strong>Logradouro:</strong> {patient?.address}</p>
            <span><strong>Número:</strong> {patient?.numberAddress}</span>
            {patient?.complement && <span>, {patient?.complement}</span>}
            <p><strong>Cidade:</strong> {patient?.city}</p>
            <p><strong>CEP:</strong> {patient?.zipCode}</p>
            <p><strong>Estado:</strong> {patient?.state?.toUpperCase()}</p>
            <div className={`flex absolute ${styles.actionsBtnArea}`}>
              <ModalEdit setIsAccordionOpen={setIsAccordionOpen} helperToEdit={helperToEdit} patient={patient} />
              <ModalDelete setIsAccordionOpen={setIsAccordionOpen} helperToDelete={helperToDelete} patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
export default EachPatientListMobile