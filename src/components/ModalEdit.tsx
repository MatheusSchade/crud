import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import styles from "../styles/Modal.module.css"
import { PencilAltIcon } from '@heroicons/react/outline'
import FunctionButton from './FunctionButton'
import InputForm from './InputForm'
import InputMasked from './InputMasked'
import useForms from '../hooks/useForms'
import { GlobalStateContext } from '../global/GlobalStateContext'
import ZipCode from '../types/ZipCode'
import { getZipCode } from '../services/getZipCode'
import regexMatcher from '../services/regexMatcher'
import { brazilianStates } from '../constants/brazilianStates'
import checkState from '../services/checkState'
import ModalEditTp from '../types/ModalEditTp'

const ModalEdit: React.FC<ModalEditTp> = ({ patient, helperToEdit, setIsAccordionOpen }) => {
  const { toaster } = useContext(GlobalStateContext)
  const [zipCodeData, setZipCodeData] = useState<ZipCode | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const [form, onChange, clear] = useForms({
    name: patient?.name,
    birthdate: patient?.birthdate,
    email: patient?.email,
    zipCode: patient?.zipCode,
    address: patient?.address,
    numberAddress: patient?.numberAddress,
    complement: patient?.complement,
    neighborhood: patient?.neighborhood,
    city: patient?.city,
    state: patient?.state,
    createdAt: patient?.createdAt,
  })

  const checkForm = (): boolean => {
    let msg: string = ""
    let isValid: boolean = false;

    if (form?.name?.split(" ").filter((item) => {
      return item !== "";
    }).length < 2) {
      msg = `O campo "Nome completo" deve conter nome e sobrenome.`
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
      return true
    } else {
      toaster(msg, 3000, "error")
    }
  }

  const confirmEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (checkForm()) {
      event.preventDefault()
      const id = patient?.id
      helperToEdit(form, id, zipCodeData)
      closeModal()
      clear()
    }
  }

  const zipCode = async (event) => {
    let zipCodeData = null
    console.log(event?.target?.value?.length)
    if (event?.target?.value?.length == 8) {
      zipCodeData = await getZipCode(event?.target?.value)

      if (zipCodeData?.cep) {
        setZipCodeData(zipCodeData)
      } else {
        toaster("CEP não encontrado!", 3000, "warning")
      }
    }
  }

  const openModal = async () => {
    clear()
    setIsOpen(true)
  }

  const closeModal = async () => {
    clear()
    setIsOpen(false)
  }

  return (
    <Fragment>
      <button data-bs-toggle="tooltip" title="Editar usuário" onClick={openModal} type="button" className={`${styles.editBtn}`}>
        <PencilAltIcon className="h-5 w-5" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Editar Paciente
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <form className='mt-3 grid grid-cols-12'>
                        <InputForm name={`name`} type={`text`} placeholder={`Nome`} value={form?.name} change={onChange} size={`md:col-span-8 sm:col-span-6 col-span-12`} label={`Nome completo`} />
                        <InputForm name={`birthdate`} type={`date`} placeholder={`DD/MM/AAAA`} value={form?.birthdate} change={onChange} size={`md:col-span-4 sm:col-span-6 col-span-12`} label={`Data de Nascimento`} />
                        <InputForm name={`email`} type={`email`} placeholder={`E-mail`} value={form?.email} change={onChange} size={`md:col-span-8 sm:col-span-6 col-span-12`} label={`E-mail`} />
                        <InputForm blur={zipCode} name={`zipCode`} type={`number`} placeholder={`XXXXX-XXX`} value={form?.zipCode} change={onChange} size={`md:col-span-4 sm:col-span-6 col-span-12`} label={`CEP`} />
                        <InputForm name={`address`} type={`text`} placeholder={`Logradouro`} value={zipCodeData?.logradouro || form?.address} change={onChange} size={`sm:col-span-6 col-span-12`} label={`Logradouro`} />
                        <InputForm name={`numberAddress`} type={`text`} placeholder={`Número`} value={form?.numberAddress} change={onChange} size={`sm:col-span-3 col-span-6`} label={`Número`} />
                        <InputForm name={`complement`} type={`text`} placeholder={`Complemento`} value={form?.complement} change={onChange} size={`sm:col-span-3 col-span-6`} label={`Complemento`} />
                        <InputForm name={`neighborhood`} type={`text`} placeholder={`Bairro`} value={zipCodeData?.bairro || form?.neighborhood} change={onChange} size={`sm:col-span-5 col-span-12`} label={`Bairro`} />
                        <InputForm name={`city`} type={`text`} placeholder={`Cidade`} value={zipCodeData?.localidade || form?.city} change={onChange} size={`sm:col-span-5 col-span-8`} label={`Cidade`} />
                        <InputMasked mask={`aa`} name={`state`} type={`text`} placeholder={`UF`} value={zipCodeData?.uf || form?.state} change={onChange} size={`sm:col-span-2 col-span-4`} label={`UF`} />
                      </form>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-center">
                    <div className='w-full md:w-1/2 flex justify-center mx-auto my-1 md:my-0'>
                      <FunctionButton click={closeModal} text='Voltar' />
                    </div>
                    <div className='w-full md:w-1/2 flex justify-center mx-auto my-1 md:my-0'>
                      <FunctionButton click={confirmEdit} text='Alterar' />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

export default ModalEdit


