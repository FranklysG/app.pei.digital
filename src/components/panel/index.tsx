import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useGlobal } from '../../hooks/useGlobal'

interface PanelProps {
  children?: ReactNode
}

export default function Panel({ children }: PanelProps) {
  const { openPanel, setOpenPanel } = useGlobal()

  return (
    <>
      <Transition.Root show={openPanel} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpenPanel}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-md sm:max-w-4xl flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-16 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-inset focus:ring-gray-800 border border-gray-800"
                      onClick={() => setOpenPanel(!openPanel)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-gray-ring-gray-800"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div
                  className="px-10 mt-5 h-full flex-shrink-0 divide-y divide-pink-800 overflow-y-auto"
                  aria-label="Panel"
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
