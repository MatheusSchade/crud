import { Fragment } from "react"

const FunctionButton: React.FC<{
  text: string,
  click?: (event: { preventDefault: () => void } | (() => void)) => void 
}> = ({ text, click }) => {
    return (
      <button onClick={click} className={`text-center mainBtn font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
        {text}
      </button>
    )
  }
export default FunctionButton