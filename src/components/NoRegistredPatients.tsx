import { Fragment } from "react"
import RouteButton from "./RouteButton"

const NoRegistredPatients: React.FC = () => {
  return (
    <Fragment>
      <div className={`mt-16 text-center`}>
        <p className={`my-5 mb-12 text-center`}>Não há nenhum paciente cadastrado para exibir. </p>
        <RouteButton path='/registrar' title={`Adicionar primeiro paciente`} />
      </div>
    </Fragment>
  )
}
export default NoRegistredPatients