import Head from 'next/head'
import { Fragment, useState } from 'react'
import HeadContent from '../../components/HeadContent'
import PageHeadTitle from '../../components/PageHeadTitle'
import styles from '../styles/Manage.module.css'


const Manage: React.FC = () => {
  const [title] = useState<string>(`Gerenciar pacientes`)

  return (
    <Fragment>
      <HeadContent title={`Gerenciar Pacientes - CRUD Medcloud`} />
      <section>
        <PageHeadTitle text={title} />
      </section>

    </Fragment>
  )
}
export default Manage