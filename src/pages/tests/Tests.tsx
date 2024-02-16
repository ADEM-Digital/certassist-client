import {
  CircleStackIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import MainButton from "../../components/buttons/MainButton";
import SectionHeader from "../../components/headers/SectionHeader";
import ClockIcon from "../../components/icons/ClockIcon";
import StatusIcon from "../../components/icons/StatusIcon";
import { Link, useNavigate } from "react-router-dom";
import { useTests } from "./hooks";
import PersonIcon from "../../components/icons/PersonIcon";
import EmptyClockIcon from "../../components/icons/EmptyClockIcon";
import { classNames, stringToCaps } from "../../utils/utils";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import TrashIcon from "../../components/icons/TrashIcon";
import DeleteModal from "../../components/modals/DeleteModal";
import { useQueryClient } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import AnalysisIcon from "../../components/icons/AnalysisIcon";
import { Pagination } from "./components/Pagination";

const Tests = () => {
  const { isLoading } = useAuth0();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    testList,
    open,
    setOpen,
    selectedTest,
    setSelectedTest,
    currentPage,
    setCurrentPage,
  } = useTests();

  useEffect(() => {
    queryClient.removeQueries("testActiveQuestion");
    queryClient.removeQueries("testData");
  }, []);

  return (
    <>
      {isLoading && <p>Is Loading</p>}
      {!isLoading && (
        <div className="py-5 px-5 md:px-10 flex h-full flex-col gap-2.5 overflow-y-auto">
          <SectionHeader text={"My Tests"} />

          {/* Action buttons */}
          <div className="flex flex-row-reverse gap-2.5">
            {/* <SecondaryButton
              buttonText="FILTERS"
              icon={<FunnelIcon className="w-4 h-4 stroke-2" />}
              iconDirection="right"
            /> */}

            <MainButton
              buttonText="CREATE TEST"
              onClick={() => navigate("/tests/new")}
            />
          </div>

          {/* Table to display test */}
          <table className="shadow-md">
            <thead className=" bg-white">
              <tr className="border-b border-border-100">
                <th className="">Name</th>
                <th className="">Mode</th>
                <th className="hidden md:table-cell">Date Created</th>
                <th className="hidden md:table-cell">Questions</th>
                <th className="">Status</th>
                <th className="hidden md:table-cell">Results</th>
                <th className="">
                  <span className="hidden">Options</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {testList.data &&
                testList.data.tests?.map((test) => (
                  <tr
                    key={`test-row-${test._id}`}
                    className="border-b border-border-100 text-gray-900 text-lg font-light"
                  >
                    <td className="font-tables text-button-100 font-extrabold">
                      <Link
                        to={
                          test.testStatus === "pending"
                            ? `/test/${test._id}`
                            : `/tests/analysis/${test._id}`
                        }
                      >
                        {test.testName ?? test._id}
                      </Link>
                    </td>
                    <td className="">
                      <div className="flex justify-center gap-2">
                        {test.testMode === "timed" && <ClockIcon />}
                        {test.testMode === "tutor" && (
                          <PersonIcon strokeColor="#00a670" />
                        )}
                        {test.testMode === "untimed" && (
                          <EmptyClockIcon strokeColor="#ffbb26" />
                        )}
                        <span className="hidden md:table-cell">
                          {stringToCaps(test.testMode)}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      {moment(test?.createdAt).format("MM/DD/YYYY")}
                    </td>
                    <td className="hidden md:table-cell">
                      {test?.questionCount}
                    </td>
                    <td className="">
                      <div className="flex justify-center gap-2 items-center">
                        <StatusIcon
                          strokeColor={
                            test.testStatus === "completed"
                              ? undefined
                              : "#ffbb26"
                          }
                        />
                        <span className="hidden md:table-cell">
                          {stringToCaps(test.testStatus)}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <span
                        className={classNames(
                          test.grade !== undefined && test.grade < 70
                            ? "bg-grades-low text-white"
                            : "",
                          test.grade !== undefined &&
                            test.grade >= 70 &&
                            test.grade < 80
                            ? "bg-grades-average text-gray-900"
                            : "",
                          test.grade !== undefined && test.grade >= 80
                            ? "bg-grades-good text-white"
                            : "",
                          (test.grade !== undefined) === undefined
                            ? " bg-button-100 text-white"
                            : "",
                          "py-1.5 px-2.5 font-extrabold rounded-[3px]"
                        )}
                      >
                        {test.grade !== undefined
                          ? `${test.grade.toFixed(0)}%`
                          : "-"}
                      </span>
                    </td>
                    <td className="flex justify-center items-center gap-2 align-middle">
                      <button
                        disabled={test.testStatus !== "completed"}
                        onClick={() => navigate(`/tests/analysis/${test._id}`)}
                      >
                        <AnalysisIcon
                          strokeColor={
                            test.testStatus !== "completed"
                              ? "#D9D9D9"
                              : undefined
                          }
                        />
                      </button>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                          <EllipsisHorizontalIcon className="w-6 h-6" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="p-2 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setSelectedTest(test);
                                    setOpen(true);
                                  }}
                                  className={`${
                                    active
                                      ? "bg-button-100 text-white"
                                      : "text-gray-900"
                                  } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-lg font-light`}
                                >
                                  <TrashIcon strokeColor="#CC3F4B" />
                                  Delete test
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}

              {/* Display when the table is empty */}
              {testList.data?.tests.length === 0 && (
                <tr className="bg-white">
                  <td colSpan={7}>
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-295px)] text-gray-400">
                      <CircleStackIcon className="w-16 h-16 " />
                      <p className="text-base">
                        Couldn't find any test. Start creating new tests to
                        begin.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination testList={testList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {selectedTest && (
            <DeleteModal
              title={`Deleting test ${
                selectedTest?.testName ?? selectedTest?._id
              }`}
              text={
                "Are you sure you want to delete this test? This change is permanent and you will lose your data forever."
              }
              endPoint="/tests"
              query="testList"
              id={selectedTest?._id}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tests;
