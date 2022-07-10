import { Fragment } from "react"
import PageHeadTitleTp from "../types/PageHeadTitleTp"

const PageHeadTitle: React.FC<PageHeadTitleTp> = ({ text }) => {
  return (
    <Fragment>
      <h1 className={`text-center font-bold pageTitle mb-3`}>{text}</h1>
    </Fragment>
  )
}
export default PageHeadTitle