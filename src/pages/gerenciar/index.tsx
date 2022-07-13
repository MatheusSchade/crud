import axios from 'axios'
import { Fragment, useEffect, useState, useLayoutEffect, useContext, useCallback } from 'react'
import HeadContent from '../../components/HeadContent'
import PageHeadTitle from '../../components/PageHeadTitle'
import { BASE_URL } from '../../constants/urls'
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
import { GlobalStateContext } from '../../global/GlobalStateContext'
import router from 'next/router'

const Manage: React.FC<{ size: Size }> = ({ size }) => {
  const { toaster } = useContext(GlobalStateContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allPatients, setAllPatients] = useState<Form[] | null>([])
  const [idToDelete, setIdToDelete] = useState(null)
  const [formToEdit, setFormToEdit] = useState(null)
  const [zipToEdit, setZipToEdit] = useState(null)
  const [idToEdit, setIdToEdit] = useState(null)
  const [newFormToEdit, setNewFormToEdit] = useState(null)
  const [itensPerPage, setItensPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [typed, setTyped] = useState<string | null>(null)
  const [filteredPatients, setFilteredPatients] = useState<Form[] | null>(allPatients)
  const pages: number = Math.ceil(filteredPatients?.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens: Form[] | null = filteredPatients.slice(startIndex, endIndex)

  const getAllPatients = useCallback(async () => {
    await axios.get(`${BASE_URL}/patient`)
      .then((response) => {
        setAllPatients(response?.data)
        setFilteredPatients(response?.data)
      })
      .catch(() => {
        toaster("Erro ao buscar pacientes. Tente novamente mais tarde!", 3000, "error")
        router.push("/")
      })
    setIsLoading(false)
  }, [toaster])

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

  const responseWhenEdit = useCallback(async () => {
    let resEditPatient = await editPatient(formToEdit, idToEdit, zipToEdit)
    resEditPatient ?
      toaster("Não foi possível editar o paciente. Tente novamente mais tarde!", 3000, "error") :
      toaster("Paciente alterado com sucesso!", 3000, "success")
  }, [formToEdit, idToEdit, zipToEdit, toaster])

  useEffect(() => {
    getAllPatients()
  }, [getAllPatients])

  useEffect(() => {
    const deletePatients = async () => {
      let tryDeletePatient = await deletePatient(idToDelete)
      {
        tryDeletePatient ?
          toaster("Não foi possível deletar o paciente. Tente novamente mais tarde", 3000, "error")
          :
          toaster("Paciente deletado com sucesso!", 3000, "success")
      }
    }

    { idToDelete && deletePatients() }
    idToDelete && setIsLoading(true)
    idToDelete && setTimeout(() => {
      getAllPatients()
      setIdToDelete(null)
      setIsLoading(false)
    }, 1000)
  }, [idToDelete, toaster, getAllPatients])

  useEffect(() => {
    idToEdit && responseWhenEdit()
    idToDelete && setIsLoading(true)
    idToEdit && setTimeout(() => {
      getAllPatients()
      setFormToEdit(null)
      setZipToEdit(null)
      setIdToEdit(null)
      setNewFormToEdit(null)
      setIsLoading(false)
    }, 1000)
  }, [idToEdit, formToEdit, zipToEdit, idToDelete, getAllPatients, responseWhenEdit])

  useLayoutEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])

  useEffect(() => {
    const filteringPatients = (typed: string) => {
      let newPatientsList = allPatients?.filter((item) => {
        if (item?.name?.toLowerCase()?.trim()?.includes(typed?.toLowerCase()?.trim())) {
          return item
        }
      })
      setFilteredPatients(newPatientsList)
    }

    filteringPatients(typed)
    setCurrentPage(0)
  }, [typed, allPatients])

  return (
    <div className='min-h-screen'>
      {isLoading ? <Loader /> :
        <Fragment>
          <HeadContent title={`Gerenciar Pacientes - CRUD`} />
          <section>
            <PageHeadTitle text={`Gerenciar pacientes`} />
            {allPatients?.length > 0 ?
              <div className='py-3 w-full'>
                <PaginationArea showFilter={true} helperCatchTyped={helperCatchTyped} itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} currentPage={currentPage} allPatients={allPatients} pages={pages} setCurrentPage={setCurrentPage} />
                {size?.width > 768 ?
                  <PatientList currentItens={currentItens} helperToDelete={helperToDelete} helperToEdit={helperToEdit} />
                  : <PatientListMobile currentItens={currentItens} helperToDelete={helperToDelete} helperToEdit={helperToEdit} />
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
            <div className='my-1 flex btnArea'>
              <RouteButton path='/' title={`Voltar`} />
            </div>
            <div className='my-1 flex btnArea'>
              <RouteButton path='/registrar' title={`Novo paciente`} />
            </div>
          </section>
        </Fragment>
      }
    </div>
  )
}
export default Manage