import Link from "next/link"
import RouteButtonTp from "../types/RouteButtonTp"

const RouteButton: React.FC<RouteButtonTp> = ({ path, title }) => {
  return (
    <Link href={path}>
      <a className="w-full">
        <button className={`mainBtn font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
          {title}
        </button>
      </a>
    </Link>
  )
}
export default RouteButton