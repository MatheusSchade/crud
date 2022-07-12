import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";

export default interface PaginationAreaTp {
  itensPerPage: number,
  setItensPerPage: Dispatch<SetStateAction<number>>,
  currentPage: number,
  allPatients: Form[],
  pages: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  helperCatchTyped: (data: string) => void,
  showFilter: boolean
}