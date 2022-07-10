import { ChevronDoubleUpIcon } from "@heroicons/react/outline"
import scrollTo from "../services/scrollTo"

const TopButton: React.FC = () => {
  return (
    <button data-bs-toggle="tooltip" title={`Ir para o topo da página`}
      onClick={() => scrollTo(0)}
      className='fixed h-10 w-10 btnDefaultColor bottom-6 right-7 rounded-full hover:scale-110 font-bold '>
      <ChevronDoubleUpIcon className="h-4 w-4 text-center mx-auto" />
    </button>
  )
}
export default TopButton