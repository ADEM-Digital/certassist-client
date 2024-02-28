import { Context, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import LanguageIcon from "../../../components/icons/LanguageIcon";
import {
  LanguageContext,
  LanguageContextType,
} from "../../../context/LanguageContext";

const languages = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
];

const LanguageSidebar = () => {
  const { isLanguageSidebarOpen, setIsLanguageSidebarOpen } =
    useContext(TestInstanceContext as Context<TestInstanceContextType>);

  const { selectedLanguage, setSelectedLanguage } = useContext(
    LanguageContext as Context<LanguageContextType>
  );

  return (
    <Transition.Root show={isLanguageSidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setIsLanguageSidebarOpen}
      >
        {/* <div className="fixed inset-0" /> */}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="bg-[#548fcc] px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="flex gap-2 text-base font-semibold leading-6 text-white">
                          <LanguageIcon width={28} height={28} />
                          Language Selection
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-[#548fcc] hover:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setIsLanguageSidebarOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-blue-200">
                          Select one of the available languages in the list to
                          change the test language.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        
                        <fieldset
                          onChange={(e) => {
                            // @ts-ignore
                            setSelectedLanguage(e.target.value);
                            setIsLanguageSidebarOpen(false)
                          }}
                          className="mt-10"
                        >
                          <legend className="text-base font-semibold text-gray-900">
                            Select a language
                          </legend>
                          <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                            {languages.map((language) => (
                              <div
                                key={`language-${language.id}`}
                                className="relative flex items-start py-4"
                              >
                                <div className="min-w-0 flex-1 text-sm leading-6">
                                  <label
                                    htmlFor={`side-${language.id}`}
                                    className="select-none font-medium text-gray-900"
                                  >
                                    {language.name}
                                  </label>
                                </div>
                                <div className="ml-3 flex h-6 items-center">
                                  <input
                                    id={`side-${language.id}`}
                                    name="plan"
                                    type="radio"
                                    defaultChecked={
                                      language.id === selectedLanguage
                                    }
                                    value={language.id}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LanguageSidebar;
