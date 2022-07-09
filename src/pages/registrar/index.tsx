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
import axios from 'axios'
import ZipCode from '../../types/ZipCode'
import { GlobalStateContext } from '../../global/GlobalStateContext'
import Loader from '../../components/Loader'
import { getZipCode } from '../../services/getZipCode'


const Register: React.FC = () => {
  const { toaster } = useContext(GlobalStateContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
      msg = `O campo "Nome completo" deve conter nome e sobrenome.`
    }
    else if (!form?.birthdate) {
      msg = "Selecione uma data de nascimento para prosseguir."
    }
    else if (!regexMatcher(/\S+@\S+\.\S+/, form?.email)) {
      msg = `Digite um e-mail válido para prosseguir.`
    }
    else if (!regexMatcher(/^[0-9]{8}$/, form?.zipCode)) {
      msg = `Digite um CEP válido para prosseguir.`
    }
    else if (!zipCodeData?.logradouro && form?.address?.length < 2) {
      msg = `Digite um logradouro válido para prosseguir.`
    }
    else if (!form?.numberAddress) {
      msg = `Digite o número da residência para prosseguir.`
    }
    else if (!zipCodeData?.bairro && form?.neighborhood?.length < 2) {
      msg = `Digite o bairro para prosseguir.`
    }
    else if (!zipCodeData?.localidade && form?.city?.length < 2) {
      msg = `Digite uma cidade válida para prosseguir.`
    }
    else if (!zipCodeData?.uf && !checkState(brazilianStates, form?.state?.toUpperCase())) {
      msg = "Selecione uma UF (estado) válida."
    }
    else {
      isValid = true
    }

    if (isValid) {
      toaster("Paciente cadastrado com sucesso!", 3000, "success")
      return true
    } else {
      toaster(msg, 3000, "error")
    }
  }

  const onSubmitForm = (event: { preventDefault: () => void }) => {
    if (checkForm()) {
      event.preventDefault()
      addPatients(form, clear, zipCodeData)
      setZipCodeData(null)
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const zipCode = async (event) => {
    let zipCodeData = await getZipCode(event?.target?.value)
    setZipCodeData(zipCodeData)
  }


  return (
    isLoading
      ? <Loader /> :
      <Fragment>
        <HeadContent title={`Registrar Pacientes - CRUD Medcloud`} />
        <section>
          <PageHeadTitle text={title} />
          <h2 className='ml-1'>Insira abaixo os dados do paciente para registrá-lo em nosso banco de dados:</h2>

          <form className='mt-3 grid grid-cols-12'>
            <InputForm name={`name`} type={`text`} placeholder={`Nome`} value={form?.name} change={onChange} size={`md:col-span-8 col-span-12`} label={`Nome completo`} />
            <InputForm name={`birthdate`} type={`date`} placeholder={`DD/MM/AAAA`} value={form?.birthdate} change={onChange} size={`md:col-span-4 col-span-12`} label={`Data de Nascimento`} />
            <InputForm name={`email`} type={`email`} placeholder={`E-mail`} value={form?.email} change={onChange} size={`md:col-span-8 col-span-12`} label={`E-mail`} />
            <InputForm blur={zipCode} name={`zipCode`} type={`number`} placeholder={`XXXXX-XXX`} value={form?.zipCode} change={onChange} size={`md:col-span-4 col-span-12`} label={`CEP`} />
            <InputForm name={`address`} type={`text`} placeholder={`Logradouro`} value={zipCodeData?.logradouro || form?.address} change={onChange} size={`md:col-span-6 col-span-12`} label={`Logradouro`} />
            <InputForm name={`numberAddress`} type={`text`} placeholder={`Número`} value={form?.numberAddress} change={onChange} size={`md:col-span-3 col-span-5`} label={`Número`} />
            <InputForm name={`complement`} type={`text`} placeholder={`Complemento`} value={form?.complement} change={onChange} size={`md:col-span-3 col-span-7`} label={`Complemento`} />
            <InputForm name={`neighborhood`} type={`text`} placeholder={`Bairro`} value={zipCodeData?.bairro || form?.neighborhood} change={onChange} size={`md:col-span-5 col-span-12`} label={`Bairro`} />
            <InputForm name={`city`} type={`text`} placeholder={`Cidade`} value={zipCodeData?.localidade || form?.city} change={onChange} size={`md:col-span-5 col-span-12`} label={`Cidade`} />
            <InputMasked mask={`aa`} name={`state`} type={`text`} placeholder={`UF`} value={zipCodeData?.uf || form?.state.toUpperCase()} change={onChange} size={`md:col-span-2 col-span-12`} label={`UF`} />
          </form>
          <div className='text-center md:mt-12 mt-4 flex items-center justify-center flex-col sm:flex-row'>
            <div className='my-2 flex btnArea'>
              <FunctionButton click={onSubmitForm} text={`Cadastrar`} />
            </div>
            <div className='my-2 flex btnArea'>
              <FunctionButton click={() => window.history.back()} text={`Voltar`} />
            </div>
          </div>
        </section>
      </Fragment>
  )
}
export default Register
