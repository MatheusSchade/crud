import { Fragment } from "react"
import styles from "../styles/EachAccordionInfo.module.css"
import EachAccordionInfoTp from "../types/EachAccordionInfoTp"

const EachAccordionInfo: React.FC<EachAccordionInfoTp> = ({ style, info }) => {
  return (
    <Fragment>
      <td className={`${style} ${styles.eachData}`}>
        <span data-bs-toggle="tooltip" title={info}>{info}</span>
      </td>
    </Fragment>
  )
}
export default EachAccordionInfo