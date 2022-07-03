import styles from "../styles/PageHeadTitle.module.css"
import { Fragment } from "react"

const PageHeadTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Fragment>
      <h1 className={`text-center font-bold pageTitle mb-3`}>{text}</h1>
    </Fragment>
  )
}
export default PageHeadTitle