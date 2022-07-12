import { Fragment } from "react"
import EachAcordionMobileInfoTp from "../types/EachLineAccordionInfoTp"

const EachAccordionMobileInfo: React.FC<EachAcordionMobileInfoTp> = ({ info, text }) => {
  return (
    <Fragment>
      <p>
        <strong>{text}</strong>
        {info}
      </p>
    </Fragment>
  )
}
export default EachAccordionMobileInfo