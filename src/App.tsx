import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Tests from "./pages/tests/Tests";
import TestWizard from "./pages/TestWizard/TestWizard";
import { QueryClient, QueryClientProvider } from "react-query";
import TestInstance from "./pages/TestInstance/TestInstance";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./pages/Login/Login";
import TestInstanceAnalysis from "./pages/TestInstanceAnalysis/TestInstanceAnalysis";
import Dashboard from "./pages/Dashboard/Dashboard";
import PricingSelection from "./pages/PricingSelection/PricingSelection";
import Settings from "./pages/Settings/Settings";
import { TourProvider } from "@reactour/tour";

import { dashboardTourSteps } from "./tourSteps";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { UserDataType } from "./types/UserDataType";
import HOCTourComponent from "./components/tour/HOCTourComponent";
import { useLanguageContext, LanguageContext } from "./context/LanguageContext";

const queryClient = new QueryClient();

function App() {
  const { user } = useAuth0();
  const location = useLocation();
  const languageContextValue = useLanguageContext()


  return (
    <>
      <TourProvider
        padding={{
          popover: 0,
          wrapper: 0
        }}
        styles={{
          popover: (base) => (
            {
              ...base,
              background: "none",
              boxShadow: "none"
            }
          )
        }}
        steps={dashboardTourSteps}
        ContentComponent={HOCTourComponent}
        onClickHighlighted={(e) => {
          e.stopPropagation();
        }}
        disableInteraction
        onClickMask={() => console.log("click mask")}
        onClickClose={async ({ setIsOpen }) => {
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

              if (response.status === 200) {
                let requestPath: string = "";
                let requestOptions: {
                  userDataId: string | undefined;
                  dashboardTutorial?: boolean;
                  testsTutorial?: boolean;
                } = {
                  userDataId: response.data[0]._id,
                };

                if (location.pathname === "/") {
                  requestPath = `${
                    import.meta.env.VITE_API_URL
                  }/usersData/dashboardTutorial`;

                  requestOptions.dashboardTutorial = true;
                } else if (location.pathname === "/tests") {
                  requestPath = `${
                    import.meta.env.VITE_API_URL
                  }/usersData/testsTutorial`;
                  requestOptions.testsTutorial = true;
                }
                if (requestPath.length > 0) {
                  let updateResponse: AxiosResponse<UserDataType> =
                    await axios.put(requestPath, requestOptions);

                  console.log(updateResponse.data);
                  setIsOpen(false);
                  queryClient.invalidateQueries("userData");
                  queryClient.refetchQueries("userData");
                  
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <LanguageContext.Provider value={languageContextValue}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/tests/new" element={<TestWizard />} />
                <Route
                  path="/tests/analysis/:id"
                  element={<TestInstanceAnalysis />}
                />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="/test/:id" element={<TestInstance />} />
              <Route path="/pricing" element={<PricingSelection />} />
            </>

            <Route path="/login" element={<Login />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </LanguageContext.Provider>
      </TourProvider>
    </>
  );
}

export default App;
