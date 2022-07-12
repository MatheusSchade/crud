import styles from "../styles/Footer.module.css"
import LogoApp from "./LogoApp"

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footerBase} flex flex-col mt-8 px-8 sm:px-12`}>
      <div className="h-3/5 w-full flex items-center justify-between">
        <span className=" mx-auto">
          <LogoApp />
        </span>
      </div>
      <div className="mt-0 h-2/5 border-t border-t-slate-500 w-full flex items-center">
        <span className="contrastStrongText text-xs mx-auto pt-1">Todos os direitos reservados &copy; | 2022</span>
      </div>
    </footer>
  )
}
export default Footer