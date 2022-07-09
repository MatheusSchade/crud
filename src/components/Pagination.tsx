import { Dispatch, Fragment, SetStateAction } from "react"
import { Form } from "../types/Form"
import styles from "../styles/Pagination.module.css"

const Pagination: React.FC<{
  itensPerPage: number,
  allPatients: Form[],
  pages: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
}> = ({ itensPerPage, allPatients, pages, setCurrentPage, currentPage }) => {
  return (
    <Fragment>
      {(itensPerPage <= allPatients?.length) && <div>
        {Array.from(Array(pages), (item, index) => {
          return <button
            onClick={(e: any) => setCurrentPage(Number(e?.target?.value))}
            className={(currentPage == index) ?
              `${styles.btnPaginationSelected}` :
              `${styles.btnPagination}`}
            value={index}
            key={index}
          >
            {index + 1}
          </button>
        })}
      </div>}
    </Fragment>
  )
}
export default Pagination