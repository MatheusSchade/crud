import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";

export default interface PaginationTp {
  itensPerPage: number,
  allPatients: Form[],
  pages: number,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
}