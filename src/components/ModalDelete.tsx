import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { Fragment, useState } from 'react'
import styles from "../styles/ModalDelete.module.css"
import FunctionButton from './FunctionButton'
import ModalDeleteTp from '../types/ModalDeleteTp'

const ModalDelete: React.FC<ModalDeleteTp> = ({ patient, helperToDelete, setIsAccordionOpen }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setIsAccordionOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const confirmDelete = () => {
    const id = patient?.id
    closeModal()
    helperToDelete(id)
  }

  return (
    <Fragment>
      <button data-bs-toggle="tooltip" title="Excluir usuário do sistema" onClick={openModal} className={`${styles.deleteBtn}`}>
        <TrashIcon className="h-5 w-5 baseFourText" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg contrastStrongBg p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 contrastBrightText"
                  >
                    <InformationCircleIcon className="h-20 w-20 mx-auto baseFourText" />
                  </Dialog.Title>
                  <div className="mt-5">
                    <p className="mb-6 md:mx-6 mx-2 text-lg text-center font-bold">
                      Tem certeza que deseja excluir o paciente <strong className={`${styles.patientsName}`}>{patient?.name} </strong>?
                    </p>
                    <p className='text-center mb-16 md:px-12 px-0'>Uma vez confirmado, não será possível reverter esta ação!</p>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row items-center justify-center">
                    <div className='w-full md:w-1/2 flex mx-auto my-1 md:my-0'>
                      <FunctionButton click={closeModal} text='Voltar' />
                    </div>
                    <div className='w-full md:w-1/2 flex mx-auto my-1 md:my-0'>
                      <FunctionButton click={confirmDelete} text='Confirmar' />
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
export default ModalDelete