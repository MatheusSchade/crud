import Link from "next/link"

const LogoApp: React.FC = () => {
  return (
    <h1>
      <Link href="/">
        <a>
          <span className={`logo`}>CRUD</span>
        </a>
      </Link>
    </h1>
  )
}
export default LogoApp