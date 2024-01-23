import { Dispatch, SetStateAction,  } from 'react'
import { Dialog,  } from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { sentenceToCaps } from '../../utils/utils'
import Logo from '../logo/Logo'
import { useNavigate } from 'react-router-dom'

type MobileSideBarPropsType = {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    navigation: {
        path: string;
        routeName: string;
        icon: JSX.Element;
        selected: boolean;
    }[]
}

export default function MobileSideBar({mobileMenuOpen, setMobileMenuOpen, navigation} : MobileSideBarPropsType) {
    const navigate = useNavigate();

  return (
    <>
      <header className="absolute md:hidden inset-x-0 top-0 z-40 flex">
        <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">CertAssist</span>
                  <Logo width={30} height={30}/>
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <button
                  key={`mobile-menu-link-${item.routeName}`}
                  onClick={() => {
                    navigate(item.path)
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-3 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.icon}
                  {sentenceToCaps(item.routeName)}
                </button>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      
    </>
  )
}
