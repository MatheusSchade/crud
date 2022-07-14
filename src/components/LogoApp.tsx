import Link from "next/link"

const LogoApp: React.FC = () => {
  return (
    <h1>
      <Link href="/">
        <a>
          <span className={`logo`}>CRUD Medcloud</span>
        </a>
      </Link>
    </h1>
  )
}
export default LogoApp