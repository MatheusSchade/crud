import { Fragment } from "react"
import styles from "../styles/SelectPagination.module.css"
import SelectPaginationTp from "../types/SelectPaginationTp"

const SelectPagination: React.FC<SelectPaginationTp> = ({ itensPerPage, setItensPerPage }) => {
  return (
    <Fragment>
      <div className="md:mr-4">
        <label htmlFor="itensPerPage" className={`text-sm`}>Itens por página:</label>
        <select id='itensPerPage' value={itensPerPage}
          className={`${styles.selectPagination} ml-2 w-10 font-semibold`}
          onChange={(e) => setItensPerPage(Number(e?.target?.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </Fragment>
  )
}
export default SelectPagination