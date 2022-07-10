import styles from "../styles/Pagination.module.css"
import PaginationTp from "../types/PaginationTp"

const Pagination: React.FC<PaginationTp> = ({ itensPerPage, allPatients, pages, setCurrentPage, currentPage }) => {
  return (
    <div className="mt-3 md:mt-0">
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
    </div>
  )
}
export default Pagination