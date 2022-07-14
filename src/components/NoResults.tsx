import { InformationCircleIcon } from "@heroicons/react/outline"
import { Fragment } from "react"

const NoResults: React.FC = () => {
  return (
    <Fragment>
      <tr className="text-center w-full flex items-center justify-center pt-3">
        <td>
          <InformationCircleIcon className="h-10 w-10 mx-auto" />
          <span className="md:text-lg text-base">Não foi possível encontrar nenhum resultado para a busca!</span>
        </td>
      </tr>
    </Fragment>
  )
}
export default NoResults