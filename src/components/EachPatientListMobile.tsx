import { useState } from "react"
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import styles from "../styles/EachPatientListMobile.module.css"
import convertDate from "../services/convertDate"
import ModalEdit from "./ModalEdit"
import ModalDelete from "./ModalDelete"
import EachPatientLiTp from "../types/EachPatientLiTp"
import EachAccordionMobileInfo from "./EachAccordionMobileInfo"

const EachPatientListMobile: React.FC<EachPatientLiTp> = ({ helperToDelete, helperToEdit, patient }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false)

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
            <EachAccordionMobileInfo text="E-mail: " info={patient?.email} />
            <EachAccordionMobileInfo text="Data de nascimento: " info={convertDate(patient?.birthdate)} />
            <EachAccordionMobileInfo text="Logradouro: " info={patient?.address} />
            <EachAccordionMobileInfo text="Número: " info={patient?.numberAddress} />
            {patient?.complement && <EachAccordionMobileInfo text="Complemento: " info={patient?.complement} />}
            <EachAccordionMobileInfo text="Bairro: " info={patient?.neighborhood} />
            <EachAccordionMobileInfo text="Cidade: " info={patient?.city} />
            <EachAccordionMobileInfo text={`CEP: `} info={patient?.zipCode} />
            <EachAccordionMobileInfo text={`Estado: `} info={patient?.state?.toUpperCase()} />
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