import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { UseQueryResult } from "react-query";
import { TestList } from "../hooks";
import { classNames } from "../../../utils/utils";

type PaginationPropsType = {
  testList: UseQueryResult<TestList>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({
  testList,
  currentPage,
  setCurrentPage,
}: PaginationPropsType) => {
  return (
    <div className="flex items-center justify-between   px-4 py-3 sm:px-6 font-tables">
      <div className="flex flex-1 justify-between sm:hidden ">
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-md text-gray-700">
            Showing{" "}
            <span className=" font-bold">
              {testList.data ? testList.data?.currentPage * 10 - 9 : ""}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {testList.data && testList.data?.currentPage * 10 < testList.data.total ? testList.data?.currentPage * 10 : testList.data && testList.data.total}
            </span>{" "}
            of <span className="font-bold">{testList.data?.total}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded shadow-sm bg-white"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              className="relative inline-flex items-center rounded-l px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {testList.data &&
              [...Array(testList.data?.pages).keys()].map((page) => (
                <button
                  onClick={() => {
                    setCurrentPage(page + 1);
                  }}
                  aria-current="page"
                  className={classNames(
                    testList.data.currentPage === page + 1
                      ? "bg-button-100 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-100"
                      : "text-gray-900 ring-1 ring-inset  ring-gray-300 hover:bg-gray-50 focus:outline-offset-0",
                    "relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold focus:z-20"
                  )}
                >
                  {page + 1}
                </button>
              ))}

            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span> */}

            <button
              onClick={() => {
                if (testList.data && currentPage < testList.data?.pages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              className="relative inline-flex items-center rounded-r px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
