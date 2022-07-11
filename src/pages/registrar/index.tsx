import { Fragment, useContext, useEffect, useState } from 'react'
import FunctionButton from '../../components/FunctionButton'
import HeadContent from '../../components/HeadContent'
import InputForm from '../../components/InputForm'
import InputMasked from '../../components/InputMasked'
import PageHeadTitle from '../../components/PageHeadTitle'
import useForms from '../../hooks/useForms'
import { addPatients } from "../../services/addPatients"
import { brazilianStates } from '../../constants/brazilianStates'
import checkState from '../../services/checkState'
import regexMatcher from '../../services/regexMatcher'
import ZipCode from '../../types/ZipCode'
import { GlobalStateContext } from '../../global/GlobalStateContext'
import Loader from '../../components/Loader'
import { getZipCode } from '../../services/getZipCode'
import RouteButton from '../../components/RouteButton'
import Size from '../../types/Size'
import scrollTo from '../../services/scrollTo'
import saveInLocalStorage from '../../services/saveInLocalStorage'
import getLocalStorageValues from '../../services/getLocalStorageValues'

const Register: React.FC<{ size: Size }> = ({ size }) => {
  const { toaster } = useContext(GlobalStateContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSpinnerLoading, setIsSpinnerLoading] = useState<boolean>(false)
  const [title] = useState<string>(`Registrar novo paciente`)
  const [zipCodeData, setZipCodeData] = useState<ZipCode | null>(null)

  const [form, onChange, clear] = useForms({
    name: "",
    birthdate: "",
    email: "",
    zipCode: "",
    address: "",
    numberAddress: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    createdAt: ""
  })

  const checkForm = (): boolean => {
    let msg: string = ""
    let isValid: boolean = false;

    if (form?.name?.split(" ").filter((item) => {
      return item !== "";
    }).length < 2) {
      msg = `O campo "nome completo" deve conter nome e sobrenome.`
    } else if (form?.name?.length > 30) {
      msg = `O campo "nome completo" aceita um máximo de 30 caracteres.`
    } else if (!form?.birthdate) {
      msg = "Selecione uma data de nascimento para prosseguir."
    } else if (!regexMatcher(/\S+@\S+\.\S+/, form?.email)) {
      msg = `Digite um e-mail válido para prosseguir.`
    } else if (form?.email?.length > 40) {
      msg = `O campo "email" aceita um máximo de 40 caracteres.`
    } else if (!regexMatcher(/^[0-9]{8}$/, form?.zipCode)) {
      msg = `Digite um CEP válido para prosseguir.`
    } else if (!zipCodeData?.logradouro && form?.address?.length < 2) {
      msg = `Digite um logradouro válido para prosseguir.`
    } else if (form?.address?.length > 40) {
      msg = `O campo "Logradouro" aceita um máximo de 40 caracteres.`
    } else if (!form?.numberAddress) {
      msg = `Digite o número da residência para prosseguir.`
    } else if (form?.numberAddress?.length > 6) {
      msg = `O campo "Número" aceita um máximo de 6 caracteres.`
    } else if (!zipCodeData?.bairro && form?.neighborhood?.length < 2) {
      msg = `Digite o bairro para prosseguir.`
    } else if (form?.neighborhood?.length > 20) {
      msg = `O campo "Bairro" aceita um máximo de 20 caracteres.`
    } else if (!zipCodeData?.localidade && form?.city?.length < 2) {
      msg = `Digite uma cidade válida para prosseguir.`
    } else if (form?.city?.length > 20) {
      msg = `O campo "Cidade" aceita um máximo de 20 caracteres.`
    } else if (!zipCodeData?.uf && !checkState(brazilianStates, form?.state?.toUpperCase())) {
      msg = "Selecione uma UF (estado) válida."
    } else {
      isValid = true
    }

    if (isValid) {
      scrollTo(50)
      return true
    } else {
      { size?.width <= 768 && scrollTo(325) }
      toaster(msg, 3000, "error")
    }
  }

  const onSubmitForm = async (event: { preventDefault: () => void }) => {
    setIsSpinnerLoading(true)
    if (checkForm()) {
      event.preventDefault()
      let tryAddPatient = await addPatients(form, clear, zipCodeData)
      setZipCodeData(null)
      {
        tryAddPatient ?
          toaster("Não foi possível cadastrar o paciente. Tente novamente mais tarde", 3000, "error")
          :
          toaster("Paciente cadastrado com sucesso!", 3000, "success")
      }
    }
    setIsSpinnerLoading(false)
    localStorage.removeItem("form")
  }

  const helperZipCode = (event) => {
    zipCode(event)
    saveInLocalStorage(event)
  }

  const zipCode = async (event) => {
    let zipCodeData = await getZipCode(event?.target?.value)
    if (zipCodeData) {
      setZipCodeData(zipCodeData)
    } else {
      if (form?.zipCode?.length == 8) {
        toaster("CEP não encontrado. Favor preencher os demais campos!", 3000, "warning")
      }
    }
  }

  const getLocalStorage = async () => {
    let dataStorage = await JSON.parse(localStorage.getItem("form"))
    if (dataStorage) {
      clear()
      form.name = getLocalStorageValues("name")
      form.birthdate = getLocalStorageValues("birthdate")
      form.email = getLocalStorageValues("email")
      form.zipCode = getLocalStorageValues("zipCode")
      form.address = getLocalStorageValues("address")
      form.numberAddress = getLocalStorageValues("numberAddress")
      form.complement = getLocalStorageValues("complement")
      form.neighborhood = getLocalStorageValues("neighborhood")
      form.city = getLocalStorageValues("city")
      form.state = getLocalStorageValues("state")
    }
  }

  const clearAllFields = () => {
    clear()
    localStorage.removeItem("form")
    toaster("Todos os campos foram limpos!", 3000, "info")
  }

  useEffect(() => {
    setIsLoading(false)
    getLocalStorage()
  }, [])

  return (
    <div className='min-h-screen'>
      {isLoading ? <Loader /> :
        <Fragment>
          <HeadContent title={`Registrar Pacientes - CRUD Medcloud`} />
          <section>
            <PageHeadTitle text={title} />
            <h2 className='ml-1'>Insira abaixo os dados do paciente para registrá-lo em nosso banco de dados:</h2>
            <form className='mt-3 grid grid-cols-12'>
              <InputForm blur={saveInLocalStorage} name={`name`} type={`text`} placeholder={`Nome`} value={form?.name} change={onChange} size={`md:col-span-8 col-span-12`} label={`Nome completo`} />
              <InputForm blur={saveInLocalStorage} name={`birthdate`} type={`date`} placeholder={` DD/MM/AAAA `} value={form?.birthdate} change={onChange} size={`md:col-span-4 col-span-12`} label={`Data de Nascimento`} />
              <InputForm blur={saveInLocalStorage} name={`email`} type={`email`} placeholder={`E-mail`} value={form?.email} change={onChange} size={`md:col-span-8 col-span-12`} label={`E-mail`} />
              <InputForm blur={helperZipCode} name={`zipCode`} type={`number`} placeholder={`XXXXX-XXX`} value={form?.zipCode} change={onChange} size={`md:col-span-4 col-span-12`} label={`CEP`} />
              <InputForm blur={saveInLocalStorage} name={`address`} type={`text`} placeholder={`Logradouro`} value={zipCodeData?.logradouro || form?.address} change={onChange} size={`md:col-span-6 col-span-12`} label={`Logradouro`} />
              <InputForm blur={saveInLocalStorage} name={`numberAddress`} type={`text`} placeholder={`Número`} value={form?.numberAddress} change={onChange} size={`md:col-span-3 col-span-5`} label={`Número`} />
              <InputForm blur={saveInLocalStorage} name={`complement`} type={`text`} placeholder={`Complemento`} value={form?.complement} change={onChange} size={`md:col-span-3 col-span-7`} label={`Complemento`} />
              <InputForm blur={saveInLocalStorage} name={`neighborhood`} type={`text`} placeholder={`Bairro`} value={zipCodeData?.bairro || form?.neighborhood} change={onChange} size={`md:col-span-5 col-span-12`} label={`Bairro`} />
              <InputForm blur={saveInLocalStorage} name={`city`} type={`text`} placeholder={`Cidade`} value={zipCodeData?.localidade || form?.city} change={onChange} size={`md:col-span-5 col-span-12`} label={`Cidade`} />
              <InputMasked blur={saveInLocalStorage} mask={`aa`} name={`state`} type={`text`} placeholder={`UF`} value={zipCodeData?.uf || form?.state.toUpperCase()} change={onChange} size={`md:col-span-2 col-span-12`} label={`UF`} />
            </form>
            <div className='text-center md:mt-12 mt-4 flex items-center justify-center flex-col-reverse sm:flex-row'>
              <div className='my-2 flex btnArea'>
                <RouteButton path='/' title={`Voltar`} />
              </div>
              <div className='my-2 flex btnArea'>
                <FunctionButton isLoading={isSpinnerLoading} alt={`Cadastrando`} click={onSubmitForm} text={`Cadastrar`} />
              </div>
              <div className='my-2 flex btnArea'>
                <FunctionButton click={clearAllFields} text={`Limpar`} />
              </div>
            </div>
          </section>
        </Fragment>
      }
    </div>
  )
}
export default Register
