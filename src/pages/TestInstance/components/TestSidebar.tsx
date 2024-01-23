import { Context, Fragment, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";
import MarkFlagIcon from "../../../components/icons/MarkFlagIcon";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TestSidebar = () => {
  const {
    testQuery,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    updateAnswerMutation,
    selectedColor,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);
  return (
    <>
      <div
        className={classNames(
          selectedColor === "main"
            ? "bg-white"
            : "bg-testbg-200 text-inverted-100",
          "hidden md:block w-[6vw] h-[100vh] absolute top-0 left-0 py-1.5 z-30 "
        )}
      >
        <ul
          className={classNames(
            selectedColor === "reversed" ? "reversed" : "",
            "list-disc custom-bullets"
          )}
        >
          {testQuery.data &&
            testQuery.data.questions.map((question, index) => (
              <li
                key={`question-option-${index}`}
                onClick={() => {
                  if (selectedAnswer) {
                    updateAnswerMutation.mutate(selectedAnswer);
                    setSelectedAnswer(undefined);
                  }

                  setCurrentQuestionIndex(index);
                }}
                className={classNames(
                  index === currentQuestionIndex
                    ? selectedColor === "main"
                      ? "!bg-testnav-100 text-white"
                      : "text-gray-900 !bg-testnav-200"
                    : "",
                  "flex justify-between pl-5 relative before:absolute before:left-1.5 before:top-0 select-none cursor-pointer"
                )}
              >
                {index + 1} <span>{question.marked && <MarkFlagIcon />}</span>
              </li>
            ))}
        </ul>
      </div>
      <Transition.Root show={isMobileSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setIsMobileSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

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
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setIsMobileSidebarOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl max-w-xs">
                      
                      <div className="relative mt-6 flex-1 px-0 sm:px-0">
                        <ul
                          className={classNames(
                            selectedColor === "reversed" ? "reversed" : "",
                            "list-disc custom-bullets"
                          )}
                        >
                          {testQuery.data &&
                            testQuery.data.questions.map((question, index) => (
                              <li
                                key={`question-option-${index}`}
                                onClick={() => {
                                  if (selectedAnswer) {
                                    updateAnswerMutation.mutate(selectedAnswer);
                                    setSelectedAnswer(undefined);
                                  }
                                  setIsMobileSidebarOpen(false)
                                  setCurrentQuestionIndex(index);
                                }}
                                className={classNames(
                                  index === currentQuestionIndex
                                    ? selectedColor === "main"
                                      ? "!bg-testnav-100 text-white"
                                      : "text-gray-900 !bg-testnav-200"
                                    : "",
                                  "py-2 flex justify-start "
                                )}
                              >
                                {`  ${index + 1}`}{" "}
                                <span>
                                  {question.marked && <MarkFlagIcon />}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TestSidebar;
