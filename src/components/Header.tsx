import React from "react"
import styles from "../styles/Header.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const Header: React.FC = () => {
  const query = useRouter()
  const [route, setRoute] = useState<string | null>("")

  useEffect(() => {
    setRoute(query?.pathname)
  }, [query?.pathname])

  return (
    <header className={`${styles.headerBase} sm:flex-row flex-col flex items-center justify-evenly sm:justify-between px-8 sm:px-12`}>
      <h1>
        <Link href="/">
          <a>
            <span className={`${styles.logo}`}>CRUD Medcloud</span>
          </a>
        </Link>
      </h1>
      <nav>

        <Link href="/">
          <a className={(route === "/") ? `${styles.navLinkSelected}` : `${styles.navLinks}`}>Home</a>
        </Link>

        <Link href="/registrar">
          <a className={(route === "/registrar") ? `${styles.navLinkSelected}` : `${styles.navLinks}`}>Registrar</a>
        </Link>

        <Link href="/gerenciar">
          <a className={(route === "/gerenciar") ? `${styles.navLinkSelected}` : `${styles.navLinks}`}>Gerenciar</a>
        </Link>

      </nav>
    </header>
  )
}
export default Header
