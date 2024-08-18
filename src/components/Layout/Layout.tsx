import TestIcon from "../icons/TestIcon";
import { classNames, getDaysToDateString } from "../../utils/utils";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import DashboardIcon from "../icons/DashboardIcon";
import {
  Bars3Icon,
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import MobileSideBar from "./MobileSideBar";
import CogIcon from "../icons/CogIcon";
import { useTour } from "@reactour/tour";
import { dashboardTourSteps, testsTourSteps } from "../../tourSteps";
import { UserDataType } from "../../types/UserDataType";
import { useQuery } from "react-query";
import GeneralSupportSidebarForm from "./components/GeneralSupportSidebarForm";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { TrialContext, TrialContextType } from "../../context/TrialContext";

const sidebarMenu = [
  {
    path: "/",
    routeName: "dashboard",
    icon: <DashboardIcon />,
    selected: true,
  },
  {
    path: "/tests",
    routeName: "tests",
    icon: <TestIcon width={40} height={40} />,
    selected: false,
  },
  {
    path: "/settings",
    routeName: "settings",
    icon: <CogIcon width={40} height={40} />,
    selected: false,
  },
];

const Layout = ({}) => {
  const [dasyToTrialEnd, setDaysToTrialEnd] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const [isGeneralSupportSidebarOpen, setIsGeneralSupportSidebarOpen] =
    useState<boolean>(false);

  const { user, logout } = useAuth0();

  const checkUserData = async () => {
    try {
      if (user?.sub) {
        let response: AxiosResponse<UserDataType[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/usersData`,
          {
            params: {
              userId: user.sub,
            },
          }
        );

        if (response.data.length === 0) {
          let response = await axios.post(
            `${import.meta.env.VITE_API_URL}/usersData`,
            {
              userId: user.sub,
              email: user.email,
              usedQuestions: [],
              markedQuestions: [],
              correctQuestions: [],
              incorrectQuestions: [],
            }
          );

          console.log("Created user data");
          console.log(response.data);
          return {
            userId: user.sub,
            email: user.email,
            usedQuestions: [],
            markedQuestions: [],
            correctQuestions: [],
            incorrectQuestions: [],
          };
        } else {
          return response.data[0];
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userData = useQuery("userData", checkUserData, {
    enabled: user ? true : false,
  });

  const checkSubscription = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/check-subscription/${user?.email}`
      );

      if (response.data && response.data.length < 1) {
        navigate("/pricing");
      } else {
        console.log("Billing", response.data);
        let billing = response.data[0];
        if (billing.isTrial && billing.isTrial === true) {
          setIsTrial(true);
          setDaysToTrialEnd(getDaysToDateString(billing.expiresAt));
        } else {
          setIsTrial(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const location = useLocation();

  useEffect(() => {
    if (user?.sub) {
      checkUserData();
      checkSubscription();
    }
  }, [user]);

  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  const { isTrial, setIsTrial } = useContext(TrialContext) as TrialContextType;
  const [isTrialBannerOpen, setIsTrialBannerOpen] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setCurrentStep(0);
      if (location.pathname === "/tests") {
        if (setSteps) setSteps(testsTourSteps);
      } else {
        if (setSteps) setSteps(dashboardTourSteps);
      }

      if (location.pathname === "/login" || location.pathname === "/pricing") {
        setIsOpen(false);
      } else {
        if (location.pathname === "/") {
          if (
            userData.data &&
            !(userData.data as UserDataType).dashboardTutorial
          ) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        } else if (location.pathname === "/tests") {
          if (userData.data && !(userData.data as UserDataType).testsTutorial) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }
      }
    }
  }, [
    user,
    userData.data,
    location.pathname,
    setCurrentStep,
    setSteps,
    setIsOpen,
  ]);

  return (
    <div>
      {/* Mobile sidebar */}
      <MobileSideBar
        mobileMenuOpen={isMobileSidebarOpen}
        setMobileMenuOpen={setIsMobileSidebarOpen}
        navigation={sidebarMenu}
      />
      {/* Sidebar */}
      <div className="desktop-sidebar hidden md:flex flex-col items-center w-[70px] h-[calc(100vh-60px)] border-r border-border-100 absolute top-0 left-0 mt-[60px] py-2">
        {/* <Logo classes="w-3/4"/> */}

        {sidebarMenu &&
          sidebarMenu.map((option) => (
            <Link
              // onClick={() => {
              //   let newSidebarMenuState = [...sidebarMenuState];
              //   newSidebarMenuState = newSidebarMenuState.map((currOption) => ({...currOption, selected: false}))
              //   let routeIndex = newSidebarMenuState.findIndex((currOption) => currOption.routeName === option.routeName)
              //   newSidebarMenuState[routeIndex].selected = true
              //   setSidebarMenuState(newSidebarMenuState)
              // }}
              to={option.path}
              key={`sidebar-link-${option.routeName}`}
              className={classNames(
                location.pathname === option.path
                  ? "bg-gray-100 rounded-md shadow-md"
                  : "",
                "p-2"
              )}
            >
              {option.icon}
            </Link>
          ))}
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between w-full min-h-[60px] h-[60px] border-b border-border-100 absolute top-0 bg-white z-50">
        <button
          className="md:hidden p-2 z-50"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Bars3Icon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="pl-2 py-2 flex items-center gap-1">
          <Logo width={30} />
          <p className=" font-body font-medium text-gray-900 text-xl">
            CertAssist
          </p>
        </div>
        <div className="mr-3 flex gap-4 items-center">
          <button
            onClick={() => setIsGeneralSupportSidebarOpen(true)}
            type="button"
            className="flex gap-1 items-center relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Help form</span>
            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
            <p className=" font-tables text-sm">Help</p>
          </button>
          <Menu as="div" className="logout-button relative">
            <div>
              <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-1 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-md">
                <span className="flex w-full items-center justify-between">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                      src={user?.picture}
                      alt=""
                    />
                    <span className=" hidden md:flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium text-gray-900">
                        {user?.name}
                      </span>
                      <span className="truncate text-sm text-gray-500">
                        {user?.email}
                      </span>
                    </span>
                  </span>
                  <ChevronUpDownIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Log Out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {/* Main Content */}
      <main className="bg-mainbg-100 mt-[60px] ml-0 md:ml-[70px] h-[calc(100vh-60px)] md:w-[calc(100vw-70px)]">
        <Outlet />
      </main>
      <GeneralSupportSidebarForm
        isGeneralSupportSidebarOpen={isGeneralSupportSidebarOpen}
        setIsGeneralSupportSidebarOpen={setIsGeneralSupportSidebarOpen}
      />
      {isTrial && isTrialBannerOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
          <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-button-100 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
            <p className="text-sm leading-6 text-white">
              <a href="#">
                <strong className="font-semibold">Trial Period</strong>
                <svg
                  viewBox="0 0 2 2"
                  aria-hidden="true"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                Your trial period ends in <strong>{dasyToTrialEnd} days</strong>.
              </a>
            </p>
            <button
              onClick={() => setIsTrialBannerOpen(false)}
              type="button"
              className="-m-1.5 flex-none p-1.5"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
