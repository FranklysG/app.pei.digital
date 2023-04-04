import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import {
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { classNames } from '../../utils'
import { useGlobal } from '../../hooks/useGlobal'

const navigation = [{ name: 'Dashboard', href: '/dashboard', icon: HomeIcon }]
const secondaryNavigation = [
  {
    name: 'Formularios',
    href: '/form',
    icon: SquaresPlusIcon,
  },
  { name: 'Settings', href: '/setting', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const { openSidebar, setOpenSidebar } = useGlobal()
  const router = useRouter()
  const [current, setCurrent] = useState(router.pathname)

  return (
    <>
      <Transition.Root show={openSidebar} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setOpenSidebar}
        >
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-pink-700 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setOpenSidebar(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link href="/">
                    <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:leading-9">
                      PEI DIGITAL
                      {/* <Logo className="w-20 h-20 fill-current text-pink-500" /> */}
                    </h1>
                  </Link>
                </div>
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-pink-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            current === item.href
                              ? 'bg-pink-800 text-white'
                              : 'text-pink-100 hover:text-white hover:bg-pink-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                          )}
                          aria-current={
                            current === item.href ? 'page' : undefined
                          }
                          onClick={() => {
                            setCurrent(item.href)
                          }}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 flex-shrink-0 text-pink-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="space-y-1 px-2">
                      {secondaryNavigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              current === item.href
                                ? 'bg-pink-800 text-white'
                                : 'text-pink-100 hover:text-white hover:bg-pink-600',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            )}
                            aria-current={
                              current === item.href ? 'page' : undefined
                            }
                            onClick={() => {
                              setCurrent(item.href)
                            }}
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 flex-shrink-0 text-pink-200"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-[1]">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-pink-700 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Link href="/">
              <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:leading-9">
                PEI DIGITAL
                {/* <Logo className="w-20 h-20 fill-current text-pink-500" /> */}
              </h1>
            </Link>
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-pink-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      current === item.href
                        ? 'bg-pink-800 text-white'
                        : 'text-pink-100 hover:text-white hover:bg-pink-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                    )}
                    aria-current={current === item.href ? 'page' : undefined}
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 flex-shrink-0 text-pink-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        current === item.href
                          ? 'bg-pink-800 text-white'
                          : 'text-pink-100 hover:text-white hover:bg-pink-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                      aria-current={current === item.href ? 'page' : undefined}
                      onClick={() => {
                        setCurrent(item.href)
                      }}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-pink-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
