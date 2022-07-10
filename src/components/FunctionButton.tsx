import FunctionButtonTp from "../types/FunctionButtonTp"

const FunctionButton: React.FC<FunctionButtonTp> = ({ text, click }) => {
  return (
    <button onClick={click} className={`text-center mainBtn font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
      {text}
    </button>
  )
}
export default FunctionButton