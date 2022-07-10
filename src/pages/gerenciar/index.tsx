import axios from 'axios'
import { Fragment, useEffect, useState, useLayoutEffect } from 'react'
import EachPatientLi from '../../components/EachPatientLi'
import HeadContent from '../../components/HeadContent'
import PageHeadTitle from '../../components/PageHeadTitle'
import { BASE_URL } from '../../constants/urls'
import styles from '../../styles/Manage.module.css'
import { Form } from '../../types/Form'
import RouteButton from "../../components/RouteButton"
import Loader from '../../components/Loader'
import { editPatient } from '../../services/editPatient'
import { deletePatient } from '../../services/deletePatient'
import ZipCode from '../../types/ZipCode'
import PaginationArea from '../../components/PaginationArea'
import Size from '../../types/Size'
import PatientListMobile from '../../components/PatientListMobile'
import PatientList from '../../components/PatientList'
import NoRegistredPatients from '../../components/NoRegistredPatients'


const Manage: React.FC<{ size: Size }> = ({ size }) => {
  const [title] = useState<string>(`Gerenciar pacientes`)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allPatients, setAllPatients] = useState<Form[] | null>([])
  const [idToDelete, setIdToDelete] = useState(null)
  const [formToEdit, setFormToEdit] = useState(null)
  const [zipToEdit, setZipToEdit] = useState(null)
  const [idToEdit, setIdToEdit] = useState(null)
  const [newFormToEdit, setNewFormToEdit] = useState(null)
  const [itensPerPage, setItensPerPage] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [typed, setTyped] = useState<string | null>(null)
  const [filteredPatients, setFilteredPatients] = useState<Form[] | null>(allPatients)
  const [aa, setAa] = useState<null | Form[]>(null)

  const pages: number = Math.ceil(filteredPatients?.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens: Form[] | null = filteredPatients.slice(startIndex, endIndex)

  const getAllPatients = async () => {
    await axios.get(`${BASE_URL}/patient`)
      .then((response) => {
        setAllPatients(response?.data)
        setFilteredPatients(response?.data)
      })
      .catch((error) => {
        console.log(error?.response)
      })
    setIsLoading(false)
  }

  const helperToEdit = (form: Form, idToEdit: string, zipCodeData: ZipCode, newForm?: Form) => {
    setFormToEdit(form)
    setZipToEdit(zipCodeData)
    setIdToEdit(idToEdit)
    setNewFormToEdit(newForm)
  }

  const helperToDelete = (idToDelete: string) => {
    setIdToDelete(idToDelete)
  }

  const helperCatchTyped = (data: string) => {
    setTyped(data)
  }

  const filteringPatients = (typed: string) => {
    let newPatientsList = allPatients?.filter((item) => {
      if (item?.name?.toLowerCase()?.trim()?.includes(typed?.toLowerCase()?.trim())) {
        return item
      }
    })
    setFilteredPatients(newPatientsList)
  }

  useEffect(() => {
    getAllPatients()
  }, [])

  useEffect(() => {
    idToDelete && deletePatient(idToDelete)
    idToDelete && setIsLoading(true)
    idToDelete && setTimeout(() => {
      getAllPatients()
      setIdToDelete(null)
      setIsLoading(false)
    }, 1000)
  }, [idToDelete])

  useEffect(() => {
    idToEdit && editPatient(formToEdit, idToEdit, zipToEdit)
    idToDelete && setIsLoading(true)
    idToEdit && setTimeout(() => {
      getAllPatients()
      setFormToEdit(null)
      setZipToEdit(null)
      setIdToEdit(null)
      setNewFormToEdit(null)
      setIsLoading(false)
    }, 1000)
  }, [idToEdit, formToEdit, zipToEdit, idToDelete])

  useLayoutEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])

  useEffect(() => {
    filteringPatients(typed)
    setCurrentPage(0)
  }, [typed])

  return (
    <div className='min-h-screen'>
      {isLoading ? <Loader /> :
        <Fragment>
          <HeadContent title={`Gerenciar Pacientes - CRUD Medcloud`} />
          <section>
            <PageHeadTitle text={title} />
            {allPatients?.length > 0 ?
              <div className='py-3 w-full'>
                <PaginationArea showFilter={true} helperCatchTyped={helperCatchTyped} itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} currentPage={currentPage} allPatients={allPatients} pages={pages} setCurrentPage={setCurrentPage} />
                {size?.width > 768 ?
                  <PatientList
                    currentItens={currentItens}
                    helperToDelete={helperToDelete}
                    helperToEdit={helperToEdit}
                  />
                  : <PatientListMobile
                    currentItens={currentItens}
                    helperToDelete={helperToDelete}
                    helperToEdit={helperToEdit}
                  />
                }
                {itensPerPage >= 10 && currentItens.length >= 9 &&
                  <PaginationArea
                    showFilter={false}
                    helperCatchTyped={helperCatchTyped}
                    itensPerPage={itensPerPage}
                    setItensPerPage={setItensPerPage}
                    currentPage={currentPage}
                    allPatients={allPatients}
                    pages={pages}
                    setCurrentPage={setCurrentPage} />
                }
              </div> :
              <NoRegistredPatients />
            }
          </section>
          <section className='text-center sm:mt-12 mt-4 flex items-center justify-center flex-col sm:flex-row'>
            <div className='my- flex btnArea'>
              <RouteButton path='/' title={`Voltar`} />
            </div>
          </section>
        </Fragment>
      }
    </div>
  )
}
export default Manage