import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { Fragment, useContext, useState } from 'react'
import styles from "../styles/ModalDelete.module.css"
import { Patient } from '../types/Patient'
import FunctionButton from './FunctionButton'
import { GlobalStateContext } from '../global/GlobalStateContext'

const ModalDelete: React.FC<{ patient: Patient, helperToDelete?: any }> = ({ patient, helperToDelete }) => {
  const { toaster } = useContext(GlobalStateContext)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const confirmDelete = () => {
    const id = patient?.id
    closeModal()
    helperToDelete(id)
    toaster("Paciente removido com sucesso!", 3000, "success")
  }

  return (
    <Fragment>
      <button onClick={openModal} className={`${styles.deleteBtn}`}>
        <TrashIcon className="h-5 w-5 text-blue-500" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <InformationCircleIcon className="h-20 w-20 mx-auto text-blue-500" />
                  </Dialog.Title>
                  <div className="mt-5 ">
                    <p className="mb-6 mx-6 text-lg text-center font-bold">
                      Tem certeza que deseja excluir o paciente <strong className={`text-blue-500`}>{patient?.name}</strong>?
                    </p>
                    <p className='text-center mb-16 px-12'>Uma vez confirmado, não será possível reverter esta ação!</p>
                  </div>

                  <div className="mt-5 flex items-center justify-center">
                    <FunctionButton click={closeModal} text='Voltar' />
                    <FunctionButton click={confirmDelete} text='Confirmar' />
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
export default ModalDelete