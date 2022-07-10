import FunctionButtonTp from "../types/FunctionButtonTp"

const FunctionButton: React.FC<FunctionButtonTp> = ({ text, click, alt, isLoading }) => {
  return (
    <button onClick={click} className={`text-center mainBtn font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
      {isLoading ?
        <div className="flex items-center justify-center">
          <span>{alt}</span>
          <span className="ml-1.5 spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white border-r-gray-800"></span>
        </div> :
        <span>{text}</span>
      }
    </button>
  )
}
export default FunctionButton