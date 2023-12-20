import TestIcon from "../icons/TestIcon";
import { classNames } from "../../utils/utils";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const sidebarMenu = [
  {
    path: "/",
    routeName: "tests",
    icon: <TestIcon height={40} width={40} />,
    selected: true,
  },
  {
    path: "/tests/new",
    routeName: "testsNew",
    icon: <TestIcon height={40} width={40} />,
    selected: false,
  },
];

const Layout = ({}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const location = useLocation();
  
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
      <div className="flex items-center w-full h-[7vh] border-b border-border-100 absolute top-0 bg-white">
        <div className="pl-2 py-2 flex items-center gap-1">
          <Logo width={30} />
          <p className=" font-body font-medium text-gray-900 text-xl">
            CertAssist
          </p>
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
