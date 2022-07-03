import styles from "../styles/RouteButton.module.css"
import Link from "next/link"

const RouteButton: React.FC<{ path: string, title: string }> = ({ path, title }) => {
  return (
    <Link href={path}>
      <a>
        <button className={`mainBtn font-semibold py-2 px-4 border border-gray-400 rounded shadow`}>
          {title}
        </button>
      </a>
    </Link>
  )
}
export default RouteButton