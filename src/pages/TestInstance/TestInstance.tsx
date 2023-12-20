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
            : "bg-testbg-200"
        )}
      >
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
