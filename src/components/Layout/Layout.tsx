import TestIcon from "../icons/TestIcon";
import { classNames } from "../../utils/utils";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import axios from "axios";

const sidebarMenu = [
  {
    path: "/",
    routeName: "tests",
    icon: <TestIcon height={40} width={40} />,
    selected: true,
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const Layout = ({}) => {
  const { user } = useAuth0();

  const checkUserData = async () => {
    try {
      if (user?.sub) {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usersData?id=${encodeURIComponent(
            user?.sub
          )}`
        );

        if (response.data.length === 0) {
          let response = await axios.post(
            `${import.meta.env.VITE_API_URL}/usersData`,
            {
              id: user.sub,
              usedQuestions: [],
              markedQuestions: [],
              correctQuestions: [],
              incorrectQuestions: [],
            }
          );
          console.log(response.data);
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
    }
  }, [user]);

  return (
    <div>
      {/* Sidebar */}
      <div className="flex flex-col items-center w-[5vw] h-[calc(100vh-7vh)] border-r border-border-100 absolute top-0 left-0 mt-[7vh] py-2">
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
      <div className="flex items-center justify-between w-full h-[7vh] border-b border-border-100 absolute top-0 bg-white">
        <div className="pl-2 py-2 flex items-center gap-1">
          <Logo width={30} />
          <p className=" font-body font-medium text-gray-900 text-xl">
            CertAssist
          </p>
        </div>
        <div className="mr-3 p-0.5 rounded-full border-2 border-button-100">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.picture}
                  alt=""
                />
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
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {/* Main Content */}
      <main className="bg-mainbg-100 mt-[7vh] ml-[5vw] h-[calc(100vh-7vh)] w-[calc(100vw-5vw)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
