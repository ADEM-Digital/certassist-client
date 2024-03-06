import { useNavigate, useParams } from "react-router-dom";
import TestSidebar from "./components/TestSidebar";
import { TestInstanceContext, useTestInstance } from "./hooks";
import TestNavbar from "./components/TestNavbar";
import TestBottomNavbar from "./components/TestBottomNavbar";
import TestQuestion from "./components/TestQuestion";
import { classNames } from "../../utils/utils";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import SupportSidebarForm from "./components/SupportSidebarForm";
import LanguageSidebar from "./components/LanguageSidebar";
import BlockedActionOverlay from "./components/BlockedActionOverlay";

const TestInstance = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const contextProps = useTestInstance(id);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    navigate("/login");
  }

  useEffect(() => {
    queryClient.removeQueries("testList");
  }, []);
  return (
    <TestInstanceContext.Provider value={contextProps}>
      <div
        className={classNames(
          contextProps.selectedColor === "main"
            ? "bg-testbg-100"
            : "bg-testbg-200",
          "overflow-hidden h-full"
        )}
      >
        {/* Overlay div */}
        {!contextProps.isScreenActive && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-testbg-100 bg-opacity-100 flex justify-center items-center z-40">
            <BlockedActionOverlay />
          </div>
        )}
        {/* Language Sidebar */}
        <LanguageSidebar />
        {/* Support Sidebar */}
        <SupportSidebarForm />
        {/* Sidebar */}
        <TestSidebar />
        {/* Navbar */}
        <TestNavbar />
        {/* Main Content */}
        <TestQuestion />
        {/* Bottom Test Navbar */}
        <TestBottomNavbar />
      </div>
    </TestInstanceContext.Provider>
  );
};

export default TestInstance;
