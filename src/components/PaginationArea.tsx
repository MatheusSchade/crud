import { Dispatch, Fragment, SetStateAction, useEffect } from "react"
import useForms from "../hooks/useForms"
import { Form } from "../types/Form"
import InputText from "./InputForm"
import Pagination from "./Pagination"
import SelectPagination from "./SelectPagination"

const PaginationArea: React.FC<{
  itensPerPage: number,
  setItensPerPage: Dispatch<SetStateAction<number>>,
  currentPage: number,
  allPatients: Form[],
  pages: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  helperCatchTyped
}> = ({ itensPerPage, setItensPerPage, currentPage, allPatients, pages, setCurrentPage, helperCatchTyped }) => {
  const [form, onChange, clear] = useForms({ search: "" })

  useEffect(() => {
    helperCatchTyped(form?.search)
  }, [form?.search])

  return (
    <Fragment>
      <div className='my-3 flex justify-between items-center px-2'>
        <SelectPagination itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
        <InputText type={`text`} value={form?.search} name={`search`} change={onChange} placeholder={`Pesquise um paciente pelo nome`} size={`w-full md:w-1/2`} />
        <Pagination currentPage={currentPage} itensPerPage={itensPerPage} allPatients={allPatients} pages={pages} setCurrentPage={setCurrentPage} />
      </div>
    </Fragment>
  )
}
export default PaginationArea