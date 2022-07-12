import styles from "../styles/Loader.module.css"

const Loader: React.FC = () => {
  return (
    <div className={`${styles.center}`}>
      <div className={`${styles.loader} mx-auto border-4 animate-spin ease-linear rounded-full`}></div>
    </div>
  )
}
export default Loader

