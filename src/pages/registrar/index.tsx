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

    if (!regexMatcher(/[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/, form?.name)) {
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

  const getInfosByZipCode = async (zipCode: string) => {
    if (zipCode.length > 7) {
      await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((response) => {
          setZipCodeData(response?.data)
        }).catch((error) => {
          console.log(error?.response?.data)
        })
    }
  }

  useEffect(() => {
    setIsLoading(false)
    getInfosByZipCode(form?.zipCode)
  }, [form?.zipCode?.length == 8])


  return (
    isLoading
    ? <Loader /> :
    <Fragment>
      <HeadContent title={`Registrar Pacientes - CRUD Medcloud`} />
      <section>
        <PageHeadTitle text={title} />
        Insira abaixo os dados do paciente para registrá-lo em nosso banco de dados:

        <form className='mt-3 grid grid-cols-12'>
          <InputForm name={`name`} type={`text`} placeholder={`Nome`} value={form?.name} change={onChange} size={`col-span-8`} label={`Nome completo`} />
          <InputForm name={`birthdate`} type={`date`} placeholder={`DD/MM/AAAA`} value={form?.birthdate} change={onChange} size={`col-span-4`} label={`Data de Nascimento`} />
          <InputForm name={`email`} type={`email`} placeholder={`E-mail`} value={form?.email} change={onChange} size={`col-span-8`} label={`E-mail`} />
          <InputForm name={`zipCode`} type={`number`} placeholder={`XXXXX-XXX`} value={form?.zipCode} change={onChange} size={`col-span-4`} label={`CEP`} />
          <InputForm name={`address`} type={`text`} placeholder={`Logradouro`} value={zipCodeData?.logradouro || form?.address} change={onChange} size={`col-span-6`} label={`Logradouro`} />
          <InputForm name={`numberAddress`} type={`text`} placeholder={`Número`} value={form?.numberAddress} change={onChange} size={`col-span-3`} label={`Número`} />
          <InputForm name={`complement`} type={`text`} placeholder={`Complemento`} value={form?.complement} change={onChange} size={`col-span-3`} label={`Complemento`} />
          <InputForm name={`neighborhood`} type={`text`} placeholder={`Bairro`} value={zipCodeData?.bairro || form?.neighborhood} change={onChange} size={`col-span-5`} label={`Bairro`} />
          <InputForm name={`city`} type={`text`} placeholder={`Cidade`} value={zipCodeData?.localidade || form?.city} change={onChange} size={`col-span-5`} label={`Cidade`} />
          <InputMasked mask={`aa`} name={`state`} type={`text`} placeholder={`UF`} value={zipCodeData?.uf || form?.state.toUpperCase()} change={onChange} size={`col-span-2`} label={`UF`} />
        </form>
        <div className='text-center mt-12'>
          <FunctionButton click={clear} text={`Limpar`} />
          <FunctionButton click={onSubmitForm} text={`Enviar`} />
        </div>
      </section>
    </Fragment>
  )
}
export default Register
