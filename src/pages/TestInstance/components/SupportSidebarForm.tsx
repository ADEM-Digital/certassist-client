import { Context, Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  TestInstanceContext,
  TestInstanceContextType,
  useSupportForm,
} from "../hooks";
import ColoredSupportIcon from "../../../components/icons/ColoredSupportIcon";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { sentenceToCaps } from "../../../utils/utils";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const SupportSidebarForm = () => {
  const { isSupportSidebarOpen, setIsSupportSidebarOpen, questionQuery } =
    useContext(TestInstanceContext as Context<TestInstanceContextType>);
  const {
    initialFormValues,
    isFileSelected,
    setIsFileSelected,
    selectedFilename,
    setSelectedFilename,
  } = useSupportForm();
  const { user } = useAuth0();

  useEffect(() => {
    setIsFileSelected(false);
    setSelectedFilename("");
  }, [isSupportSidebarOpen]);

  return (
    <Transition.Root show={isSupportSidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setIsSupportSidebarOpen}
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
                            onClick={() => setIsSupportSidebarOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-blue-200">
                          Found a problem with the content of one of our
                          questions? We'd love to hear about it! Submit this
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
                            formData.append(
                              "questionId",
                              questionQuery.data?._id
                                ? questionQuery.data?._id?.toString()
                                : ""
                            );
                            formData.append(
                              "questionTopic",
                              questionQuery.data?.topic
                                ? questionQuery.data?.topic
                                : ""
                            );
                            formData.append(
                              "questionSubtopic",
                              questionQuery.data?.subtopic
                                ? questionQuery.data?.subtopic
                                : ""
                            );

                            if (values.image) {
                              formData.append("image", values.image);
                            }

                            try {
                              const response = await axios.post(
                                `${
                                  import.meta.env.VITE_API_URL
                                }/ticketRoutes/create-content-support-ticket`,
                                formData,
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                }
                              );
                              console.log(response.data);
                              setIsSupportSidebarOpen(false);
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
                                        <option value="Topic">Topic</option>
                                        <option value="Subtopic">
                                          Subtopic
                                        </option>
                                        <option value="Answer">Answer</option>
                                        <option value="Media">Media</option>
                                        <option value="Feedback / Explanation">
                                          Feedback / Explanation
                                        </option>
                                        <option value="UI">
                                          User Interface
                                        </option>
                                        <option value="Other">Other</option>
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
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    Question Information
                                  </h3>
                                  <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                      <dt className="text-gray-500">ID</dt>
                                      <dd className="text-gray-900">
                                        {questionQuery.data?._id}
                                      </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                      <dt className="text-gray-500">Topic</dt>
                                      <dd className="text-gray-900">
                                        {questionQuery.data?.topic
                                          ? sentenceToCaps(
                                              questionQuery.data?.topic
                                            )
                                          : ""}
                                      </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                      <dt className="text-gray-500">
                                        Subtopic
                                      </dt>
                                      <dd className="text-gray-900">
                                        {questionQuery.data?.subtopic
                                          ? sentenceToCaps(
                                              questionQuery.data?.subtopic
                                            )
                                          : ""}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>

                                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                  <button
                                    type="button"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                    onClick={() =>
                                      setIsSupportSidebarOpen(false)
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

export default SupportSidebarForm;
