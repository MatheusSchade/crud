import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HeadContent from '../components/HeadContent'
import Link from 'next/link'
import RouteButtonButton from '../components/RouteButton'

const Home: React.FC = () => {
  return (
    <div>
      <HeadContent title={`Home - CRUD Medcloud`} />
      <h1 className='text-center mt-24 pageTitle font-bold'>
        Bem vindo ao CRUD Medcloud
      </h1>
      <h2 className='text-center mt-12 w-1/2 mx-auto text-xl font-semibold'>Registre um novo paciente no banco de dados ou visualize a lista com todos os clientes já registrados</h2>
      <nav className='text-center mt-24'>
        <RouteButtonButton path={`/registrar`} title={`Registrar paciente`} />
        <RouteButtonButton path={`/gerenciar`} title={`Gerenciar pacientes`} />
      </nav>
    </div >
  )
}

export default Home
