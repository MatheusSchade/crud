import HeadContent from '../components/HeadContent'
import RouteButtonButton from '../components/RouteButton'

const Home: React.FC = () => {
  return (
    <div>
      <HeadContent title={`Home - CRUD Medcloud`} />
      <h1 className='text-center mt-24 pageTitle font-bold'>
        Bem vindo ao CRUD Medcloud
      </h1>
      <h2 className='text-center mt-12 sm:w-1/2 w-full mx-auto text-xl font-semibold'>
        Registre um novo paciente no banco de dados ou visualize a lista com todos os clientes já registrados.</h2>
      <nav className='text-center mt-24 flex flex-col sm:flex-row justify-center items-center'>
        <div className='my-2 flex btnArea'>
          <RouteButtonButton path={`/registrar`} title={`Registrar paciente`} />
        </div>
        <div className='my-2 flex btnArea'>
          <RouteButtonButton path={`/gerenciar`} title={`Gerenciar pacientes`} />
        </div>
      </nav>
    </div >
  )
}

export default Home
