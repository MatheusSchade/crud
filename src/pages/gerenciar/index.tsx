import axios from 'axios'
import { Fragment, useEffect, useState, useCallback } from 'react'
import EachPatientLi from '../../components/EachPatientLi'
import HeadContent from '../../components/HeadContent'
import PageHeadTitle from '../../components/PageHeadTitle'
import { BASE_URL } from '../../constants/urls'
import styles from '../../styles/Manage.module.css'
import { Form } from '../../types/Form'
import RouteButton from "../../components/RouteButton"
import Loader from '../../components/Loader'
import FunctionButton from '../../components/FunctionButton'


const Manage: React.FC = () => {
  const [title] = useState<string>(`Gerenciar pacientes`)
  const [allPatients, setAllPatients] = useState<Form[] | null>([])
  const [child, setChild] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getAllPatients = async () => {
    await axios.get(`${BASE_URL}/patient`)
      .then((response) => {
        setAllPatients(response?.data)
      })
      .catch((error) => {
        console.log(error?.response)

      })
    setIsLoading(false)
  }

  const helperManageCallback = (data) => {
    setChild(data)
  }

  const returnPatient = allPatients?.map((item: Form, index: number) => {
    return (
      <EachPatientLi manageCallback={helperManageCallback} key={index} patient={item} />
    )
  })

  useEffect(() => {
    getAllPatients()
  }, [child])

  console.log(child)

  return (

    isLoading
      ? <Loader /> :
      <Fragment>
        <HeadContent title={`Gerenciar Pacientes - CRUD Medcloud`} />
        <section>
          <PageHeadTitle text={title} />
          {allPatients?.length > 0 ?
            <div className='pt-3 w-full'>
              <table className={``}>
                <tbody>
                  <tr className={`grid grid-cols-12 text-center ${styles.headTable}`}>
                    <th className={`col-span-1 my-auto`}>ID</th>
                    <th className={`col-span-3 my-auto`}>Nome</th>
                    <th className={`col-span-1 my-auto`}>Data de nascimento</th>
                    <th className={`col-span-3 my-auto`}>E-mail</th>
                    <th className={`col-span-3 my-auto`}>Endereço</th>
                    <th className={`col-span-1 my-auto`}></th>
                  </tr>
                  {returnPatient}
                </tbody>
              </table>
            </div> :
            <div className={`mt-16 text-center`}>
              <p className={`my-5 text-center`}>Não há nenhum paciente cadastrado para exibir. </p>
              <RouteButton path='/registrar' title={`Adicionar primeiro paciente`} />
            </div>
          }
        </section>
        <div className='text-center sm:mt-12 mt-4 flex items-center justify-center flex-col-reverse sm:flex-row'>
          <div className='my-2'>
            <FunctionButton click={() => window.history.back()} text={`Voltar`} />
          </div>
        </div>
      </Fragment>
  )
}
export default Manage