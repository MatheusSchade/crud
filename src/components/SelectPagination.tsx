import { Dispatch, Fragment, SetStateAction } from "react"
import styles from "../styles/SelectPagination.module.css"

const SelectPagination: React.FC<{
  itensPerPage: number,
  setItensPerPage: Dispatch<SetStateAction<string | number | readonly string[]>>
}> = ({ itensPerPage, setItensPerPage }) => {
  return (
    <Fragment>
      <div>
        <label htmlFor="itensPerPage" className={`text-sm`}>Itens por página:</label>
        <select id='itensPerPage' value={itensPerPage}
          className={`${styles.selectPagination} ml-2 w-10 font-semibold`}
          onChange={(e) => setItensPerPage(Number(e?.target?.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </Fragment>
  )
}
export default SelectPagination