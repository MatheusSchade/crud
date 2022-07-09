import { Dialog, Transition } from '@headlessui/react'
import { Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import styles from "../styles/Modal.module.css"
import { PencilAltIcon } from '@heroicons/react/outline'
import { Patient } from '../types/Patient'
import FunctionButton from './FunctionButton'
import InputForm from './InputForm'
import InputMasked from './InputMasked'
import useForms from '../hooks/useForms'
import { GlobalStateContext } from '../global/GlobalStateContext'
import ZipCode from '../types/ZipCode'
import { getZipCode } from '../services/getZipCode'

const ModalEdit: React.FC<{
  patient: Patient, manageCallback?: any, helperToEdit?: any
}> = ({ patient, helperToEdit }) => {
  const { toaster } = useContext(GlobalStateContext)
  const [zipCodeData, setZipCodeData] = useState<ZipCode | null>(null)
  const [newForm, setNewForm] = useState<Patient | null>(patient)
  let [isOpen, setIsOpen] = useState(false)

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

  const confirmEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const id = patient?.id
    helperToEdit(form, id, zipCodeData)
    closeModal()
    toaster("Paciente alterado com sucesso!", 3000, "success")
    clear()
    setNewForm(null)
  }

  const zipCode = async (event) => {
    let zipCodeData = await getZipCode(event?.target?.value)
    setZipCodeData(zipCodeData)
  }

  const openModal = async () => {
    clear()
    await setNewForm(patient)
    setIsOpen(true)
  }

  const closeModal = async () => {
    clear()
    await setNewForm(null)
    setIsOpen(false)
  }

  const getTypedData = (event) => {
    let key = event.target.id
    let value = event.target.value
    setNewForm({ ...newForm, [key]: value })
  }

  return (
    <Fragment>
      <button onClick={openModal} type="button" className={`${styles.editBtn}`}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Paciente
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <form className='mt-3 grid grid-cols-12'>
                        <InputForm blur={getTypedData} name={`name`} type={`text`} placeholder={`Nome`} value={form?.name} change={onChange} size={`col-span-8`} label={`Nome completo`} />
                        <InputForm blur={getTypedData} name={`birthdate`} type={`date`} placeholder={`DD/MM/AAAA`} value={form?.birthdate} change={onChange} size={`col-span-4`} label={`Data de Nascimento`} />
                        <InputForm blur={getTypedData} name={`email`} type={`email`} placeholder={`E-mail`} value={form?.email} change={onChange} size={`col-span-8`} label={`E-mail`} />
                        <InputForm blur={zipCode} name={`zipCode`} type={`number`} placeholder={`XXXXX-XXX`} value={form?.zipCode} change={onChange} size={`col-span-4`} label={`CEP`} />
                        <InputForm blur={getTypedData} name={`address`} type={`text`} placeholder={`Logradouro`} value={zipCodeData?.logradouro || form?.address} change={onChange} size={`col-span-6`} label={`Logradouro`} />
                        <InputForm blur={getTypedData} name={`numberAddress`} type={`text`} placeholder={`Número`} value={form?.numberAddress} change={onChange} size={`col-span-3`} label={`Número`} />
                        <InputForm blur={getTypedData} name={`complement`} type={`text`} placeholder={`Complemento`} value={form?.complement} change={onChange} size={`col-span-3`} label={`Complemento`} />
                        <InputForm blur={getTypedData} name={`neighborhood`} type={`text`} placeholder={`Bairro`} value={zipCodeData?.bairro || form?.neighborhood} change={onChange} size={`col-span-5`} label={`Bairro`} />
                        <InputForm blur={getTypedData} name={`city`} type={`text`} placeholder={`Cidade`} value={zipCodeData?.localidade || form?.city} change={onChange} size={`col-span-5`} label={`Cidade`} />
                        <InputMasked blur={getTypedData} mask={`aa`} name={`state`} type={`text`} placeholder={`UF`} value={zipCodeData?.uf || form?.state} change={onChange} size={`col-span-2`} label={`UF`} />
                      </form>

                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center">
                    <FunctionButton click={closeModal} text='Voltar' />
                    <FunctionButton click={confirmEdit} text='Alterar' />
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


