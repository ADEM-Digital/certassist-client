import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ColoredSupportIcon from "../../../components/icons/ColoredSupportIcon";
import { PhotoIcon } from "@heroicons/react/20/solid";

import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useGeneralSupportForm } from "../hooks";

type GeneralSupportSidebarFormPropsType = {
  isGeneralSupportSidebarOpen: boolean;
  setIsGeneralSupportSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GeneralSupportSidebarForm = ({isGeneralSupportSidebarOpen, setIsGeneralSupportSidebarOpen}: GeneralSupportSidebarFormPropsType) => {
  
  const {
    initialFormValues,
    isFileSelected,
    setIsFileSelected,
    selectedFilename,
    setSelectedFilename,
  } = useGeneralSupportForm();

  const { user } = useAuth0();

  useEffect(() => {
    setIsFileSelected(false);
    setSelectedFilename("");
  }, [isGeneralSupportSidebarOpen]);

  return (
    <Transition.Root show={isGeneralSupportSidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={setIsGeneralSupportSidebarOpen}
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
                          <ColoredSupportIcon width={28} height={28} />
                          Support Form
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-[#548fcc] hover:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setIsGeneralSupportSidebarOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-blue-200">
                          Found a problem with a feature of the application? We'd love to hear about it! Submit this
                          form and one of our agents will assist you.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <Formik
                          initialValues={initialFormValues}
                          onSubmit={async (values) => {
                            console.log(
                              JSON.stringify({
                                firstName: user?.given_name,
                                lastName: user?.family_name,
                                email: user?.email,
                              })
                            );
                            const formData = new FormData();
                            formData.append("problemType", values.problemType);
                            formData.append("description", values.description);
                            formData.append(
                              "userData",
                              JSON.stringify({
                                firstName: user?.given_name,
                                lastName: user?.family_name,
                                email: user?.email,
                              })
                            );
                            

                            if (values.image) {
                              formData.append("image", values.image);
                            }

                            try {
                              const response = await axios.post(
                                `${
                                  import.meta.env.VITE_API_URL
                                }/ticketRoutes/create-general-support-ticket`,
                                formData,
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                }
                              );
                              console.log(response.data);
                              setIsGeneralSupportSidebarOpen(false);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          {({ setFieldValue }) => (
                            <Form>
                              <>
                                <div className="space-y-6 pb-5 pt-6">
                                  <div>
                                    <label
                                      htmlFor="problemType"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Type of problem detected
                                    </label>
                                    <div className="mt-2">
                                      <Field
                                        as="select"
                                        name="problemType"
                                        id="problemType"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                      >
                                        <option value=""></option>
                                        <option value="Subscription Management">Subscription Management</option>
                                        <option value="Billing or Payment Issues">
                                        Billing or Payment Issues
                                        </option>
                                        <option value="Technical Glitches">Technical Glitches</option>
                                        <option value="Feature Requests">Feature Requests</option>
                                        <option value="Usability Problems">
                                        Usability Problems
                                        </option>
                                        <option value="Connectivity Issues">
                                        Connectivity Issues
                                        </option>
                                        <option value="Data Syncing Issues">Data Syncing Issues</option>
                                        <option value="Security Concerns">Security Concerns</option>
                                        <option value="Accessibility Issues">Accessibility Issues</option>
                                        <option value="Accessibility Issues">Accessibility Issues</option>
                                        <option value="Performance Issues">Performance Issues</option>
                                        <option value="Notification Issues">Notification Issues</option>
                                        <option value="Language or Localization Issues">Language or Localization Issues</option>
                                      </Field>
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="description"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Description
                                    </label>

                                    <Field
                                      as="textarea"
                                      id="description"
                                      name="description"
                                      rows={4}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                                <div className="col-span-full">
                                  <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Screenshot
                                  </label>
                                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                      {isFileSelected ? (
                                        <div>
                                          {/* Display when a file is selected */}
                                          <CheckIcon
                                            className="mx-auto h-12 w-12 text-green-500"
                                            aria-hidden="true"
                                          />
                                          <p className="mt-1 text-sm text-gray-900">
                                            {selectedFilename}
                                          </p>
                                        </div>
                                      ) : (
                                        <div>
                                          {/* Display when no file is selected */}
                                          <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                          />
                                          <div className="mt-4 flex justify-center text-sm text-gray-600">
                                            <label
                                              htmlFor="image"
                                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-500 hover:text-blue-500"
                                            >
                                              <span>Upload a file</span>
                                            </label>
                                          </div>
                                          <p className="text-xs text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                          </p>
                                        </div>
                                      )}
                                      <input
                                      
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="sr-only"
                                        onChange={(e) => {
                                          if (
                                            e.currentTarget.files &&
                                            e.currentTarget.files[0]
                                          ) {
                                            setFieldValue(
                                              "image",
                                              e.currentTarget.files[0]
                                            );
                                            setIsFileSelected(true);
                                            setSelectedFilename(
                                              e.currentTarget.files[0].name
                                            );
                                          } else {
                                            setIsFileSelected(false);
                                            setSelectedFilename("");
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                               

                                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                  <button
                                    type="button"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                    onClick={() =>
                                      setIsGeneralSupportSidebarOpen(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="ml-4 inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </>
                            </Form>
                          )}
                        </Formik>
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

export default GeneralSupportSidebarForm;
