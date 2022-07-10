import { Dispatch, SetStateAction } from "react";

export default interface SelectPaginationTp {
  itensPerPage: number,
  setItensPerPage: Dispatch<SetStateAction<string | number | readonly string[]>>
}
