import styles from "../styles/Loading.module.css"

const Loading: React.FC = () => {
  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.loader}`}></div>
    </div>

  )
}
export default Loading